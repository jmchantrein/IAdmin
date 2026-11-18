#!/usr/bin/env bash
# Vérifie une livraison dans une copie isolée du dépôt, pendant que d'autres agents
# écrivent dans le dossier de travail commun :
#   scripts/verifier-isole.sh [fichier ou dossier ...]
# La copie (`<dépôt>-verif`, ou VERIF_DIR) est un worktree git remis au dernier commit ;
# elle reçoit les chemins nommés tels qu'ils sont dans le dossier de travail (un chemin
# disparu y est supprimé), puis joue format, types, tests unitaires, build et scénarios
# de bout en bout sur le port VERIF_PORT (4399). Sans argument : le dernier commit seul.
# Sûreté : chaque commande git vise la copie par `git -C`, chaque suppression porte un
# chemin absolu sous la copie, et l'outil refuse une copie qui recouvre le dépôt.
set -uo pipefail

die() { echo "refus : $*" >&2; exit 2; }

root=$(git rev-parse --show-toplevel) && [ -n "$root" ] || die "pas dans un dépôt git"
root=$(realpath "$root")
copy=${VERIF_DIR-$(dirname "$root")/$(basename "$root")-verif}
[ -n "$copy" ] || die "VERIF_DIR est vide"
copy=$(realpath -m -- "$copy") && [ -n "$copy" ] && [ "$copy" != / ] || die "copie invalide"
port=${VERIF_PORT:-4399}
case $port in '' | *[!0-9]* | 4321) die "port invalide : $port" ;; esac

# Garde-fou : la copie n'est ni le dépôt, ni un de ses parents, ni un dossier en dessous.
case "$root/" in "$copy"/*) die "$copy est le dépôt de travail ou un de ses parents" ;; esac
case "$copy/" in "$root"/*) die "$copy est à l'intérieur du dépôt de travail" ;; esac

# Chemins nommés : relatifs au dépôt, sans `..`, hors de .git et node_modules.
paths=()
for path in "$@"; do
  while [ "${path%/}" != "$path" ]; do path=${path%/}; done
  case "/$path/" in
    // | //* | *//* | */./* | */../* | /.git/* | /node_modules/*) die "chemin refusé : '$path'" ;;
  esac
  paths+=("$path")
done

if [ ! -e "$copy/.git" ]; then
  [ ! -e "$copy" ] || die "$copy existe et n'est pas une copie git"
  git -C "$root" worktree prune || die "git worktree prune a échoué"
  git -C "$root" worktree add --quiet --detach "$copy" HEAD || die "création de la copie échouée"
fi
# La copie doit être un worktree de ce dépôt, dont elle est la racine.
[ "$(git -C "$copy" rev-parse --show-toplevel 2>/dev/null)" = "$copy" ] &&
  [ "$(realpath "$(git -C "$copy" rev-parse --git-common-dir)")" = \
    "$(realpath "$(git -C "$root" rev-parse --git-common-dir)")" ] ||
  die "$copy n'est pas un worktree de $root"
[ ! -L "$copy/node_modules" ] || die "$copy/node_modules est un lien symbolique"
if [ ! -d "$copy/node_modules" ]; then
  cp -a "$root/node_modules" "$copy/node_modules" || die "copie de node_modules échouée"
fi

head=$(git -C "$root" rev-parse HEAD) || die "dernier commit introuvable"
git -C "$copy" checkout --quiet --force --detach "$head" || die "remise au commit échouée"
git -C "$copy" clean --quiet -fd -e node_modules || die "nettoyage de la copie échoué"
echo "copie : $copy au commit ${head:0:7}"

for path in "${paths[@]}"; do
  rm -rf -- "${copy:?}/$path"
  if [ -e "$root/$path" ]; then
    mkdir -p -- "$copy/$(dirname -- "$path")" && cp -a -- "$root/$path" "$copy/$path" ||
      die "copie de $path échouée"
    echo "copié : $path"
  else
    echo "supprimé de la copie : $path (absent du dossier de travail)"
  fi
done

# Autre port que le dépôt de travail, pour ne jamais tester son serveur par erreur.
sed -i "s/^const PORT = 4321;/const PORT = $port;/" "$copy/playwright.config.ts"
grep -q "^const PORT = $port;" "$copy/playwright.config.ts" || die "port non remplacé"
(exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null && die "le port $port est déjà occupé"
rm -rf -- "${copy:?}/node_modules/.astro" "${copy:?}/.astro" "${copy:?}/dist" \
  "${copy:?}/test-results" "${copy:?}/.verif"
mkdir -p -- "$copy/.verif"

# Joue une étape dans la copie ; à l'échec, montre la fin de sa sortie et s'arrête.
step() {
  local name=$1 filter=$2 log="$copy/.verif/$1.log"
  shift 2
  if (cd "$copy" && "$@") >"$log" 2>&1; then
    echo "$name : ok — $(grep -E "$filter" "$log" | tail -1 | sed 's/\x1b\[[0-9;]*m//g; s/^ *//')"
  else
    echo "$name : ÉCHEC (journal : $log)" >&2
    tail -40 "$log" | sed 's/\x1b\[[0-9;]*m//g' >&2
    exit 1
  fi
}
step format 'formatted|style' npx prettier --check .
step types '[0-9]+ errors' npx astro check
step unitaires '^ *Tests ' npx vitest run
step build 'page|Complete' npx astro build
step e2e '[0-9]+ (passed|failed)' npx playwright test --trace off
echo "captures : $copy/test-results/captures"

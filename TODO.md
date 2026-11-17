# TODO

Liste active et historique. Les tâches s'ajoutent en bas de leur thématique ; une tâche
terminée est cochée, datée et déplacée sous « Fait ». Le plan d'ensemble (jalons J1 à J9)
est résumé ici au fil de l'eau.

## À faire

### Mise en ligne (action du propriétaire)

- [ ] Régler GitHub Pages sur la source « GitHub Actions » (Settings › Pages) ; le déploiement part de `main`.
- [ ] Fusionner la branche de travail dans `main` pour obtenir la première mise en ligne.

### J3 — Export/import, « pas à pas », fabrique

- [ ] Export de la progression en fichier JSON, import avec validation puis fusion (l'état le plus fort gagne).
- [ ] Écran qui signale une progression illisible ou un navigateur sans stockage, au-delà du message actuel.
- [ ] Widget générique « pas à pas » : anime une suite d'états déclarée dans le frontmatter, avance et recul par bouton.
- [ ] Procédures `docs/fabrique/rediger-brique.md` et `relire-brique.md`, avec skills de renvoi.

### J4 — Parcours Fondements complet

- [ ] Briques `donnees/` : binaire-lire, binaire-ecrire, addition-binaire, octet, texte-code, hash.
- [ ] Briques `logique/` : vrai-faux, non-et-ou, table-de-verite, portes-logiques, additionneur.
- [ ] Briques `algo/` : algorithme, variable, condition, boucle, recherche-lineaire, recherche-dichotomique.
- [ ] Un défi de synthèse (`genre: defi`).

### J5 à J9

- [ ] J5 — Terminal intégré : type d'exercice `terminal`, trois briques `shell/`. Reprendre `spike/terminal` (image Debian 12, `machine.mjs`, `control-agent`), puis supprimer le dossier `spike/` et son workflow.
- [ ] J5 — Vérifier le terminal sur le site réellement servi par GitHub Pages (le spike l'a mesuré sur un serveur local sans en-tête spécial).
- [ ] J5 — Créer un compte apprenant sans privilèges dans l'image ; le spike travaille en `root`.
- [ ] J5 — Publier avec l'image la liste des paquets et un lien vers leurs sources (noyau, outils GNU).
- [ ] J6 — Ligne de commande complète, `shell/empreinte` réutilisant `donnees/hash`, cursus `debuter` qui inclut les deux parcours.
- [ ] J7 — Test de positionnement par bissection du graphe ; accueil à trois portes (bas, moyen, haut niveau).
- [ ] J8 — Assistant LLM optionnel : tuteur socratique et juge, type d'exercice `libre`, réglages.
- [ ] J9 — Carte du graphe en SVG, niveau en axe vertical.

### Pédagogie

- [ ] Ouvrir les liens DOI de `docs/pedagogie.md` : les références ont été recoupées par recherche web, les liens n'ont pas pu être ouverts depuis la session.
- [ ] Faire essayer les trois premières briques par un vrai débutant et noter où il bute.

### Dettes et portes à garder ouvertes

- [ ] Terminal : l'émulateur v86 ne sait émuler que le 32 bits, et Debian 13 ne fournit plus de noyau 32 bits (constaté le 2026-11-17). L'image reste donc sur Debian 12, maintenue jusqu'en 2028 environ (date non vérifiée). Alpine + outils GNU, mesurée et conforme, est le repli prêt à l'emploi.
- [ ] Terminal : chaque machine ouverte réserve 256 Mo dans le navigateur de l'apprenant. Un disque de démarrage réduit (`MODULES=list`) permettrait peut-être 128 Mo : non essayé.
- [ ] Terminal : la première consultation d'une page de manuel prend environ 6 s sous Debian (0,6 à 1 s sous Alpine).
- [ ] Terminal : `/etc/hosts` et `/etc/hostname` sont vides dans l'image Debian exportée depuis Docker ; le nom d'hôte vient de la ligne de commande du noyau.
- [ ] Images 32 bits sous Docker : la résolution de noms échoue dans un conteneur Debian 32 bits avec le profil seccomp par défaut des runners GitHub (constaté) ; l'appel système bloqué n'est pas identifié. `spike/terminal/build.sh` lance donc le conteneur avec `seccomp=unconfined`.
- [ ] Deuxième langue : décider comment partager la structure d'une brique (prérequis, exercices) entre langues.
- [ ] Origine `jmchantrein.github.io` partagée avec les autres sites du compte (stockage du navigateur commun) : envisager un domaine dédié avant d'y stocker une clé d'API (J8).
- [ ] La progression d'une brique en cours (exercices réussis) vit en mémoire : un rechargement la remet à zéro.
- [ ] Zod est chargé dans le navigateur pour valider la progression et les paramètres de widget : mesurer son poids si les pages ralentissent.

## Fait

### J2 — Spike terminal Linux (2026-11-17)

- [x] Deux images construites et mesurées dans GitHub Actions (`.github/workflows/spike-vm.yml`, code jetable sous `spike/terminal`).
- [x] Canal de contrôle sur le second port série : l'hôte exécute une commande, lit sa sortie et son code de retour, sans rien écrire dans le terminal de l'apprenant.
- [x] Remise à zéro d'un exercice par restauration de l'instantané : un fichier créé par l'apprenant disparaît.
- [x] Le même pilote fonctionne sous Node (pour rejouer les solutions en CI) et dans Chromium.
- [x] **Décision : Debian 12 minimale, avec 256 Mo de mémoire.** Elle tient les trois seuils fixés et apporte un environnement courant et 222 pages de manuel en français. Alpine + outils GNU reste le repli.

Mesures (run 3 du workflow, commit `67f6914`) :

| Mesure                                    | Seuil   | Debian 12 (256 Mo)                | Alpine 3.21 + GNU (128 Mo)        |
| ----------------------------------------- | ------- | --------------------------------- | --------------------------------- |
| Téléchargé avant machine prête (Chromium) | ≤ 30 Mo | 20,6 Mo                           | 14,1 Mo                           |
| Délai jusqu'à machine prête (Chromium)    | ≤ 5 s   | 2,0 s                             | 2,1 s                             |
| Remise à zéro                             | ≤ 1 s   | 0,2 s                             | 0,1 s                             |
| Canal de contrôle (`exit 3` rend 3)       | Réussi  | Réussi, 0 octet sur le terminal   | Réussi, 0 octet sur le terminal   |
| Racine compressée dans le site            | ≤ 1 Go  | 149,9 Mo, 10 889 fichiers         | 40,7 Mo, 2 909 fichiers           |
| Instantané compressé                      | —       | 17,4 Mo (70,7 Mo brut)            | 11,4 Mo (36,9 Mo brut)            |
| Démarrage à froid sous Node               | —       | 47 s                              | 38 s                              |
| `ls`, `man ls`, `grep` (à la demande)     | —       | 1,9 Mo ; 3,3 Mo en 6,5 s ; 0,1 Mo | 4,5 Mo ; 2,8 Mo en 0,6 s ; 0,7 Mo |
| Total téléchargé après ces commandes      | —       | 25,8 Mo                           | 22,1 Mo                           |
| Pages de manuel en français               | —       | 222                               | aucune                            |
| Avec 128 Mo de mémoire                    | —       | panique du noyau au démarrage     | fonctionne                        |

Constats annexes : Debian 13 en 32 bits propose `manpages-fr` mais aucun noyau (`linux-image-686` inconnu du dépôt, `linux-image-686-pae` sans candidat). Les délais Chromium sont mesurés sur un runner GitHub, serveur local : un téléchargement réel de 20 Mo prendra plus de 2 s selon la connexion.

### J1 — Tranche verticale (2026-11-17)

- [x] Socle Astro 7, îlots Preact 11, TypeScript 6 strict, Zod 4, Vitest 5, Playwright.
- [x] Format des briques et des parcours (`src/core/schema.ts`) : budgets, manipulation obligatoire, retour explicatif, solution et contre-exemples vérifiés au build.
- [x] Graphe de prérequis : route d'un parcours, détection de boucle et de lien orphelin, parcours qui en incluent d'autres.
- [x] Chaîne de vérification des réponses : filtres puis prédicat.
- [x] Progression dans le navigateur : seuls les faits sont stockés, la disponibilité se déduit du graphe.
- [x] Types d'exercice `choix`, `saisie`, `widget` ; widgets `bascule-bits` et `devinette`.
- [x] Rappels des prérequis avec « Me tester », verrou indicatif, navigation libre.
- [x] Briques `donnees/information`, `donnees/bit`, `donnees/combinaisons` ; parcours `fondements`.
- [x] Internationalisation préparée : contenu et URL par langue, dictionnaire d'interface.
- [x] Socle pédagogique `docs/pedagogie.md` : 15 règles sourcées.
- [x] `AGENTS.md` (source des consignes), `CLAUDE.md` qui y renvoie, `README.md`.
- [x] Tests : unitaires, contenu, bout en bout avec captures ; CI GitHub Actions et déploiement Pages depuis `main`.

### One-shots

- [x] 2026-11-17 — Plan d'ensemble du projet, validé après neuf remarques du propriétaire.

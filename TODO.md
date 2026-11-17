# TODO

Liste active et historique. Les tâches s'ajoutent en bas de leur thématique ; une tâche
terminée est cochée, datée et déplacée sous « Fait ». Le plan d'ensemble (jalons J1 à J9)
est résumé ici au fil de l'eau.

## À faire

### Mise en ligne (action du propriétaire)

- [ ] Régler GitHub Pages sur la source « GitHub Actions » (Settings › Pages) ; le déploiement part de `main`.
- [ ] Fusionner la branche de travail dans `main` pour obtenir la première mise en ligne.

### J4 — Parcours Fondements complet

- [ ] Recadrage par le propriétaire sur le lot 1 (ton, niveau, besoins de widgets des lots suivants) avant d'enchaîner.
- [ ] Lot 2 : `donnees/addition-binaire`, `donnees/texte-code`, `donnees/hash`. Widgets pressentis, à proposer ici avant de les écrire : `pas-a-pas` à plusieurs rangées pour l'addition posée, un widget d'empreinte pour `hash`.
- [ ] Lot 3 : `logique/vrai-faux`, `logique/non-et-ou`, `logique/table-de-verite`. Widget pressenti : une porte logique (interrupteurs, porte, lampe).
- [ ] Lot 4 : `logique/portes-logiques`, `logique/additionneur`. Même widget, peut-être un petit circuit ; lot à réduire si le widget dépasse ce qu'il justifie.
- [ ] Lot 5 : `algo/variable`, `algo/condition`, `algo/boucle`, avec `pas-a-pas`.
- [ ] Lot 6 : `algo/recherche-lineaire`, `algo/recherche-dichotomique`, un défi de synthèse (`genre: defi`).

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
- [ ] Terminal : la première consultation d'une page de manuel prend 6 à 11 s sous Debian (0,6 à 1 s sous Alpine).
- [ ] Terminal : `/etc/hosts` et `/etc/hostname` sont vides dans l'image Debian exportée depuis Docker ; le nom d'hôte vient de la ligne de commande du noyau.
- [ ] Images 32 bits sous Docker : la résolution de noms échoue dans un conteneur Debian 32 bits avec le profil seccomp par défaut des runners GitHub (constaté) ; l'appel système bloqué n'est pas identifié. `spike/terminal/build.sh` lance donc le conteneur avec `seccomp=unconfined`.
- [ ] Deuxième langue : décider comment partager la structure d'une brique (prérequis, exercices) entre langues.
- [ ] Origine `jmchantrein.github.io` partagée avec les autres sites du compte (stockage du navigateur commun) : envisager un domaine dédié avant d'y stocker une clé d'API (J8).
- [ ] La progression d'une brique en cours (exercices réussis) vit en mémoire : un rechargement la remet à zéro.
- [ ] Le widget `pas-a-pas` montre une seule rangée de cases : un flux entre deux commandes ou un arbre demanderont une autre forme, à proposer ici avant de l'écrire.
- [ ] L'import fusionne toujours ; remplacer sa progression par un fichier demande d'effacer d'abord.
- [ ] Un exercice `saisie` n'a qu'un seul `retour`, commun à toutes les mauvaises réponses : un retour par contre-exemple nommerait mieux chaque erreur (relevé par la relecture adverse).
- [ ] Les distracteurs et contre-exemples sont jugés « typiques » par des LLM, sans essai par un débutant.
- [ ] Le widget de la manipulation reste utilisable pendant les exercices : dans `donnees/octet`, il permet encore de lire la réponse de l'exercice sur 5 bits. Accepté pour l'instant ; le masquer ou le replier après la manipulation serait une réponse générale.
- [ ] Écarts mineurs laissés après relecture du lot 1 : deux acquis d'`octet` contiennent un « et » ; trois exercices de `binaire-ecrire` donnent encore la liste des poids ; la première étape de son animation ne suit pas le même découpage que les suivantes.
- [ ] Zod est chargé dans le navigateur pour valider la progression et les paramètres de widget : mesurer son poids si les pages ralentissent.

## Fait

### J4 — Parcours Fondements, première étape (2026-11-17)

- [x] Test `tests/e2e/briques.spec.ts` : chaque brique est jouée comme par un apprenant (une mauvaise réponse et son retour, puis la solution) jusqu'à sa validation. Il suit le contenu sans retouche.
- [x] Relecture adverse des trois briques de J1 (aucun écart bloquant, 16 à corriger, 13 mineurs), puis réécriture : exercices sur des cas nouveaux au lieu de réponses recopiables, questions de manipulation à réponse déterminée, vocabulaire resserré.
- [x] Une saisie qui porte une unité (« 3 bits ») reçoit le message « écris seulement le nombre » au lieu du retour d'erreur.
- [x] Le suivi de `bascule-bits` liste les combinaisons trouvées sans annoncer leur total.
- [x] Paramètre `poids` de `bascule-bits` : poids sous chaque bit et total ; la rangée tient sur une ligne jusqu'à 8 bits, en mobile aussi.
- [x] Lot 1 : `donnees/binaire-lire`, `donnees/binaire-ecrire`, `donnees/octet`, écrites, jouées par le test, relues par un agent neuf (1 écart bloquant, 10 à corriger, une vingtaine de mineurs) puis corrigées.
- [x] Les options d'un `choix` s'affichent dans un ordre mélangé et stable : la bonne réponse était la première option de tous les QCM du site.
- [x] Deux défauts révélés par un échec de la CI puis par la répétition des tests, corrigés avec un test de non-régression chacun : la validation d'une brique s'enregistrait après l'affichage de « Brique validée » (quitter la page aussitôt la perdait) ; une réponse tapée avant la fin du chargement était effacée au démarrage du script. Le bouton « Valider » reste inactif tant que la page n'est pas interactive.
- [x] Les deux procédures de la fabrique intègrent les leçons de ces relectures : forme de réponse explicite, valeurs sans palindrome, valeurs hors de portée du widget de la page, un seul sens par mot.

### J3 — Export/import, « pas à pas », fabrique (2026-11-17)

- [x] Page « Ma progression » : export en fichier JSON, import avec validation puis fusion (l'état le plus fort gagne, la date départage, rien n'est perdu), effacement après confirmation.
- [x] Une progression illisible est déplacée de côté une seule fois ; la page permet d'en télécharger la copie puis de la supprimer. Un navigateur sans stockage est signalé.
- [x] Widget générique `pas-a-pas` : étapes déclarées dans la brique (cases, cases mises en avant ou écartées, étiquettes, légende), avance et recul par bouton.
- [x] Brique `algo/algorithme`, première entrée de haut niveau et premier usage de `pas-a-pas`.
- [x] Procédures `docs/fabrique/rediger-brique.md` et `relire-brique.md`, skills de renvoi.
- [x] Épreuve de la fabrique : `algo/algorithme` écrite selon la première procédure, relue par un agent neuf selon la seconde (1 écart bloquant, 7 à corriger, 5 mineurs), puis corrigée ; les deux procédures ont été complétées d'après ses remarques.
- [x] Une réponse attendue en nombre est annoncée « en chiffres » dans le champ de saisie ; le widget `pas-a-pas` dit aussi par le texte ce que ses couleurs montrent.

### J2 — Spike terminal Linux (2026-11-17)

- [x] Deux images construites et mesurées dans GitHub Actions (`.github/workflows/spike-vm.yml`, code jetable sous `spike/terminal`).
- [x] Canal de contrôle sur le second port série : l'hôte exécute une commande, lit sa sortie et son code de retour, sans rien écrire dans le terminal de l'apprenant.
- [x] Remise à zéro d'un exercice par restauration de l'instantané : un fichier créé par l'apprenant disparaît.
- [x] Le même pilote fonctionne sous Node (pour rejouer les solutions en CI) et dans Chromium.
- [x] **Décision : Debian 12 minimale, avec 256 Mo de mémoire.** Elle tient les trois seuils fixés et apporte un environnement courant et 222 pages de manuel en français. Alpine + outils GNU reste le repli.

Mesures (run 3 du workflow, commit `67f6914` ; reproduites par les runs 4 et 5, ce dernier vert pour les deux images) :

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

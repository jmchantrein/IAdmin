# TODO

Liste active et historique. Les tâches s'ajoutent en bas de leur thématique ; une tâche
terminée est cochée, datée et déplacée sous « Fait ». Le plan d'ensemble (jalons J1 à J9)
est résumé ici au fil de l'eau.

## À faire

### Mise en ligne (action du propriétaire)

- [ ] Régler GitHub Pages sur la source « GitHub Actions » (Settings › Pages) ; le déploiement part de `main`.
- [ ] Fusionner la branche de travail dans `main` pour obtenir la première mise en ligne.

### J2 — Spike terminal Linux

- [ ] Construire en GitHub Actions deux images pour v86 : Debian minimale et Alpine + outils GNU.
- [ ] Mesurer pour chacune : poids, temps de démarrage, remise à zéro par instantané, canal de contrôle (exécuter une commande et lire son code de retour), fonctionnement sous Node et sur Pages.
- [ ] Vérifier la disponibilité de Debian en 32 bits (noyau i386 de Debian 12 et 13, `manpages-fr`) : non vérifié, les miroirs Debian sont bloqués dans les sessions cloud.
- [ ] Écrire ici la décision chiffrée (Debian, Alpine, ou plan B shell simulé).

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

- [ ] J5 — Terminal intégré : type d'exercice `terminal`, trois briques `shell/`.
- [ ] J6 — Ligne de commande complète, `shell/empreinte` réutilisant `donnees/hash`, cursus `debuter` qui inclut les deux parcours.
- [ ] J7 — Test de positionnement par bissection du graphe ; accueil à trois portes (bas, moyen, haut niveau).
- [ ] J8 — Assistant LLM optionnel : tuteur socratique et juge, type d'exercice `libre`, réglages.
- [ ] J9 — Carte du graphe en SVG, niveau en axe vertical.

### Pédagogie

- [ ] Ouvrir les liens DOI de `docs/pedagogie.md` : les références ont été recoupées par recherche web, les liens n'ont pas pu être ouverts depuis la session.
- [ ] Faire essayer les trois premières briques par un vrai débutant et noter où il bute.

### Dettes et portes à garder ouvertes

- [ ] Deuxième langue : décider comment partager la structure d'une brique (prérequis, exercices) entre langues.
- [ ] Origine `jmchantrein.github.io` partagée avec les autres sites du compte (stockage du navigateur commun) : envisager un domaine dédié avant d'y stocker une clé d'API (J8).
- [ ] La progression d'une brique en cours (exercices réussis) vit en mémoire : un rechargement la remet à zéro.
- [ ] Zod est chargé dans le navigateur pour valider la progression et les paramètres de widget : mesurer son poids si les pages ralentissent.

## Fait

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

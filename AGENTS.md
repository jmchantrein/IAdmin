# Consignes pour les agents

Site statique d'apprentissage de l'informatique, produit par des LLM et encadré par un
humain. Ce fichier est la source unique des règles ; `README.md` décrit le projet,
`TODO.md` l'état des travaux, `docs/pedagogie.md` le socle pédagogique.

## Avant de rendre la main

- Lance `npm run verify` (format, types, tests, build) puis `npm run e2e`, et corrige jusqu'au vert.
- Mets à jour `TODO.md` : coche la tâche et déplace-la sous « Fait », ajoute les nouvelles en bas de leur thématique.
- Note dans `TODO.md` toute dette et toute décision qui ferme une porte.
- Rapporte les écarts et ce qui reste non vérifié ; distingue ce que tu as constaté de ce que tu supposes.

## Contenu (`src/content`)

- Une brique enseigne une seule notion, dans `src/content/briques/<langue>/<domaine>/<brique>.md`.
- Pars de `src/content/briques/fr/donnees/bit.md` comme gabarit ; `src/core/schema.ts` définit le format.
- Écris une brique en suivant `docs/fabrique/rediger-brique.md` ; fais-la relire selon `docs/fabrique/relire-brique.md` par un agent qui ne l'a pas écrite.
- Applique les règles de `docs/pedagogie.md` et relis ta brique avec leurs critères « Relecture ».
- Lie chaque notion requise à sa brique, donne la raison de chaque convention, et dessine ce qu'un schéma dit mieux qu'une phrase (`docs/fabrique/dessiner.md`).
- Ouvre par une manipulation guidée par une question ; l'explication nomme ensuite ce que l'apprenant a observé.
- Emploie uniquement les notions définies dans la brique ou acquises par ses `requiert`.
- Mets dans `requiert` le strict nécessaire pour comprendre ; ce qui se trouve « sous le capot » va dans `repose_sur`, les liens libres dans `voir_aussi`.
- Écris un `resume` lisible hors de sa page : il sert de rappel partout où la brique est requise.
- Donne à chaque exercice vérifié une `solution`, des `contre_exemples` tirés d'erreurs typiques et un `retour` qui explique le raisonnement.
- Conserve tout identifiant publié (chemin du fichier) ; un domaine est un simple dossier, crée-le au besoin.
- Rattache chaque brique à un parcours (`src/content/parcours/<langue>/*.yaml`).
- Tutoie l'apprenant, grand débutant adulte.

## Rôles

- Répartis le travail selon `docs/fabrique/orchestrer.md` : un orchestrateur cadre et vérifie, des implémenteurs écrivent, un relecteur distinct cherche les écarts.

## Code

- Écris le code en anglais ; le contenu, la documentation et les clés du format en français.
- Garde `src/core` pur : TypeScript sans DOM ni Astro, chaque module avec ses tests.
- Place chaque texte d'interface dans `src/i18n/fr.ts`.
- Réutilise un widget existant ; propose tout nouveau widget dans `TODO.md` avant de l'écrire.
- Déclare un widget à deux endroits : ses paramètres dans `src/core/widgets.ts`, son composant dans `src/components/widgets`.
- Lis la documentation de la version installée (`node_modules`) avant d'utiliser une API : Astro 7, Preact 11, Zod 4 et Vitest 5 sont plus récents que ta mémoire.
- Choisis la solution la plus simple qui répond au besoin du jalon en cours ; propose l'option minimale avant toute abstraction.
- Fais échouer tôt et clairement : une erreur de contenu arrête le build avec le fichier et la règle en cause.

## Environnement

- `astro dev` et `astro preview` passent en arrière-plan quand un agent est détecté ; arrête-les avec `npx astro preview stop` ou lance-les avec `--ignore-lock` pour les garder au premier plan.
- Playwright et Chromium sont préinstallés dans les sessions cloud : garde `@playwright/test` à la version installée.
- Après une fusion dans `main`, contrôle le job `deployer` puis lance `npm run e2e:live` : il joue les mêmes scénarios contre le site en ligne. L'environnement cloud « IAdmin » autorise son hôte.
- Développe sur la branche indiquée par la session ; ouvre une demande de fusion seulement sur demande.

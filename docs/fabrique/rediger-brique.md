# Rédiger une brique

Procédure pour écrire une brique. Le format est défini par `src/core/schema.ts`, les
règles pédagogiques par `docs/pedagogie.md`, le gabarit par
`src/content/briques/fr/donnees/bit.md`.

## 1. Cadrer

- Nomme la notion en une phrase. Si la phrase contient « et », scinde en deux briques.
- Écris 1 à 3 `acquis`, chacun avec un verbe d'action observable (calculer, dérouler,
  reconnaître, corriger).
- Liste les termes techniques que la brique emploie. Chacun est défini dans la brique ou
  acquis par une brique de `requiert` : complète `requiert` en conséquence, et seulement
  ainsi.
- Choisis le `niveau` : `bas` (la machine), `moyen` (le système), `haut` (les abstractions).
- Choisis l'identifiant `<domaine>/<brique>` : il devient définitif à la publication.

## 2. Concevoir la manipulation

- Cherche d'abord un widget existant dans `src/core/widgets.ts`. Pour dérouler un
  procédé étape par étape, utilise `pas-a-pas`.
- Formule la `consigne` comme une question précise que l'apprenant résout en agissant.
- Avec `pas-a-pas` : une étape montre un seul changement, sa `legende` tient en une phrase.
- Si aucun widget ne convient, propose-le dans `TODO.md` et arrête-toi là.

## 3. Écrire l'explication

- Commence par nommer ce que l'apprenant vient d'observer dans la manipulation.
- Donne ensuite le terme technique, puis la forme générale.
- Tiens en 150 mots ; chaque phrase sert un `acquis`.
- Écris le `resume` en 40 mots au plus, lisible sans la page : il sert de rappel ailleurs.

## 4. Écrire les exercices

- Écris 2 à 5 exercices, du plus guidé au plus autonome.
- Fais vérifier chaque `acquis` par au moins un exercice ; chaque exercice vise un `acquis`.
- Change les valeurs ou le contexte par rapport à l'explication : la réponse se construit,
  elle ne se recopie pas.
- Place au moins un exercice dans un contexte différent de celui de la manipulation.
- Fais prédire un résultat dans au moins un exercice.
- Rédige chaque énoncé pour qu'il se comprenne seul, sans « comme ci-dessus ».
- `choix` : trois options ; chaque mauvaise option vient d'une erreur typique de débutant,
  et son `retour` nomme cette erreur et donne la raison de la bonne réponse.
- `saisie` et `widget` : donne la `solution`, des `contre_exemples` tirés d'erreurs
  typiques, et un `retour` qui explique le raisonnement.
- Inclus au moins un exercice `choix` ou `saisie`.

## 5. Brancher et vérifier

- Ajoute la brique aux `cibles` d'un parcours (`src/content/parcours/<langue>/`), sauf si
  une brique déjà ciblée la requiert.
- Lance `npm run verify`, puis `npm run e2e`, et corrige jusqu'au vert.
- Ouvre la page de la brique, joue la manipulation et les exercices une fois en entier.
- Fais relire la brique selon `docs/fabrique/relire-brique.md` par un agent qui ne l'a
  pas écrite.

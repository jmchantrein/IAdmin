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
  Pose une question dont la réponse se trouve en déroulant (prédire la suite, compter).
- Énonce la règle du procédé pour tous les cas, y compris les cas limites (égalité,
  dernier élément).
- Si aucun widget ne convient, propose-le dans `TODO.md` et arrête-toi là.

## 3. Écrire l'explication

- Commence par nommer ce que l'apprenant vient réellement de faire ou d'observer dans la
  manipulation.
- Donne ensuite le terme technique, puis la forme générale.
- Tiens en 150 mots ; chaque phrase sert un `acquis`.
- Emploie chaque mot dans un seul sens d'un bout à l'autre de la brique et des briques
  qu'elle requiert (valeur, cas, tenir, place).
- Définis chaque mot avant son premier emploi, légendes de la manipulation comprises : la
  manipulation fait observer la notion, l'explication la nomme.
- Écris les textes imposés par une correction dans le budget : coupe ailleurs une phrase
  entière plutôt que d'abréger toutes les autres. Une raison ne se coupe pas : elle passe
  en note de survol.
- Borne chaque affirmation à ce qui la rend vraie (« un texte noté en ASCII occupe un
  octet par caractère », pas « un texte occupe un octet par caractère »).
- Écris le `resume` en 40 mots au plus, lisible sans la page : il sert de rappel ailleurs.

### Relier, justifier, montrer

- Lie la première mention de chaque notion vue dans une brique requise :
  `[bit](brique:donnees/bit)`. L'apprenant y lit le rappel au survol.
- Donne la raison de chaque convention (« un octet compte 8 bits »). Si elle tient en une
  phrase simple, écris-la dans l'explication.
- Refais le calcul que l'apprenant sait déjà faire avant d'écrire une raison chiffrée :
  « 6 bits ne suffisent pas » ne dit pas pourquoi 8 plutôt que 7. Dis ce qui relève d'un
  choix, et qui l'a fait.
- Écarte la raison qui tourne en rond (« elle doit s'arrêter, car elle s'arrête
  toujours ») : une raison dit ce qui se passerait autrement.
- Si la raison alourdit l'explication, place-la dans une note de survol,
  `[8 bits](note "…")`, en 40 mots au plus, ou dans une entrée `plus_loin` (une question,
  une réponse de 80 mots au plus).
- Le budget de 150 mots compte le texte lu d'emblée : les notes et les textes alternatifs
  ont leur propre budget.
- Garde dans l'explication tout ce qu'un exercice demande : une note ou une entrée
  `plus_loin` complète, elle ne porte rien d'indispensable.
- Vérifie par une recherche chaque affirmation historique ou chiffrée, et donne l'adresse
  de sa `source` dans l'entrée `plus_loin`. Ouvre la page : un extrait de résultat de
  recherche ne suffit pas. Si la page ne s'ouvre pas, dis-le dans ton compte rendu.
- Remplace par un schéma toute phrase qu'un dessin dit mieux, en suivant
  `docs/fabrique/dessiner.md`, puis supprime cette phrase.

## 4. Écrire les exercices

- Écris 2 à 5 exercices, du plus guidé au plus autonome.
- Fais vérifier chaque `acquis` par au moins un exercice ; chaque exercice vise un `acquis`.
- Change les valeurs ou le contexte par rapport à l'explication : la réponse se construit,
  elle ne se recopie pas.
- Place au moins un exercice dans un contexte différent de celui de la manipulation.
- Fais prédire un résultat dans au moins un exercice.
- Rédige chaque énoncé pour qu'il se comprenne seul, sans « comme ci-dessus » ni « le
  même procédé » : rappelle la règle en une phrase.
- Vérifie que l'exercice oblige à exercer son `acquis` : aucun raccourci ne donne la réponse.
- Une réponse vérifiée par `nombre` s'écrit en chiffres ; l'interface le précise à l'apprenant.
- Quand deux formes de réponse sont défendables (un nombre ou son écriture binaire),
  demande explicitement celle que tu vérifies.
- Choisis des valeurs que leurs erreurs typiques ne redonnent pas : évite les
  palindromes (`101`, `1001`) dès que l'ordre des chiffres compte.
- Prends des valeurs hors de portée du widget de la manipulation, qui reste sous les
  yeux pendant les exercices, et différentes des exemples résolus des briques requises.
  Quand le widget sait tout calculer (un code, une empreinte, une sortie), pose une
  situation à traduire, une table fictive donnée par l'énoncé ou un cas hors de sa portée.
- Demande au moins une fois ce que seule la méthode enseignée produit (la rangée des
  retenues, la carte comparée ensuite), quand une autre voie mène à la même réponse.
- Une réponse qui vaut 0 ou 1 se devine une fois sur deux : préfère un `choix` dont
  chaque option porte une raison, ou une suite de plusieurs valeurs.
- Nomme l'élément du widget sans ambiguïté (« la lampe NON », pas « la lampe »).
- Écris les options d'un `choix` dans l'ordre que tu veux : l'interface les mélange.
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

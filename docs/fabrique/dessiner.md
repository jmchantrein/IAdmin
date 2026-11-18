# Dessiner un schéma

Charte des schémas d'une brique. Un schéma remplace du texte : il montre ce qu'une
phrase décrirait moins bien. Le test de contenu vérifie les règles techniques ; le
relecteur et l'orchestrateur vérifient le reste sur capture d'écran.

## Décider

- Dessine quand la notion a une forme : une rangée, un avant et un après, un découpage,
  un trajet, une comparaison.
- Garde le texte quand il s'agit d'une définition ou d'une raison.
- Supprime la phrase que le schéma remplace : le dessin ne s'ajoute pas au texte.
- Limite-toi à 2 schémas par brique, chacun pour une seule idée.
- Laisse la manipulation interactive au widget : le schéma fixe ce que l'apprenant vient
  d'y observer.

## Composer

- Travaille dans un cadre de 640 de large (`viewBox="0 0 640 H"`, `H` de 480 au plus),
  sur une grille de 8.
- Pose chaque étiquette sur l'élément qu'elle nomme, ou reliée à lui par un trait court.
- Écris 25 mots au plus dans le dessin, en corps 22 à 32 : un téléphone affiche le cadre à
  moitié taille, un corps 22 y fait 11 pixels.
- Empile plutôt qu'étaler : une étiquette longue passe sur deux lignes ou au-dessus de sa
  forme, une suite de plus de quatre blocs se plie en deux rangées.
- Emploie les mots de l'explication, dans le même sens.
- Fais lire de gauche à droite et de haut en bas ; indique un ordre par des numéros.
- Réserve la couleur d'accent à l'élément dont parle la brique ; laisse le reste en trait.
- Montre un changement par deux états côte à côte, reliés par une flèche.

## Planche dessinée

- Emploie une planche pour une situation : quelqu'un a un problème, essaie, obtient un
  résultat.
- Tiens en 2 ou 3 cases, lues de gauche à droite, chacune avec une seule action.
- Écris 12 mots au plus par bulle.
- Dessine les personnages par des formes simples, identiques d'une case à l'autre.

## Écrire le fichier

- Nomme le fichier `<brique>.<nom>.svg`, à côté de la brique, et appelle-le dans
  l'explication par `![Texte alternatif](schema:nom)`.
- Rédige le texte alternatif pour quelqu'un qui ne voit pas le dessin : il dit ce que le
  schéma montre, en 30 mots au plus.
- Emploie seulement `svg g path rect circle ellipse line polyline polygon text tspan
defs marker`.
- Donne les couleurs par les classes du site, jamais par une couleur écrite : `trait`,
  `plein`, `fond`, `accent`, `accent-plein`, `ok`, `ok-plein`, `ko`, `ko-plein`, `doux`,
  `doux-plein`, `texte`, `texte-doux`, `texte-accent`. Le schéma suit ainsi le thème clair
  ou sombre.
- Laisse la racine sans `width` ni `height` : le schéma prend la largeur du texte.
- Donne un `font-size` à chaque `<text>`, sur lui ou sur un `<g>` parent.
- Compte un trait de 2 unités du cadre : il s'épaissit et s'affine avec le dessin.
- Vise seulement un `id` du même fichier dans une référence `url(#…)`.

## Vérifier

- Lance `npm run verify` : il contrôle la charte technique.
- Lance `node scripts/apercu-schema.mjs <fichier.svg>` : il rend le schéma avec les styles
  du site, sans construire le site, en téléphone sombre et en bureau clair
  (`test-results/apercus/`). Regarde les deux images.
- Regarde la capture de la page et la capture `…-telephone-sombre.png` (360 px, thème
  sombre) : rien ne se chevauche, chaque mot se lit sans zoom.
- Cache le texte de l'explication : le schéma se comprend-il avec ses seules étiquettes ?

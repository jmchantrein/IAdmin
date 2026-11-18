---
titre: Lire un nombre binaire
resume: Un nombre binaire est une suite de bits où chaque bit a un poids. De droite à gauche, les poids valent 1, 2, 4, 8, etc. Le nombre vaut la somme des poids des bits à 1.
niveau: bas
acquis:
  - Donner le poids de chaque bit d'un nombre binaire.
  - Calculer la valeur d'un nombre binaire de quelques bits.
requiert:
  - donnees/combinaisons
manipulation:
  consigne: Chaque interrupteur allumé ajoute son poids au total. Quels interrupteurs faut-il allumer pour obtenir un total de 5 ? Y a-t-il plusieurs façons ?
  widget: bascule-bits
  params: { bits: 4, poids: true }
exercices:
  - type: saisie
    consigne: Dans le nombre binaire 110, les poids des bits sont 4, 2 et 1, de gauche à droite. Les bits à 1 sont ceux de poids 4 et de poids 2. Combien vaut 110 ?
    verif: [rogner, { nombre: 6 }]
    solution: '6'
    contre_exemples: ['110', '2', '7', '3']
    retour: Additionne seulement les poids des bits à 1, ici 4 et 2. Le bit de droite est à 0, son poids 1 ne compte pas.
  - type: choix
    consigne: Dans un nombre binaire de 5 bits, quel est le poids du bit le plus à gauche ?
    options:
      - texte: '16'
        correct: true
      - texte: '5'
        retour: Le poids d'un bit n'est pas sa place dans la suite. En partant de la droite, les poids doublent à chaque place, ce qui donne 1, 2, 4, 8, puis 16 pour le cinquième bit.
      - texte: '32'
        retour: 32 est le nombre de combinaisons de 5 bits, pas le poids du bit de gauche. Le bit de droite pèse 1, et en doublant quatre fois tu arrives à 16.
  - type: saisie
    consigne: Combien vaut le nombre binaire 11000 ? De droite à gauche, les poids des bits sont 1, 2, 4, 8 et 16.
    verif: [rogner, { nombre: 24 }]
    solution: '24'
    contre_exemples: ['3', '11000', '2', '12']
    retour: Les poids se lisent de droite à gauche. Dans 11000, les bits à 1 sont les deux bits de gauche, de poids 16 et 8. Les trois bits de droite sont à 0 et n'ajoutent rien.
  - type: saisie
    consigne: Cinq cases d'une grille notent un nombre binaire, une case cochée valant 1 et une case vide 0. De gauche à droite, les cases sont cochée, vide, vide, cochée, cochée. Combien vaut ce nombre ?
    verif: [rogner, { nombre: 19 }]
    solution: '19'
    contre_exemples: ['25', '3', '10011', '7']
    retour: Les cases écrivent 10011. De droite à gauche, les poids sont 1, 2, 4, 8 et 16. Additionne les poids des cases cochées, sans compter ceux des deux cases vides.
  - type: choix
    consigne: Tu ajoutes un 0 à droite du nombre binaire 11, qui devient 110. Que devient sa valeur ?
    options:
      - texte: Elle double.
        correct: true
      - texte: Elle ne change pas.
        retour: Le 0 n'ajoute aucun poids, mais il décale les deux 1 d'une place vers la gauche. Chacun prend alors un poids double, et 11, qui valait 3, devient 110, qui vaut 6.
      - texte: Elle est multipliée par dix.
        retour: C'est ce qui se passe dans notre écriture habituelle, où chaque place vaut dix fois la précédente. En binaire, chaque place vaut seulement le double de la précédente.
---

Pour obtenir 5, tu as allumé les poids 4 et 1, sans trouver d'autre façon. Chaque
[combinaison](brique:donnees/combinaisons) de [bits](brique:donnees/bit) donne un total
différent.

C'est ainsi qu'une machine écrit les nombres, en **binaire** : une suite de bits où
chaque bit a un **poids**. Le bit de droite pèse 1, et chaque poids vers la gauche
double. Pour lire le nombre, additionne les poids des bits à 1 :

![Le nombre 1001 dans quatre cases, avec sous chaque bit son poids : 8, 4, 2, 1. Les bits à 1 pèsent 8 et 1, et 8 + 1 = 9.](schema:poids)

Pourquoi doubler ? Les poids de droite, réunis, font un de moins que le suivant :
1 + 2 = 3, puis 4. Chaque total s'écrit ainsi d'une
[seule façon](note "Avec un poids 3 à la place du 4, le total 3 s'écrirait de deux façons : 1 + 2, ou 3 seul. Avec un poids 5, le total 4 serait impossible à écrire."),
sans trou.

On part de la droite, car ce bit pèse 1 dans tout nombre. Le plus lourd est à gauche,
comme nos milliers.

Un bit à 0 n'ajoute rien, mais garde sa place : `10` vaut 2 et `100` vaut 4. Comme les
zéros de cent, il décale le 1 vers une place plus lourde.

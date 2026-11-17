---
titre: Lire un nombre binaire
resume: Dans un nombre binaire, chaque bit a un poids. De droite à gauche, les poids valent 1, 2, 4, 8, chacun le double du précédent. La valeur du nombre est la somme des poids des bits à 1.
niveau: bas
acquis:
  - Donner le poids de chaque bit d'un nombre binaire.
  - Calculer la valeur d'un nombre binaire de quelques bits.
requiert:
  - donnees/combinaisons
manipulation:
  consigne: Chaque interrupteur allumé ajoute son poids au total. Quels interrupteurs faut-il allumer pour obtenir un total de 5 ?
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
        retour: Le poids d'un bit n'est pas son rang. En partant de la droite, les poids doublent à chaque rang, ce qui donne 1, 2, 4, 8, puis 16 pour le cinquième bit.
      - texte: '32'
        retour: 32 est le poids d'un sixième bit. Le bit de droite pèse 1, pas 2. En doublant quatre fois, tu arrives à 16.
  - type: saisie
    consigne: Combien vaut le nombre binaire 1100 ? De droite à gauche, les poids des bits sont 1, 2, 4 et 8.
    verif: [rogner, { nombre: 12 }]
    solution: '12'
    contre_exemples: ['3', '1100', '2', '6']
    retour: Les poids se lisent de droite à gauche. Dans 1100, les bits à 1 sont les deux bits de gauche, de poids 8 et 4. Les deux bits de droite sont à 0 et n'ajoutent rien.
  - type: saisie
    consigne: Quatre lampes affichent un nombre binaire, une lampe allumée valant 1 et une lampe éteinte 0. De gauche à droite, elles sont allumée, éteinte, allumée, allumée. Quel nombre affichent-elles ?
    verif: [rogner, { nombre: 11 }]
    solution: '11'
    contre_exemples: ['13', '3', '1011', '7']
    retour: Les lampes écrivent 1011. De droite à gauche, les poids sont 1, 2, 4 et 8. Additionne les poids des lampes allumées, sans compter celui de la lampe éteinte, qui pèse 4.
  - type: choix
    consigne: Tu ajoutes un 0 à droite du nombre binaire 11, qui devient 110. Que devient sa valeur ?
    options:
      - texte: Elle double.
        correct: true
      - texte: Elle ne change pas.
        retour: Le 0 n'ajoute aucun poids, mais il décale les deux 1 d'un rang vers la gauche. Chacun prend alors un poids double, et 11, qui valait 3, devient 110, qui vaut 6.
      - texte: Elle est multipliée par 10.
        retour: C'est ce qui se passe dans notre écriture habituelle, où chaque rang vaut dix fois le précédent. En binaire, chaque rang vaut seulement le double du précédent.
---

Pour obtenir 5, tu as allumé les interrupteurs de poids 4 et 1. Aucune autre combinaison
ne donne ce total.

C'est ainsi qu'une machine écrit les nombres, en **binaire** : une suite de bits où
chaque bit a un **poids**. Les poids se lisent de droite à gauche : 1, 2, 4, 8, et ainsi
de suite. Chaque poids est le double du précédent.

Pour lire un nombre binaire, additionne les poids des bits à 1. Par exemple, `1010`
vaut 8 + 2, soit 10.

Un bit à 0 n'ajoute rien, mais il garde sa place : `10` vaut 2 et `100` vaut 4. C'est
la même idée que dans notre écriture habituelle, où le zéro de 10 et les zéros de 100
décalent le 1 vers un rang plus lourd.

Avec 4 bits, les 16 combinaisons écrivent les nombres de 0 à 15.

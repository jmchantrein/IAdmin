---
titre: Écrire un nombre en binaire
resume: Pour écrire un nombre en binaire, on parcourt les poids du plus grand au plus petit. Si le poids tient dans ce qui reste, on écrit 1 et on le retire ; sinon on écrit 0.
niveau: bas
acquis:
  - Décomposer un nombre en une somme de poids pris parmi 16, 8, 4, 2 et 1.
  - Écrire en binaire un nombre inférieur à 32.
requiert:
  - donnees/binaire-lire
manipulation:
  consigne: Comment écrire 13 en binaire ? À partir du poids 4, devine avant chaque clic si le poids tient dans ce qui reste.
  widget: pas-a-pas
  params:
    etapes:
      - legende: 'Tu veux écrire 13 : le poids 16 dépasse 13, tu pars donc du poids 8.'
        cases: ['16', '8', '4', '2', '1']
        actifs: [1]
        ecartes: [0]
      - legende: 'Le poids 8 tient dans 13 : tu écris 1 sous ce poids, et il reste 5.'
        cases: ['16', '8', '4', '2', '1']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: '1' }
      - legende: 'Le poids 4 tient dans 5 : tu écris 1, et il reste 1.'
        cases: ['16', '8', '4', '2', '1']
        actifs: [2]
        ecartes: [0]
        etiquettes: { 1: '1', 2: '1' }
      - legende: 'Le poids 2 ne tient pas dans 1 : tu écris 0, et il reste toujours 1.'
        cases: ['16', '8', '4', '2', '1']
        actifs: [3]
        ecartes: [0]
        etiquettes: { 1: '1', 2: '1', 3: '0' }
      - legende: 'Le poids 1 tient dans 1 : tu écris 1, et il ne reste rien.'
        cases: ['16', '8', '4', '2', '1']
        actifs: [4]
        ecartes: [0]
        etiquettes: { 1: '1', 2: '1', 3: '0', 4: '1' }
      - legende: "Tu lis de gauche à droite les chiffres écrits sous les poids : 13 s'écrit 1101."
        cases: ['16', '8', '4', '2', '1']
        ecartes: [0]
        etiquettes: { 1: '1', 2: '1', 3: '0', 4: '1' }
exercices:
  - type: saisie
    consigne: Tu écris 12 en binaire avec les poids 8, 4, 2 et 1. Le poids 8 tient dans 12, il reste 4. Le poids 4 tient dans 4, il ne reste rien. Les poids 2 et 1 ne tiennent pas dans ce reste. Quelle est l'écriture binaire de 12 ?
    verif: [sans_espaces, { regex: '0*1100' }]
    solution: '1100'
    contre_exemples: ['0011', '12', '1010', '11']
    retour: Écris un chiffre par poids, de gauche à droite. Tu écris 1 quand le poids tient et 0 quand il ne tient pas. Ici, les poids 8 et 4 tiennent, les poids 2 et 1 ne tiennent pas.
  - type: widget
    consigne: Affiche le nombre 14 en allumant les bons bits. De gauche à droite, les bits pèsent 8, 4, 2 et 1.
    widget: bascule-bits
    params: { bits: 4 }
    verif: [{ egal: '1110' }]
    solution: '1110'
    contre_exemples: ['0111', '1101', '1010']
    retour: Pars du plus grand poids. Le poids 8 tient dans 14, il reste 6. Le poids 4 tient dans 6, il reste 2. Le poids 2 tient, et il ne reste rien pour le poids 1.
  - type: choix
    consigne: Quelle est l'écriture binaire de 16 ?
    options:
      - texte: '10000'
        correct: true
      - texte: '1111'
        retour: 1111 vaut 8 + 4 + 2 + 1, soit 15. Il manque 1. Comme 16 est lui-même un poids, son écriture n'a qu'un seul bit à 1.
      - texte: '100000'
        retour: 100000 vaut 32, il y a un zéro de trop. Le poids 16 se trouve à la cinquième place en partant de la droite, il faut donc cinq chiffres.
  - type: saisie
    consigne: Écris le nombre 22 en binaire.
    verif: [sans_espaces, { regex: '0*10110' }]
    solution: '10110'
    contre_exemples: ['01101', '10101', '22', '1011']
    retour: Pars du plus grand poids qui ne dépasse pas 22, c'est 16, et il reste 6. Le poids 8 ne tient pas dans 6. Le poids 4 tient, il reste 2. Termine avec les poids 2 et 1, puis lis les chiffres de gauche à droite.
  - type: saisie
    consigne: Une rangée de 5 lampes affiche un nombre en binaire, une lampe allumée valant 1. Les lampes pèsent 16, 8, 4, 2 et 1. Combien de lampes sont allumées quand la rangée affiche 19 ?
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['2', '5', '4', '19']
    retour: Décompose d'abord 19. Le poids 16 tient, il reste 3. Les poids 8 et 4 ne tiennent pas dans 3. Le poids 2 tient, il reste 1, et le poids 1 tient. Compte ensuite les poids retenus.
---

Tu viens d'écrire 13 en [binaire](brique:donnees/binaire-lire) en te demandant, pour
chaque [poids](brique:donnees/binaire-lire), s'il tient dans ce qui reste. Tu as ainsi
**décomposé** 13 en une somme de poids :

![Écriture de 13 en binaire : le reste passe de 13 à 5, puis à 1. Les poids 8, 4 et 1 tiennent, d'où 1101.](schema:decomposition)

1. Pars du plus grand poids qui ne dépasse pas le nombre.
2. Si le poids ne dépasse pas ce qui reste, il tient : écris 1 et retire-le. Sinon,
   écris 0.
3. Passe au poids suivant, deux fois plus petit, et recommence l'étape 2 jusqu'au
   poids 1 compris.

Pourquoi le plus grand d'abord ? Les poids plus petits, même réunis, font un de moins
que lui : s'il tient, rien ne le remplace.

Lus de gauche à droite, dans l'ordre où tu les as écrits, les chiffres forment
l'écriture binaire. Pour vérifier, additionne les poids des bits à 1.

Un nombre qui est lui-même un poids s'écrit avec un seul 1 suivi de 0 : 8 s'écrit
`1000`. Le nombre 0 s'écrit `0`.

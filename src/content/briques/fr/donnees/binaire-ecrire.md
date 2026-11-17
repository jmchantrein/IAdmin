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
  consigne: Comment écrire 13 en binaire ? Avant chaque clic sur « Suivant », devine si le poids suivant tient dans ce qui reste.
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu veux écrire 13, et tu commences par le plus grand poids qui ne dépasse pas 13.
        cases: ['8', '4', '2', '1']
        actifs: [0]
      - legende: 'Le poids 8 tient dans 13 : tu écris 1 sous ce poids, et il reste 5.'
        cases: ['8', '4', '2', '1']
        actifs: [0]
        etiquettes: { 0: '1' }
      - legende: 'Le poids 4 tient dans 5 : tu écris 1, et il reste 1.'
        cases: ['8', '4', '2', '1']
        actifs: [1]
        etiquettes: { 0: '1', 1: '1' }
      - legende: 'Le poids 2 ne tient pas dans 1 : tu écris 0, et il reste toujours 1.'
        cases: ['8', '4', '2', '1']
        actifs: [2]
        etiquettes: { 0: '1', 1: '1', 2: '0' }
      - legende: 'Le poids 1 tient dans 1 : tu écris 1, et il ne reste rien.'
        cases: ['8', '4', '2', '1']
        actifs: [3]
        etiquettes: { 0: '1', 1: '1', 2: '0', 3: '1' }
      - legende: Tu lis de gauche à droite les chiffres écrits sous les poids, et tu obtiens 1101.
        cases: ['8', '4', '2', '1']
        ecartes: [2]
        etiquettes: { 0: '1', 1: '1', 2: '0', 3: '1' }
exercices:
  - type: saisie
    consigne: Tu écris 6 en binaire avec les poids 4, 2 et 1. Le poids 4 tient dans 6, il reste 2. Le poids 2 tient dans 2, il ne reste rien. Le poids 1 ne tient pas dans ce reste. Quelle est l'écriture binaire de 6 ?
    verif: [sans_espaces, { regex: '0*110' }]
    solution: '110'
    contre_exemples: ['011', '6', '101', '111']
    retour: Écris un chiffre par poids, de gauche à droite. Tu écris 1 quand le poids tient et 0 quand il ne tient pas. Ici, les poids 4 et 2 tiennent, le poids 1 ne tient pas.
  - type: widget
    consigne: Affiche le nombre 10 en allumant les bons bits. De gauche à droite, les bits pèsent 8, 4, 2 et 1.
    widget: bascule-bits
    params: { bits: 4 }
    verif: [{ egal: '1010' }]
    solution: '1010'
    contre_exemples: ['0101', '1100', '0010']
    retour: Pars du plus grand poids. Le poids 8 tient dans 10, il reste 2. Le poids 4 ne tient pas dans 2. Le poids 2 tient, et il ne reste rien pour le poids 1.
  - type: choix
    consigne: Quelle est l'écriture binaire de 16 ?
    options:
      - texte: '10000'
        correct: true
      - texte: '1111'
        retour: 1111 vaut 8 + 4 + 2 + 1, soit 15. Il manque 1. Comme 16 est lui-même un poids, son écriture n'a qu'un seul bit à 1.
      - texte: '1000'
        retour: 1000 vaut 8. Le poids 16 se trouve au cinquième rang en partant de la droite, il faut donc cinq chiffres.
  - type: saisie
    consigne: Écris le nombre 21 en binaire. Les poids utiles sont 16, 8, 4, 2 et 1.
    verif: [sans_espaces, { regex: '0*10101' }]
    solution: '10101'
    contre_exemples: ['10110', '11001', '21', '1101']
    retour: Pars du plus grand poids. Le poids 16 tient dans 21, il reste 5. Le poids 8 ne tient pas dans 5. Le poids 4 tient, il reste 1. Termine avec les poids 2 et 1.
  - type: saisie
    consigne: Une rangée de 5 lampes affiche un nombre en binaire, une lampe allumée valant 1. Les lampes pèsent 16, 8, 4, 2 et 1. Combien de lampes sont allumées quand la rangée affiche 19 ?
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['2', '5', '4', '19']
    retour: Décompose d'abord 19. Le poids 16 tient, il reste 3. Les poids 8 et 4 ne tiennent pas dans 3. Le poids 2 tient, il reste 1, et le poids 1 tient. Compte ensuite les poids retenus.
---

Tu viens d'écrire 13 en binaire en te posant la même question pour chaque poids :
tient-il dans ce qui reste ?

Voici la méthode en entier :

1. Pars du plus grand poids qui ne dépasse pas le nombre.
2. Si le poids tient dans ce qui reste, écris 1 et retire-le. Sinon, écris 0.
3. Passe au poids suivant, deux fois plus petit, et recommence l'étape 2 jusqu'au
   poids 1 compris.

Tu obtiens un chiffre par poids. Lus de gauche à droite, ils forment l'écriture
binaire du nombre.

Pour vérifier, relis le résultat : `1101` vaut 8 + 4 + 1, soit 13.

Un nombre qui est lui-même un poids s'écrit avec un seul 1 suivi de 0 : 8 s'écrit
`1000`. Le nombre 0 s'écrit simplement `0`.

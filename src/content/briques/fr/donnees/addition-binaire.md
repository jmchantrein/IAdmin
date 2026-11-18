---
titre: Additionner en binaire
resume: 'On additionne deux nombres binaires colonne par colonne, depuis la droite. Une colonne qui atteint 2 donne 0, et 1 reporté dans la colonne suivante, à gauche : la retenue. Une colonne qui atteint 3 donne 1, et une retenue.'
niveau: bas
acquis:
  - Additionner deux nombres binaires de quelques bits en posant l'addition depuis la colonne de droite.
  - Écrire le chiffre et la retenue d'une colonne qui atteint 2 ou 3.
  - Prévoir quand une retenue ajoute un chiffre au résultat.
requiert:
  - donnees/binaire-ecrire
manipulation:
  consigne: Combien font 1011 + 1110 en binaire ? Avant chaque clic, devine le chiffre qui va s'écrire.
  widget: pas-a-pas
  params:
    colonnes: 6
    etapes:
      - legende: Tu poses 1011 au-dessus de 1110, chaque bit au-dessus du bit de même poids.
        cases:
          [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '',
            '',
            '',
            '',
          ]
      - legende: 'Colonne de droite, celle du poids 1 : 1 + 0 = 1, tu écris 1 dessous.'
        cases:
          [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '',
            '',
            '',
            '1',
          ]
        actifs: [11, 17, 23]
      - legende: "Colonne du poids 2 : 1 + 1 = 2, qui s'écrit 10 en binaire ; tu écris seulement le 0 dessous."
        cases:
          [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '',
            '',
            '0',
            '1',
          ]
        actifs: [10, 16, 22]
      - legende: Le 1 de 10 monte en haut de la colonne suivante, celle du poids 4.
        cases:
          [
            '',
            '',
            '',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '',
            '',
            '0',
            '1',
          ]
        actifs: [3]
      - legende: "Colonne du poids 4 : le 1 monté, plus 0 et 1, fait 2, qui s'écrit 10 ; tu écris 0 dessous."
        cases:
          [
            '',
            '',
            '',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '',
            '0',
            '0',
            '1',
          ]
        actifs: [3, 9, 15, 21]
      - legende: Le 1 de ce nouveau 10 monte en haut de la colonne du poids 8.
        cases:
          [
            '',
            '',
            '1',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '',
            '0',
            '0',
            '1',
          ]
        actifs: [2]
      - legende: "Colonne du poids 8 : 1 + 1 + 1 = 3, qui s'écrit 11 ; tu écris un 1 dessous."
        cases:
          [
            '',
            '',
            '1',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '1',
            '0',
            '0',
            '1',
          ]
        actifs: [2, 8, 14, 20]
      - legende: L'autre 1 de 11 monte en haut de la colonne du poids 16.
        cases:
          [
            '',
            '1',
            '1',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '',
            '1',
            '0',
            '0',
            '1',
          ]
        actifs: [1]
      - legende: "Colonne du poids 16 : il n'y a que le 1 monté, tu l'écris dessous."
        cases:
          [
            '',
            '1',
            '1',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '1',
            '1',
            '0',
            '0',
            '1',
          ]
        actifs: [1, 19]
      - legende: 'Tu lis le résultat, 11001 : il vaut 16 + 8 + 1 = 25, soit 11 + 14.'
        cases:
          [
            '',
            '1',
            '1',
            '1',
            '',
            '',
            '',
            '',
            '1',
            '0',
            '1',
            '1',
            '+',
            '',
            '1',
            '1',
            '1',
            '0',
            '',
            '1',
            '1',
            '0',
            '0',
            '1',
          ]
        actifs: [19, 20, 21, 22, 23]
exercices:
  - type: saisie
    consigne: "Tu additionnes 0111 et 0011 en binaire, colonne par colonne depuis la droite. Dans la colonne de droite, 1 + 1 = 2, qui s'écrit 10 : tu écris 0 et tu retiens 1 pour la colonne suivante, à gauche. Termine l'addition. Quel résultat obtiens-tu, en 4 chiffres ?"
    verif: [sans_espaces, { parmi: ['1010', '01010'] }]
    solution: '1010'
    contre_exemples: ['0100', '0122', '1000', '10']
    retour: "Ajoute à chaque colonne la retenue venue de sa droite. Colonne du poids 2 : 1 + 1 + 1 = 3, qui s'écrit 11, tu écris 1 et tu retiens 1. Colonne du poids 4 : 1 + 0 + 1 = 2, tu écris 0 et tu retiens 1. Colonne du poids 8 : il reste la retenue, tu écris 1. Vérifie : 7 + 3 = 10, et 1010 vaut 8 + 2."
  - type: choix
    consigne: Dans une colonne d'une addition binaire, il y a en haut une retenue 1, puis les chiffres 1 et 1. Que fais-tu pour cette colonne ?
    options:
      - texte: Tu écris 1 dessous et tu retiens 1.
        correct: true
      - texte: Tu écris 3 dessous.
        retour: Un bit ne vaut que 0 ou 1, tu ne peux pas écrire 3 dans une colonne. Or 3 s'écrit 11 en binaire. Tu écris donc 1 dessous et tu retiens 1.
      - texte: Tu écris 0 dessous et tu retiens 1.
        retour: C'est ce que tu fais quand la colonne atteint 2. Ici, elle compte trois 1, soit 3, qui s'écrit 11. Tu écris donc 1 dessous, et tu retiens 1.
  - type: saisie
    consigne: Les nombres binaires 1100 et 1010 ont chacun 4 chiffres. Sans poser toute l'addition, prédis combien de chiffres a leur somme en binaire.
    verif: [rogner, { nombre: 5 }]
    solution: '5'
    contre_exemples: ['4', '8', '2']
    retour: "Regarde la colonne la plus à gauche, celle du poids 8 : elle contient 1 et 1, elle atteint donc au moins 2. Sa retenue n'a plus de colonne où monter : elle descend dans le résultat, qui gagne un chiffre. Vérifie : 12 + 10 = 22, qui s'écrit 10110."
  - type: saisie
    consigne: Un capteur compte des passages en binaire. Il en a compté 1011 le matin et 1101 l'après-midi. Écris en binaire le total de la journée.
    verif: [sans_espaces, { parmi: ['11000', '011000'] }]
    solution: '11000'
    contre_exemples: ['0110', '2112', '10000', '1000', '24']
    retour: "Pose l'addition depuis la droite. Les trois premières colonnes atteignent 2 : tu écris 0 et tu retiens 1 à chaque fois. La colonne du poids 8 fait 1 + 1 + 1 = 3 : tu écris 1 et tu retiens 1. Cette dernière retenue descend dans le résultat. Vérifie : 11 + 13 = 24, et 11000 vaut 16 + 8."
  - type: choix
    consigne: Tu additionnes 0101 et 0011 en commençant par la colonne de gauche. Tu as déjà écrit 0, puis 1, puis 1. Dans la colonne de droite, tu trouves 1 + 1. Pourquoi ton résultat va-t-il être faux ?
    options:
      - texte: La retenue de cette colonne doit s'ajouter à une colonne déjà écrite.
        correct: true
      - texte: 1 + 1 donne 2, et un nombre binaire ne peut pas contenir 2.
        retour: "1 + 1 = 2 s'écrit 10 : tu écris 0 et tu retiens 1, comme dans toute colonne qui atteint 2. Le problème vient de l'ordre. Cette retenue part vers la gauche, dans une colonne où tu as déjà écrit un chiffre."
      - texte: Un nombre binaire se lit de droite à gauche.
        retour: Un nombre binaire se lit de gauche à droite, comme les nombres habituels ; seuls les poids se comptent depuis la droite. Le problème vient de la retenue. Elle part vers la gauche, dans une colonne où tu as déjà écrit un chiffre.
---

Tu as posé l'addition comme à l'école, mais en [binaire](brique:donnees/binaire-lire) :
les bits de même poids l'un sous l'autre, colonne par colonne depuis la droite.

Quand une colonne atteint 2, tu écris 0 et tu reportes 1 en haut de la colonne
suivante, à gauche. Ce 1 s'appelle une **retenue** : on dit qu'on _retient_ 1.

Pourquoi ? Un [bit](brique:donnees/bit) ne vaut que 0 ou 1 : tu ne peux pas écrire 2
dans une colonne. Or deux fois un poids font le poids suivant, et 2
[s'écrit `10`](brique:donnees/binaire-ecrire). L'addition habituelle fait de même,
avec une retenue dès que la colonne atteint 10.

Avec sa retenue, une colonne peut compter trois 1. Comme 3 s'écrit `11`, tu écris 1
et tu retiens 1.

![L'addition 111 + 101 posée en colonnes donne 1100. Une retenue 1 est écrite en haut des colonnes des poids 2, 4 et 8 ; la dernière descend dans le résultat.](schema:retenues)

On part de la droite parce que la retenue va vers la gauche. En partant de la gauche,
une retenue arrivée après coup changerait un chiffre déjà écrit.

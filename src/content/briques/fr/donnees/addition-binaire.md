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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
        actifs: [1, 19]
      - legende: "Tu lis le résultat sous le trait, 11001 : il vaut 16 + 8 + 1 = 25, soit 11 + 14 ; la rangée du haut ne contient que les 1 montés, ce n'est pas un nombre à additionner."
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
        etiquettes: { 19: '16', 20: '8', 21: '4', 22: '2', 23: '1' }
        actifs: [19, 20, 21, 22, 23]
exercices:
  - type: saisie
    consigne: "Tu additionnes 0111 et 0011 en binaire, colonne par colonne depuis la droite. Dans la colonne de droite, 1 + 1 = 2, qui s'écrit 10 : tu écris 0 et tu retiens 1 pour la colonne suivante, à gauche. Termine l'addition. Quel résultat obtiens-tu, en 4 chiffres ?"
    verif: [sans_espaces, { parmi: ['1010', '01010'] }]
    solution: '1010'
    contre_exemples: ['0100', '0122', '1000', '10']
    retour: "Ajoute à chaque colonne la retenue venue de sa droite. Colonne du poids 2 : 1 + 1 + 1 = 3, qui s'écrit 11, tu écris 1 et tu retiens 1. Colonne du poids 4 : 1 + 0 + 1 = 2, tu écris 0 et tu retiens 1. Colonne du poids 8 : il reste la retenue, tu écris 1."
  - type: saisie
    consigne: Tu additionnes 0110 et 0111 en binaire, colonne par colonne depuis la droite. Quel chiffre écris-tu sous la colonne du poids 4 ?
    verif: [rogner, { nombre: 1 }]
    solution: '1'
    contre_exemples: ['0', '3', '11', '2']
    retour: "Colonne du poids 1 : 0 + 1 = 1, sans retenue. Colonne du poids 2 : 1 + 1 = 2, tu écris 0 et le 1 monte en haut de la colonne du poids 4. Celle-ci compte alors trois 1. Comme 3 s'écrit 11, tu écris 1 dessous et tu retiens 1."
  - type: choix
    consigne: Chacune de ces additions porte sur deux nombres binaires de 4 chiffres. Sans poser toute l'addition, trouve celle dont la somme a 5 chiffres.
    options:
      - texte: 1100 + 1010
        correct: true
      - texte: 1001 + 0110
        retour: "Aucune colonne n'y contient deux 1 : aucune n'atteint 2, il n'y a pas de retenue, et la somme, 1111, garde 4 chiffres. Le résultat gagne un chiffre seulement si la colonne la plus à gauche donne une retenue. Dans 1100 + 1010, cette colonne contient 1 et 1 : elle atteint 2."
      - texte: 0111 + 0101
        retour: 'Cette addition a des retenues, mais sa colonne la plus à gauche contient 0 et 0 : même avec une retenue, elle atteint seulement 1. Elle ne donne pas de retenue, et la somme, 1100, garde 4 chiffres. Dans 1100 + 1010, cette colonne contient 1 et 1 : elle atteint 2.'
  - type: saisie
    consigne: "Un capteur compte des passages en binaire : 1001 le matin, 1011 l'après-midi. Pour le total, tu poses l'addition 1001 + 1011 en colonnes, depuis la droite. Chaque retenue s'écrit en haut d'une colonne, y compris la dernière, qui descend ensuite en tête du résultat. Combien de retenues écris-tu ?"
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['2', '4', '5', '20']
    retour: "Pose l'addition colonne par colonne. Poids 1 : 1 + 1 = 2, tu écris 0 et tu retiens 1. Poids 2 : la retenue, plus 0 et 1, fait 2 : tu écris 0 et tu retiens 1. Poids 4 : la retenue, plus 0 et 0, fait 1 : tu écris 1, sans retenue. Poids 8 : 1 + 1 = 2, tu écris 0 et tu retiens 1, qui descend en tête du résultat, 10100. Compte les 1 écrits en haut des colonnes."
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
les [bits](brique:donnees/bit) de même poids l'un sous l'autre, colonne par colonne
depuis la droite.

Quand une colonne atteint 2, tu écris 0 et tu reportes 1 : il monte en haut de la
colonne suivante, à gauche. Ce 1 s'appelle une
[**retenue**](note "L'addition habituelle fait de même : dès qu'une colonne atteint 10, tu écris 0 ou le chiffre qui dépasse, et tu retiens 1.") :
on dit qu'on _retient_ 1.

Pourquoi ? Un bit ne vaut que 0 ou 1 : tu ne peux pas écrire 2 dans une colonne. Or deux
fois un poids font le poids à sa gauche, et 2 [s'écrit `10`](brique:donnees/binaire-ecrire).

Avec sa retenue, une colonne peut compter trois 1. Comme 3 s'écrit `11`, tu écris 1 et
tu retiens 1.

Si la colonne la plus à gauche donne une retenue, ce 1 descend en tête du résultat, qui
gagne un chiffre.

![L'addition 101 + 011 posée en colonnes donne 1000. Une retenue 1 est écrite en haut des colonnes des poids 2, 4 et 8 ; la dernière descend dans le résultat.](schema:retenues)

En partant de la gauche, une retenue arrivée après coup changerait un chiffre déjà
écrit.

---
titre: Additionner avec des portes
resume: 'Un demi-additionneur additionne deux bits avec deux portes : le OU exclusif donne le chiffre de la somme, le ET donne la retenue. Ainsi 1 + 1 donne 10. Il ne reçoit pas la retenue de la colonne de droite.'
niveau: bas
acquis:
  - Calculer la retenue et le chiffre de la somme d'une colonne de deux bits avec les portes ET et OU exclusif.
  - Justifier par l'addition 1 + 1 = 10 que le chiffre de la somme est un OU exclusif et la retenue un ET.
  - Repérer la colonne d'une addition où un demi-additionneur ne suffit plus, faute de recevoir la retenue venue de droite.
requiert:
  - logique/portes-logiques
  - donnees/addition-binaire
manipulation:
  consigne: 'Les lampes ET et OU exclusif dépendent des mêmes interrupteurs, A et B. Pour chaque réglage, lis leurs deux chiffres, ET puis OU exclusif, comme un nombre binaire de deux chiffres, et compte les interrupteurs à 1. Quel lien vois-tu entre ce nombre et ce compte ?'
  widget: porte
  params: { portes: [et, ou-exclusif], table: true }
exercices:
  - type: choix
    consigne: "Tom a interverti ses deux fils de sortie : il écrit sous la colonne la sortie de la porte ET, et il retient la sortie de la porte OU exclusif. Il additionne la colonne 1 + 1. Qu'obtient-il ?"
    options:
      - texte: 'Il écrit 1 et ne retient rien : il trouve 1 au lieu de 10.'
        correct: true
      - texte: 'Il écrit 0 et retient 1 : il trouve bien 10, comme attendu.'
        retour: 'Ce serait le bon branchement. Pour 11, ET donne 1 et OU exclusif donne 0. Tom écrit la sortie ET, 1, sous la colonne, et retient la sortie OU exclusif, 0 : il trouve 1. Le chiffre de la somme doit venir du OU exclusif, la retenue du ET.'
      - texte: 'Il écrit 1 et retient 1 : il trouve 11 au lieu de 10.'
        retour: 'Le OU exclusif vaut 1 quand une seule entrée vaut 1 : sur 11, il donne 0, à la différence de OU. Tom écrit la sortie ET, 1, et retient la sortie OU exclusif, 0 : il trouve 1 au lieu de 10.'
  - type: choix
    consigne: "Léo garde la porte OU exclusif pour le chiffre de la somme, mais il fabrique la retenue avec une porte OU au lieu d'une porte ET. Pour quelles colonnes de deux bits, A et B, son assemblage se trompe-t-il ?"
    options:
      - texte: "01 et 10 : OU y donne 1, alors que la colonne n'atteint pas 2."
        correct: true
      - texte: '11 seulement : la colonne y atteint 2, et elle seule retient.'
        retour: "Sur 11, OU et ET donnent tous deux 1 : la retenue de Léo est juste. Sur 01 et 10, la colonne n'atteint pas 2 : ET donne 0, mais OU donne 1. Léo retiendrait 1 à tort, et 1 + 0 donnerait 11, soit 3."
      - texte: 'Aucune : OU et ET donnent tous deux 1 sur 11, seule retenue.'
        retour: "Vérifie toutes les colonnes, pas seulement celle qui retient. Sur 01 et 10, la colonne n'atteint pas 2 : ET donne 0, mais OU donne 1. Léo retiendrait 1 à tort, et 1 + 0 donnerait 11, soit 3, au lieu de 1."
  - type: saisie
    consigne: 'Pour additionner 1010 et 0110, une machine envoie les deux bits de chaque colonne dans une porte ET et dans une porte OU exclusif. Chaque porte reçoit seulement les deux bits de sa colonne, sans la retenue venue de droite. Prédis les sorties des portes ET, colonne par colonne de gauche à droite, puis celles des portes OU exclusif : écris les huit chiffres à la suite, comme 11000101.'
    verif: [rogner, sans_espaces, { regex: '0,?0,?1,?0,?1,?1,?0,?0' }]
    solution: '00101100'
    contre_exemples: ['11100000', '11000010', '00101110', '0010', '1,1,1,0,0,0,0,0']
    retour: 'Colonnes, de gauche à droite : 1 et 0, 0 et 1, 1 et 1, 0 et 0. ET vaut 1 seulement si les deux bits valent 1 : 0010. OU exclusif vaut 1 quand un seul bit vaut 1 : 1100. Avec 1110 puis 0000, tu as posé la vraie addition : ce sont ses retenues, qui comptent celle venue de droite, et ses chiffres. Ici, chaque porte ne voit que sa colonne. Avec 1110 en second, tu as calculé OU.'
  - type: choix
    consigne: "Tu poses l'addition 011 + 001, colonne par colonne depuis la droite. Une colonne de deux bits se fait avec un demi-additionneur. Dans quelle colonne un demi-additionneur seul ne suffit-il plus pour la première fois ?"
    options:
      - texte: 'Celle du poids 2 : elle doit additionner 1, 0 et un 1 venu de droite.'
        correct: true
      - texte: 'Celle du poids 1 : elle doit additionner 1 et 1, qui font déjà 2.'
        retour: "1 + 1 s'écrit 10 : le OU exclusif donne 0, le ET donne la retenue 1. C'est exactement le travail d'un demi-additionneur. La difficulté arrive à la colonne du poids 2, qui reçoit cette retenue : avec 1 et 0, elle a trois bits à additionner."
      - texte: 'Aucune : chaque colonne additionne un bit de chacun des deux nombres.'
        retour: "Un demi-additionneur n'a que deux entrées, les deux bits de sa colonne. La colonne du poids 1 donne une retenue, 1, qui monte dans la colonne du poids 2 : celle-ci doit additionner trois bits, 1, 0 et cette retenue."
plus_loin:
  - question: Un additionneur a-t-il déjà ressemblé à ces deux interrupteurs et ces deux lampes ?
    reponse: 'Oui. En novembre 1937, George Stibitz, chercheur aux laboratoires Bell, assemble sur sa table de cuisine un additionneur binaire, avec des pièces de récupération. Il a deux interrupteurs et, pour la sortie, deux ampoules de lampe de poche. Son nom, Model K, vient de « kitchen table », table de cuisine en anglais.'
    source: https://en.wikipedia.org/wiki/Model_K_(calculator)
---

Le nombre lu sur les lampes [ET](brique:logique/et-ou) puis
[OU exclusif](brique:logique/portes-logiques) compte les interrupteurs à `1` :
`00`, `01`, `01`, et `10` pour `11`. Ces deux portes additionnent A et B,
comme une colonne d'une [addition binaire](brique:donnees/addition-binaire).

![A = 1, B = 1 : ET donne la retenue 1, OU exclusif le chiffre de la somme 0. À côté, 1 + 1 = 10 : la retenue à gauche, le chiffre à droite.](schema:colonne)

- Le OU exclusif donne le **chiffre de la somme**, écrit sous la colonne. Pas un OU :
  1 + 1 s'écrit `10`, ce chiffre vaut `0`, OU donnerait `1`.
- Le ET donne la retenue. Pour une colonne de deux [bits](brique:donnees/bit), elle vaut
  `1` seulement si la colonne atteint 2, donc si les deux bits valent `1`.

Cet assemblage est un **demi-additionneur** : il ne fait qu'une partie du travail d'une
colonne, car il ne reçoit pas la retenue venue de droite. D'autres portes, qui ajoutent
cette retenue, en font un **additionneur complet**. Avec un par colonne, chacun passant sa
retenue à gauche, on additionne des nombres de plusieurs chiffres : additionner en
binaire revient à calculer des opérations logiques.

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
    consigne: "Léo fabrique le chiffre de la somme d'une colonne avec une porte OU au lieu d'une porte OU exclusif ; il garde la porte ET pour la retenue. Pour quel réglage de A et B son assemblage se trompe-t-il ?"
    options:
      - texte: "11 : 1 + 1 s'écrit 10, le chiffre de la somme vaut 0, mais OU donne 1."
        correct: true
      - texte: '00 : 0 + 0 vaut 0, mais OU donne 1.'
        retour: "OU vaut 0 sur 00 : aucune entrée n'y vaut 1. OU et OU exclusif ne diffèrent que sur 11. Or 1 + 1 s'écrit 10 : le chiffre de la somme vaut 0, et OU donnerait 1. Léo écrirait 11, soit 3, au lieu de 10."
      - texte: "Aucun : un chiffre de la somme vaut 1 dès qu'une entrée vaut 1."
        retour: "Sur 11, une entrée vaut bien 1, mais 1 + 1 vaut 2, qui s'écrit 10 : le chiffre écrit sous la colonne est 0, et le 1 part en retenue. OU donnerait 1 : Léo lirait 11, soit 3. C'est pourquoi le chiffre de la somme est un OU exclusif."
  - type: choix
    consigne: "Tom a interverti ses deux fils de sortie : il écrit sous la colonne la sortie de la porte ET, et il retient la sortie de la porte OU exclusif. Il additionne la colonne 1 + 1. Qu'obtient-il ?"
    options:
      - texte: 'Il écrit 1 et ne retient rien : il trouve 1 au lieu de 10.'
        correct: true
      - texte: 'Il écrit 0 et retient 1 : il trouve bien 10.'
        retour: 'Ce serait le bon branchement. Pour 11, ET donne 1 et OU exclusif donne 0. Tom écrit la sortie ET, 1, sous la colonne, et retient la sortie OU exclusif, 0 : il trouve 1. Le chiffre de la somme doit venir du OU exclusif, la retenue du ET.'
      - texte: 'Il écrit 2 sous la colonne, puisque 1 + 1 = 2.'
        retour: "Un fil ne porte que 0 ou 1 : aucune porte ne sort 2. C'est pourquoi 2 s'écrit 10, avec deux chiffres et donc deux portes. Tom écrit la sortie ET, 1, et retient la sortie OU exclusif, 0 : il trouve 1 au lieu de 10."
  - type: saisie
    consigne: 'Pour additionner 1010 et 0110, une machine envoie les deux bits de chaque colonne dans une porte ET et dans une porte OU exclusif. Prédis la sortie de la porte ET de chaque colonne, de gauche à droite, sans espace.'
    verif: [rogner, sans_espaces, { egal: '0010' }]
    solution: '0010'
    contre_exemples: ['1110', '1100', '0100', '10000']
    retour: "ET vaut 1 seulement si les deux bits de la colonne valent 1. Colonnes, de gauche à droite : 1 et 0, 0 et 1, 1 et 1, 0 et 0. Seule la troisième donne 1. Avec 1110, tu as mis une retenue dès qu'un bit vaut 1 ; 1100 est la sortie du OU exclusif."
  - type: choix
    consigne: "Tu poses l'addition 011 + 001, colonne par colonne depuis la droite. Une colonne de deux bits se fait avec un demi-additionneur. Dans quelle colonne un demi-additionneur seul ne suffit-il plus pour la première fois ?"
    options:
      - texte: "La colonne du poids 2 : elle doit additionner 1, 0 et la retenue venue de droite, trois bits, et un demi-additionneur n'a que deux entrées."
        correct: true
      - texte: 'La colonne du poids 1 : 1 + 1 donne 2, trop grand pour un demi-additionneur.'
        retour: "1 + 1 s'écrit 10 : le OU exclusif donne 0, le ET donne la retenue 1. C'est exactement le travail d'un demi-additionneur. La difficulté arrive à la colonne du poids 2, qui reçoit cette retenue : avec 1 et 0, elle a trois bits à additionner."
      - texte: 'Aucune : un demi-additionneur par colonne suffit toujours.'
        retour: "Un demi-additionneur n'a que deux entrées, les deux bits de sa colonne. La colonne du poids 1 donne une retenue, 1, qui monte dans la colonne du poids 2 : celle-ci doit additionner trois bits, 1, 0 et cette retenue."
plus_loin:
  - question: Un additionneur a-t-il déjà ressemblé à ce widget ?
    reponse: 'Oui. En novembre 1937, George Stibitz, chercheur aux laboratoires Bell, assemble sur sa table de cuisine un additionneur binaire, avec des pièces de récupération. Il a deux interrupteurs et, pour la sortie, deux ampoules de lampe de poche. Son nom, Model K, vient de « kitchen table », table de cuisine en anglais.'
    source: https://en.wikipedia.org/wiki/Model_K_(calculator)
---

Le nombre lu sur les lampes [ET](brique:logique/et-ou) puis
[OU exclusif](brique:logique/portes-logiques) est toujours le compte des interrupteurs à
`1` : `00`, `01`, `01`, et `10` pour le réglage `11`. Ces deux portes additionnent A et B,
comme une colonne d'une [addition binaire](brique:donnees/addition-binaire).

![A = 1 et B = 1 : ET donne la retenue 1, OU exclusif le chiffre de la somme 0. À côté, l'addition posée 1 + 1 = 10.](schema:colonne)

- Le OU exclusif donne le **chiffre de la somme**, écrit sous la colonne. Pas un OU :
  1 + 1 s'écrit `10`, ce chiffre vaut `0`, et OU donnerait `1`.
- Le ET donne la retenue. Elle vaut `1` seulement si la colonne atteint 2, donc si
  les deux [bits](brique:donnees/bit) valent `1` : un seul `1` ne donne aucune retenue.

Cet assemblage est un **demi-additionneur** : il ne reçoit pas la retenue venue de la
colonne de droite, d'où « demi ». Complété par d'autres portes qui l'ajoutent, il fait
une colonne entière. Avec un tel assemblage par colonne, chacun passant sa retenue à sa
gauche, une machine additionne des nombres binaires de plusieurs chiffres.

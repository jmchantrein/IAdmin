---
titre: Combiner des bits
resume: Avec 3 bits, on forme 2 × 2 × 2 = 8 combinaisons, de 000 à 111. Chaque bit ajouté double le nombre de combinaisons.
niveau: bas
acquis:
  - Calculer le nombre de combinaisons que l'on peut former avec un nombre donné de bits.
  - Énumérer sans en oublier les combinaisons de quelques bits.
  - Trouver le nombre de bits nécessaires pour distinguer un nombre donné de cas.
requiert:
  - donnees/bit
manipulation:
  consigne: Combien de combinaisons différentes peux-tu former avec trois bits ? Trouve-les toutes.
  widget: bascule-bits
  params: { bits: 3, suivi: true }
exercices:
  - type: saisie
    consigne: Avec 4 bits, on forme 16 combinaisons. Combien en forme-t-on avec 5 bits ?
    verif: [rogner, { nombre: 32 }]
    solution: '32'
    contre_exemples: ['17', '18', '20', '25']
    retour: Chaque combinaison de 4 bits se décline en deux, selon que le cinquième bit vaut 0 ou 1. Le nombre de combinaisons est donc multiplié par 2.
  - type: saisie
    consigne: Combien de combinaisons différentes peut-on former avec 6 bits ?
    verif: [rogner, { nombre: 64 }]
    solution: '64'
    contre_exemples: ['12', '36', '32', '128']
    retour: Un bit donne 2 combinaisons, et chaque bit ajouté double ce nombre. Double donc cinq fois de suite en partant de 2.
  - type: widget
    consigne: Avec trois bits, tu as déjà trouvé les combinaisons 110, 001, 111, 000, 100, 011 et 010. Affiche celle qui manque.
    widget: bascule-bits
    params: { bits: 3 }
    verif: [{ egal: '101' }]
    solution: '101'
    contre_exemples: ['111', '110', '000']
    retour: Range les huit combinaisons dans l'ordre, en faisant varier le bit de droite en premier, de 000 à 111. Coche ensuite celles de la liste pour repérer celle qui manque.
  - type: saisie
    consigne: Combien de bits faut-il au minimum pour distinguer les 12 mois de l'année ?
    verif: [rogner, { nombre: 4 }]
    solution: '4'
    contre_exemples: ['3', '12', '6', '2']
    retour: Cherche le plus petit nombre de bits qui donne au moins 12 combinaisons. Avec 3 bits tu n'en as que 8. Un bit de plus double ce nombre.
---

Avec trois interrupteurs, tu as trouvé **huit** combinaisons, de `000` à `111`.

Pourquoi huit ? Un [bit](brique:donnees/bit) donne 2 combinaisons. Chaque nouveau bit
décline chaque combinaison en deux, selon qu'il vaut `0` ou `1` :

![Un arbre. Le premier bit donne 0 et 1, le deuxième double en 4 combinaisons, le troisième en 8, de 000 à 111.](schema:arbre)

**Chaque bit ajouté double le nombre de combinaisons.**

Pour n'en oublier aucune, fais varier le
[bit de droite en premier](note "En faisant varier le bit de droite en premier, comme lorsqu'on compte (08, 09, 10), tu passes par toutes les combinaisons, une seule fois chacune.") :
`000`, `001`, `010`, `011`, et ainsi de suite.

Les combinaisons servent à distinguer des cas : on donne à chaque cas sa propre
combinaison. Pour 5 cas, 2 bits ne suffisent pas, car ils ne donnent que 4
combinaisons. Il en faut 3.

Tu retrouves le [jeu du nombre secret](brique:donnees/information) : chaque réponse par
oui ou non se note sur un bit. Les 3 réponses se notent donc sur 3 bits, et 3 bits
distinguent 8 possibilités : les 8 nombres du jeu.

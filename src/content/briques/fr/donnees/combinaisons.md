---
titre: Combiner des bits
resume: Avec n bits, on forme 2 × 2 × … × 2 (n fois) combinaisons. Chaque bit ajouté double le nombre de combinaisons.
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
  - type: choix
    consigne: Tu ajoutes un bit à une suite de bits. Que devient le nombre de combinaisons possibles ?
    options:
      - texte: Il double.
        correct: true
      - texte: Il augmente de 1.
        retour: Chaque combinaison existante se décline en deux, selon que le nouveau bit vaut 0 ou 1. Le total est donc multiplié par 2, pas augmenté de 1.
      - texte: Il augmente de 2.
        retour: Le nouveau bit a bien deux valeurs, mais chacune se combine avec toutes les combinaisons existantes. Le total est multiplié par 2, pas augmenté de 2.
  - type: widget
    consigne: Avec trois bits, les combinaisons 000, 001, 010, 011, 100, 101 et 110 sont déjà prises. Affiche celle qui reste.
    widget: bascule-bits
    params: { bits: 3 }
    verif: [{ egal: '111' }]
    solution: '111'
    contre_exemples: ['000', '110', '101']
    retour: Trois bits donnent 8 combinaisons et 7 sont citées. Parcours-les dans l'ordre, en faisant varier le bit de droite en premier, pour repérer celle qui manque.
  - type: saisie
    consigne: Combien de bits faut-il au minimum pour distinguer les 7 jours de la semaine ?
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['2', '7', '4']
    retour: Cherche le plus petit nombre de bits qui donne au moins 7 combinaisons. Avec 2 bits tu n'en as que 4. Un bit de plus double ce nombre.
---

Avec trois interrupteurs, tu as trouvé **huit** combinaisons, de `000` à `111`.

Pourquoi huit ? Avec un bit, il y a 2 cas. Ajoute un deuxième bit : chacun des 2 cas se
décline en deux, selon que le nouveau bit vaut `0` ou `1`. Cela fait 2 × 2 = 4 cas. Un
troisième bit double encore : 4 × 2 = 8.

**Chaque bit ajouté double le nombre de combinaisons.**

| Bits | Combinaisons |
| ---- | ------------ |
| 1    | 2            |
| 2    | 4            |
| 3    | 8            |
| 4    | 16           |

On lit ce tableau dans les deux sens. Pour distinguer 5 cas, 2 bits ne suffisent pas
(4 combinaisons seulement) : il en faut 3, quitte à laisser des combinaisons inutilisées.

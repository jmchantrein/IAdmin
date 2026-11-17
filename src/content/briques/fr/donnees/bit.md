---
titre: Le bit
resume: Un bit est la plus petite information possible. Il n'a que deux valeurs, notées 0 et 1.
niveau: bas
acquis:
  - Dire ce qu'est un bit et citer ses deux valeurs.
  - Reconnaître une information qui tient sur un seul bit.
requiert:
  - donnees/information
manipulation:
  consigne: Combien de valeurs différentes ce bit peut-il prendre ? Bascule l'interrupteur pour le savoir.
  widget: bascule-bits
  params: { bits: 1 }
exercices:
  - type: choix
    consigne: Combien de valeurs différentes un bit peut-il prendre ?
    options:
      - texte: '2'
        correct: true
      - texte: '8'
        retour: Huit est le nombre de bits d'un octet, que tu verras bientôt. Un bit seul n'a que deux valeurs.
      - texte: '10'
        retour: Dix est le nombre de chiffres que nous utilisons pour compter. Un bit n'en utilise que deux.
  - type: choix
    consigne: Laquelle de ces informations tient sur un seul bit ?
    options:
      - texte: La porte est ouverte ou fermée.
        correct: true
      - texte: Le jour de la semaine.
        retour: Il y a sept jours possibles. Un bit ne distingue que deux cas.
      - texte: La couleur d'un feu tricolore.
        retour: Le feu a trois couleurs possibles. Un bit ne distingue que deux cas.
  - type: saisie
    consigne: La lampe allumée se note 1. Comment se note la lampe éteinte ?
    verif: [rogner, { egal: '0' }]
    solution: '0'
    contre_exemples: ['1', 'éteinte', '2']
    retour: Un bit n'a que deux valeurs, notées par deux chiffres. Si l'un des deux états se note 1, l'autre se note avec le chiffre qui reste.
  - type: widget
    consigne: Mets le bit à 1.
    widget: bascule-bits
    params: { bits: 1 }
    verif: [{ egal: '1' }]
    solution: '1'
    contre_exemples: ['0']
    retour: La valeur 1 correspond à la lampe allumée. Bascule l'interrupteur jusqu'à ce que la lampe s'allume.
---

L'interrupteur n'a que deux positions : la lampe est **éteinte** ou **allumée**. On ne
peut pas faire plus simple, car avec une seule position il n'y aurait rien à apprendre.

Cette information minimale s'appelle un **bit**. Par convention, on note ses deux
valeurs `0` (éteint) et `1` (allumé).

Un bit répond à une question qui n'a que deux issues : oui ou non, vrai ou faux, ouvert
ou fermé. Dans un ordinateur, tout est fait de bits, parce qu'il est facile de
fabriquer un composant qui n'a que deux états, comme un interrupteur.

Un seul bit ne dit pas grand-chose. La suite montre ce qui se passe quand on en
assemble plusieurs.

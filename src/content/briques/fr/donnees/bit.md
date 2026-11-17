---
titre: Le bit
resume: Un bit est la plus petite unité d'information. C'est un choix entre deux possibilités, que l'on note 0 et 1.
niveau: bas
acquis:
  - Citer les deux valeurs d'un bit et noter avec elles une situation à deux possibilités.
  - Reconnaître une information qui tient sur un seul bit.
requiert:
  - donnees/information
manipulation:
  consigne: Combien de positions différentes cet interrupteur peut-il prendre ?
  widget: bascule-bits
  params: { bits: 1 }
exercices:
  - type: saisie
    consigne: Tu notes avec un bit si un siège est occupé. Tu as choisi la valeur 1 pour « occupé ». Quelle valeur notes-tu pour un siège libre ?
    verif: [rogner, { nombre: 0 }]
    solution: '0'
    contre_exemples: ['1', '2']
    retour: Un bit n'a que deux valeurs, 0 et 1. Puisque 1 est déjà pris pour « occupé », il reste l'autre valeur pour « libre ».
  - type: choix
    consigne: Laquelle de ces informations tient sur un seul bit ?
    options:
      - texte: Le résultat d'un tirage à pile ou face.
        correct: true
      - texte: Le jour de la semaine.
        retour: Il y a sept jours possibles. Un bit ne distingue que deux possibilités.
      - texte: La couleur d'un feu tricolore.
        retour: Le feu a trois couleurs possibles. Un bit ne distingue que deux possibilités.
  - type: choix
    consigne: Tu notes avec un bit l'état d'une porte, 1 quand elle est ouverte et 0 quand elle est fermée. La porte est ouverte, puis quelqu'un la ferme. Que devient le bit ?
    options:
      - texte: Il passe de 1 à 0.
        correct: true
      - texte: Il passe de 0 à 1.
        retour: Tu as inversé la convention. Ici, 1 note la porte ouverte. Au départ le bit vaut donc 1, et il prend l'autre valeur quand la porte se ferme.
      - texte: Il reste à 1.
        retour: Le bit note l'état de la porte. Quand cet état change, la valeur du bit change aussi.
  - type: choix
    consigne: Une ampoule peut être éteinte, allumée faiblement ou allumée fortement. Pourquoi un seul bit ne suffit-il pas à noter son état ?
    options:
      - texte: Parce qu'il y a trois possibilités et qu'un bit n'en distingue que deux.
        correct: true
      - texte: Parce qu'un bit ne peut noter que des nombres.
        retour: Les valeurs 0 et 1 ne sont que des notations. On leur fait désigner ce que l'on veut, par exemple éteint et allumé. Ce qui manque ici, c'est une troisième valeur.
      - texte: Parce qu'un bit ne peut noter que l'état d'un interrupteur.
        retour: Un bit note n'importe quelle information à deux possibilités, pas seulement un interrupteur. Ce qui bloque ici, c'est le nombre de possibilités.
---

L'interrupteur n'a que deux positions : la lampe est **éteinte** ou **allumée**. On ne
peut pas faire plus simple. Avec une seule position, il n'y aurait rien à apprendre en
regardant la lampe.

Ce choix entre deux possibilités est la plus petite unité d'information. On l'appelle
un **bit**. Par convention, ses deux valeurs se notent `0` et `1`. Ici, `0` note la
lampe éteinte et `1` la lampe allumée.

Une information **tient sur un bit** quand elle n'a que deux possibilités, comme oui ou
non. Dès qu'il y en a trois, un seul bit ne suffit plus.

Dans une machine, toute information est notée avec des bits, parce qu'il est facile de
fabriquer une pièce qui n'a que deux positions, comme un interrupteur.

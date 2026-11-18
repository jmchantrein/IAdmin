---
titre: Les portes logiques
resume: "Une porte logique est un composant qui réalise une opération logique. On assemble des portes : la sortie de l'une entre dans une autre. Le OU exclusif, qui vaut 1 si une seule entrée vaut 1, s'assemble avec OU, ET, NON."
niveau: bas
acquis:
  - Calculer la sortie d'une porte à partir des valeurs que portent ses fils d'entrée à cet instant.
  - Dérouler un assemblage de portes, porte après porte, pour en dresser la table de vérité.
  - Choisir la porte qui réalise une situation décrite, en comparant sa table de vérité aux cas de la situation.
requiert:
  - logique/table-de-verite
manipulation:
  consigne: 'A et B entrent dans OU et dans ET. La sortie de ET entre dans NON. Les sorties de OU et de NON entrent dans un dernier ET. En haut, A et B valent 10 ; en bas, 11. Avant chaque clic, devine la valeur qui va apparaître. Pour laquelle des deux rangées la dernière case vaut-elle 1 ?'
  widget: pas-a-pas
  params:
    colonnes: 6
    etapes:
      - legende: 'A et B valent 1 et 0 dans la rangée du haut, 1 et 1 dans celle du bas.'
        cases: ['1', '0', '?', '?', '?', '?', '1', '1', '?', '?', '?', '?']
        actifs: [0, 1, 6, 7]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'En haut, OU reçoit A et B, 1 et 0 : sa sortie vaut 1.'
        cases: ['1', '0', '1', '?', '?', '?', '1', '1', '?', '?', '?', '?']
        actifs: [0, 1, 2]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'ET reçoit aussi A et B, 1 et 0 : sa sortie vaut 0.'
        cases: ['1', '0', '1', '0', '?', '?', '1', '1', '?', '?', '?', '?']
        actifs: [0, 1, 3]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'NON reçoit la sortie de ET, 0 : sa sortie vaut 1.'
        cases: ['1', '0', '1', '0', '1', '?', '1', '1', '?', '?', '?', '?']
        actifs: [3, 4]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'Le dernier ET reçoit les sorties de OU et de NON, 1 et 1 : sa sortie vaut 1.'
        cases: ['1', '0', '1', '0', '1', '1', '1', '1', '?', '?', '?', '?']
        actifs: [2, 4, 5]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'En bas, OU reçoit A et B, 1 et 1 : sa sortie vaut 1.'
        cases: ['1', '0', '1', '0', '1', '1', '1', '1', '1', '?', '?', '?']
        actifs: [6, 7, 8]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'ET reçoit aussi A et B, 1 et 1 : sa sortie vaut 1.'
        cases: ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1', '?', '?']
        actifs: [6, 7, 9]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'NON reçoit la sortie de ET, 1 : sa sortie vaut 0.'
        cases: ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1', '0', '?']
        actifs: [9, 10]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'Le dernier ET reçoit les sorties de OU et de NON, 1 et 0 : sa sortie vaut 0.'
        cases: ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1', '0', '0']
        actifs: [8, 10, 11]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
      - legende: 'La dernière case vaut 1 en haut, pour A et B valant 10, et 0 en bas, pour 11.'
        cases: ['1', '0', '1', '0', '1', '1', '1', '1', '1', '1', '0', '0']
        actifs: [5, 11]
        etiquettes:
          {
            0: A,
            1: B,
            2: OU,
            3: ET,
            4: NON,
            5: dernier ET,
            6: A,
            7: B,
            8: OU,
            9: ET,
            10: NON,
            11: dernier ET,
          }
exercices:
  - type: saisie
    consigne: "Une porte ET a ses deux fils d'entrée à 0. Puis le fil A passe à 1 ; puis le fil B passe à 1 ; puis A repasse à 0 ; puis A revient à 1. Prédis la sortie de la porte ET après chacun de ces quatre changements : écris les quatre chiffres à la suite, comme 1100."
    verif: [rogner, sans_espaces, { regex: '0,?1,?0,?1' }]
    solution: '0101'
    contre_exemples: ['0111', '1111', '00101', '010', '0,1,1,1']
    retour: 'Une porte ne garde rien : à chaque instant, ET calcule sa sortie avec les valeurs que portent ses fils. Ses fils portent 10, puis 11, puis 01, puis 11 : ET donne 0, 1, 0, 1. Avec 0111, ta porte a gardé son 1 ; avec 1111, tu as calculé OU ; avec cinq chiffres, tu as ajouté la sortie de départ.'
  - type: choix
    consigne: "Dans un escalier, un interrupteur en bas, A, et un en haut, B, commandent la même lampe. Basculer l'un ou l'autre change toujours l'état de la lampe. Au départ, A et B sont à 0 et la lampe est éteinte. Quelle porte, avec les entrées A et B, donne l'état de la lampe d'escalier ?"
    options:
      - texte: Le OU exclusif, qui vaut 1 quand une seule entrée vaut 1.
        correct: true
      - texte: Le OU, qui vaut 1 quand au moins une entrée vaut 1.
        retour: "Pars de 00, lampe éteinte. Bascule A : 10, elle s'allume. Bascule B : 11, elle change encore d'état et s'éteint. OU vaudrait 1 sur 11. Seul le OU exclusif vaut 0 sur 00 et sur 11, et 1 quand une seule entrée vaut 1."
      - texte: Le ET, qui vaut 1 quand les deux entrées valent 1.
        retour: "Depuis 00, basculer A seul donne 10, et la lampe s'allume déjà : ET vaudrait 0. Bascule ensuite B : 11, elle s'éteint, alors que ET vaudrait 1. Ces valeurs, 0 sur 00 et 11, 1 sinon, sont celles du OU exclusif."
  - type: saisie
    consigne: 'Le fil A entre dans une porte NON. La sortie de NON et le fil B entrent dans une porte ET. Prédis la sortie de la porte ET pour A et B valant 00, 01, 10, 11 (A puis B), dans cet ordre : écris les quatre chiffres à la suite, comme 1100.'
    verif: [rogner, sans_espaces, { regex: '0,?1,?0,?0' }]
    solution: '0100'
    contre_exemples: ['1110', '0001', '0010', '1011', '010', '1,1,1,0']
    retour: "Calcule d'abord la porte dont la sortie entre dans la suivante : NON, puis ET. Pour 00, NON donne 1, puis 1 ET 0 vaut 0. Pour 01, 1 ET 1 vaut 1. Pour 10 et 11, NON donne 0, et ET vaut 0. Avec 1110, tu as fait ET avant NON ; avec 0001, tu as oublié NON ; avec 0010, tu as mis NON sur B."
plus_loin:
  - question: Qui a relié la logique aux circuits électriques ?
    reponse: "Claude Shannon, dans son mémoire de master, écrit en 1937 au MIT et publié en 1938. Il y montre que l'algèbre de Boole, une logique qui calcule sur deux valeurs, permet de simplifier les assemblages de relais, des interrupteurs électriques, des centraux téléphoniques. Il montre aussi que des assemblages de relais peuvent résoudre des problèmes de cette logique."
    source: https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits
  - question: De quoi une porte est-elle faite ?
    reponse: "Le plus souvent, de diodes ou de transistors, qui jouent le rôle d'interrupteurs électroniques. Aujourd'hui, la plupart des portes sont faites d'une sorte de transistor appelée MOSFET. On en a aussi construit avec des tubes à vide, des relais, de l'air sous pression ou des molécules."
    source: https://en.wikipedia.org/wiki/Logic_gate
---

Tu as calculé chaque case à partir de cases déjà remplies : la sortie de
[ET](brique:logique/et-ou) entrait dans [NON](brique:logique/non), celles de
[OU](brique:logique/et-ou) et de NON dans le dernier ET. La dernière case vaut `1` pour
`10`, `0` pour `11`.

Une **porte logique** est une pièce, un **composant**, qui réalise une
[opération](brique:logique/non). Ses entrées et sa sortie sont des **fils** qui portent
chacun un [bit](brique:donnees/bit). Quand une entrée change, la sortie suit : une porte
ne garde rien.

Brancher la sortie d'une porte sur une entrée d'une autre, c'est
[**assembler**](note "Pourquoi assembler ? Avec quelques sortes de portes, assemblées, on fabrique n'importe quelle opération logique.")
des portes. Ton assemblage donne le [OU exclusif](brique:logique/et-ou), qui vaut `1` quand
une seule entrée vaut `1`. Il existe aussi en une seule porte.

![Cadre « OU exclusif », A = 1, B = 1 : OU et ET donnent 1 ; NON change le 1 de ET en 0 ; le dernier ET reçoit 1 et 0 : sortie 0.](schema:assemblage)

OU dit « au moins une », NON de la sortie de ET dit : pas les deux. Pour dresser la
[table de vérité](brique:logique/table-de-verite) d'un assemblage, déroule-le ligne par
ligne : calcule d'abord les portes dont la sortie entre dans la suivante.

---
titre: Les portes logiques
resume: "Une porte logique est un composant qui réalise une opération logique : ses entrées et sa sortie sont des fils qui portent 0 ou 1. On assemble des portes en branchant la sortie de l'une sur une entrée d'une autre."
niveau: bas
acquis:
  - Calculer la sortie d'une porte OU exclusif, et la distinguer de celle d'une porte OU sur le réglage 11.
  - Calculer la sortie d'une porte à partir des valeurs que portent ses fils d'entrée à cet instant.
  - Dérouler un assemblage de portes, porte après porte dans le sens des fils, pour en dresser la table de vérité.
requiert:
  - logique/table-de-verite
manipulation:
  consigne: Les lampes OU et OU exclusif dépendent des mêmes interrupteurs, A et B. Essaie tous les réglages, la liste les garde. Pour quel réglage les deux lampes diffèrent-elles ?
  widget: porte
  params: { portes: [ou, ou-exclusif], table: true }
exercices:
  - type: choix
    consigne: "Une porte ET a ses deux fils d'entrée à 1 : sa sortie vaut 1. Puis le fil B passe à 0, et A reste à 1. Que vaut maintenant la sortie de la porte ET ?"
    options:
      - texte: '0 : la porte calcule sa sortie avec les valeurs que portent ses fils maintenant, et 1 ET 0 vaut 0.'
        correct: true
      - texte: 1, car la porte garde la sortie qu'elle a déjà calculée.
        retour: 'Une porte ne garde rien : sa sortie suit ses entrées à chaque instant. Ses fils portent maintenant 1 et 0, et ET vaut 1 seulement si ses deux entrées valent 1. La sortie passe donc à 0.'
      - texte: 1, car A est toujours à 1.
        retour: 'Une entrée à 1 suffit pour OU, pas pour ET. ET vaut 1 seulement si ses deux entrées valent 1 ; ses fils portent maintenant 1 et 0, sa sortie vaut donc 0.'
  - type: choix
    consigne: "Dans un escalier, un interrupteur en bas, A, et un en haut, B, commandent la même lampe. Basculer l'un ou l'autre change toujours l'état de la lampe. Au départ, A et B sont à 0 et la lampe est éteinte. Quelle porte, avec les entrées A et B, donne l'état de la lampe d'escalier ?"
    options:
      - texte: "Le OU exclusif : la lampe d'escalier est allumée quand un seul interrupteur est à 1, et éteinte pour 00 comme pour 11."
        correct: true
      - texte: Le OU, car la lampe d'escalier s'allume dès qu'un interrupteur est à 1.
        retour: "Pars de 00, lampe éteinte. Bascule A : 10, elle s'allume. Bascule B : 11, elle change encore d'état et s'éteint. OU vaudrait 1 sur 11. Seul le OU exclusif vaut 0 sur 00 et sur 11, et 1 quand une seule entrée vaut 1."
      - texte: Le ET, car il faut les deux interrupteurs pour commander la lampe d'escalier.
        retour: "Depuis 00, basculer A seul donne 10, et la lampe s'allume déjà : ET vaudrait 0. Bascule ensuite B : 11, elle s'éteint, alors que ET vaudrait 1. Ces valeurs, 0 sur 00 et 11, 1 sinon, sont celles du OU exclusif."
  - type: saisie
    consigne: 'Le fil A entre dans une porte NON. La sortie de NON et le fil B entrent dans une porte ET. Prédis la sortie de la porte ET pour les réglages 00, 01, 10, 11 (A puis B), dans cet ordre, sans espace.'
    verif: [rogner, sans_espaces, { egal: '0100' }]
    solution: '0100'
    contre_exemples: ['1110', '0001', '0010', '1011']
    retour: "Suis les fils dans leur sens : d'abord NON, puis ET. Pour 00, NON donne 1, puis 1 ET 0 vaut 0. Pour 01, 1 ET 1 vaut 1. Pour 10 et 11, NON donne 0, et ET vaut 0. Avec 1110, tu as fait ET avant NON ; avec 0001, tu as oublié NON."
plus_loin:
  - question: Qui a relié la logique aux circuits électriques ?
    reponse: "Claude Shannon, entre autres. Dans son mémoire de master, écrit en 1937 au MIT et publié en 1938, il montre que l'algèbre de Boole, une logique qui calcule sur deux valeurs, permet de simplifier les assemblages de relais, des interrupteurs électriques, des centraux téléphoniques. Il montre aussi que des assemblages de relais peuvent résoudre des problèmes de cette logique."
    source: https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits
  - question: De quoi une porte est-elle faite ?
    reponse: "Le plus souvent, de diodes ou de transistors, qui jouent le rôle d'interrupteurs électroniques. Aujourd'hui, la plupart des portes sont faites d'une sorte de transistor appelée MOSFET. On en a aussi construit avec des tubes à vide, des relais, de l'air sous pression ou des molécules."
    source: https://en.wikipedia.org/wiki/Logic_gate
---

Les deux lampes ne diffèrent que sur la ligne `11` de la
[table de vérité](brique:logique/table-de-verite) : OU s'allume, OU exclusif non. Le
**OU exclusif** vaut `1` quand une seule entrée vaut `1` : c'est le « ou » du menu, qui
exclut « les deux », à la différence de [OU](brique:logique/et-ou).

Une **porte logique** est une pièce, un **composant**, qui réalise une
opération. Ses entrées et sa sortie sont des **fils** qui portent chacun un
[bit](brique:donnees/bit) : [deux états](note 'Avec dix états, comme les chiffres 0 à 9, chacun serait proche de ses voisins : un léger écart ferait lire 7 pour 6. Deux états restent bien séparés.')
seulement. Chaque lampe montrait la sortie d'une porte.

La sortie d'une porte peut servir d'entrée à une autre : on **assemble** des portes.
Sans cela, il faudrait fabriquer un composant neuf par opération. Le OU exclusif s'assemble avec OU, ET et NON :

![Pour A = 1, B = 1 : OU et ET donnent 1 ; NON change le 1 de ET en 0 ; le dernier ET reçoit 1 et 0, donc OU exclusif vaut 0.](schema:assemblage)

OU dit « au moins une », NON ET dit « pas les deux ». Suis les fils dans leur sens :
une porte attend les sorties qui l'alimentent. Quand une entrée change, chaque sortie
suit : une porte ne garde rien.

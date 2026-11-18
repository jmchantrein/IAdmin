---
titre: NON, ET, OU
resume: "Une opération logique calcule une valeur de vérité à partir d'autres. NON inverse sa valeur. ET vaut 1 seulement si ses deux entrées valent 1. OU vaut 1 dès qu'une entrée vaut 1, même les deux."
niveau: bas
acquis:
  - Calculer la sortie de NON, ET ou OU pour des entrées données, seule ou enchaînée à une autre.
  - Distinguer le OU de la logique, qui vaut 1 aussi quand les deux entrées valent 1, du « ou » qui exclut ce cas.
requiert:
  - logique/vrai-faux
manipulation:
  consigne: Les lampes ET et OU dépendent des mêmes interrupteurs, A et B. Essaie tous les réglages. Pour combien de réglages la lampe ET s'allume-t-elle ? Et la lampe OU ?
  widget: porte
  params: { portes: [et, ou] }
exercices:
  - type: widget
    consigne: Cette lampe montre NON A, l'inverse de l'entrée A. Au départ, A vaut 0 et la lampe est allumée. Règle l'interrupteur A pour que la lampe s'éteigne.
    widget: porte
    params: { portes: [non] }
    verif: [{ egal: '1:0' }]
    solution: '1:0'
    contre_exemples: ['0:1']
    retour: NON inverse la valeur de son entrée. Pour que la sortie vaille 0, lampe éteinte, l'entrée A doit valoir 1, interrupteur allumé.
  - type: saisie
    consigne: "« Il pleut » vaut 1 et « j'ai un parapluie » vaut 1. Que vaut « il pleut ET j'ai un parapluie » ? Réponds par un chiffre."
    verif: [rogner, { nombre: 1 }]
    solution: '1'
    contre_exemples: ['2', '0', '11']
    retour: ET vaut 1 seulement si ses deux entrées valent 1, et c'est le cas ici. Ce n'est pas une addition. Une sortie est une valeur de vérité, donc 0 ou 1, jamais 2.
  - type: choix
    consigne: "La médiathèque prête une liseuse si « tu as une carte d'abonné » OU « tu as une pièce d'identité ». Tu as les deux. Que vaut cette affirmation, au sens du OU de la logique ?"
    options:
      - texte: 1, car OU vaut 1 dès qu'une entrée vaut 1, et ici les deux valent 1.
        correct: true
      - texte: 0, car OU demande l'un ou l'autre, pas les deux.
        retour: C'est le « ou » de la conversation, celui de « fromage ou dessert ». Le OU de la logique vaut 1 dès qu'une entrée vaut 1, y compris quand les deux valent 1. Avoir deux papiers ne t'empêche pas d'emprunter.
      - texte: 2, car deux affirmations sont vraies.
        retour: OU ne compte pas les affirmations vraies. Sa sortie est une valeur de vérité, donc 0 ou 1. Ici elle vaut 1, puisqu'au moins une entrée vaut 1.
  - type: saisie
    consigne: "A vaut 1 et B vaut 0. Calcule NON (A ET B) : d'abord A ET B, puis NON de ce résultat. Réponds par un chiffre."
    verif: [rogner, { nombre: 1 }]
    solution: '1'
    contre_exemples: ['0']
    retour: "A ET B vaut 0, car B vaut 0. NON inverse ce résultat : NON 0 vaut 1. Si tu as trouvé 0, tu as sans doute calculé (NON A) ET (NON B), soit 0 ET 1, ce qui donne 0 : ce n'est pas le même calcul."
plus_loin:
  - question: Le OU de la logique a-t-il toujours inclus le cas « les deux » ?
    reponse: Non. George Boole, qui écrivait le OU comme une addition, exigeait que ses deux termes s'excluent, jamais vrais ensemble. William Stanley Jevons, puis presque tous les logiciens après lui, ont adopté un OU qui ne l'exige pas, celui que tu viens de voir.
    source: https://en.wikipedia.org/wiki/Logical_disjunction
---

La lampe ET ne s'est allumée que pour un réglage, A et B à `1`. La lampe OU, pour trois :
dès qu'un interrupteur était à `1`.

Chaque interrupteur donne une [valeur de vérité](brique:logique/vrai-faux) : c'est une
**entrée**. Chaque lampe montre la **sortie** d'une **opération** : une valeur de vérité
calculée à partir des entrées.

- **ET** vaut `1` seulement si ses deux entrées valent `1`.
  [1 ET 1 vaut 1](note "Avec 1 pour vrai et 0 pour faux, ET donne le même résultat qu'une multiplication : 1 × 1 = 1, 1 × 0 = 0, 0 × 0 = 0. C'est l'un des intérêts de cette notation."),
  pas 2 : une sortie est vraie ou fausse.
- **OU** vaut `1` dès qu'une entrée vaut `1`, même quand les deux valent `1`.
- **NON** a une seule entrée et l'inverse : NON `1` vaut `0`.

![Le « ou » du menu « fromage ou dessert » vaut 1 pour fromage seul ou dessert seul, 0 pour les deux. Le OU logique vaut 1 dans les trois cas.](schema:ou)

Le OU garde « les deux », car une deuxième raison n'annule pas la première : sinon, une
étudiante de 20 ans perdrait le « tarif réduit étudiant OU moins de 26 ans ».

Une sortie peut servir d'entrée : NON (A OU B) calcule A OU B, puis l'inverse.

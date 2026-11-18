---
titre: ET, OU
resume: "ET et OU sont deux opérations logiques à deux entrées. ET vaut 1 seulement si ses deux entrées valent 1. OU vaut 1 dès qu'une entrée vaut 1, même quand les deux valent 1."
niveau: bas
acquis:
  - Calculer la sortie de ET ou de OU à partir des valeurs de leurs deux entrées.
  - Distinguer le OU logique, qui vaut 1 aussi quand les deux entrées valent 1, du « ou » qui exclut ce cas.
requiert:
  - logique/non
manipulation:
  consigne: Les lampes ET et OU dépendent des mêmes interrupteurs, A et B. Un réglage donne une position à chacun d'eux. Essaie tous les réglages. Pour combien de réglages la lampe ET s'allume-t-elle ? Et la lampe OU ?
  widget: porte
  params: { portes: [et, ou] }
exercices:
  - type: choix
    consigne: "Un coffre s'ouvre si « Ana tourne sa clé » ET « Ben tourne sa clé ». Ana tourne sa clé, Ben ne tourne pas la sienne. Le coffre s'ouvre-t-il ?"
    options:
      - texte: 'Non : ET vaut 1 seulement si ses deux entrées valent 1 ; ici Ben donne 0.'
        correct: true
      - texte: Oui, car une clé tournée suffit.
        retour: 'Une entrée à 1 suffit pour OU, pas pour ET. ET vaut 1 seulement si ses deux entrées valent 1. Ici « Ben tourne sa clé » vaut 0, donc ET vaut 0 : le coffre reste fermé.'
      - texte: Oui, car 1 + 0 vaut 1.
        retour: "ET n'est pas une addition : sa sortie est une valeur de vérité, qui vaut 1 seulement si ses deux entrées valent 1. Ici une entrée vaut 0, donc ET vaut 0 : le coffre reste fermé."
  - type: choix
    consigne: "La médiathèque prête une liseuse si « tu as une carte d'abonné ou une pièce d'identité ». Tu as les deux papiers ; elle te prête la liseuse. Quel « ou » sa règle emploie-t-elle ?"
    options:
      - texte: Le OU logique, qui vaut 1 dès qu'une entrée vaut 1, même quand les deux valent 1.
        correct: true
      - texte: Le « ou » du menu, qui exclut le cas « les deux ».
        retour: "Avec ce « ou », avoir les deux papiers donnerait 0, et la médiathèque refuserait. Elle prête : sa règle emploie donc le OU logique, qui dit « au moins un ». Un second papier n'annule pas le premier."
      - texte: ET, puisque tu as les deux papiers.
        retour: "Avec ET, une carte d'abonné seule ne suffirait pas. Or la règle dit qu'un seul papier suffit. Elle emploie le OU logique, qui vaut 1 dès qu'une entrée vaut 1, y compris quand les deux valent 1."
  - type: saisie
    consigne: "Le bus s'arrête si « quelqu'un appuie sur le bouton » OU « quelqu'un attend à l'arrêt ». À quatre arrêts : au premier, quelqu'un appuie mais personne n'attend ; au deuxième, personne n'appuie ni n'attend ; au troisième, quelqu'un appuie, une autre personne attend ; au quatrième, personne n'appuie mais quelqu'un attend. Prédis la sortie de OU à chaque arrêt, dans l'ordre, sans espace."
    verif: [rogner, sans_espaces, { egal: '1011' }]
    solution: '1011'
    contre_exemples: ['1001', '1021', '0010', '101']
    retour: "OU vaut 1 dès qu'une entrée vaut 1, y compris quand les deux valent 1. Seul le deuxième arrêt, sans personne, donne 0 : la suite est 1, 0, 1, 1. Un 0 au troisième arrêt viendrait du « ou » qui exclut les deux ; un 2, d'une addition."
plus_loin:
  - question: Le OU logique a-t-il toujours inclus le cas « les deux » ?
    reponse: Non. George Boole, qui écrivait le OU comme une addition, exigeait que ses deux termes s'excluent, jamais vrais ensemble. William Stanley Jevons, puis presque tous les logiciens après lui, ont adopté un OU qui ne l'exige pas, celui que tu viens de voir.
    source: https://en.wikipedia.org/wiki/Logical_disjunction
---

La lampe ET ne s'est allumée que pour un réglage : les deux interrupteurs à `1`. La lampe
OU, pour trois : dès qu'un interrupteur était à `1`.

ET et OU sont deux [opérations](brique:logique/non) à deux entrées, A et B.

- **ET** vaut `1` seulement si ses deux entrées valent `1`. 1 ET 1 vaut 1, pas 2 : une
  sortie est une valeur de vérité.
- **OU** vaut `1` dès qu'une entrée vaut `1`, y compris quand les deux valent `1`.

Ce dernier cas est un choix des logiciens : OU dit « au moins une ». Il convient quand une
raison suffit et que deux ne gênent pas : une étudiante de 20 ans paie le « tarif réduit
étudiant OU moins de 26 ans ».

![Menu « fromage ou dessert » : le « ou » du menu vaut 0, 1, 1, 0 pour aucun, fromage seul, dessert seul, les deux. Le OU logique vaut 0, 1, 1, 1.](schema:ou)

Le « ou » du menu exclut le cas « les deux ». Il porte un autre nom, vu plus tard.

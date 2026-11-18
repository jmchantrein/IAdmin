---
titre: La boucle
resume: Une boucle répète des étapes tant que la réponse à une condition est oui. La question est posée avant chaque tour. Chaque tour doit changer ce qu'elle regarde, pour que la boucle s'arrête.
niveau: haut
acquis:
  - Dérouler une boucle en comptant ses tours et en donnant la valeur finale de sa variable.
  - Reconnaître une boucle qui ne s'arrête jamais.
requiert:
  - algo/condition
manipulation:
  consigne: "La variable « épargne » contient 0. Tant que la réponse à « épargne est-elle plus petite que 10 ? » est oui, l'algorithme remplace la valeur de « épargne » par cette valeur plus 3. Combien de fois ajoute-t-il 3 avant de s'arrêter ?"
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu mets 0 dans la variable « épargne ».
        cases: ['0']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: 'Question : 0 est-il plus petit que 10 ? Oui, la boucle fait un tour.'
        cases: ['0']
        actifs: [0]
        etiquettes: { 0: oui }
      - legende: 'Tour 1 : 0 plus 3 donne 3, qui remplace 0.'
        cases: ['0', '3']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: épargne }
      - legende: 'Question : 3 est-il plus petit que 10 ? Oui, la boucle fait un tour.'
        cases: ['0', '3']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: oui }
      - legende: 'Tour 2 : 3 plus 3 donne 6, qui remplace 3.'
        cases: ['0', '3', '6']
        actifs: [2]
        ecartes: [0, 1]
        etiquettes: { 2: épargne }
      - legende: 'Question : 6 est-il plus petit que 10 ? Oui, la boucle fait un tour.'
        cases: ['0', '3', '6']
        actifs: [2]
        ecartes: [0, 1]
        etiquettes: { 2: oui }
      - legende: 'Tour 3 : 6 plus 3 donne 9, qui remplace 6.'
        cases: ['0', '3', '6', '9']
        actifs: [3]
        ecartes: [0, 1, 2]
        etiquettes: { 3: épargne }
      - legende: 'Question : 9 est-il plus petit que 10 ? Oui, la boucle fait encore un tour.'
        cases: ['0', '3', '6', '9']
        actifs: [3]
        ecartes: [0, 1, 2]
        etiquettes: { 3: oui }
      - legende: 'Tour 4 : 9 plus 3 donne 12, qui remplace 9.'
        cases: ['0', '3', '6', '9', '12']
        actifs: [4]
        ecartes: [0, 1, 2, 3]
        etiquettes: { 4: épargne }
      - legende: "Question : 12 est-il plus petit que 10 ? Non, la boucle s'arrête."
        cases: ['0', '3', '6', '9', '12']
        actifs: [4]
        ecartes: [0, 1, 2, 3]
        etiquettes: { 4: non }
      - legende: 'La boucle a fini après 4 tours : « épargne » contient 12.'
        cases: ['0', '3', '6', '9', '12']
        actifs: [4]
        ecartes: [0, 1, 2, 3]
        etiquettes: { 4: épargne }
exercices:
  - type: saisie
    consigne: 'La variable « seau » contient 2. Une boucle dit : tant que « seau » est plus petit que 9, ajoute 2 à « seau ». Le premier tour fait passer « seau » de 2 à 4. Combien de tours la boucle fait-elle en tout ?'
    verif: [rogner, { nombre: 4 }]
    solution: '4'
    contre_exemples: ['3', '5', '9']
    retour: "Pose la question avant chaque tour : 2, 4, 6 et 8 sont plus petits que 9, d'où 4 tours. Après le quatrième tour, « seau » contient 10 : la réponse est non, et la boucle s'arrête."
  - type: saisie
    consigne: "La variable « pages » contient 30. Une boucle dit : tant que « pages » est plus grand que 10, retire 8 de « pages ». Que contient « pages » quand la boucle s'arrête ?"
    verif: [rogner, { nombre: 6 }]
    solution: '6'
    contre_exemples: ['14', '10', '-2']
    retour: "Suis la valeur tour après tour : 30, 22, 14, puis 6. À 14, la réponse est encore oui, d'où un tour de plus. À 6, la réponse est non : la boucle s'arrête avant de retirer encore 8."
  - type: choix
    consigne: La variable « compte » contient 1. Laquelle de ces boucles ne s'arrête jamais ?
    options:
      - texte: Tant que « compte » est plus petit que 5, écris le mot bonjour.
        correct: true
      - texte: Tant que « compte » est plus petit que 5, ajoute 1 à « compte ».
        retour: Chaque tour fait grandir « compte » de 1. Après 4 tours, il contient 5, la réponse devient non et la boucle s'arrête.
      - texte: Tant que « compte » est plus grand que 5, ajoute 1 à « compte ».
        retour: « compte » contient 1, qui n'est pas plus grand que 5. La réponse est non dès la première question, et la boucle s'arrête sans faire aucun tour.
---

Tu as vu la même question revenir avant chaque tour. L'algorithme a fait 4 tours, posé 5
fois la question, et la première réponse non l'a arrêté.

Cette répétition est une **boucle**. Elle répète des étapes tant que la réponse à une
[condition](brique:algo/condition) est oui. On l'écrit : tant que « épargne » est plus
petite que 10, ajoute 3 à « épargne ».

![La question « épargne plus petite que 10 ? » : oui mène à « ajoute 3 à épargne », puis une flèche remonte à la question. Non mène à la fin.](schema:retour)

Ajouter 3 à « épargne », c'est remplacer sa valeur par cette valeur plus 3 ; retirer se fait de même.

Trois règles :

- la question est posée **avant** chaque tour, pour ne jamais faire un tour de trop : si
  la réponse est non dès le début, la boucle ne fait aucun tour ;
- chaque tour doit changer ce que la question regarde, ici la
  [variable](brique:algo/variable) « épargne ». Sinon, la réponse reste oui et la boucle
  ne s'arrête jamais ;
- la boucle doit s'arrêter, car un [algorithme](brique:algo/algorithme) se termine
  toujours.

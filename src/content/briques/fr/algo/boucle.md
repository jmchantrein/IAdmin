---
titre: La boucle
resume: Une boucle répète des étapes tant que la réponse à une condition est oui. Chaque passage dans ces étapes, un tour, commence par la question. Chaque tour doit rapprocher la réponse de non, sinon la boucle ne s'arrête jamais.
niveau: haut
acquis:
  - Dérouler une boucle en comptant ses tours et en donnant la valeur finale de sa variable.
  - Reconnaître une boucle qui ne s'arrête jamais.
requiert:
  - algo/condition
manipulation:
  consigne: "La variable « épargne » contient 0. Tant que « épargne » vaut moins de 10, l'algorithme remplace la valeur de « épargne » par cette valeur plus 3. Combien de fois ajoute-t-il 3 avant de s'arrêter ?"
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu mets 0 dans la variable « épargne ».
        cases: ['0']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: 'Question : « épargne » vaut moins de 10 ? Oui, 0 vaut moins de 10.'
        cases: ['0']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: 'Oui, donc tu ajoutes 3 : 0 plus 3 donne 3, qui remplace 0.'
        cases: ['3']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "L'algorithme refait la question : « épargne » vaut moins de 10 ? Oui, 3 vaut moins de 10."
        cases: ['3']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "Oui, donc l'algorithme refait l'étape : 3 plus 3 donne 6, qui remplace 3."
        cases: ['6']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "L'algorithme refait la question : « épargne » vaut moins de 10 ? Oui, 6 vaut moins de 10."
        cases: ['6']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "Oui, donc l'algorithme refait l'étape : 6 plus 3 donne 9, qui remplace 6."
        cases: ['9']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "L'algorithme refait la question : « épargne » vaut moins de 10 ? Oui, 9 vaut moins de 10."
        cases: ['9']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "Oui, donc l'algorithme refait l'étape : 9 plus 3 donne 12, qui remplace 9."
        cases: ['12']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "L'algorithme refait la question : « épargne » vaut moins de 10 ? Non, 12 vaut plus de 10."
        cases: ['12']
        actifs: [0]
        etiquettes: { 0: épargne }
      - legende: "Réponse non : l'algorithme n'ajoute plus 3, et « épargne » contient 12."
        cases: ['12']
        actifs: [0]
        etiquettes: { 0: épargne }
exercices:
  - type: saisie
    consigne: 'La variable « seau » contient 0. Une boucle dit : tant que « seau » vaut moins de 10, ajoute 2 à « seau ». Le premier tour fait passer « seau » de 0 à 2. Combien de tours la boucle fait-elle en tout ?'
    verif: [rogner, { nombre: 5 }]
    solution: '5'
    contre_exemples: ['4', '6', '10']
    retour: "Pose la question avant chaque tour : 0, 2, 4, 6 et 8 valent moins de 10, d'où 5 tours. Après le cinquième tour, « seau » contient 10, qui ne vaut pas moins de 10 : la réponse est non, et la boucle s'arrête."
  - type: saisie
    consigne: "La variable « pages » contient 30. Une boucle dit : tant que « pages » vaut plus de 10, retire 8 de « pages ». Que contient « pages » quand la boucle s'arrête ?"
    verif: [rogner, { nombre: 6 }]
    solution: '6'
    contre_exemples: ['14', '10', '-2']
    retour: "Suis la valeur tour après tour : 30, 22, 14, puis 6. À 14, la réponse est encore oui, d'où un tour de plus. À 6, la réponse est non : la boucle s'arrête avant de retirer encore 8."
  - type: choix
    consigne: La variable « compte » contient 1. Laquelle de ces boucles ne s'arrête jamais ?
    options:
      - texte: Tant que « compte » vaut moins de 5, retire 1 de « compte ».
        correct: true
        retour: "Chaque tour change « compte », mais l'éloigne de 5 : 1, puis 0, -1, -2, et ainsi de suite. Il vaut toujours moins de 5, la réponse reste oui et la boucle ne s'arrête jamais."
      - texte: Tant que « compte » vaut moins de 5, ajoute 1 à « compte ».
        retour: "Chaque tour fait grandir « compte » de 1 et rapproche la réponse de non. Après 4 tours, il contient 5, qui ne vaut pas moins de 5 : la boucle s'arrête."
      - texte: Tant que « compte » vaut plus de 5, ajoute 1 à « compte ».
        retour: « compte » contient 1, qui ne vaut pas plus de 5. La réponse est non dès la première question, et la boucle s'arrête sans faire aucun tour.
---

L'[algorithme](brique:algo/algorithme) a posé la même question 5 fois, avant chaque ajout : il a ajouté 3 quatre fois, et la première réponse non a arrêté les ajouts.

Cette répétition est une **boucle**. Elle répète des étapes tant que la réponse à une
[condition](brique:algo/condition) est oui. Un passage dans les étapes répétées s'appelle
un **tour** : ici, 4 tours. On l'écrit : tant que « épargne » vaut moins de 10, ajoute 3
à « épargne ».

![La question : « épargne » vaut moins de 10 ? Oui mène à ajouter 3 à « épargne », puis une flèche remonte à la question : un tour. Non mène à la sortie.](schema:retour)

Ajouter 3 à « épargne » remplace sa valeur par cette valeur plus 3 ; retirer, de même.

Trois règles :

- la question est posée **avant** chaque tour : si la réponse est d'emblée non, la boucle ne fait aucun tour ;
- chaque tour doit rapprocher la réponse de non, ici en faisant grandir la
  [variable](brique:algo/variable) « épargne ». Sinon, la boucle ne s'arrête jamais ;
- la boucle doit s'arrêter : sans arrêt, l'algorithme ne donne jamais de résultat.

L'étape « Recommence l'étape 2 tant que… » de l'algorithme était déjà une boucle.

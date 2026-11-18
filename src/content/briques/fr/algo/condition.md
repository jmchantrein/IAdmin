---
titre: La condition
resume: Une condition est une question à laquelle la réponse est oui ou non. Selon la réponse, l'algorithme suit une suite d'étapes ou l'autre, jamais les deux.
niveau: haut
acquis:
  - Dérouler une condition en donnant sa réponse et la suite d'étapes qui est suivie.
  - Reconnaître une question qui peut servir de condition.
  - Distinguer la condition des étapes qu'elle choisit.
requiert:
  - algo/variable
manipulation:
  consigne: "À chaque carte, l'algorithme pose une question : la carte est-elle plus grande que « plus grande » ? Avant chaque clic sur « Suivant », donne la réponse. Combien de fois la réponse est-elle oui ?"
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu mets la première carte, 5, dans la variable « plus grande ».
        cases: ['5', '2', '7', '7', '5']
        actifs: [0, 4]
        etiquettes: { 4: plus grande }
      - legende: 'Question : 2 est-il plus grand que 5 ? La réponse est non.'
        cases: ['5', '2', '7', '7', '5']
        actifs: [1, 4]
        etiquettes: { 1: non, 4: plus grande }
      - legende: 'Réponse non : tu écartes la carte 2, et « plus grande » garde 5.'
        cases: ['5', '2', '7', '7', '5']
        actifs: [4]
        ecartes: [1]
        etiquettes: { 4: plus grande }
      - legende: 'Question : 7 est-il plus grand que 5 ? La réponse est oui.'
        cases: ['5', '2', '7', '7', '5']
        actifs: [2, 4]
        ecartes: [1]
        etiquettes: { 2: oui, 4: plus grande }
      - legende: 'Réponse oui : tu remplaces 5 par 7 dans « plus grande ».'
        cases: ['5', '2', '7', '7', '7']
        actifs: [4]
        ecartes: [0, 1]
        etiquettes: { 4: plus grande }
      - legende: 'Question : 7 est-il plus grand que 7 ? La réponse est non, les deux sont égaux.'
        cases: ['5', '2', '7', '7', '7']
        actifs: [3, 4]
        ecartes: [0, 1]
        etiquettes: { 3: non, 4: plus grande }
      - legende: 'Réponse non : tu écartes la carte, et « plus grande » garde 7.'
        cases: ['5', '2', '7', '7', '7']
        actifs: [4]
        ecartes: [0, 1, 3]
        etiquettes: { 4: plus grande }
      - legende: 'Il ne reste aucune carte : « plus grande » contient 7, la plus grande carte.'
        cases: ['5', '2', '7', '7', '7']
        actifs: [4]
        ecartes: [0, 1, 3]
        etiquettes: { 4: plus grande }
exercices:
  - type: saisie
    consigne: 'La variable « prix » contient 40. Une étape dit : si le client a une carte de fidélité, alors remplace la valeur de « prix » par 35 ; sinon, remplace-la par 43. Le client a une carte de fidélité. Que contient « prix » après cette étape ?'
    verif: [rogner, { nombre: 35 }]
    solution: '35'
    contre_exemples: ['43', '40']
    retour: La question « le client a-t-il une carte ? » a pour réponse oui. L'algorithme suit donc la suite du oui, et elle seule. La suite du sinon n'est jamais suivie, elle ne remplace donc pas 35 par 43.
  - type: choix
    consigne: Laquelle de ces questions peut servir de condition dans un algorithme ?
    options:
      - texte: La variable « âge » contient-elle un nombre plus grand que 17 ?
        correct: true
      - texte: La personne est-elle âgée ?
        retour: « Âgée » n'est pas défini. Deux personnes répondraient différemment pour le même âge, et l'algorithme ne saurait pas quelle suite prendre.
      - texte: Quel âge a la personne ?
        retour: La réponse est un nombre, pas oui ou non. Une condition doit choisir entre deux suites, elle n'admet donc que deux réponses.
  - type: choix
    consigne: 'Une étape dit : si la porte est fermée, alors ouvre-la ; sinon, entre. Quelle partie est la condition ?'
    options:
      - texte: La porte est fermée.
        correct: true
      - texte: Ouvre-la.
        retour: C'est une action, la suite suivie quand la réponse est oui. La condition est la question qui choisit entre les deux suites, elle ne fait rien elle-même.
      - texte: Entre.
        retour: C'est une action, la suite suivie quand la réponse est non. La condition est la question posée avant, celle qui choisit la suite.
  - type: saisie
    consigne: "La variable « température » contient 20. Une étape dit : si « température » est plus grande que 20, alors écris le mot chaud ; sinon, écris le mot frais. Quel mot l'algorithme écrit-il ?"
    verif: [rogner, minuscules, { egal: frais }]
    solution: frais
    contre_exemples: [chaud, chaud frais]
    retour: 20 n'est pas plus grand que 20, il lui est égal. La réponse à la question est donc non, et l'algorithme suit la seule suite du sinon.
---

À chaque carte, tu as répondu à la même question : la carte est-elle plus grande que la
[variable](brique:algo/variable) « plus grande » ? Selon la réponse, l'algorithme a fait
une chose ou l'autre :

![La question « carte plus grande que plus grande ? ». Oui mène à « remplace la valeur », non à « écarte la carte ». Les deux suites rejoignent la carte suivante.](schema:choix)

Cette question est une **condition** : une question à laquelle la réponse est oui ou non.
L'[algorithme](brique:algo/algorithme) l'écrit en une étape : si la carte est plus grande
que « plus grande », alors remplace sa valeur par la carte ; sinon, écarte la carte.

Trois règles :

- la réponse est seulement oui ou non, pour que l'algorithme sache toujours quelle suite
  prendre. « La carte est-elle forte ? » ne convient pas : chacun répondrait à sa façon ;
- une seule des deux suites est suivie, car la réponse ne peut pas être oui et non à la
  fois ;
- la condition ne fait rien : elle choisit, et les étapes de la suite choisie agissent.

Une carte égale à « plus grande » n'est pas plus grande : la réponse est non.

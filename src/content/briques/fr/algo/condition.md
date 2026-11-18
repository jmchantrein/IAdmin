---
titre: La condition
resume: Une condition est une question à laquelle la réponse est oui ou non. Selon la réponse, l'algorithme suit les étapes du oui ou les étapes du non, jamais les deux.
niveau: haut
acquis:
  - Dérouler une condition en donnant sa réponse et les étapes qui sont suivies.
  - Reconnaître une question qui peut servir de condition.
  - Distinguer la condition des étapes qu'elle choisit.
requiert:
  - algo/variable
manipulation:
  consigne: "À chaque nouvelle carte, l'algorithme pose une question : la carte est-elle plus grande que « record » ? Avant chaque clic sur « Suivant », donne la réponse. Combien de fois la réponse est-elle oui ?"
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu mets la première carte, 5, dans la variable « record ».
        cases: ['5', '2', '7', '7', '5']
        actifs: [0, 4]
        etiquettes: { 4: record }
      - legende: 'Question : 2 est-il plus grand que 5 ? La réponse est non.'
        cases: ['5', '2', '7', '7', '5']
        actifs: [1, 4]
        etiquettes: { 1: non, 4: record }
      - legende: 'Réponse non : tu écartes la carte 2, et « record » garde 5.'
        cases: ['5', '2', '7', '7', '5']
        actifs: [4]
        ecartes: [1]
        etiquettes: { 4: record }
      - legende: 'Question : 7 est-il plus grand que 5 ? La réponse est oui.'
        cases: ['5', '2', '7', '7', '5']
        actifs: [2, 4]
        ecartes: [1]
        etiquettes: { 2: oui, 4: record }
      - legende: 'Réponse oui : tu remplaces 5 par 7 dans « record ».'
        cases: ['5', '2', '7', '7', '7']
        actifs: [4]
        ecartes: [0, 1]
        etiquettes: { 4: record }
      - legende: 'Question : 7 est-il plus grand que 7 ? La réponse est non, les deux sont égaux.'
        cases: ['5', '2', '7', '7', '7']
        actifs: [3, 4]
        ecartes: [0, 1]
        etiquettes: { 3: non, 4: record }
      - legende: 'Réponse non : tu écartes la carte, et « record » garde 7.'
        cases: ['5', '2', '7', '7', '7']
        actifs: [4]
        ecartes: [0, 1, 3]
        etiquettes: { 4: record }
      - legende: 'Il ne reste aucune carte : « record » contient 7, la plus grande carte.'
        cases: ['5', '2', '7', '7', '7']
        actifs: [4]
        ecartes: [0, 1, 3]
        etiquettes: { 4: record }
exercices:
  - type: saisie
    consigne: 'La variable « prix » contient 40. Une étape dit : si le client est abonné, alors remplace la valeur de « prix » par 35 ; sinon, remplace-la par 43. Le client est abonné. Que contient « prix » après cette étape ?'
    verif: [rogner, { nombre: 35 }]
    solution: '35'
    contre_exemples: ['43', '40']
    retour: La question « le client est-il abonné ? » a pour réponse oui. L'algorithme suit donc les étapes du oui, et elles seules. Les étapes du non ne sont pas suivies, elles ne remplacent donc pas 35 par 43.
  - type: choix
    consigne: Laquelle de ces questions peut servir de condition dans un algorithme ?
    options:
      - texte: La variable « âge » contient-elle un nombre plus grand que 17 ?
        correct: true
      - texte: La variable « âge » contient-elle un âge élevé ?
        retour: « Élevé » n'est pas défini. Deux personnes répondraient différemment pour le même nombre, et l'algorithme ne saurait pas quelles étapes suivre.
      - texte: Quel nombre la variable « âge » contient-elle ?
        retour: La réponse est un nombre, pas oui ou non. Une condition choisit entre les étapes du oui et les étapes du non, elle n'admet donc que deux réponses.
  - type: choix
    consigne: 'Une étape dit : si la porte est fermée, sonne ; sinon, entre. Quelle partie est la condition ?'
    options:
      - texte: La porte est-elle fermée ?
        correct: true
      - texte: Sonne.
        retour: C'est une action, l'étape du oui, suivie quand la porte est fermée. La condition est la question qui choisit entre les étapes du oui et les étapes du non, elle ne fait rien elle-même.
      - texte: Entre.
        retour: C'est une action, l'étape du non, suivie quand la porte n'est pas fermée. La condition est la question posée avant, celle qui choisit les étapes à suivre.
  - type: saisie
    consigne: "La variable « température » contient 20. Une étape dit : si « température » est plus grande que 20, alors écris le mot chaud ; sinon, écris le mot frais. Quel mot l'algorithme écrit-il ?"
    verif: [rogner, minuscules, { egal: frais }]
    solution: frais
    contre_exemples: [chaud, chaud frais]
    retour: 20 n'est pas plus grand que 20, il lui est égal. La réponse à la question est donc non, et l'algorithme suit les seules étapes du non.
---

À chaque nouvelle carte, tu as répondu à la même question : la carte est-elle plus grande
que la [variable](brique:algo/variable) « record » ? L'[algorithme](brique:algo/algorithme)
a agi selon la réponse :

![Une question : la carte est-elle plus grande que « record » ? Oui mène à remplacer « record » par la carte, non à écarter la carte. Les deux branches rejoignent l'étape suivante.](schema:choix)

Cette question est une **condition** : une question à laquelle la réponse est oui ou non.
L'algorithme l'écrit en une étape : si la carte est plus grande que « record », alors
remplace la valeur de « record » par la carte ; sinon, écarte la carte.

Trois règles :

- la réponse est seulement oui ou non, pour que l'algorithme sache toujours quelles étapes
  suivre. « Quelle est la carte ? » ne convient pas : sa réponse n'est ni oui ni non ;
- les étapes du oui ou celles du non sont suivies, jamais les deux : la réponse ne peut
  pas être oui et non à la fois ;
- la condition ne fait rien : elle choisit, et les étapes choisies agissent.

Une carte égale à « record » n'est pas plus grande : la réponse est non.

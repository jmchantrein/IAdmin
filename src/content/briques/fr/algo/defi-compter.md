---
titre: 'Défi : compter'
resume: Pour compter les cartes d'une rangée qui remplissent une condition, une variable part de 0 avant la boucle ; à chaque tour, la boucle prend une carte, et la condition décide s'il faut ajouter 1 à la variable.
genre: defi
niveau: haut
acquis:
  - Dérouler un algorithme qui compte les cartes remplissant une condition, en donnant la valeur finale de sa variable.
  - Compléter un algorithme qui compte en choisissant l'étape qui manque.
  - Compter les tours et les questions d'une boucle qui passe une rangée en revue.
requiert:
  - algo/boucle
exercices:
  - type: saisie
    consigne: "Voici les températures relevées pendant une semaine : 18, 25, 22, 19, 30, 21, 17. Un algorithme met 0 dans la variable « jours chauds ». Puis, tant qu'il reste une température qu'il n'a pas prise, il prend la première qu'il n'a pas encore prise ; si elle vaut plus de 21, il ajoute 1 à « jours chauds ». Après les trois premières températures, « jours chauds » contient 2. Que contient-elle à la fin ?"
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['4', '2', '7', '30']
    retour: "Continue après 22 : 19 ne vaut pas plus de 21, 30 vaut plus de 21 et ajoute 1, 21 lui est égal et ne vaut donc pas plus de 21, 17 non plus. La variable passe de 2 à 3, et la boucle s'arrête après la dernière température."
  - type: choix
    consigne: "Un algorithme doit compter les notes qui valent moins de 10 dans une liste. Étape 1 : mets 0 dans la variable « échecs ». Étape 2 : tant qu'il reste une note que tu n'as pas prise, prends la première que tu n'as pas encore prise, puis… Étape 3 : « échecs » contient le nombre de notes qui valent moins de 10. Quelle fin de l'étape 2 convient ?"
    options:
      - texte: Si la note vaut moins de 10, ajoute 1 à « échecs ».
        correct: true
      - texte: Ajoute 1 à « échecs ».
        retour: Sans condition, chaque tour ajoute 1, quelle que soit la note. « échecs » contiendrait alors le nombre de toutes les notes. La condition décide, note par note, s'il faut compter.
      - texte: Si la note vaut moins de 10, remplace la valeur de « échecs » par la note.
        retour: Remplacer efface l'ancienne valeur. « échecs » contiendrait la dernière note sous 10, pas leur nombre. Pour compter, chaque note retenue ajoute 1.
  - type: saisie
    consigne: "Un algorithme compte les cartes qui valent plus de 5, mais une étape a changé de place. Il dit : tant qu'il reste une carte que tu n'as pas prise, mets 0 dans la variable « compte », prends la première carte que tu n'as pas encore prise, puis, si elle vaut plus de 5, ajoute 1 à « compte ». Avec la rangée 7, 9, 2, 8, que contient « compte » quand la boucle s'arrête ?"
    verif: [rogner, { nombre: 1 }]
    solution: '1'
    contre_exemples: ['3', '0', '4']
    retour: "Chaque tour commence par remettre « compte » à 0, ce qui efface le compte des tours d'avant. Seul le dernier tour compte : il met 0, prend 8, qui vaut plus de 5, et ajoute 1. Placé avant la boucle, ce 0 n'aurait été mis qu'une fois, et le résultat aurait été 3."
  - type: saisie
    consigne: "Un livreur a 6 colis, qui pèsent 4, 12, 7, 15, 2 et 9 kilos. Il compte ceux qui pèsent plus de 8 kilos. Il met 0 dans la variable « lourds », puis répète : tant qu'il reste un colis qu'il n'a pas pris, il prend le premier qu'il n'a pas encore pris ; s'il pèse plus de 8 kilos, il ajoute 1 à « lourds ». Combien de tours la boucle fait-elle ?"
    verif: [rogner, { nombre: 6 }]
    solution: '6'
    contre_exemples: ['3', '7', '5']
    retour: "Chaque tour prend un colis, qu'il pèse plus de 8 kilos ou non : 6 colis, donc 6 tours. La condition ne décide que de l'ajout de 1, ce qui donne 3 dans « lourds », pas le nombre de tours. Et la septième question, dont la réponse est non, ne lance aucun tour."
  - type: saisie
    consigne: "Un magasin compte, parmi ses 12 articles, ceux dont le stock vaut moins de 3. L'algorithme met 0 dans la variable « à commander », puis répète : tant qu'il reste un article qu'il n'a pas pris, il prend le premier qu'il n'a pas encore pris ; si son stock vaut moins de 3, il ajoute 1 à « à commander ». Combien de fois la boucle pose-t-elle sa question, celle qui demande s'il reste un article qu'elle n'a pas pris ?"
    verif: [rogner, { nombre: 13 }]
    solution: '13'
    contre_exemples: ['12', '11', '24']
    retour: La boucle pose sa question avant chaque tour. Elle fait un tour par article, soit 12 tours, donc 12 réponses oui. Puis elle la pose une dernière fois, et la réponse non l'arrête. En tout, 12 plus 1 font 13.
---

Ce défi n'apporte aucune notion nouvelle. Il assemble trois notions pour compter les cartes
qui remplissent une [condition](brique:algo/condition), par exemple celles qui valent plus de 5 :

1. Mets 0 dans la [variable](brique:algo/variable) « compte », une seule fois, avant la
   boucle : avant toute carte, tu n'en as compté aucune.
2. Tant qu'il reste une carte que tu n'as pas prise, prends la première carte que tu n'as
   pas encore prise, puis : si elle vaut plus de 5, ajoute 1 à « compte ».
3. « compte » contient le nombre de cartes qui valent plus de 5.

L'étape 2 est une [boucle](brique:algo/boucle) : un tour par carte. À l'intérieur, la
condition décide, carte par carte, s'il faut ajouter 1.

---
titre: La variable
resume: Une variable est une case qui porte un nom et contient une valeur, qu'un algorithme retient. Elle contient une seule valeur à la fois. Remplacer cette valeur efface l'ancienne ; lire la variable ne la change pas.
niveau: haut
acquis:
  - Dérouler un algorithme en suivant la valeur d'une variable après chaque étape.
  - Prédire la valeur d'une variable après une étape qui la remplace ou qui la lit.
requiert:
  - algo/algorithme
manipulation:
  consigne: La case « record » ne contient qu'une carte à la fois. Avant chaque clic sur « Suivant », devine ce qu'elle contiendra. Combien de fois son contenu est-il remplacé ?
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu mets la première carte, 3, dans la case « record ».
        cases: ['3', '6', '2', '8', '3']
        actifs: [0, 4]
        etiquettes: { 4: record }
      - legende: 'Tu compares la carte suivante à « record » : 6 est plus grand que 3.'
        cases: ['3', '6', '2', '8', '3']
        actifs: [1, 4]
        etiquettes: { 1: comparée, 4: record }
      - legende: Tu remplaces 3 par 6 dans la case « record ».
        cases: ['3', '6', '2', '8', '6']
        actifs: [1, 4]
        etiquettes: { 1: comparée, 4: record }
      - legende: 'Tu compares la carte suivante à « record » : 2 est plus petit que 6, la case garde 6.'
        cases: ['3', '6', '2', '8', '6']
        actifs: [2, 4]
        etiquettes: { 2: comparée, 4: record }
      - legende: 'Tu compares la carte suivante à « record » : 8 est plus grand que 6.'
        cases: ['3', '6', '2', '8', '6']
        actifs: [3, 4]
        etiquettes: { 3: comparée, 4: record }
      - legende: Tu remplaces 6 par 8 dans la case « record ».
        cases: ['3', '6', '2', '8', '8']
        actifs: [3, 4]
        etiquettes: { 3: comparée, 4: record }
      - legende: 'Il ne reste aucune carte : la case « record » contient 8, la plus grande carte.'
        cases: ['3', '6', '2', '8', '8']
        actifs: [4]
        etiquettes: { 4: record }
exercices:
  - type: saisie
    consigne: Un capteur mesure la température chaque heure. Après chaque mesure, il remplace la valeur de la variable « température » par la mesure. Il mesure 14, puis 17, puis 15. Que contient « température » après la troisième mesure ?
    verif: [rogner, { nombre: 15 }]
    solution: '15'
    contre_exemples: ['17', '14', '46']
    retour: Chaque mesure remplace la précédente, et l'ancienne valeur est effacée. La variable ne garde ni la plus grande mesure ni leur somme, seulement la dernière mise dedans.
  - type: choix
    consigne: "La variable « score » contient 7. Une étape remplace sa valeur par 10. L'étape suivante compare 12 à « score ». Que contient « score » après ces deux étapes ?"
    options:
      - texte: '10'
        correct: true
      - texte: '7'
        retour: Tu as gardé l'ancienne valeur. Remplacer efface la valeur d'avant et met 10 à sa place. Ensuite, comparer lit 10 sans le changer.
      - texte: '12'
        retour: Comparer lit la valeur de la variable, sans la remplacer. Après la première étape, « score » contient 10, et aucune étape ne met 12 dedans.
  - type: choix
    consigne: 'La variable « âge » contient 30. Une étape dit : compare 25 à « âge ». Que contient « âge » après cette étape ?'
    options:
      - texte: '30'
        correct: true
      - texte: '25'
        retour: Comparer lit la valeur de la variable, sans la remplacer. Aucune étape n'a mis 25 dans « âge ».
      - texte: 30 et 25
        retour: Une variable contient une seule valeur à la fois. Ici, aucune étape n'a remplacé 30, et comparer ne fait que lire.
  - type: saisie
    consigne: Pour trouver la plus petite note d'une liste, tu mets la première note dans la variable « plus petite ». Puis, pour chaque note suivante, tu remplaces la valeur de « plus petite » par cette note si elle est plus petite que la valeur de « plus petite ». Avec les notes 14, 9, 12, 6, 3, combien de fois remplaces-tu la valeur de « plus petite », sans compter la première note mise dedans ?
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['4', '5', '2']
    retour: 'Suis la valeur note après note : 14, puis 9 remplace 14, 12 ne remplace rien, 6 remplace 9, 3 remplace 6. Seules les notes plus petites que la valeur du moment la remplacent.'
---

La case « record » n'a jamais contenu qu'une carte. Son contenu a été remplacé deux fois :
3 par 6, puis 6 par 8.

![Avant : la case « record » contient 6. Une flèche « remplacer par 8 » mène à après : elle contient 8, et 6 est effacé.](schema:remplacer)

Cette case est une
[**variable**](note "Le mot dit que sa valeur peut varier d'une étape à l'autre.") : une
case qui porte un nom et contient une valeur. Sa valeur, c'est ce que la case contient,
ici une carte. Dans l'[algorithme](brique:algo/algorithme) qui cherche la plus grande
carte, la « carte retenue » en jouait déjà le rôle : il ne lui manquait qu'un nom.

Trois règles :

- une variable porte un **nom**, pour que chaque étape dise de quelle valeur elle parle.
  On l'écrit entre guillemets, pour ne pas le confondre avec les mots de la phrase ;
- elle contient **une seule valeur** à la fois, sinon l'étape qui compare une carte à
  « record » ne saurait pas à quelle valeur la comparer ;
- **remplacer** sa valeur efface l'ancienne.

Lire une variable ne la change pas : comparer une carte à « record » laisse sa valeur
intacte.

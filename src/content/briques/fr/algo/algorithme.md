---
titre: L'algorithme
resume: Un algorithme est une suite d'étapes précises, suivies dans l'ordre, qui mène au résultat quelles que soient les données de départ. Il se termine toujours.
niveau: haut
acquis:
  - Dérouler pas à pas un algorithme donné sur un exemple.
  - Reconnaître une consigne trop vague pour être une étape d'algorithme.
manipulation:
  consigne: Tu ne peux retenir qu'une seule carte à la fois. Comment trouver la plus grande carte de la rangée ?
  widget: pas-a-pas
  params:
    etapes:
      - legende: On retient la première carte.
        cases: ['4', '9', '2', '7']
        actifs: [0]
        etiquettes: { 0: retenue }
      - legende: On compare la carte suivante à la carte retenue. 9 est plus grand que 4.
        cases: ['4', '9', '2', '7']
        actifs: [0, 1]
        etiquettes: { 0: retenue, 1: comparée }
      - legende: La plus grande des deux devient la carte retenue. On écarte l'autre.
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: retenue }
      - legende: On compare la carte suivante à la carte retenue. 2 est plus petit que 9.
        cases: ['4', '9', '2', '7']
        actifs: [1, 2]
        ecartes: [0]
        etiquettes: { 1: retenue, 2: comparée }
      - legende: La carte retenue reste la plus grande. On écarte l'autre.
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0, 2]
        etiquettes: { 1: retenue }
      - legende: On compare la carte suivante à la carte retenue. 7 est plus petit que 9.
        cases: ['4', '9', '2', '7']
        actifs: [1, 3]
        ecartes: [0, 2]
        etiquettes: { 1: retenue, 3: comparée }
      - legende: Il ne reste aucune carte à comparer. La carte retenue est la plus grande de la rangée.
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0, 2, 3]
        etiquettes: { 1: la plus grande }
exercices:
  - type: saisie
    consigne: On cherche la plus grande carte de la rangée 3, 8, 5. On a retenu la première carte, 3, puis on lui a comparé la carte suivante, 8. Quelle carte retient-on maintenant ?
    verif: [rogner, { nombre: 8 }]
    solution: '8'
    contre_exemples: ['3', '5']
    retour: Après chaque comparaison, on retient la plus grande des deux cartes. Compare 8 à la carte retenue, 3. La carte 5 n'a pas encore été regardée.
  - type: choix
    consigne: Laquelle de ces consignes est assez précise pour être une étape d'algorithme ?
    options:
      - texte: Compare la carte suivante à la carte retenue et garde la plus grande des deux.
        correct: true
      - texte: Regarde les cartes et choisis la meilleure.
        retour: « La meilleure » n'est pas défini, et la consigne ne dit pas dans quel ordre regarder les cartes. Deux personnes pourraient faire deux choses différentes.
      - texte: Trouve la plus grande carte.
        retour: C'est le but à atteindre, pas une étape. La consigne ne dit pas comment s'y prendre.
  - type: choix
    consigne: Tu indiques un trajet à quelqu'un qui ne connaît pas la ville. Quelle indication suit l'idée d'algorithme ?
    options:
      - texte: Prends la deuxième rue à droite, puis avance jusqu'au premier feu.
        correct: true
      - texte: Va vers le centre, tu verras bien.
        retour: « Tu verras bien » laisse la personne décider seule. Une étape d'algorithme dit exactement quoi faire.
      - texte: Suis la rue la plus agréable.
        retour: « Agréable » dépend de chacun. Une étape d'algorithme donne le même résultat, quelle que soit la personne qui la suit.
  - type: saisie
    consigne: On cherche la plus grande carte de la rangée 6, 2, 9, 4, 9 avec le même procédé, en retenant d'abord la première carte. Combien de comparaisons fait-on avant de s'arrêter ?
    verif: [rogner, { nombre: 4 }]
    solution: '4'
    contre_exemples: ['5', '2', '3']
    retour: La première carte est retenue sans comparaison. Chacune des cartes suivantes est comparée une seule fois à la carte retenue. Compte les cartes qui suivent la première.
---

Tu viens de trouver la plus grande carte sans jamais hésiter : à chaque moment, une
seule action était possible. Ce procédé est un **algorithme**.

Un algorithme est une suite d'**étapes précises**, à suivre **dans l'ordre**, qui mène
au résultat. Trois choses le distinguent d'un simple conseil :

- chaque étape dit exactement quoi faire, sans rien laisser à l'appréciation ;
- il fonctionne pour toutes les données de départ, pas seulement pour cet exemple : la
  même suite d'étapes trouve la plus grande carte de n'importe quelle rangée ;
- il se termine : ici, quand il ne reste plus de carte à comparer.

Un ordinateur ne devine rien. Programmer, c'est lui donner un algorithme écrit dans un
langage qu'il sait suivre.

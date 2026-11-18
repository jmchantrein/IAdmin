---
titre: L'algorithme
resume: Un algorithme est une suite d'étapes précises, suivies dans l'ordre, qui mène au résultat cherché quelle que soit la situation de départ. Il doit se terminer pour donner ce résultat.
niveau: haut
acquis:
  - Dérouler pas à pas un algorithme donné sur un exemple.
  - Reconnaître une consigne trop vague pour être une étape d'algorithme.
  - Calculer combien de comparaisons il faut pour trouver la plus grande carte d'une rangée.
manipulation:
  consigne: Tu ne peux retenir qu'une seule carte à la fois. Avant chaque clic sur « Suivant », devine quelle carte sera retenue. Combien de comparaisons faut-il pour trouver la plus grande ?
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu retiens la première carte.
        cases: ['4', '9', '2', '7']
        actifs: [0]
        etiquettes: { 0: retenue }
      - legende: 'Tu compares la carte suivante à la carte retenue : 9 est plus grand que 4.'
        cases: ['4', '9', '2', '7']
        actifs: [0, 1]
        etiquettes: { 0: retenue, 1: comparée }
      - legende: Tu retiens la plus grande des deux et tu écartes l'autre.
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: retenue }
      - legende: 'Tu compares la carte suivante à la carte retenue : 2 est plus petit que 9.'
        cases: ['4', '9', '2', '7']
        actifs: [1, 2]
        ecartes: [0]
        etiquettes: { 1: retenue, 2: comparée }
      - legende: Tu retiens la plus grande des deux et tu écartes l'autre.
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0, 2]
        etiquettes: { 1: retenue }
      - legende: 'Tu compares la carte suivante à la carte retenue : 7 est plus petit que 9.'
        cases: ['4', '9', '2', '7']
        actifs: [1, 3]
        ecartes: [0, 2]
        etiquettes: { 1: retenue, 3: comparée }
      - legende: Tu retiens la plus grande des deux et tu écartes l'autre.
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0, 2, 3]
        etiquettes: { 1: retenue }
      - legende: 'Il ne reste aucune carte à comparer : la carte retenue est la plus grande de la rangée.'
        cases: ['4', '9', '2', '7']
        actifs: [1]
        ecartes: [0, 2, 3]
        etiquettes: { 1: la plus grande }
exercices:
  - type: saisie
    consigne: Tu cherches la plus grande carte de la rangée 3, 8, 9. Tu as retenu la première carte, 3, puis tu lui as comparé la carte suivante, 8. Quelle carte retiens-tu maintenant ?
    verif: [rogner, { nombre: 8 }]
    solution: '8'
    contre_exemples: ['3', '9']
    retour: Après chaque comparaison, tu retiens la plus grande des deux cartes. Compare 8 à la carte retenue, 3. La carte 9 est plus grande, mais elle n'a pas encore été comparée. Tu ne peux donc pas encore la retenir.
  - type: choix
    consigne: Laquelle de ces consignes est assez précise pour être une étape d'algorithme ?
    options:
      - texte: Retiens la carte comparée si elle est plus grande que la carte retenue.
        correct: true
      - texte: Regarde les cartes et choisis la meilleure.
        retour: « La meilleure » n'est pas défini, et la consigne ne dit pas dans quel ordre regarder les cartes. Deux personnes pourraient faire deux choses différentes.
      - texte: Trouve la plus grande carte.
        retour: C'est le but à atteindre, pas une étape. La consigne dit quoi obtenir, pas comment faire.
  - type: choix
    consigne: Tu indiques un trajet à quelqu'un qui ne connaît pas la ville. Quelle indication est assez précise pour être suivie sans hésiter ?
    options:
      - texte: Prends la deuxième rue à droite.
        correct: true
      - texte: Continue un moment, puis tourne à droite.
        retour: « Un moment » ne se mesure pas. Une personne tournera après dix mètres, une autre après un kilomètre. Une étape précise donne le même résultat pour tout le monde.
      - texte: Rejoins la gare.
        retour: C'est le but du trajet, pas une étape. L'indication dit où arriver, pas par où passer.
  - type: saisie
    consigne: Pour trouver la plus grande carte d'une rangée, tu retiens la première carte, puis tu compares chaque carte suivante à la carte retenue et tu gardes la plus grande des deux. Avec la rangée 5, 8, 3, 6, 9, quelle carte retiens-tu après la troisième comparaison ?
    verif: [rogner, { nombre: 8 }]
    solution: '8'
    contre_exemples: ['9', '6', '3', '5']
    retour: Déroule une comparaison à la fois. D'abord 8 contre 5, puis 3 contre la carte retenue, puis 6 contre la carte retenue. À ce moment-là, la carte 9 n'a pas encore été comparée.
  - type: saisie
    consigne: Pour trouver la plus grande carte d'une rangée, tu retiens la première carte, puis tu compares chaque carte suivante, une seule fois, à la carte retenue. Combien de comparaisons fais-tu pour une rangée de 6 cartes ?
    verif: [rogner, { nombre: 5 }]
    solution: '5'
    contre_exemples: ['6', '3', '15']
    retour: La première carte est retenue sans comparaison. Chacune des autres cartes est comparée une seule fois à la carte retenue, jamais aux cartes écartées. Compte les cartes qui suivent la première.
plus_loin:
  - question: D'où vient le mot « algorithme » ?
    reponse: Il vient d'« algorisme », un mot qui remonte, par l'espagnol, à l'arabe Al-Khuwarizmi, le surnom d'un mathématicien. On le trouve en français au XIIIe siècle, sous la forme « augorisme ». Sa forme actuelle a été modifiée sous l'influence du mot grec « arithmos », qui veut dire « nombre ».
    source: https://dictionnaire-academie.fr/article/A9A1163
---

Tu as trouvé la plus grande carte en trois comparaisons, en répétant le
même geste. Ce procédé est un **algorithme** : une suite d'étapes précises, à suivre dans
l'ordre.

Le voici :

1. Retiens la première carte.
2. Compare la carte suivante à la carte retenue, et retiens la plus grande des deux. Si
   elles sont égales,
   [garde la carte retenue](note "Les deux cartes ont la même valeur : garder l'une ou l'autre donne le même résultat. L'étape choisit quand même, pour que personne n'ait à hésiter.").
3. Recommence l'étape 2 tant qu'il reste une carte que tu n'as pas comparée.
4. La carte retenue est la plus grande.

![Une rangée de 4 cartes et une de 6 cartes passent par les mêmes étapes. Chacune en sort avec sa plus grande carte : 9 et 8.](schema:rangees)

Écrit une fois, il sert pour toute rangée. Trois règles le définissent :

- chaque étape dit **comment faire**, pas seulement quoi obtenir : deux personnes qui le
  suivent font la même chose ;
- l'ordre est fixé, car chaque étape se sert de la précédente ;
- il **se termine**, sinon pas de résultat : une comparaison par
  carte, sauf pour la première.

Un ordinateur ne devine rien : il lui faut des étapes aussi précises.

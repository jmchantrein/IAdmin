---
titre: La recherche linéaire
resume: La recherche linéaire compare les cartes d'une rangée une à une, dans l'ordre, à la valeur cherchée, et s'arrête dès qu'elle la trouve. Au pire, elle fait autant de comparaisons que de cartes.
niveau: haut
acquis:
  - Dérouler une recherche linéaire en comptant ses comparaisons.
  - Calculer le nombre de comparaisons d'une recherche linéaire au pire.
  - Reconnaître à quel moment la recherche peut conclure que la valeur est absente.
requiert:
  - algo/boucle
voir_aussi:
  - algo/recherche-dichotomique
manipulation:
  consigne: Tu compares les cartes à la carte cherchée, une à une, depuis la gauche. Avant chaque clic sur « Suivant », devine si tu vas t'arrêter. Combien de comparaisons faut-il pour trouver 6, puis pour savoir que 5 n'y est pas ?
  widget: pas-a-pas
  params:
    etapes:
      - legende: Tu cherches 6. Tu n'as encore comparé aucune carte.
        cases: ['7', '2', '9', '6', '4']
      - legende: "Tu compares la première carte à 6 : 7 n'est pas 6."
        cases: ['7', '2', '9', '6', '4']
        actifs: [0]
        etiquettes: { 0: comparée }
      - legende: "Tu passes à la carte suivante : 2 n'est pas 6."
        cases: ['7', '2', '9', '6', '4']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: comparée }
      - legende: "Tu passes à la carte suivante : 9 n'est pas 6."
        cases: ['7', '2', '9', '6', '4']
        actifs: [2]
        ecartes: [0, 1]
        etiquettes: { 2: comparée }
      - legende: "Tu passes à la carte suivante : c'est 6. Tu t'arrêtes, sans regarder la dernière carte."
        cases: ['7', '2', '9', '6', '4']
        actifs: [3]
        ecartes: [0, 1, 2]
        etiquettes: { 3: trouvée }
      - legende: Tu cherches maintenant 5 dans la même rangée, en repartant de la première carte.
        cases: ['7', '2', '9', '6', '4']
      - legende: "Tu compares la première carte à 5 : 7 n'est pas 5."
        cases: ['7', '2', '9', '6', '4']
        actifs: [0]
        etiquettes: { 0: comparée }
      - legende: "Tu passes à la carte suivante : 2 n'est pas 5."
        cases: ['7', '2', '9', '6', '4']
        actifs: [1]
        ecartes: [0]
        etiquettes: { 1: comparée }
      - legende: "Tu passes à la carte suivante : 9 n'est pas 5."
        cases: ['7', '2', '9', '6', '4']
        actifs: [2]
        ecartes: [0, 1]
        etiquettes: { 2: comparée }
      - legende: "Tu passes à la carte suivante : 6 n'est pas 5."
        cases: ['7', '2', '9', '6', '4']
        actifs: [3]
        ecartes: [0, 1, 2]
        etiquettes: { 3: comparée }
      - legende: "Tu passes à la dernière carte : 4 n'est pas 5."
        cases: ['7', '2', '9', '6', '4']
        actifs: [4]
        ecartes: [0, 1, 2, 3]
        etiquettes: { 4: comparée }
      - legende: "Il ne reste aucune carte : 5 n'est pas dans la rangée."
        cases: ['7', '2', '9', '6', '4']
        ecartes: [0, 1, 2, 3, 4]
exercices:
  - type: saisie
    consigne: "Tu cherches le prénom Léa dans cette liste : Marc, Inès, Léa, Paul, Léa, Hugo. Tu compares les prénoms un à un à Léa, depuis le premier, et tu t'arrêtes dès que tu le trouves. Combien de comparaisons fais-tu ?"
    verif: [rogner, { nombre: 3 }]
    solution: '3'
    contre_exemples: ['6', '5', '2']
    retour: Marc et Inès ne sont pas Léa, puis le troisième prénom l'est. Cette troisième comparaison compte, car c'est elle qui trouve. La recherche s'arrête là, sans aller jusqu'au bout de la liste ni chercher la deuxième Léa.
  - type: choix
    consigne: Tu cherches la carte 7 dans la rangée 3, 9, 4, 1, 6, en comparant les cartes une à une depuis la première. À quel moment peux-tu affirmer que 7 n'est pas dans la rangée ?
    options:
      - texte: Après avoir comparé les 5 cartes.
        correct: true
      - texte: Dès la deuxième carte, 9, car elle est plus grande que 7.
        retour: Les cartes ne vont pas de la plus petite à la plus grande ici, puisque 4 vient après 9. Une carte 7 pourrait donc se trouver plus loin. Seule la comparaison de toutes les cartes permet de conclure.
      - texte: Après la première comparaison, car 3 n'est pas 7.
        retour: Une comparaison ne renseigne que sur la carte comparée. Les quatre autres pourraient encore être 7. Pour dire qu'une valeur est absente, il faut avoir comparé toutes les cartes.
  - type: saisie
    consigne: Une étagère porte 40 livres, rangés sans ordre. Tu cherches un titre en comparant les livres un à un depuis la gauche, et tu t'arrêtes dès que tu le trouves. Au pire, c'est-à-dire dans le cas qui demande le plus de comparaisons, combien de livres compares-tu ?
    verif: [rogner, { nombre: 40 }]
    solution: '40'
    contre_exemples: ['39', '20', '1', '41']
    retour: Le pire arrive quand le titre est le dernier livre ou n'est pas sur l'étagère. Dans les deux cas, chaque livre est comparé une fois, le dernier compris, puisqu'il pourrait être le bon. D'où une comparaison par livre.
  - type: saisie
    consigne: Ta liste de courses compte 8 articles. Tu y cherches d'abord le pain, qui n'y figure pas, puis le lait, qui est le troisième article. Chaque fois, tu compares les articles un à un depuis le premier, et tu t'arrêtes dès que tu trouves. Combien de comparaisons fais-tu en tout ?
    verif: [rogner, { nombre: 11 }]
    solution: '11'
    contre_exemples: ['3', '8', '10', '16']
    retour: Le pain est absent, tu ne le sais qu'après avoir comparé les 8 articles. Le lait est trouvé à la troisième comparaison, et tu t'arrêtes. En tout, 8 plus 3 font 11.
---

Tu as trouvé 6 en 4 comparaisons, puis tu t'es arrêté. Pour savoir que 5 n'y est pas,
il en a fallu 5.

Ce procédé est la
**recherche [linéaire](note "Le mot vient de « ligne » : tu avances le long de la rangée, une carte après l'autre, sans en sauter aucune.")**.
Son [algorithme](brique:algo/algorithme) :

1. Compare la première carte à la valeur cherchée.
2. Si la carte vaut la valeur cherchée, tu as trouvé : arrête-toi, la suite ne changerait
   rien.
3. Sinon, s'il reste une carte, compare la suivante et recommence l'étape 2. S'il n'en
   reste aucune, la valeur est absente.

L'étape 3 forme une [boucle](brique:algo/boucle) : chaque tour avance d'une carte, elle
s'arrête donc au bout de la rangée.

**Au pire**, c'est-à-dire dans le cas qui demande le plus de comparaisons, il en faut
autant que de cartes :

![Trois rangées de 6 cartes. Valeur en premier : 1 comparaison. Valeur en dernier : 6 comparaisons. Valeur absente : les 6 cartes comparées, 6 comparaisons.](schema:cas)

Pour conclure que la valeur est absente, il faut avoir tout comparé : une carte oubliée
pourrait être la bonne. En échange, la méthode marche sur une rangée en désordre,
puisqu'elle ne saute aucune carte.

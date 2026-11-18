---
titre: La recherche dichotomique
resume: Sur des cartes triées, de la plus petite à la plus grande, la recherche dichotomique compare la valeur cherchée à la carte du milieu, puis garde la moitié qui peut la contenir. Au pire, doubler les cartes n'ajoute qu'une comparaison.
niveau: haut
acquis:
  - Dérouler une recherche dichotomique en donnant la carte du milieu comparée et les cartes qui restent.
  - Calculer le nombre de comparaisons d'une recherche dichotomique au pire.
  - Reconnaître une rangée sur laquelle la recherche dichotomique ne s'applique pas.
requiert:
  - algo/recherche-lineaire
voir_aussi:
  - donnees/information
manipulation:
  consigne: Les cartes vont de la plus petite à la plus grande, et tu compares d'abord la carte du milieu. Avant chaque clic sur « Suivant », devine quelles cartes seront écartées. Combien de comparaisons faut-il pour trouver 8 ?
  widget: pas-a-pas
  params:
    colonnes: 7
    etapes:
      - legende: Les 7 cartes vont de la plus petite à la plus grande. Tu cherches 8.
        cases: ['2', '3', '5', '6', '8', '9', '10']
      - legende: 'Tu compares 8 à la carte du milieu : 8 est plus grand que 6.'
        cases: ['2', '3', '5', '6', '8', '9', '10']
        actifs: [3]
      - legende: 'La carte 6 et celles à sa gauche sont plus petites que 8 : tu les écartes.'
        cases: ['2', '3', '5', '6', '8', '9', '10']
        ecartes: [0, 1, 2, 3]
      - legende: 'Tu compares 8 à la carte du milieu de celles qui restent : 8 est plus petit que 9.'
        cases: ['2', '3', '5', '6', '8', '9', '10']
        actifs: [5]
        ecartes: [0, 1, 2, 3]
      - legende: 'La carte 9 et celle à sa droite sont plus grandes que 8 : tu les écartes.'
        cases: ['2', '3', '5', '6', '8', '9', '10']
        ecartes: [0, 1, 2, 3, 5, 6]
      - legende: "Tu compares 8 à la seule carte qui reste : c'est 8, tu l'as trouvé."
        cases: ['2', '3', '5', '6', '8', '9', '10']
        actifs: [4]
        ecartes: [0, 1, 2, 3, 5, 6]
exercices:
  - type: saisie
    consigne: "Des dossiers sont rangés par numéro, du plus petit au plus grand : 104, 117, 125, 138, 142, 156, 163. Tu cherches le numéro 142 en comparant d'abord au dossier du milieu, 138 : 142 est plus grand. Tu écartes 138 et les dossiers à sa gauche. À quel numéro compares-tu 142 ensuite ?"
    verif: [rogner, { nombre: 156 }]
    solution: '156'
    contre_exemples: ['142', '117', '163', '125']
    retour: Il reste 142, 156 et 163. Le dossier du milieu de ces trois-là est 156, c'est lui que tu compares. Tu ne passes pas au dossier suivant comme dans une recherche une à une, et tu ne reviens pas vers les dossiers écartés.
  - type: choix
    consigne: 'Des livres sont rangés du moins épais au plus épais : 90, 120, 150, 210, 260, 300 et 340 pages. Tu cherches le livre de 150 pages. Tu le compares au livre du milieu, celui de 210 pages : 150 est plus petit. Quels livres restent à examiner ?'
    options:
      - texte: Les livres de 90, 120 et 150 pages.
        correct: true
      - texte: Les livres de 260, 300 et 340 pages.
        retour: Tu as gardé la mauvaise moitié. 150 est plus petit que 210, et les livres sont rangés du moins épais au plus épais. Le livre cherché ne peut donc être qu'à gauche du livre du milieu.
      - texte: Les livres de 90, 120, 150 et 210 pages.
        retour: Le livre de 210 pages a déjà été comparé, et ce n'est pas celui que tu cherches. Tu l'écartes avec les livres de sa droite. Il reste les trois livres à sa gauche.
  - type: choix
    consigne: Tu veux chercher la carte 15 par recherche dichotomique. Avec une rangée de 5 cartes, la carte du milieu est la troisième. Dans laquelle de ces rangées la recherche est-elle sûre de trouver 15 ?
    options:
      - texte: 2, 7, 12, 15, 30
        correct: true
      - texte: 2, 7, 30, 15, 21
        retour: Cette rangée n'est pas triée. La carte du milieu est 30, et 15 est plus petit. Tu écarterais donc 30 et les cartes à sa droite, parmi lesquelles se trouve 15. Seule une rangée triée garantit que la valeur n'est pas du côté écarté.
      - texte: 21, 2, 7, 15, 30
        retour: "Ici, la recherche trouverait 15, mais par chance : la rangée n'est pas triée, puisque 21 vient avant 2. Si 15 s'était trouvé à gauche de 7, la carte du milieu, tu l'aurais écarté. Seule une rangée triée garantit que la valeur n'est pas du côté écarté."
  - type: saisie
    consigne: Une rangée triée compte 63 cartes. Chaque comparaison à la carte du milieu écarte cette carte et la moitié des autres. Tu t'arrêtes quand tu trouves la valeur, ou quand il ne reste plus aucune carte. Au pire, c'est-à-dire dans le cas qui demande le plus de comparaisons, combien en fais-tu ?
    verif: [rogner, { nombre: 6 }]
    solution: '6'
    contre_exemples: ['32', '31', '63', '5', '7']
    retour: "Suis le nombre de cartes qui restent avant chaque comparaison : 63, 31, 15, 7, 3, puis 1, soit 6 comparaisons. Ce n'est pas le nombre de comparaisons qui est divisé par deux, c'est la rangée restante, à chaque comparaison."
plus_loin:
  - question: D'où vient le mot « dichotomique » ?
    reponse: Il vient de « dichotomie », un mot emprunté au grec au XVIIIe siècle. Le mot grec « dikhotomia » veut dire « division en deux parties égales ». Dans cette recherche, chaque comparaison divise les cartes qui restent en deux parties égales ou presque.
    source: https://dictionnaire-academie.fr/article/A9D2403
---

Tu as trouvé 8 en 3 comparaisons, contre 5 en
[recherche linéaire](brique:algo/recherche-lineaire).

C'est la **recherche dichotomique** :

1. [Compare](note "Une comparaison donne l'une de trois réponses : égale, plus petite ou plus grande. Elle compte pour une seule comparaison.")
   la valeur cherchée à la carte du milieu de celles qui restent. Entre deux cartes du
   milieu, prends celle de
   [gauche](note "Une rangée d'un nombre pair de cartes en a deux au milieu. Les deux choix marchent, mais l'étape en fixe un, pour que personne n'hésite.").
2. Si cette carte vaut la valeur cherchée, arrête-toi.
3. Si la valeur est plus petite, écarte la carte du milieu et celles à sa droite ; si elle
   est plus grande, écarte la carte du milieu et celles à sa gauche.
4. Tant qu'il reste une carte, recommence à l'étape 1. Sinon, la valeur est absente.

Elle exige une rangée
**[triée](note "Le prix : trier demande bien plus de comparaisons qu'une recherche linéaire. Cela ne paie que si tu cherches souvent dans la même rangée.")**,
de la plus petite carte à la plus grande. Sinon, la valeur pourrait se trouver du côté
écarté.

![Quatre rangées de 15 cartes. À chaque comparaison avec la carte du milieu, au moins la moitié des cartes restantes est écartée : il en reste 7, puis 3, puis 1.](schema:moities)

Chaque comparaison écarte au moins la moitié des cartes qui restent. Avec deux fois plus de
cartes, une comparaison ramène donc au cas d'avant : au pire, 10 comparaisons pour 1 000
cartes.

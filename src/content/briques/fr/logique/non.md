---
titre: NON
resume: "Une opération logique calcule une valeur de vérité, sa sortie, à partir d'autres, ses entrées. La plus simple, NON, a une seule entrée. NON inverse la valeur de son entrée : NON 0 vaut 1, NON 1 vaut 0."
niveau: bas
acquis:
  - Calculer la sortie de NON à partir de la valeur de son entrée.
  - Reconnaître l'affirmation qui dit le contraire d'une autre, et donner sa valeur avec NON.
requiert:
  - logique/vrai-faux
manipulation:
  consigne: Bascule l'interrupteur A plusieurs fois et regarde la lampe NON. Pour quelle position de A la lampe NON s'éteint-elle ?
  widget: porte
  params: { portes: [non] }
exercices:
  - type: choix
    consigne: "« Le magasin est ouvert » vaut 0. Que vaut l'affirmation « le magasin est fermé » ?"
    options:
      - texte: 1, car elle dit le contraire de l'autre, et NON inverse 0 en 1.
        correct: true
      - texte: 0, car NON donne toujours 0.
        retour: "NON ne donne pas toujours 0 : il inverse son entrée. « Le magasin est fermé » dit le contraire de « le magasin est ouvert », c'est NON de cette affirmation. Son entrée vaut 0, sa sortie vaut donc 1."
      - texte: 0, car les deux phrases parlent du même magasin, elles ont la même valeur.
        retour: "Elles parlent du même magasin, mais l'une dit le contraire de l'autre : « le magasin est fermé » est NON « le magasin est ouvert ». NON inverse la valeur de son entrée, 0, et donne 1."
  - type: choix
    consigne: "« 9 est plus petit que 4 » vaut 0. Applique NON à cette affirmation : tu obtiens « 9 n'est pas plus petit que 4 ». Applique encore NON à cette nouvelle affirmation. Que vaut le résultat ?"
    options:
      - texte: 0, car le premier NON inverse 0 en 1, puis le second inverse ce 1 en 0.
        correct: true
      - texte: 1, car deux NON disent le contraire encore plus fort qu'un seul.
        retour: 'Chaque NON inverse une fois. Le premier change 0 en 1, le second change ce 1 en 0 : tu retrouves la valeur de départ. Dire deux fois le contraire revient à redire « 9 est plus petit que 4 ».'
      - texte: 0, car NON donne toujours 0.
        retour: "La valeur est juste, mais pas la raison. NON inverse son entrée : le premier NON a donné 1, puisque son entrée valait 0. C'est le second qui inverse ce 1 en 0."
  - type: saisie
    consigne: "Un capteur note si une salle est occupée : 1 pour oui, 0 pour non. Sur cinq heures, il note 1, 1, 0, 1, 0. Une lampe « libre » montre NON « la salle est occupée ». Prédis ses cinq valeurs, dans l'ordre, sans espace."
    verif: [rogner, sans_espaces, { egal: '00101' }]
    solution: '00101'
    contre_exemples: ['11010', '00000', '10100', '0010']
    retour: 'NON inverse chaque valeur : 1 devient 0, 0 devient 1. Les notes 1, 1, 0, 1, 0 donnent donc 0, 0, 1, 0, 1. NON ne donne pas toujours 0, et il faut une valeur par heure, cinq en tout.'
---

La lampe NON s'est éteinte quand tu as allumé A, et rallumée quand tu l'as éteint : elle
fait toujours le contraire de A.

L'interrupteur A donne une [valeur de vérité](brique:logique/vrai-faux), `0` ou `1`. Une
**opération** logique calcule une valeur de vérité, sa **sortie**, à partir d'autres, ses
**entrées**. Une entrée peut venir d'un interrupteur, comme A, ou d'une affirmation. La
lampe NON montre la sortie de l'opération **NON**.

NON est la plus simple : elle a une seule entrée et l'**inverse**, c'est-à-dire qu'elle
donne l'autre valeur. NON `0` vaut `1`, NON `1` vaut `0`. Sa sortie dépend donc de son
entrée : NON ne donne pas toujours `0`.

Inverser sert à dire le contraire d'une affirmation. NON « il pleut », c'est « il ne pleut
pas » : si « il pleut » vaut `1`, « il ne pleut pas » vaut `0`. Une seule entrée suffit,
car pour dire le contraire d'une affirmation, il ne faut qu'elle.

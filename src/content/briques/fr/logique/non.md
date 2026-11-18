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
      - texte: 1, car un magasin fermé n'est pas ouvert, et NON 0 vaut 1.
        correct: true
      - texte: 0, car elle parle du même magasin que l'autre phrase.
        retour: "Elles parlent du même magasin, mais un magasin fermé n'est pas ouvert : « le magasin est fermé » a pour valeur NON celle de « le magasin est ouvert ». NON inverse 0 et donne 1."
      - texte: On ne sait pas, car l'énoncé ne donne que l'autre phrase.
        retour: "Un magasin est soit ouvert, soit fermé : « le magasin est fermé » est vraie exactement quand l'autre est fausse. Sa valeur est donc NON 0, qui vaut 1."
  - type: choix
    consigne: "Quelle affirmation a toujours pour valeur NON celle de « le train est à l'heure », quel que soit l'horaire du train ?"
    options:
      - texte: « Le train n'est pas à l'heure ».
        correct: true
      - texte: « Le train est en retard ».
        retour: "Pense au train en avance : il n'est pas à l'heure, ni en retard. Les deux affirmations valent alors 0, et NON 0 vaut 1. Seule « le train n'est pas à l'heure » vaut 1 dans ce cas."
      - texte: « Le train est en avance ».
        retour: "Pense au train en retard : il n'est pas à l'heure, ni en avance. Les deux affirmations valent alors 0, et NON 0 vaut 1. Seule « le train n'est pas à l'heure » vaut 1 dans ce cas."
  - type: choix
    consigne: '« 9 est plus petit que 4 » vaut 0. Calcule NON de cette valeur, puis NON du résultat. Que trouves-tu ?'
    options:
      - texte: 0, car NON 0 vaut 1, puis NON 1 vaut 0.
        correct: true
      - texte: 1, car deux NON inversent plus fort qu'un seul.
        retour: 'Chaque NON inverse une fois. Le premier change 0 en 1, le second change ce 1 en 0 : tu retrouves la valeur de départ.'
      - texte: 1, car NON donne 1 à partir de 0.
        retour: 'Tu as calculé un seul NON. NON 0 vaut bien 1, mais il reste à calculer NON de ce résultat : NON 1 vaut 0.'
  - type: saisie
    consigne: "Un capteur note si une salle est occupée : 1 pour oui, 0 pour non. Sur cinq heures, il note 1, 1, 0, 1, 0. Une lampe « libre » montre NON « la salle est occupée ». Prédis ses cinq valeurs, dans l'ordre : écris les cinq chiffres à la suite, comme 10110."
    verif: [rogner, sans_espaces, { regex: '0,?0,?1,?0,?1' }]
    solution: '00101'
    contre_exemples: ['11010', '00000', '10100', '0010', '1,1,0,1,0']
    retour: 'NON inverse chaque valeur : 1 devient 0, 0 devient 1. Les notes 1, 1, 0, 1, 0 donnent donc 0, 0, 1, 0, 1. Il faut une valeur par heure, cinq en tout.'
---

La lampe NON s'est éteinte quand tu as allumé A, et rallumée quand tu l'as éteint.

L'interrupteur A donne un bit, `0` ou `1`, qui note une
[valeur de vérité](brique:logique/vrai-faux). Une **opération** logique calcule une valeur
de vérité, sa **sortie**, à partir d'autres, ses **entrées**. Une entrée peut venir d'un
interrupteur, comme A, ou d'une affirmation. La lampe NON montre la sortie de l'opération
**NON**.

NON est la plus simple : elle a une seule entrée et l'**inverse**, c'est-à-dire qu'elle
donne l'autre valeur. NON `0` vaut `1`, NON `1` vaut `0`.

Le **contraire** d'une affirmation est vrai exactement quand elle est fausse. Il ne
dépend que d'elle : NON a donc une seule entrée. « Il ne pleut pas » a pour valeur NON
celle de « il pleut ». « Ne… pas » forme sûrement le contraire. « Le verre est vide »
n'est pas le contraire de « le verre est plein » : à moitié rempli, les deux sont fausses.

---
titre: Vrai ou faux
resume: Une affirmation est une phrase vraie ou fausse, jamais entre les deux. Cette valeur de vérité tient sur un bit, noté 1 pour vrai et 0 pour faux. Une affirmation fausse a donc une valeur, 0.
niveau: bas
acquis:
  - Reconnaître une affirmation parmi des phrases, et dire si elle est vraie ou fausse.
  - Noter la valeur de vérité d'une affirmation par un bit, 1 pour vrai et 0 pour faux.
  - Distinguer une affirmation fausse d'une affirmation dont on ignore la valeur.
requiert:
  - donnees/bit
voir_aussi:
  - algo/condition
manipulation:
  consigne: "Chaque interrupteur, de gauche à droite, correspond à une phrase : « Une semaine compte sept jours. », « 10 est plus grand que 3. », « 2 + 2 font 5. », « Un triangle a trois côtés. » Allume l'interrupteur d'une phrase qui dit juste, laisse éteint celui d'une phrase qui se trompe. Quelle écriture obtiens-tu ?"
  widget: bascule-bits
  params: { bits: 4 }
exercices:
  - type: choix
    consigne: "Quelle est la valeur de vérité de l'affirmation « Madrid est la capitale de l'Italie » ? On note 1 pour vrai et 0 pour faux."
    options:
      - texte: 0, car elle est fausse.
        correct: true
      - texte: Aucune, car elle est fausse.
        retour: Une affirmation fausse a bien une valeur de vérité, faux, qui se note 0. Seule une phrase qui n'est ni vraie ni fausse, comme une question, n'en a pas.
      - texte: 1, car Madrid est bien une capitale.
        retour: La valeur de vérité porte sur toute la phrase, pas sur un de ses mots. Madrid est la capitale de l'Espagne, pas de l'Italie, donc l'affirmation est fausse et se note 0.
  - type: choix
    consigne: Laquelle de ces phrases est une affirmation ?
    options:
      - texte: Le train de 8 h est parti en retard.
        correct: true
      - texte: Le train de 8 h part-il à l'heure ?
        retour: C'est une question. On ne peut pas dire d'une question qu'elle est vraie ou fausse. Une affirmation, elle, dit quelque chose que l'on peut trancher par vrai ou faux.
      - texte: Prends le train de 8 h.
        retour: C'est un ordre. Il n'est ni vrai ni faux, il demande quelque chose. Une affirmation dit quelque chose que l'on peut trancher par vrai ou faux.
  - type: choix
    consigne: "Tu ne sais pas si l'affirmation « la boulangerie de ta rue est ouverte en ce moment » est vraie. Que peux-tu en dire ?"
    options:
      - texte: Elle est vraie ou fausse, tu ignores seulement laquelle.
        correct: true
      - texte: Elle est fausse, puisque tu ne sais pas.
        retour: Tu confonds « faux » et « je ne sais pas ». La boulangerie est ouverte ou fermée, que tu le saches ou non. Ne pas savoir ne rend pas l'affirmation fausse.
      - texte: Elle n'est ni vraie ni fausse tant que tu ne sais pas.
        retour: Une affirmation est toujours vraie ou fausse, jamais entre les deux. Ce que tu ignores, c'est laquelle des deux valeurs elle a, pas qu'elle en a une.
  - type: saisie
    consigne: 'Tu notes la valeur de vérité de trois affirmations, dans cet ordre, avec 1 pour vrai et 0 pour faux : « 5 est plus petit que 2. », « Une année compte 12 mois. », « Une heure compte 60 minutes. » Quels trois chiffres écris-tu, sans espace ?'
    verif: [rogner, sans_espaces, { egal: '011' }]
    solution: '011'
    contre_exemples: ['100', '11', '111', '110']
    retour: Chaque affirmation reçoit un chiffre, la fausse aussi. 5 n'est pas plus petit que 2, la première est donc fausse et se note 0. Les deux autres sont vraies et se notent 1.
plus_loin:
  - question: D'où vient le mot « booléen » ?
    reponse: En informatique, une valeur qui ne peut être que vrai ou faux s'appelle un booléen. Le mot vient du nom du mathématicien George Boole, qui a été le premier à faire de la logique un calcul, au milieu du XIXe siècle.
    source: https://en.wikipedia.org/wiki/Boolean_data_type
---

Chaque phrase a reçu un chiffre, même celle qui se trompe : « 2 + 2 font 5 » a donné
`0`. Ton écriture est `1101`.

Une phrase qui dit juste ou se trompe est une **affirmation**. Elle est **vraie** ou
**fausse**,
[jamais entre les deux](note 'On garde seulement des phrases assez précises pour être tranchées. « Il fait chaud » dépend de qui parle, « il fait plus de 25 degrés » se tranche. Sinon, deux possibilités ne suffiraient plus.') :
c'est sa **valeur de vérité**. Une question ou un ordre, comme « Ferme la fenêtre », n'est
ni vrai ni faux : ce n'est pas une affirmation.

Avec deux possibilités, la valeur de vérité [tient sur un bit](brique:donnees/bit). On
note `1` pour vrai et `0` pour faux. C'est un choix, l'inverse marcherait aussi. Tout le
monde garde le même, sinon une même écriture se lirait de deux façons. Celui-ci est
commode : compter les `1` revient à compter les affirmations vraies. Ton écriture en a
trois.

Ne pas savoir n'est pas une troisième valeur. « Il pleut à Brest en ce moment » est vraie
ou fausse, même si tu l'ignores.

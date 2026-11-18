---
titre: Vrai ou faux
resume: Une affirmation est une phrase assez précise pour être tranchée, vraie ou fausse. Cette valeur de vérité tient sur un bit, noté 1 pour vrai et 0 pour faux. Une affirmation fausse a donc une valeur, 0.
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
  consigne: "Chaque interrupteur, de gauche à droite, correspond à une phrase : « Une semaine compte sept jours. », « 7 est plus grand que 3. », « 2 + 2 font 5. », « Un triangle a trois côtés. » Allume l'interrupteur d'une phrase qui dit juste, laisse éteint celui d'une phrase qui se trompe. Quelle écriture obtiens-tu ?"
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
      - texte: Une araignée a huit pattes.
        correct: true
      - texte: Combien de pattes une araignée a-t-elle ?
        retour: C'est une question. On ne peut pas dire d'une question qu'elle est vraie ou fausse. Une affirmation, elle, dit quelque chose que l'on peut trancher par vrai ou faux.
      - texte: Compte les pattes de cette araignée.
        retour: C'est un ordre. Il n'est ni vrai ni faux, il demande quelque chose. Une affirmation dit quelque chose que l'on peut trancher par vrai ou faux.
  - type: choix
    consigne: "Tu lances un dé et tu le caches sous ta main sans le regarder. Que peux-tu dire de l'affirmation « le dé montre un 6 » ?"
    options:
      - texte: Elle est vraie ou fausse, tu ignores seulement laquelle.
        correct: true
      - texte: Elle est fausse, puisque tu ne sais pas.
        retour: Tu confonds « faux » et « je ne sais pas ». Le dé montre un 6 ou un autre nombre, que tu le saches ou non. Ne pas savoir ne rend pas l'affirmation fausse.
      - texte: Elle n'est ni vraie ni fausse tant que tu ne sais pas.
        retour: On ne garde que des phrases assez précises pour être tranchées, et celle-ci l'est, sitôt la main levée. Ce que tu ignores, c'est laquelle des deux valeurs elle a, pas qu'elle en a une.
  - type: saisie
    consigne: 'Tu notes la valeur de vérité de trois affirmations, dans cet ordre, avec 1 pour vrai et 0 pour faux : « 5 est plus petit que 2. », « Une année compte 12 mois. », « Une heure compte 60 minutes. » Quels trois chiffres écris-tu, sans espace ?'
    verif: [rogner, sans_espaces, { egal: '011' }]
    solution: '011'
    contre_exemples: ['100', '11', '111', '110']
    retour: Chaque affirmation reçoit un chiffre, la fausse aussi. 5 n'est pas plus petit que 2, la première est donc fausse et se note 0. Les deux autres sont vraies et se notent 1.
plus_loin:
  - question: D'où vient le mot « booléen » ?
    reponse: En informatique, une valeur qui ne peut être que vrai ou faux s'appelle un booléen. Le mot vient du nom du mathématicien George Boole, le premier à définir un système algébrique de la logique, au milieu du XIXe siècle.
    source: https://en.wikipedia.org/wiki/Boolean_data_type
---

Ton écriture est `1101` : même « 2 + 2 font 5 », qui se trompe, a reçu `0`.

Une phrase qui dit juste ou se trompe est une **affirmation**. On ne garde que des phrases
[assez précises pour être tranchées](note '« Il fait chaud » dépend de qui parle, « il fait plus de 25 degrés » se tranche. Sinon, deux possibilités ne suffiraient plus.') :
elle est donc **vraie** ou **fausse**, c'est sa **valeur de vérité**. Une question ou un
ordre n'est ni vrai ni faux : ce n'est pas une affirmation. La réponse oui ou non à une
question est, elle, une affirmation.

Avec deux possibilités, la valeur de vérité [tient sur un bit](brique:donnees/bit) : on
note `1` pour vrai, `0` pour faux. C'est un choix, que tout le monde garde, sinon une
écriture se lirait de deux façons. Il suit le bit, où `1` note déjà la lampe allumée : tu
allumes pour vrai.

Ne pas savoir n'est pas une troisième valeur. « La tour Eiffel mesure plus de 300 mètres »
est vraie ou fausse, même si tu l'ignores.

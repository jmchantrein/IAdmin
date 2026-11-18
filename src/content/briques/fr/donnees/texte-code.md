---
titre: Noter un texte par des codes
resume: Un texte est une suite de caractères, lettres, chiffres, signes et espaces. Chaque caractère porte un code, un nombre fixé par une table que toutes les machines partagent, l'ASCII. A y porte 65, a porte 97.
niveau: bas
acquis:
  - Trouver le code d'un caractère, ou le caractère d'un code, à partir de quelques codes connus de la table ASCII.
  - Compter les octets qu'occupe un texte noté en ASCII.
  - Prévoir ce qui arrive quand deux machines n'emploient pas la même table de codes.
requiert:
  - donnees/octet
manipulation:
  consigne: Quel nombre fait apparaître la lettre A ? Allume d'abord le bit de poids 64, puis ajoute des poids plus petits.
  widget: bascule-bits
  params: { bits: 8, poids: true, caractere: true }
exercices:
  - type: saisie
    consigne: Dans la table ASCII, le caractère « 0 » porte le code 48, et les chiffres de 0 à 9 se suivent dans l'ordre. Quel code porte le caractère « 7 » ?
    verif: [rogner, { nombre: 55 }]
    solution: '55'
    contre_exemples: ['7', '54', '56', '48']
    retour: Le chiffre « 7 » d'un texte est un caractère, son code n'est pas 7. Pars du code de « 0 », 48, et avance d'une place par chiffre, sept fois.
  - type: saisie
    consigne: Dans la table ASCII, A porte le code 65, B le code 66, et les majuscules se suivent dans l'ordre de l'alphabet jusqu'à Z. Une machine reçoit les codes 70, 69 et 85, dans cet ordre. Écris le mot qu'elle affiche.
    verif: [rogner, { egal: 'FEU' }]
    solution: FEU
    contre_exemples: ['EDT', 'UEF', 'feu', 'FDU']
    retour: "A, la première lettre, porte 65. Le code 70 est donc 5 places plus loin : c'est la sixième lettre, F. De même, 69 donne E et 85 donne U, la vingt et unième lettre. Ces codes sont ceux des majuscules : les minuscules ont d'autres codes."
  - type: saisie
    consigne: Un message noté en ASCII contient le texte « Salle 12 ». Combien d'octets occupe-t-il ?
    verif: [rogner, { nombre: 8 }]
    solution: '8'
    contre_exemples: ['7', '2', '6', '64']
    retour: Compte les caractères un par un. « Salle » en compte 5, l'espace 1, et « 12 » en compte 2, car chaque chiffre est un caractère. Chaque caractère occupe un octet.
  - type: choix
    consigne: Une machine compare les mots « Paris » et « paris », notés chacun en ASCII, octet par octet. Que trouve-t-elle ?
    options:
      - texte: Le premier octet diffère, les quatre autres sont égaux.
        correct: true
      - texte: Les deux mots ont exactement les mêmes octets.
        retour: Une majuscule et sa minuscule portent des codes différents, par exemple 65 pour A et 97 pour a. Sinon, la machine ne saurait pas laquelle afficher. P et p diffèrent donc ; les lettres a, r, i et s sont les mêmes dans les deux mots.
      - texte: Tous les octets diffèrent, car un seul des deux mots commence par une majuscule.
        retour: Chaque caractère est noté par son propre code, sans dépendre de ses voisins. Seul le premier caractère change, P contre p ; les lettres a, r, i et s gardent leur code.
  - type: choix
    consigne: Ton ordinateur envoie le mot « CHAT » noté en ASCII. La machine qui le reçoit emploie une autre table de codes, où 65 note la lettre Z. Que va-t-elle afficher ?
    options:
      - texte: Un autre mot que CHAT, car elle lit les codes reçus dans sa propre table.
        correct: true
      - texte: Le mot CHAT, car elle reçoit les mêmes octets.
        retour: Elle reçoit bien les mêmes octets, mais un octet n'est qu'un nombre. La lettre qu'il désigne dépend de la table. Avec sa table, elle lit 65 comme Z, et le A de CHAT devient un Z.
      - texte: Le mot CHAT, car elle reconnaît que les codes viennent de la table ASCII.
        retour: Une machine ne reçoit que des nombres, rien n'indique la table employée par l'autre. Elle lit donc les codes dans sa propre table, où 65 note Z. C'est pourquoi toutes les machines doivent partager la même table.
plus_loin:
  - question: Pourquoi A porte-t-il précisément le code 65 ?
    reponse: C'est un choix du comité américain qui a défini l'ASCII, publié en 1963. Il a réservé les 32 premiers codes à des commandes pour les machines, qui ne s'affichent pas. Il a placé les signes et les chiffres avant les lettres. A a reçu le code 65 pour suivre le projet de la norme britannique correspondante.
    source: https://en.wikipedia.org/wiki/ASCII
  - question: Et les lettres accentuées, comme é ?
    reponse: L'ASCII n'en a pas, car il a été conçu pour l'anglais. D'autres tables, plus grandes, ont été définies ensuite pour les autres langues et écritures. L'une d'elles reprend tels quels les 128 codes de l'ASCII.
    source: https://en.wikipedia.org/wiki/ASCII
---

Avec 65, la lettre A est apparue : 65 est son **code**.

Un texte est une suite de **caractères** : lettres, chiffres, signes, espaces. Chaque
caractère porte un code, et le texte se note par la suite de ces codes. Un code tient
sur un [octet](brique:donnees/octet) : un texte occupe un octet par caractère.

![Le mot Oui : O porte le code 79, u le code 117, i le code 105. Chaque code s'écrit sur un octet : 01001111, 01110101, 01101001.](schema:mot)

La table des codes s'appelle
l'[ASCII](note "Sigle anglais de « code américain normalisé pour l'échange d'informations ».").
Les majuscules s'y suivent dans l'ordre de l'alphabet : B porte 66. La minuscule a
porte 97 : si elle avait le code de A, la machine ne saurait pas laquelle afficher. Le
chiffre « 5 » porte 53, pas 5. L'espace porte 32 ; sans code, les mots se colleraient.

Toutes les machines doivent employer la même table. Sinon, le 65 envoyé pour A
s'afficherait comme une autre lettre à l'arrivée.

Que A porte 65 est un
[choix](note "Le comité qui a défini l'ASCII a réservé les 32 premiers codes à des commandes qui ne s'affichent pas, puis placé les signes et les chiffres avant les lettres. Seuls les codes 32 à 126 donnent un caractère affiché."),
pas une nécessité : une table où A porterait 1 marcherait aussi bien, si toutes les
machines l'adoptaient.

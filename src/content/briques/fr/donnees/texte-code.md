---
titre: Noter un texte par des codes
resume: "Un texte est une suite de caractères, lettres, chiffres, signes et espaces. Chaque caractère porte un code, un nombre fixé par une table de codes ; une table très répandue, l'ASCII, donne 65 à A et 97 à a."
niveau: bas
acquis:
  - Trouver le code d'un caractère, ou le caractère d'un code, à partir de quelques codes connus d'une table.
  - Compter et comparer, caractère par caractère, les octets d'un texte noté en ASCII.
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
    consigne: Une table de codes numérote les majuscules dans l'ordre de l'alphabet, à partir de A = 1 ; B porte 2, C porte 3, et ainsi de suite jusqu'à Z. Une machine qui emploie cette table reçoit les codes 6, 5 et 21, dans cet ordre. Écris le mot qu'elle affiche.
    verif: [rogner, { egal: 'FEU' }]
    solution: FEU
    contre_exemples: ['GFV', 'EDT', 'UEF', 'feu']
    retour: "A, la première lettre, porte 1 : chaque code donne donc la place de la lettre dans l'alphabet. Le code 6 donne la sixième lettre, F ; 5 donne E, et 21 la vingt et unième, U. Ces codes notent des majuscules."
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
  - type: saisie
    consigne: Ton ordinateur envoie le mot « CHAT » noté en ASCII, où A porte 65, B porte 66, et ainsi de suite. La machine qui le reçoit emploie une autre table, où chaque code note la lettre qui suit celle de l'ASCII ; 65 y note B. Écris le mot qu'elle affiche.
    verif: [rogner, minuscules, { egal: 'dibu' }]
    solution: DIBU
    contre_exemples: ['CHAT', 'BGZS', 'chat']
    retour: "Elle reçoit les mêmes octets, mais les octets seuls n'indiquent pas la table employée : elle les lit dans sa propre table. Chaque code y note la lettre qui suit celle de l'ASCII, et non celle qui précède. Le code de C y note D, celui de H note I, et ainsi de suite. C'est pourquoi deux machines qui échangent un texte doivent employer la même table."
plus_loin:
  - question: Pourquoi A porte-t-il précisément le code 65 ?
    reponse: C'est un choix du comité américain qui a défini l'ASCII, publié en 1963. Il a réservé les 32 premiers codes à des commandes pour les machines, qui ne s'affichent pas. Il a placé les signes et les chiffres avant les lettres. A a reçu le code 65 pour suivre le projet de la norme britannique correspondante.
    source: https://en.wikipedia.org/wiki/ASCII
  - question: Et les lettres accentuées, comme é ?
    reponse: L'ASCII n'en a pas, car il a été conçu pour l'anglais. D'autres tables, plus grandes, ont été définies ensuite pour les autres langues et écritures. La plupart reprennent tels quels les 128 codes de l'ASCII.
    source: https://en.wikipedia.org/wiki/ASCII
---

Avec 65, la lettre A est apparue : 65 est son **code**.

Un texte est une suite de **caractères** : lettres, chiffres, signes, espaces. Chaque
caractère porte un code, fixé par une **table** : la liste qui donne à chaque caractère
son code.

Une table très répandue s'appelle
l'[ASCII](note "Sigle anglais de « code américain normalisé pour l'échange d'informations ».").
Elle compte 128 codes, de 0 à 127 : chacun tient sur un [octet](brique:donnees/octet).
Un texte noté en ASCII occupe donc un octet par caractère.

![Le mot Oui : O porte le code 79, u le code 117, i le code 105. Chaque code s'écrit sur un octet : 01001111, 01110101, 01101001.](schema:mot)

Dans l'ASCII, les majuscules se suivent dans l'ordre de l'alphabet, B porte 66 : une
machine trie ainsi des mots en comparant leurs codes. La minuscule a porte 97 : si elle
avait le code de A, la machine ne saurait pas laquelle afficher. Le chiffre « 5 » porte
53, pas 5.

Deux machines qui échangent un texte doivent employer la même table. Sinon, le 65 envoyé
pour A s'afficherait comme une autre lettre à l'arrivée.

---
titre: L'octet
resume: Un octet est un groupe de 8 bits. Ses 256 combinaisons écrivent les nombres de 0 à 255. La taille d'un texte, d'une photo ou d'une mémoire se compte en octets.
niveau: bas
acquis:
  - Dire combien de bits compte un octet et combien de combinaisons il a.
  - Donner le plus grand nombre qu'un groupe de bits peut écrire.
  - Dire si un nombre tient sur un octet.
requiert:
  - donnees/binaire-lire
manipulation:
  consigne: Quel est le plus grand total que tu peux afficher avec ces 8 bits ?
  widget: bascule-bits
  params: { bits: 8, poids: true }
exercices:
  - type: choix
    consigne: Un capteur envoie sa mesure sur un seul octet. Combien de mesures différentes peut-il distinguer ?
    options:
      - texte: '256'
        correct: true
      - texte: '255'
        retour: 255 est le plus grand nombre qu'un octet peut écrire, pas le nombre de ses combinaisons. Il faut compter aussi celle qui écrit 0, ce qui fait 256.
      - texte: '8'
        retour: 8 est le nombre de bits de l'octet. Chaque bit double le nombre de combinaisons, ce qui donne 2, 4, 8, 16, 32, 64, 128, puis 256 pour le huitième bit.
  - type: saisie
    consigne: Un groupe de 5 bits a pour poids 16, 8, 4, 2 et 1. Quel est le plus grand nombre qu'il peut écrire ?
    verif: [rogner, { nombre: 31 }]
    solution: '31'
    contre_exemples: ['32', '5', '16', '255']
    retour: Le plus grand nombre s'obtient en mettant tous les bits à 1. Additionne les cinq poids. Le résultat est un de moins que le nombre de combinaisons, car la première combinaison écrit 0.
  - type: choix
    consigne: Lequel de ces nombres tient sur un seul octet ?
    options:
      - texte: '200'
        correct: true
      - texte: '256'
        retour: Un octet a bien 256 combinaisons, mais elles écrivent les nombres de 0 à 255. Le nombre 256 demande un neuvième bit.
      - texte: '300'
        retour: Le plus grand nombre d'un octet est 255. Pour écrire 300, il faut plus de 8 bits, donc plusieurs octets.
  - type: saisie
    consigne: Un message contient 3 octets. Combien de bits contient-il ?
    verif: [rogner, { nombre: 24 }]
    solution: '24'
    contre_exemples: ['3', '11', '768', '8']
    retour: Chaque octet compte 8 bits. Trois octets en comptent donc trois fois plus.
  - type: saisie
    consigne: L'octet 11111111 écrit 255. Dans l'octet 11111101, un seul bit est à 0, celui de poids 2. Quel nombre écrit l'octet 11111101 ?
    verif: [rogner, { nombre: 253 }]
    solution: '253'
    contre_exemples: ['254', '2', '257', '7']
    retour: Un bit à 0 n'ajoute pas son poids. Par rapport à 11111111, qui écrit 255, il manque donc seulement le poids 2.
plus_loin:
  - question: Les machines ont-elles toujours groupé les bits par 8 ?
    reponse: Non. Avant le milieu des années 1960, beaucoup de machines notaient chaque lettre ou chiffre sur 6 bits. Avec seulement 64 combinaisons, la plupart se passaient des minuscules.
    source: https://en.wikipedia.org/wiki/Six-bit_character_code
  - question: Quelle machine a ouvert la voie à l'octet de 8 bits ?
    reponse: "Le System/360 d'IBM, annoncé en 1964 : IBM le présente comme ayant ouvert la voie à l'octet de 8 bits encore utilisé aujourd'hui."
    source: https://www.ibm.com/history/system-360
  - question: Quel avantage avait 8 sur 7 ?
    reponse: Un groupe de 8 bits se coupe en deux moitiés de 4 bits. Or 4 bits donnent 16 combinaisons, assez pour noter un chiffre de 0 à 9. Un octet range donc deux chiffres, sans place perdue. Le comité qui a défini le code de caractères ASCII, dans les années 1960, a relevé cet avantage, avant de retenir tout de même 7 bits.
    source: https://en.wikipedia.org/wiki/ASCII
---

En allumant les huit bits, tu as atteint 255 : impossible d'aller plus haut.

Ce groupe de 8 bits s'appelle un **octet**, d'après le latin _octo_, « huit ».

Un octet a **256 [combinaisons](brique:donnees/combinaisons)**, car chaque bit ajouté
double leur nombre :

![Huit cases forment un octet. Sous chaque case, un 2 : chaque bit double le nombre de combinaisons. Le produit des huit 2 vaut 256.](schema:combinaisons)

Lues en [binaire](brique:donnees/binaire-lire), elles écrivent les nombres de **0 à
255**. La première, `00000000`, écrit 0 : la dernière écrit donc 255, et non 256.

Pourquoi grouper les bits par 8 ? Avec 6 bits, 64 combinaisons ne suffisent pas pour 52
lettres (26 majuscules, 26 minuscules), 10 chiffres et la ponctuation. 7 bits
suffiraient. Les constructeurs ont retenu 8 : la marge a servi ensuite aux lettres
accentuées.

Un octet suffit ainsi à noter une lettre ou un chiffre : d'où l'habitude de compter les
tailles en octets.

Un nombre **tient sur un octet** s'il est compris entre 0 et 255. Au-delà, une machine
utilise plusieurs octets à la suite.

---
titre: L'octet
resume: Un octet est un groupe de 8 bits. Ses 256 combinaisons écrivent les nombres de 0 à 255. La taille d'un texte, d'une photo ou d'une mémoire se compte en octets.
niveau: bas
acquis:
  - Dire combien de bits compte un octet et combien de combinaisons il a.
  - Donner le plus grand nombre qu'un groupe de bits peut écrire.
  - Dire si un nombre tient dans un octet.
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
    consigne: Lequel de ces nombres tient dans un seul octet ?
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
  - question: D'où vient le mot « octet » ?
    reponse: Il est formé de oct-, tiré du latin octo, « huit », et de la terminaison -et. Le mot dit donc lui-même combien de bits le groupe compte. En français, son sens en informatique est attesté en 1968.
    source: https://www.cnrtl.fr/definition/octet
  - question: Les machines ont-elles toujours groupé les bits par 8 ?
    reponse: Non. Avant le milieu des années 1960, beaucoup de machines notaient chaque lettre ou chiffre sur 6 bits. Avec seulement 64 combinaisons, la plupart se passaient des minuscules.
    source: https://en.wikipedia.org/wiki/Six-bit_character_code
  - question: Quelle machine a répandu l'octet de 8 bits ?
    reponse: L'IBM System/360, lancé en 1964. IBM la présente comme la machine qui a ouvert la voie à l'octet de 8 bits encore employé aujourd'hui.
    source: https://www.ibm.com/history/system-360
---

En allumant les huit [bits](brique:donnees/bit), tu as atteint 255, et il est impossible
d'aller plus haut avec cette rangée.

Ce groupe de 8 bits s'appelle un **octet**, d'après le latin _octo_, « huit ». C'est
l'unité dans laquelle on compte la taille d'un texte, d'une photo ou de la mémoire d'une
machine.

Un octet a **256 [combinaisons](brique:donnees/combinaisons)**, car chaque bit ajouté
double leur nombre :

![Huit cases forment un octet. Sous chaque case, un 2 : chaque bit double le nombre de combinaisons. Le produit des huit 2 vaut 256.](schema:combinaisons)

Elles écrivent les nombres de **0 à 255**. La première, `00000000`, écrit 0 : la
dernière écrit donc 255, et non 256.

Pourquoi 8 bits ? Avec 6, tu n'aurais que 64 combinaisons : trop peu pour les 26 lettres
en majuscules et en minuscules, les 10 chiffres et la ponctuation. Avec 256, il reste de
la marge.

Un nombre **tient dans un octet** s'il est compris entre 0 et 255. Pour un nombre plus
grand, une machine utilise plusieurs octets à la suite.

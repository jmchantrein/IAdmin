---
titre: L'octet
resume: Un octet est un groupe de 8 bits. Il peut prendre 256 valeurs, qui écrivent les nombres de 0 à 255. La mémoire et la taille des fichiers se comptent en octets.
niveau: bas
acquis:
  - Dire combien de bits compte un octet et combien de valeurs il peut prendre.
  - Donner le plus grand nombre qu'un groupe de bits peut écrire, et dire si un nombre tient dans un octet.
  - Lire la valeur d'un octet.
requiert:
  - donnees/binaire-lire
manipulation:
  consigne: Quel est le plus grand total que tu peux afficher avec ces 8 bits ?
  widget: bascule-bits
  params: { bits: 8, poids: true }
exercices:
  - type: choix
    consigne: Un octet compte 8 bits, et chaque bit ajouté double le nombre de combinaisons. Combien de valeurs différentes un octet peut-il prendre ?
    options:
      - texte: '256'
        correct: true
      - texte: '255'
        retour: 255 est le plus grand nombre qu'un octet peut écrire, pas le nombre de ses valeurs. Il faut compter aussi le 0, ce qui fait 256 valeurs.
      - texte: '16'
        retour: 16 est le résultat de 8 fois 2. Or chaque bit double le nombre de combinaisons. Il faut donc doubler huit fois de suite, ce qui donne 2, 4, 8, 16, 32, 64, 128, puis 256.
  - type: saisie
    consigne: Un groupe de 4 bits s'appelle un demi-octet. Ses bits pèsent 8, 4, 2 et 1. Quel est le plus grand nombre qu'un demi-octet peut écrire ?
    verif: [rogner, { nombre: 15 }]
    solution: '15'
    contre_exemples: ['16', '4', '8', '255']
    retour: Le plus grand nombre s'obtient en mettant tous les bits à 1. Additionne les quatre poids. Le résultat est un de moins que le nombre de combinaisons, car la première combinaison écrit 0.
  - type: choix
    consigne: Lequel de ces nombres tient dans un seul octet ?
    options:
      - texte: '200'
        correct: true
      - texte: '256'
        retour: Un octet a bien 256 valeurs, mais elles vont de 0 à 255. Le nombre 256 demande un neuvième bit.
      - texte: '1000'
        retour: Le plus grand nombre d'un octet est 255. Pour écrire 1000, il faut plus de 8 bits, donc plusieurs octets.
  - type: saisie
    consigne: Un fichier contient 3 octets. Combien de bits contient-il ?
    verif: [rogner, { nombre: 24 }]
    solution: '24'
    contre_exemples: ['3', '11', '768', '8']
    retour: Chaque octet compte 8 bits. Trois octets en comptent donc trois fois plus.
  - type: saisie
    consigne: Un octet s'écrit 10000001. De gauche à droite, ses bits pèsent 128, 64, 32, 16, 8, 4, 2 et 1. Quel nombre écrit-il ?
    verif: [rogner, { nombre: 129 }]
    solution: '129'
    contre_exemples: ['2', '10000001', '130', '65']
    retour: Seuls les bits à 1 comptent, ici le premier et le dernier. Additionne leurs poids, 128 pour le bit de gauche et 1 pour le bit de droite.
---

En allumant les huit bits, tu as atteint 255, et il est impossible d'aller plus haut
avec cette rangée.

Ce groupe de 8 bits s'appelle un **octet**. C'est l'unité de base des machines : la
mémoire et la taille des fichiers se comptent en octets.

Un octet peut prendre **256 valeurs** : avec 8 bits, on double huit fois de suite le
nombre de combinaisons. Ces 256 valeurs écrivent les nombres de **0 à 255**.

Remarque le décalage : il y a 256 valeurs, mais le plus grand nombre est 255, parce
que la première valeur écrit 0.

Pour écrire un nombre plus grand que 255, une machine utilise plusieurs octets à la
suite.

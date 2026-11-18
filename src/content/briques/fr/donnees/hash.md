---
titre: L'empreinte d'un texte
resume: Une fonction de hachage calcule, à partir d'un texte de n'importe quelle longueur, une empreinte courte et de longueur fixe. Le même texte donne toujours la même empreinte ; un seul caractère changé en donne une sans rapport.
niveau: bas
acquis:
  - Prévoir la longueur et l'allure de l'empreinte d'un texte qu'on modifie.
  - Conclure, en comparant deux empreintes, qu'un texte a changé.
  - Montrer que deux empreintes égales ne prouvent pas que deux textes sont égaux.
requiert:
  - donnees/texte-code
manipulation:
  consigne: Les deux champs contiennent le même mot, et leurs nombres sont égaux. Change une seule lettre du second texte. Combien des cinq chiffres de son nombre changent ?
  widget: empreinte
  params: { textes: ['chat', 'chat'] }
exercices:
  - type: saisie
    consigne: La fonction de hachage de cette page donne des empreintes de 00000 à 65535. Tu lui fais calculer l'empreinte du texte entier d'un livre de 300 pages. Combien de chiffres compte cette empreinte ?
    verif: [rogner, { nombre: 5 }]
    solution: '5'
    contre_exemples: ['300', '6', '10', '65535']
    retour: Une empreinte a toujours la même longueur, que le texte compte un mot ou un livre entier. Ici, toutes vont de 00000 à 65535 et s'écrivent donc avec 5 chiffres.
  - type: choix
    consigne: Avec la fonction de hachage de cette page, le texte « Rendez-vous à 14 h » a l'empreinte 39277. Sans calculer, que prévois-tu pour l'empreinte de « Rendez-vous à 15 h » ?
    options:
      - texte: Un nombre de 5 chiffres qui ne ressemble pas à 39277.
        correct: true
      - texte: 39278, car 15 vaut un de plus que 14.
        retour: Des textes voisins n'ont pas des empreintes voisines. Un seul caractère changé suffit à changer presque tous les chiffres de l'empreinte. Ici, elle vaut 22806.
      - texte: 39277, car un seul caractère change.
        retour: Deux textes qui diffèrent d'un seul caractère sont deux textes différents. Leurs empreintes diffèrent alors presque toujours, et sans rapport l'une avec l'autre. Ici, elle vaut 22806.
  - type: choix
    consigne: Lundi, Inès note l'empreinte d'une longue lettre rangée sur son ordinateur. Jeudi, elle calcule de nouveau l'empreinte de cette lettre, avec la même fonction de hachage, et obtient un autre nombre. Que peut-elle conclure ?
    options:
      - texte: La lettre a changé depuis lundi.
        correct: true
      - texte: Rien, car un même texte peut donner une autre empreinte d'un jour à l'autre.
        retour: Une fonction de hachage donne toujours la même empreinte pour le même texte, sinon comparer deux empreintes ne servirait à rien. Si l'empreinte a changé, le texte a donc changé.
      - texte: La lettre a changé de plusieurs caractères, car plusieurs chiffres de l'empreinte ont changé.
        retour: L'empreinte dit que la lettre a changé, pas de combien. Un seul caractère changé suffit déjà à changer presque tous ses chiffres.
  - type: widget
    consigne: Dans le premier champ, le texte « salle 20 » a l'empreinte 51639. Dans le second, essaie « salle 295 », « salle 296 », et ainsi de suite jusqu'à « salle 305 ». Un de ces textes a la même empreinte que « salle 20 » ; laisse-le affiché.
    widget: empreinte
    params: { textes: ['salle 20', 'salle 295'] }
    verif: [{ regex: 'salle 20=51639 (?!salle 20=).+=51639' }]
    solution: salle 20=51639 salle 300=51639
    contre_exemples:
      - salle 20=51639 salle 20=51639
      - salle 20=51639 salle 30=17626
      - salle 20=51639 salle 200=55277
      - salle 20=51639 salle 295=50585
    retour: Change le second texte un nombre à la fois et compare les deux empreintes à chaque essai. Deux textes différents peuvent avoir la même empreinte, car il y a bien plus de textes que d'empreintes.
  - type: choix
    consigne: Sam veut savoir si deux longues listes d'adresses sont identiques. Il calcule leurs empreintes avec la fonction de hachage de cette page, qui en compte 65 536, et trouve le même nombre. Que peut-il conclure ?
    options:
      - texte: Rien de sûr, car deux textes différents peuvent avoir la même empreinte.
        correct: true
      - texte: Les listes sont identiques, car deux textes différents ont toujours des empreintes différentes.
        retour: Il y a bien plus de textes que d'empreintes, donc plusieurs textes partagent chaque empreinte. Des empreintes égales ne prouvent pas des textes égaux ; seules des empreintes différentes prouvent une différence.
      - texte: Il peut relire chaque liste dans son empreinte pour s'en assurer.
        retour: L'empreinte ne contient pas le texte. Cinq chiffres ne peuvent pas garder une longue liste ; plusieurs textes ont d'ailleurs la même empreinte. Pour être sûr, Sam doit comparer les listes elles-mêmes.
plus_loin:
  - question: D'où vient le mot « hachage » ?
    reponse: "Il traduit l'anglais « hash », qui veut dire couper en morceaux ou mettre en désordre : une fonction de hachage brouille le texte qu'elle reçoit. Hans Peter Luhn, d'IBM, semble avoir été le premier à en employer l'idée, dans une note de janvier 1953. Le mot, déjà courant chez les spécialistes, n'est imprimé qu'à la fin des années 1960."
    source: https://en.wikipedia.org/wiki/Hash_function
  - question: Quelle longueur ont les empreintes des fonctions réelles ?
    reponse: Une fonction très employée, SHA-256, publiée en 2001 aux États-Unis, produit des empreintes de 256 bits. Chaque bit ajouté double le nombre d'empreintes. 16 bits en donnent 65 536, autant que la fonction de cette page ; 256 bits en donnent un nombre si grand que deux textes ne tombent presque jamais par hasard sur la même.
    source: https://en.wikipedia.org/wiki/SHA-2
---

Une lettre changée, et presque tous les chiffres changent. Remets-la : le nombre
d'avant revient.

Ce nombre est l'**empreinte** du texte. Une **fonction de hachage** la calcule en
[hachant](note "Hacher, c'est couper en menus morceaux, selon l'Académie française. La fonction mêle si bien les codes que l'empreinte n'en garde rien de lisible.")
les [codes](brique:donnees/texte-code) de ses caractères.

![Deux textes, « chat » et une phrase de neuf mots, passent par la même fonction de hachage. Chacun en sort avec une empreinte de 5 chiffres : 30917 et 43589.](schema:longueur)

Une empreinte longue comme son texte serait aussi lente à comparer que lui.

Le même texte donne toujours la même empreinte. Si un texte n'a plus l'empreinte notée
avant, il a donc changé. Deux textes presque pareils se confondent à l'œil, leurs
empreintes non.

Il n'y a que 65 536 empreintes, de 00000 à 65535. Les textes, de toutes longueurs, sont
bien plus nombreux :

![À gauche, trois textes ; à droite, deux empreintes. « photo 22 » et « photo 359 » mènent tous deux à 60536, « lundi » mène à 56736.](schema:partage)

Des empreintes égales ne prouvent donc pas des textes égaux. L'empreinte ne contient pas
le texte : tu ne peux pas l'y relire.

Avec si peu d'empreintes, deux textes de même empreinte se trouvent vite. Les fonctions
de hachage réelles font des empreintes bien plus longues, pour que cela n'arrive presque
jamais.

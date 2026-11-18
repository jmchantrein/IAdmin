---
titre: L'information
resume: Une information est une réponse qui élimine des possibilités. Une réponse connue d'avance n'en élimine aucune, elle n'apporte donc aucune information.
niveau: bas
acquis:
  - Compter les possibilités qui restent après une réponse.
  - Distinguer une réponse qui apporte de l'information d'une réponse qui n'en apporte pas.
  - Calculer combien de possibilités restent après plusieurs questions qui en éliminent chacune la moitié.
manipulation:
  consigne: Je pense à un nombre entre 1 et 8. Peux-tu le trouver en 3 questions au plus ?
  widget: devinette
  params: { max: 8 }
exercices:
  - type: choix
    consigne: Tu cherches un nombre entre 1 et 10. On te répond « oui, il est plus grand que 7 ». Combien de possibilités reste-t-il ?
    options:
      - texte: '3'
        correct: true
      - texte: '4'
        retour: Tu as compté le 7. Or « plus grand que 7 » exclut le 7 lui-même. Il reste 8, 9 et 10.
      - texte: '7'
        retour: 7 est le nombre de possibilités éliminées, de 1 à 7. La question porte sur celles qui restent.
  - type: choix
    consigne: Ton téléphone est dans l'une de ces quatre pièces, la cuisine, le salon, la chambre ou le bureau. Tu demandes où il est. Laquelle de ces réponses t'apporte une information ?
    options:
      - texte: Il n'est pas dans la chambre.
        correct: true
      - texte: Il est dans la cuisine, le salon, la chambre ou le bureau.
        retour: Cette réponse cite les quatre pièces, elle n'en élimine donc aucune. Tu le savais déjà.
      - texte: Il n'est pas dans le jardin.
        retour: Le jardin ne faisait pas partie des possibilités. Cette réponse n'élimine aucune des quatre pièces.
  - type: saisie
    consigne: Une amie a choisi une carte parmi 32. Chacune de tes questions élimine la moitié des cartes encore possibles. Combien de cartes restent possibles après 3 questions ?
    verif: [rogner, { nombre: 4 }]
    solution: '4'
    contre_exemples: ['16', '29', '8', '2']
    retour: Avance une question à la fois. La première élimine la moitié des 32 cartes, il en reste 16. Chaque question suivante élimine la moitié de ce qui reste.
plus_loin:
  - question: D'où vient ce sens du mot « information » ?
    reponse: Le chercheur Claude Shannon l'a formulé en 1948, dans l'article « A Mathematical Theory of Communication », en s'appuyant sur des travaux antérieurs. Il ne s'occupe pas du sens d'un message. Il regarde seulement parmi combien de messages possibles il a été choisi. Quand tous sont aussi probables, plus ce nombre est grand, plus le message choisi apporte d'information.
    source: https://www.stat.berkeley.edu/~binyu/212A/papers/shannon48.pdf
---

Au départ, le nombre secret pouvait être n'importe lequel des huit. Les réponses ont
éliminé des possibilités, jusqu'à ce qu'il n'en reste qu'une.

C'est exactement cela, une **information** : une réponse qui réduit le nombre de
possibilités.

Deux conséquences :

- une réponse que tu connaissais d'avance n'élimine rien, elle n'apporte aucune
  information. C'est ce qui arrive si tu demandes « est-il plus grand que 8 ? » ;
- une question qui coupe les possibilités en deux
  [parts égales](note "Avec deux parts inégales, l'une des deux réponses laisse la grande part. Deux parts égales garantissent d'éliminer la moitié, quelle que soit la réponse.")
  en élimine la moitié, que la réponse soit oui ou non. Avec de telles questions, 3
  suffisent toujours ici.

![Quatre rangées de huit cases. À chaque réponse, la moitié des cases encore possibles s'éteint : il en reste 8, puis 4, puis 2, puis 1.](schema:moities)

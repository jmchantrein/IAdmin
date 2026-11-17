---
titre: L'information
resume: Une information est une réponse qui élimine des possibilités. Plus elle en élimine, plus elle t'apprend.
niveau: bas
acquis:
  - Compter les possibilités qui restent après une réponse.
  - Distinguer une réponse qui apporte de l'information d'une réponse qui n'en apporte pas.
manipulation:
  consigne: Je pense à un nombre entre 1 et 8. En combien de questions peux-tu le trouver ?
  widget: devinette
  params: { max: 8 }
exercices:
  - type: choix
    consigne: Tu cherches un nombre entre 1 et 8. On te répond « oui, il est plus grand que 4 ». Combien de possibilités reste-t-il ?
    options:
      - texte: '4'
        correct: true
      - texte: '8'
        retour: La réponse a éliminé 1, 2, 3 et 4. Il ne reste donc plus huit possibilités, mais seulement 5, 6, 7 et 8.
      - texte: '1'
        retour: Savoir qu'il est plus grand que 4 ne désigne pas un seul nombre. Il reste 5, 6, 7 et 8.
  - type: choix
    consigne: Ton téléphone est dans l'une de ces quatre pièces. Tu hésites entre la cuisine, le salon, la chambre et le bureau. Laquelle de ces réponses t'apporte une information ?
    options:
      - texte: Il n'est ni dans la cuisine ni dans le salon.
        correct: true
      - texte: Il est dans la maison.
        retour: Les quatre pièces sont dans la maison. Cette réponse n'élimine aucune pièce, elle ne t'apprend donc rien.
      - texte: Il est dans une seule pièce.
        retour: Tu le savais déjà, un téléphone ne peut pas être dans deux pièces à la fois. Une réponse connue d'avance n'élimine rien.
  - type: saisie
    consigne: Une amie a choisi une carte parmi 16. Chacune de tes questions élimine la moitié des cartes encore possibles. Combien de cartes restent possibles après 2 questions ?
    verif: [rogner, { nombre: 4 }]
    solution: '4'
    contre_exemples: ['8', '14', '12', '2']
    retour: Avance une question à la fois. La première élimine la moitié des 16 cartes, il en reste 8. La deuxième élimine la moitié de ces 8 cartes.
---

Au départ, le nombre secret pouvait être n'importe lequel des huit. Chaque réponse à ta
question a **éliminé des possibilités**, jusqu'à ce qu'il n'en reste qu'une.

C'est exactement cela, une **information** : une réponse qui réduit le nombre de
possibilités. Avant, tu hésitais entre plusieurs cas ; après, entre moins de cas.

Deux conséquences :

- une réponse que tu connaissais d'avance n'élimine rien : elle ne t'apporte aucune
  information ;
- une bonne question coupe les possibilités en deux parts égales. Quelle que soit la
  réponse, tu en élimines la moitié.

Toute l'informatique repose sur cette idée : stocker, transmettre et transformer des
informations.

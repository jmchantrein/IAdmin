---
titre: La table de vérité
resume: La table de vérité d'une opération donne sa sortie pour chaque combinaison de ses entrées, une ligne par combinaison. Avec deux entrées, elle a 2 × 2 = 4 lignes. Complète, elle décrit entièrement l'opération.
niveau: bas
acquis:
  - Dresser la table de vérité d'une opération sans oublier de ligne.
  - Calculer le nombre de lignes d'une table de vérité à partir du nombre d'entrées.
  - Repérer la ligne qui manque dans une table incomplète.
requiert:
  - logique/non-et-ou
voir_aussi:
  - donnees/combinaisons
manipulation:
  consigne: Combien de réglages différents peux-tu donner aux interrupteurs A et B ? Essaie-les tous, la liste sous la lampe garde chaque nouveau réglage.
  widget: porte
  params: { portes: [et], table: true }
exercices:
  - type: choix
    consigne: 'Sam dresse la table de vérité de OU. Il écrit trois lignes : A = 0 et B = 0 donnent 0 ; A = 0 et B = 1 donnent 1 ; A = 1 et B = 1 donnent 1. Que manque-t-il ?'
    options:
      - texte: La ligne A = 1 et B = 0, qui donne 1.
        correct: true
      - texte: Rien, une table de deux entrées a trois lignes.
        retour: 'A vaut 0 ou 1, et pour chacune de ces valeurs, B vaut 0 ou 1 : cela fait 2 × 2 = 4 lignes. En les rangeant, 00, 01, 10, 11, tu vois que 10 manque.'
      - texte: La ligne A = 1 et B = 0, qui donne 0.
        retour: La ligne qui manque est bien A = 1 et B = 0, mais sa sortie est fausse. OU vaut 1 dès qu'une entrée vaut 1, et ici A vaut 1.
  - type: saisie
    consigne: 'Une alarme dépend de trois affirmations : « la porte est ouverte », « la fenêtre est ouverte », « il fait nuit ». Combien de lignes compte la table de vérité qui la décrit entièrement ?'
    verif: [rogner, { nombre: 8 }]
    solution: '8'
    contre_exemples: ['3', '4', '6', '9']
    retour: 'Chaque affirmation est une entrée qui vaut 0 ou 1. Deux entrées donnent 2 × 2 = 4 lignes. La troisième double ce nombre, car chaque ligne se décline avec 0 puis avec 1 : 2 × 2 × 2 = 8.'
  - type: saisie
    consigne: "Dresse la table de vérité de NON (A ET B) : calcule A ET B, puis l'inverse. Écris les quatre sorties dans l'ordre des lignes 00, 01, 10, 11 (A puis B), sans espace."
    verif: [rogner, sans_espaces, { egal: '1110' }]
    solution: '1110'
    contre_exemples: ['0001', '1000', '111', '0111']
    retour: "A ET B vaut 1 seulement sur la ligne 11 : ses sorties sont 0, 0, 0, 1. NON inverse chacune : 1, 1, 1, 0. Ce n'est pas (NON A) ET (NON B), qui ne vaut 1 que sur la ligne 00."
plus_loin:
  - question: Qui a inventé la table de vérité ?
    reponse: On l'attribue souvent à Ludwig Wittgenstein, qui la présente dans le Tractatus logico-philosophicus, publié en 1921. Emil Post l'a proposée de son côté la même année. Des recherches montrent que Charles Sanders Peirce en avait déjà tracé une en 1883.
    source: https://en.wikipedia.org/wiki/Truth_table
---

Tu as trouvé 4 réglages, et la liste a gardé pour chacun la sortie de ET. Cette liste est
la **table de vérité** de l'[opération](brique:logique/non-et-ou) ET : une ligne par
combinaison des entrées, avec sa sortie.

Pourquoi 4 lignes ? A vaut `0` ou `1`, et pour chacune de ces valeurs, B vaut `0` ou `1` :
2 × 2 = 4. Chaque entrée de plus double le nombre de lignes, car chaque ligne se décline
avec `0` puis avec `1`. NON, qui a une seule entrée, a 2 lignes :

|  A  | NON A |
| :-: | :---: |
|  0  |   1   |
|  1  |   0   |

Pour n'en oublier aucune, fais varier B en premier : `00`, `01`, `10`, `11`.

La table **décrit entièrement** l'opération : elle donne sa sortie dans chaque cas. Une
ligne oubliée laisse un cas sans réponse, et deux opérations peuvent alors se confondre :
ET et OU donnent la même sortie pour `00` et `11`, seules `01` et `10` les séparent.

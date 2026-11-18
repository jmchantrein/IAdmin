---
titre: La table de vérité
resume: La table de vérité d'une opération donne sa sortie pour chaque réglage de ses entrées, une ligne par réglage. Avec deux entrées, elle a 2 × 2 = 4 lignes. Complète, elle décrit entièrement l'opération.
niveau: bas
acquis:
  - Dresser la table de vérité d'une opération sans oublier de ligne.
  - Calculer le nombre de lignes d'une table de vérité à partir du nombre d'entrées.
  - Repérer la ligne qui manque dans une table incomplète.
requiert:
  - logique/et-ou
voir_aussi:
  - donnees/combinaisons
manipulation:
  consigne: Combien de réglages différents peux-tu donner aux interrupteurs A et B ? Essaie-les tous, la liste sous la lampe ET garde chaque nouveau réglage.
  widget: porte
  params: { portes: [et], table: true }
exercices:
  - type: choix
    consigne: 'Sam dresse la table de vérité de OU. Il écrit trois lignes, chacune avec A puis B : 00 donne 0 ; 01 donne 1 ; 11 donne 1. Que manque-t-il ?'
    options:
      - texte: La ligne 10, qui donne 1.
        correct: true
      - texte: Rien, une table de deux entrées a trois lignes.
        retour: 'A vaut 0 ou 1, et pour chacune de ces valeurs, B vaut 0 ou 1 : cela fait 2 × 2 = 4 lignes. En les rangeant, 00, 01, 10, 11, tu vois que 10 manque.'
      - texte: La ligne 10, qui donne 0.
        retour: "La ligne qui manque est bien 10, mais sa sortie est fausse. OU vaut 1 dès qu'une entrée vaut 1, et ici A vaut 1. Une sortie 0 sur cette ligne serait celle de ET."
  - type: saisie
    consigne: 'Un arrosage automatique dépend de trois affirmations : « il est 6 h », « la terre est sèche », « le réservoir est plein ». Combien de lignes compte la table de vérité qui le décrit entièrement ?'
    verif: [rogner, { nombre: 8 }]
    solution: '8'
    contre_exemples: ['3', '4', '6', '9']
    retour: 'Chaque affirmation est une entrée qui vaut 0 ou 1. Deux entrées donnent 2 × 2 = 4 lignes. La troisième double ce nombre, car chaque ligne se décline avec 0 puis avec 1 : 2 × 2 × 2 = 8.'
  - type: saisie
    consigne: "Dresse la table de vérité de OU, qui vaut 1 dès qu'une entrée vaut 1. Écris ses quatre sorties dans l'ordre des lignes 00, 01, 10, 11 (A puis B), sans espace."
    verif: [rogner, sans_espaces, { egal: '0111' }]
    solution: '0111'
    contre_exemples: ['0110', '0001', '1110', '111']
    retour: "Seule la ligne 00 n'a aucune entrée à 1 : OU y vaut 0, et 1 partout ailleurs, y compris sur 11. Avec 0110, tu as lu le « ou » qui exclut le cas « les deux » ; 0001 est la table de ET."
plus_loin:
  - question: Qui a inventé la table de vérité ?
    reponse: On l'attribue souvent à Ludwig Wittgenstein, qui la présente dans le Tractatus logico-philosophicus, publié en 1921. Emil Post l'a proposée de son côté la même année. Selon les recherches d'Irving Anellis, Charles Sanders Peirce en aurait tracé une dès 1883.
    source: https://en.wikipedia.org/wiki/Truth_table
---

Pour [ET](brique:logique/et-ou), tu as trouvé 4 réglages. La liste qui les garde, chacun avec sa sortie, est la **table de vérité** de ET : une ligne par réglage.

Pourquoi 4 lignes ? A vaut `0` ou `1`, et pour chacune de ces valeurs, B vaut `0` ou `1` :
2 × 2 = 4. Chaque entrée de plus double le nombre de lignes, car chaque ligne se décline
avec `0` puis avec `1`. NON, qui a une seule entrée, n'en a que 2.

On écrit une ligne par ses entrées, A puis B : `01` veut dire A = 0, B = 1. Pour n'en
oublier aucune, range-les
[dans l'ordre](note 'On fait varier B en premier, comme le chiffre des unités quand tu comptes 0, 1, 2, 3 : chaque réglage vient une fois, sans rien sauter.')
`00`, `01`, `10`, `11`.

La table **décrit entièrement** l'opération : elle donne sa sortie dans chaque cas. Une
ligne oubliée laisse un cas sans réponse, et deux opérations peuvent alors se confondre :
ET et OU donnent la même sortie pour `00` et `11`, seules `01` et `10` les séparent.

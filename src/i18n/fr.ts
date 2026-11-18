/** Interface texts. Components read them from here, never inline. */
export const fr = {
  site: {
    title: 'IAdmin',
    tagline: "Apprendre l'informatique en manipulant, depuis zéro.",
    intro:
      "Chaque notion tient dans une brique\u00a0: tu manipules, tu comprends, tu t'exerces. Tout se passe dans ton navigateur, sans inscription.",
    footer: 'Ta progression est enregistrée dans ce navigateur uniquement.',
    home: 'Accueil',
  },
  path: {
    heading: 'Parcours',
    open: 'Ouvrir le parcours',
    bricks: (n: number) => (n > 1 ? `${n} briques` : `${n} brique`),
    next: 'Continuer ici',
    done: 'Parcours terminé\u00a0: toutes les briques sont acquises.',
    progress: (done: number, total: number) => `${done} / ${total} briques acquises`,
  },
  status: {
    validee: 'Validée',
    presumee: 'Présumée acquise',
    disponible: 'Disponible',
    'prerequis-manquants': 'Prérequis à voir',
  },
  level: {
    label: 'Niveau',
    bas: 'Bas niveau · la machine',
    moyen: 'Moyen niveau · le système',
    haut: 'Haut niveau · les abstractions',
  },
  brick: {
    goals: 'Après cette brique, tu sais',
    manipulate: 'Manipule',
    understand: 'Comprends',
    practice: 'Exerce-toi',
    inPaths: 'Parcours',
    under: 'Pour aller plus bas',
    seeAlso: 'Voir aussi',
    further: 'Pour aller plus loin',
    source: 'Source',
  },
  reminders: {
    heading: 'Ce que cette brique suppose',
    recall: 'Rappel',
    first: 'À voir d’abord',
    open: 'Ouvrir la brique',
    testMe: 'Me tester',
  },
  exercises: {
    progress: (done: number, total: number) => `${done} / ${total} exercices réussis`,
    number: (n: number) => `Exercice ${n}`,
    submit: 'Valider',
    answer: 'Ta réponse',
    answerNumber: 'Ta réponse, en chiffres',
    numberOnly: 'Écris seulement le nombre, en chiffres, sans unité ni autre mot.',
    correct: 'Exact.',
    choose: 'Choisis une réponse.',
    validated: 'Brique validée',
    alreadyValidated: 'Tu as déjà validé cette brique. Tu peux refaire les exercices.',
    continue: 'Pour continuer',
    storageError:
      'Ce navigateur refuse l’enregistrement\u00a0: ta progression sera perdue à la fermeture de la page.',
  },
  progress: {
    title: 'Ma progression',
    intro:
      'Ta progression vit dans ce navigateur. Exporte-la dans un fichier pour la garder ou la reprendre sur un autre appareil.',
    summary: (validated: number, presumed: number) =>
      `${validated} brique${validated > 1 ? 's' : ''} validée${validated > 1 ? 's' : ''}, ${presumed} présumée${presumed > 1 ? 's' : ''} acquise${presumed > 1 ? 's' : ''}`,
    empty: 'Aucune brique acquise pour l’instant.',
    exportHeading: 'Exporter',
    exportHelp: 'Télécharge un fichier qui contient les briques que tu as acquises.',
    exportButton: 'Exporter ma progression',
    importHeading: 'Importer',
    importHelp:
      'Choisis un fichier exporté depuis ce site. Il s’ajoute à ta progression actuelle\u00a0: rien n’est perdu.',
    importLabel: 'Fichier de progression',
    imported: (added: number, upgraded: number, known: number) =>
      `Import réussi\u00a0: ${added} ajoutée${added > 1 ? 's' : ''}, ${upgraded} renforcée${upgraded > 1 ? 's' : ''}, ${known} déjà connue${known > 1 ? 's' : ''}.`,
    notJson:
      'Ce fichier n’est pas lisible\u00a0: ce n’est pas du JSON. Ta progression est inchangée.',
    notProgress:
      'Ce fichier n’est pas un export de progression de ce site. Ta progression est inchangée.',
    resetHeading: 'Effacer',
    resetHelp:
      'Efface la progression enregistrée dans ce navigateur. Exporte-la d’abord si tu veux la garder.',
    resetButton: 'Effacer ma progression',
    resetConfirm: 'Confirmer l’effacement',
    resetCancel: 'Annuler',
    resetDone: 'Progression effacée.',
    unreadable:
      'Une progression illisible a été trouvée dans ce navigateur et mise de côté. Tu peux en télécharger la copie.',
    unreadableDownload: 'Télécharger la copie',
    unreadableDiscard: 'Supprimer la copie',
  },
  widgets: {
    steps: {
      active: 'en cours',
      out: 'écartée',
      previous: 'Précédent',
      next: 'Suivant',
      position: (step: number, total: number) => `Étape ${step} / ${total}`,
    },
    bits: {
      toggle: (n: number) => `Bit ${n}`,
      weightLabel: 'poids',
      weightHint: 'Le nombre écrit sous chaque bit est son poids.',
      total: 'Total',
      value: 'Écriture',
      character: 'Caractère',
      space: 'espace',
      noCharacter: (code: number) => `Aucun caractère affichable ne porte le code ${code}.`,
      found: (done: number) =>
        done > 1 ? `${done} combinaisons trouvées` : `${done} combinaison trouvée`,
      complete: (total: number) => `Tu les as toutes trouvées\u00a0: il y en a ${total}.`,
    },
    guess: {
      prompt:
        'Clique sur un nombre pour demander\u00a0: «\u00a0Est-il plus grand que ce nombre\u00a0?\u00a0»',
      ask: (n: number) => `Est-il plus grand que ${n}\u00a0?`,
      yes: (n: number) => `Oui, il est plus grand que ${n}.`,
      no: (n: number) => `Non, il n'est pas plus grand que ${n}.`,
      eliminated: (n: number) =>
        n > 1 ? `${n} possibilités éliminées.` : `${n} possibilité éliminée.`,
      useless: 'Aucune possibilité éliminée\u00a0: tu connaissais déjà la réponse.',
      remaining: (n: number) => `Possibilités restantes\u00a0: ${n}`,
      questions: (n: number) => `Questions posées\u00a0: ${n}`,
      found: (secret: number, n: number) =>
        n > 1
          ? `Trouvé\u00a0: c'est ${secret}, en ${n} questions.`
          : `Trouvé\u00a0: c'est ${secret}, en ${n} question.`,
      replay: 'Rejouer',
    },
    gate: {
      /** Names of the inputs, in order. */
      inputs: ['A', 'B'],
      input: (name: string) => `Entrée ${name}`,
      names: { non: 'NON', et: 'ET', ou: 'OU', 'ou-exclusif': 'OU exclusif' },
      output: 'Sortie',
      lampOn: 'lampe allumée',
      lampOff: 'lampe éteinte',
      tableCaption: 'Lignes trouvées',
      found: (done: number) => (done > 1 ? `${done} lignes trouvées` : `${done} ligne trouvée`),
      complete: (total: number) => `Tu as trouvé toutes les lignes : il y en a ${total}.`,
    },
    fingerprint: {
      text: (n: number, total: number) => (total > 1 ? `Texte ${n}` : 'Texte'),
      fingerprint: 'Empreinte',
      same: 'Les deux empreintes sont égales.',
      different: 'Les deux empreintes sont différentes.',
    },
  },
};

export type Dictionary = typeof fr;

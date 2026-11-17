/** Interface texts. Components read them from here, never inline. */
export const fr = {
  site: {
    title: 'IAdmin',
    tagline: "Apprendre l'informatique en manipulant, depuis zéro.",
    intro:
      "Chaque notion tient dans une brique : tu manipules, tu comprends, tu t'exerces. Tout se passe dans ton navigateur, sans inscription.",
    footer: 'Ta progression est enregistrée dans ce navigateur uniquement.',
    home: 'Accueil',
  },
  path: {
    heading: 'Parcours',
    open: 'Ouvrir le parcours',
    bricks: (n: number) => (n > 1 ? `${n} briques` : `${n} brique`),
    next: 'Continuer ici',
    done: 'Parcours terminé : toutes les briques sont acquises.',
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
    correct: 'Exact.',
    choose: 'Choisis une réponse.',
    validated: 'Brique validée',
    alreadyValidated: 'Tu as déjà validé cette brique. Tu peux refaire les exercices.',
    continue: 'Pour continuer',
    storageError:
      'Ce navigateur refuse l’enregistrement : ta progression sera perdue à la fermeture de la page.',
  },
  widgets: {
    bits: {
      toggle: (n: number) => `Bit ${n}`,
      value: 'Valeur',
      found: (done: number, total: number) => `${done} / ${total} combinaisons trouvées`,
      complete: 'Tu les as toutes trouvées.',
    },
    guess: {
      prompt: 'Clique sur un nombre pour demander : « Est-il plus grand que ce nombre ? »',
      ask: (n: number) => `Est-il plus grand que ${n} ?`,
      yes: (n: number) => `Oui, il est plus grand que ${n}.`,
      no: (n: number) => `Non, il n'est pas plus grand que ${n}.`,
      eliminated: (n: number) =>
        n > 1 ? `${n} possibilités éliminées.` : `${n} possibilité éliminée.`,
      useless: 'Aucune possibilité éliminée : tu connaissais déjà la réponse.',
      remaining: (n: number) => `Possibilités restantes : ${n}`,
      questions: (n: number) => `Questions posées : ${n}`,
      found: (secret: number, n: number) =>
        n > 1
          ? `Trouvé : c'est ${secret}, en ${n} questions.`
          : `Trouvé : c'est ${secret}, en ${n} question.`,
      replay: 'Rejouer',
    },
  },
};

export type Dictionary = typeof fr;

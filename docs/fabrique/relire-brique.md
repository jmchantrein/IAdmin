# Relire une brique

Procédure de relecture adverse. Elle cherche ce que les tests automatiques ne voient pas.
Le relecteur n'a pas écrit la brique ; il rapporte des écarts, il ne réécrit pas.

## Préparer

- Lis la brique, puis les briques de son `requiert`, puis `docs/pedagogie.md`.
- Lance `npm run verify` : un échec est le premier écart à rapporter.

## Chercher les écarts

Pour chaque point, cite la ligne en cause et dis ce qui cloche.

1. **Exactitude.** Vérifie chaque affirmation et chaque réponse attendue. Refais les
   calculs. Signale ce qui est faux, et à part ce qui est vrai mais trompeur pour un
   débutant.
2. **Une seule notion.** Signale tout ce qui ne sert aucun `acquis`.
3. **Notions non acquises.** Relève chaque terme technique. Il est défini dans la brique
   ou dans une brique atteignable par `requiert` ; sinon c'est un écart.
4. **Prérequis superflus.** Pour chaque entrée de `requiert`, cite la phrase qui en a
   besoin. Sans phrase, l'entrée est en trop.
5. **Acquis et exercices.** Dresse la correspondance acquis → exercices. Signale un
   `acquis` sans exercice, un exercice sans `acquis`, un verbe non observable
   (comprendre, connaître, savoir).
6. **Manipulation.** La consigne est une question que l'on résout en agissant. La
   première phrase de l'explication nomme ce que la manipulation a montré. Pour un
   `pas-a-pas`, chaque étape montre un seul changement.
7. **Ambiguïté.** Pour chaque exercice, cherche une seconde réponse défendable et une
   lecture différente de l'énoncé. Pour chaque `saisie`, cherche une bonne réponse que la
   `verif` refuserait (unité, espace, majuscule, écriture en lettres).
8. **Réponse recopiable.** Signale un exercice dont la réponse se lit telle quelle dans
   l'explication ou dans un autre énoncé.
9. **Retours.** Chaque `retour` nomme l'erreur et donne une raison. Signale un retour qui
   se contente de dire « faux », et un retour qui donne la réponse sans raison.
10. **Distracteurs.** Chaque mauvaise option correspond à une erreur qu'un débutant
    ferait vraiment. Signale une option invraisemblable.
11. **Progression.** Les exercices vont du plus guidé au plus autonome ; un au moins
    change de contexte ; un au moins fait prédire.
12. **Langue.** Tutoiement, phrases courtes, aucun terme d'expert non défini. Le `resume`
    se comprend hors de la page.

## Rapporter

- Classe chaque écart : **bloquant** (faux, ambigu, notion non acquise), **à corriger**,
  **mineur**.
- Donne pour chaque écart la ligne, le problème, et une correction possible en une phrase.
- Dis ce que tu n'as pas pu vérifier.
- Termine par le verdict : publiable, publiable après corrections, à reprendre.

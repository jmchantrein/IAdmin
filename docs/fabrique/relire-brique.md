# Relire une brique

Procédure de relecture adverse. Elle cherche ce que les tests automatiques ne voient pas.
Le relecteur n'a pas écrit la brique ; il rapporte des écarts, il ne réécrit pas.

## Préparer

- Lis la brique, puis les briques de son `requiert`, puis `docs/pedagogie.md`.
- Lis `src/core/check.ts` (comment une réponse saisie est vérifiée) et le composant du
  widget utilisé, dans `src/components/widgets`.
- Lance `npm run verify` : un échec est le premier écart à rapporter. Il contrôle déjà le
  schéma et les budgets de taille.
- Ouvre la page de la brique et joue-la une fois en entier, manipulation et exercices.

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
6. **Manipulation.** La consigne pose une question dont la réponse s'obtient en
   agissant ; pour un `pas-a-pas`, en déroulant les étapes (prédire, compter). La première
   phrase de l'explication nomme ce que l'apprenant a réellement fait ou observé. Pour un
   `pas-a-pas`, refais le déroulé : chaque étape montre un seul changement, et sa légende
   correspond aux cases mises en avant, écartées et étiquetées. Les cas limites (égalité,
   liste vide, dernier élément) sont couverts par la règle énoncée.
7. **Ambiguïté.** Pour chaque exercice, cherche une seconde réponse défendable et une
   lecture différente de l'énoncé. Pour chaque `saisie`, cherche une bonne réponse que la
   `verif` refuserait (unité, espace, majuscule, écriture en lettres).
8. **Réponse recopiable ou raccourci.** Signale un exercice dont la réponse se lit telle
   quelle dans l'explication, dans un autre énoncé ou dans une brique requise, et un
   exercice que l'on réussit sans exercer son `acquis`. Essaie en particulier de faire
   donner la réponse par le widget de la manipulation, qui reste sous les yeux, et
   vérifie qu'une erreur typique (ordre inversé) ne redonne pas la bonne réponse.
9. **Retours.** Chaque `retour` nomme l'erreur et donne une raison. Signale un retour qui
   se contente de dire « faux », et un retour qui donne la réponse sans raison.
10. **Distracteurs.** Chaque mauvaise option correspond à une erreur qu'un débutant
    ferait vraiment. Signale une option invraisemblable.
11. **Progression.** Les exercices vont du plus guidé au plus autonome ; un au moins
    change de contexte ; un au moins fait prédire. Chaque énoncé se lit seul, hors de la
    page, et se résout avec la page seule.
12. **Langue.** Tutoiement, phrases courtes, aucun terme d'expert non défini. Chaque mot
    garde un seul sens dans la brique et dans celles qu'elle requiert. Le `resume` se
    comprend hors de la page.
13. **Liens.** La première mention de chaque notion requise porte un lien vers sa brique.
    Signale un lien vers une notion que la phrase n'emploie pas, et un texte qui ne se
    comprend plus si l'on ne survole pas le lien.
14. **Pourquoi.** Relève chaque convention affirmée sans raison. Vérifie la raison donnée
    et sa `source`. Signale une information indispensable à un exercice qui ne se trouve
    que dans une note ou dans « Pour aller plus loin ».
15. **Schémas.** Compare chaque schéma au texte : mêmes mots, mêmes valeurs, aucun
    désaccord. Lis le dessin sans le texte : se comprend-il ? Signale un schéma
    décoratif, une étiquette loin de ce qu'elle nomme, un texte alternatif qui ne dit pas
    ce que le dessin montre, et une phrase que le schéma rend inutile.

## Rapporter

- Classe chaque écart selon son effet sur l'apprenant : **bloquant** (affirmation ou
  réponse fausse, ambiguïté qui change la réponse, notion dont un exercice dépend sans
  qu'elle soit acquise), **à corriger**, **mineur**.
- Rapporte à part ce qui tient au format et non à la brique (par exemple un seul `retour`
  par `saisie`) : c'est une proposition pour `TODO.md`, pas un écart de la brique.
- Donne pour chaque écart la ligne, le problème, et une correction possible en une phrase.
- Dis ce que tu n'as pas pu vérifier.
- Termine par le verdict : publiable, publiable après corrections, à reprendre.

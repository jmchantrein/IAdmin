# Orchestrer la production

Trois rôles produisent le contenu et le code. Un même agent ne tient jamais deux rôles
sur la même tâche.

| Rôle          | Fait                                                                  |
| ------------- | --------------------------------------------------------------------- |
| Orchestrateur | Cadre, découpe, rédige les briefs, vérifie, arbitre, intègre, commite |
| Implémenteur  | Écrit le code, les briques et les schémas d'une tâche                 |
| Relecteur     | Cherche les écarts d'un lot qu'il n'a pas écrit                       |

## Orchestrateur

- Confie le modèle le plus capable à l'orchestration ; délègue l'implémentation et la
  relecture.
- Découpe en tâches dont les fichiers ne se recouvrent pas ; lance en parallèle celles
  qui sont indépendantes.
- Écris pour chaque tâche un brief autonome : but, fichiers à lire, fichiers à toucher,
  critères de réussite, vérifications à lancer, compte rendu attendu.
- Renvoie aux procédures (`rediger-brique.md`, `dessiner.md`, `relire-brique.md`) au lieu
  de les recopier.
- Garde pour toi `TODO.md`, les parcours, les commits et les demandes de fusion.
- Vérifie toi-même chaque livraison : `npm run verify`, `npm run e2e`, lecture des
  captures d'écran, lecture du code livré.
- Traite un compte rendu d'agent comme un témoignage : contrôle ce qu'il affirme avant de
  le rapporter.
- Arbitre chaque écart du relecteur : corrigé, ou laissé avec sa raison dans `TODO.md`.

## Implémenteur

- Lis `AGENTS.md` et les fichiers cités par le brief avant d'écrire.
- Touche seulement les fichiers du brief.
- Lance les vérifications demandées et corrige jusqu'au vert.
- Rends un compte rendu court : fichiers touchés, résultats des vérifications, ce qui
  n'a pas pu être fait ou vérifié, choix à arbitrer.

## Relecteur

- Suis `docs/fabrique/relire-brique.md`.
- Rapporte des écarts ; laisse la réécriture à l'implémenteur.

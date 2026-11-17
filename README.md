# IAdmin

Apprendre l'informatique en manipulant, depuis zéro. Chaque notion tient dans une
**brique** : une manipulation interactive, une explication courte, quelques exercices.
Les briques forment un graphe de prérequis ; un **parcours** désigne des briques cibles
et le site calcule le chemin.

- Site statique : tout s'exécute dans le navigateur, sans inscription ni serveur.
- La progression est enregistrée dans le navigateur.
- Le contenu et le code sont produits par des LLM, sous la direction d'un humain.

## Lancer le site

```bash
npm install
```

```bash
npm run dev
```

## Vérifier

```bash
npm run verify
```

```bash
npm run e2e
```

`verify` contrôle le format, les types, les tests unitaires, le contenu (schéma, budgets,
graphe sans boucle, solutions et contre-exemples) et construit le site. `e2e` joue les
scénarios dans un navigateur et dépose des captures dans `test-results/captures`.

## Repères

| Chemin                 | Rôle                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `src/content/briques`  | Les briques, par langue puis par domaine                         |
| `src/content/parcours` | Les parcours                                                     |
| `src/core`             | Logique pure : schéma, graphe, vérification, progression         |
| `src/components`       | Interface : exercices, rappels, widgets                          |
| `docs/pedagogie.md`    | Les règles pédagogiques, avec leurs sources                      |
| `AGENTS.md`            | Les consignes pour les agents qui écrivent le contenu et le code |
| `TODO.md`              | Ce qui reste à faire et ce qui est fait                          |

Licence MIT.

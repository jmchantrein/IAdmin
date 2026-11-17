import { describe, expect, it } from 'vitest';
import { findCycle, findDangling, formatCycle } from '../src/core/graph.ts';
import { pathRoute } from '../src/core/paths.ts';
import { BUDGETS, countWords } from '../src/core/schema.ts';
import { loadContent, locales } from './load.ts';

/**
 * Guard rails for content written by LLMs: every rule here is checked on every brick.
 * The schema itself already checks that each solution passes and each counter-example fails.
 */
describe.each(locales())('contenu « %s »', (lang) => {
  const { bricks, paths, graph, errors } = loadContent(lang);

  it('respecte le schéma', () => {
    expect(errors).toEqual([]);
  });

  // A brick rejected by the schema is absent from the graph: the checks below would only
  // echo that first failure, so they wait until the schema passes.
  const graphIt = it.skipIf(errors.length > 0);

  it('contient au moins une brique et un parcours', () => {
    expect(bricks.size).toBeGreaterThan(0);
    expect(paths.size).toBeGreaterThan(0);
  });

  it(`garde une explication de ${BUDGETS.bodyWords} mots au plus`, () => {
    const tooLong = [...bricks]
      .map(([id, brick]) => ({ id, words: countWords(brick.body) }))
      .filter(({ words }) => words > BUDGETS.bodyWords)
      .map(({ id, words }) => `${id} : ${words} mots`);
    expect(tooLong).toEqual([]);
  });

  graphIt('ne pointe que vers des briques existantes', () => {
    const links = new Map(
      [...bricks].map(([id, b]) => [id, [...b.requiert, ...b.repose_sur, ...b.voir_aussi]]),
    );
    expect(findDangling(links).map(({ from, to }) => `${from} → ${to}`)).toEqual([]);
  });

  graphIt('garde un graphe de prérequis sans boucle', () => {
    const cycle = findCycle(graph);
    expect(cycle && formatCycle(cycle)).toBeNull();
  });

  graphIt('calcule la route de chaque parcours', () => {
    for (const id of paths.keys()) {
      expect(() => pathRoute(graph, paths, id), `parcours ${id}`).not.toThrow();
    }
  });

  graphIt('rend chaque brique atteignable depuis un parcours', () => {
    const reachable = new Set([...paths.keys()].flatMap((id) => pathRoute(graph, paths, id)));
    expect([...bricks.keys()].filter((id) => !reachable.has(id))).toEqual([]);
  });
});

import { describe, expect, it } from 'vitest';
import { ancestors, dependents, findCycle, findDangling, routeTo, type Graph } from './graph.ts';

const graph = (edges: Record<string, string[]>): Graph => new Map(Object.entries(edges));

// a ← b ← d, a ← c ← d, e isolated
const diamond = graph({ a: [], b: ['a'], c: ['a'], d: ['b', 'c'], e: [] });

describe('routeTo', () => {
  it('puts every prerequisite before the brick that needs it', () => {
    expect(routeTo(diamond, ['d'])).toEqual(['a', 'b', 'c', 'd']);
  });

  it('keeps only what the targets need, without duplicates', () => {
    expect(routeTo(diamond, ['b', 'c'])).toEqual(['a', 'b', 'c']);
    expect(routeTo(diamond, ['e'])).toEqual(['e']);
  });

  it('fails fast on a cycle or an unknown node', () => {
    expect(() => routeTo(graph({ a: ['b'], b: ['a'] }), ['a'])).toThrow('a → b → a');
    expect(() => routeTo(graph({ a: ['x'] }), ['a'])).toThrow('nœud inconnu : x');
  });
});

describe('findCycle', () => {
  it('returns null on an acyclic graph', () => {
    expect(findCycle(diamond)).toBeNull();
  });

  it('reports the loop as a closed route', () => {
    expect(findCycle(graph({ a: [], b: ['c'], c: ['d'], d: ['b'] }))).toEqual(['b', 'c', 'd', 'b']);
    expect(findCycle(graph({ a: ['a'] }))).toEqual(['a', 'a']);
  });
});

describe('findDangling', () => {
  it('lists links to missing nodes', () => {
    expect(findDangling(graph({ a: ['x'], b: ['a'] }))).toEqual([{ from: 'a', to: 'x' }]);
  });
});

describe('ancestors and dependents', () => {
  it('walks the graph both ways', () => {
    expect([...ancestors(diamond, 'd')].sort()).toEqual(['a', 'b', 'c']);
    expect(ancestors(diamond, 'a').size).toBe(0);
    expect(dependents(diamond, 'a')).toEqual(['b', 'c']);
  });
});

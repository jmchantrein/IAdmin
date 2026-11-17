import { describe, expect, it } from 'vitest';
import { pathRoute, resolveTargets } from './paths.ts';
import type { Path } from './schema.ts';

const path = (cibles: string[], inclut: string[] = []): Path => ({
  titre: 't',
  description: 'd',
  cibles,
  inclut,
});

describe('resolveTargets', () => {
  it('merges the targets of included paths', () => {
    const paths = new Map([
      ['debuter', path([], ['fondements', 'shell'])],
      ['fondements', path(['x/a'])],
      ['shell', path(['x/b', 'x/a'])],
    ]);
    expect(resolveTargets(paths, 'debuter')).toEqual(['x/a', 'x/b']);
  });

  it('fails fast on an inclusion loop or an unknown path', () => {
    const loop = new Map([
      ['a', path([], ['b'])],
      ['b', path([], ['a'])],
    ]);
    expect(() => resolveTargets(loop, 'a')).toThrow('a → b → a');
    expect(() => resolveTargets(new Map([['a', path([], ['z'])]]), 'a')).toThrow('inconnu : z');
  });
});

describe('pathRoute', () => {
  it('orders the bricks of a path', () => {
    const graph = new Map([
      ['x/a', []],
      ['x/b', ['x/a']],
    ]);
    expect(pathRoute(graph, new Map([['p', path(['x/b'])]]), 'p')).toEqual(['x/a', 'x/b']);
  });
});

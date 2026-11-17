import { describe, expect, it } from 'vitest';
import {
  emptyProgress,
  markValidated,
  missingPrerequisites,
  parseProgress,
  statusOf,
} from './progress.ts';

const now = new Date('2026-11-17T10:00:00Z');

describe('progress', () => {
  it('derives availability from the stored facts', () => {
    const progress = markValidated(emptyProgress(), 'x/a', now);
    expect(statusOf(progress, 'x/a', [])).toBe('validee');
    expect(statusOf(progress, 'x/b', ['x/a'])).toBe('disponible');
    expect(statusOf(progress, 'x/c', ['x/a', 'x/b'])).toBe('prerequis-manquants');
    expect(missingPrerequisites(progress, ['x/a', 'x/b'])).toEqual(['x/b']);
  });

  it('leaves the previous document untouched', () => {
    const before = emptyProgress();
    markValidated(before, 'x/a', now);
    expect(before.briques).toEqual({});
  });

  it('round-trips through JSON', () => {
    const progress = markValidated(emptyProgress(), 'x/a', now);
    expect(parseProgress(JSON.parse(JSON.stringify(progress)))).toEqual(progress);
  });

  it('rejects anything unexpected', () => {
    expect(() => parseProgress({ format: 'autre', version: 1, briques: {} })).toThrow();
    expect(() =>
      parseProgress({ ...emptyProgress(), briques: { 'x/a': { etat: 'finie', le: 'hier' } } }),
    ).toThrow();
    expect(() => parseProgress(null)).toThrow();
  });
});

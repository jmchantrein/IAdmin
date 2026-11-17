import { describe, expect, it } from 'vitest';
import {
  emptyProgress,
  exportProgress,
  markValidated,
  mergeProgress,
  missingPrerequisites,
  parseProgress,
  statusOf,
} from './progress.ts';
import type { Progress } from './schema.ts';

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

describe('mergeProgress', () => {
  const doc = (briques: Progress['briques']): Progress => ({ ...emptyProgress(), briques });
  const earlier = '2026-11-01T10:00:00.000Z';
  const later = '2026-11-17T10:00:00.000Z';

  it('adds unknown bricks and keeps every local one', () => {
    const local = doc({ 'x/a': { etat: 'validee', le: earlier } });
    const imported = doc({ 'x/b': { etat: 'presumee', le: later } });
    const { progress, added, upgraded, known } = mergeProgress(local, imported);
    expect(Object.keys(progress.briques).sort()).toEqual(['x/a', 'x/b']);
    expect({ added, upgraded, known }).toEqual({ added: 1, upgraded: 0, known: 0 });
  });

  it('lets the strongest state win, whatever the dates', () => {
    const local = doc({
      'x/a': { etat: 'presumee', le: later },
      'x/b': { etat: 'validee', le: earlier },
    });
    const imported = doc({
      'x/a': { etat: 'validee', le: earlier },
      'x/b': { etat: 'presumee', le: later },
    });
    const { progress, upgraded, known } = mergeProgress(local, imported);
    expect(progress.briques['x/a']).toEqual({ etat: 'validee', le: earlier });
    expect(progress.briques['x/b']).toEqual({ etat: 'validee', le: earlier });
    expect({ upgraded, known }).toEqual({ upgraded: 1, known: 1 });
  });

  it('breaks a tie with the most recent date', () => {
    const local = doc({ 'x/a': { etat: 'validee', le: earlier } });
    const imported = doc({ 'x/a': { etat: 'validee', le: later } });
    expect(mergeProgress(local, imported).progress.briques['x/a']?.le).toBe(later);
    expect(mergeProgress(imported, local).progress.briques['x/a']?.le).toBe(later);
  });

  it('keeps bricks this site does not know and leaves its inputs untouched', () => {
    const local = doc({});
    const imported = doc({ 'ailleurs/inconnue': { etat: 'validee', le: earlier } });
    const { progress } = mergeProgress(local, imported);
    expect(progress.briques['ailleurs/inconnue']).toBeDefined();
    expect(local.briques).toEqual({});
  });

  it('exports a document that can be imported back unchanged', () => {
    const local = doc({ 'x/a': { etat: 'validee', le: earlier } });
    const file = JSON.parse(JSON.stringify(exportProgress(local, new Date(later))));
    expect(file.exporte_le).toBe(later);
    const { progress, known } = mergeProgress(emptyProgress(), parseProgress(file));
    expect(progress).toEqual(local);
    expect(known).toBe(0);
  });
});

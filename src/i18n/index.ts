import { fr, type Dictionary } from './fr.ts';

/** Adding a language: add its dictionary here and its content under `src/content/<lang>`. */
const DICTIONARIES = { fr } satisfies Record<string, Dictionary>;

export type Lang = keyof typeof DICTIONARIES;
export const LOCALES = Object.keys(DICTIONARIES) as Lang[];
export const DEFAULT_LOCALE: Lang = 'fr';

export function dict(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}

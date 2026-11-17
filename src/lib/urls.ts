import type { Lang } from '../i18n/index.ts';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const homeUrl = (lang: Lang) => `${base}/${lang}/`;
export const pathUrl = (lang: Lang, id: string) => `${base}/${lang}/parcours/${id}/`;
export const brickUrl = (lang: Lang, id: string) => `${base}/${lang}/briques/${id}/`;

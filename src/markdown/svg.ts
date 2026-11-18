import { BUDGETS, countWords } from '../core/schema.ts';
import { escapeHtml } from './html.ts';

/**
 * House rules for the diagrams drawn by LLMs (`<brique>.<nom>.svg`), and their inlining.
 * The rules keep a diagram safe to inline, readable, and in the site's colours: colours
 * come only from the classes below, defined in `src/styles/global.css` for both themes.
 */

export const SCHEMA_WIDTH = 640;
export const SCHEMA_MAX_HEIGHT = 480;
/**
 * Sizes in units of the 640-wide frame. A phone shows the frame at about half size and a
 * desktop at about 0.8 (`max-width` in `global.css`): 22 to 32 stays readable on both.
 */
export const SCHEMA_FONT_SIZE = { min: 22, max: 32 } as const;

export const SCHEMA_CLASSES = [
  'trait',
  'plein',
  'fond',
  'accent',
  'accent-plein',
  'ok',
  'ok-plein',
  'ko',
  'ko-plein',
  'doux',
  'doux-plein',
  'texte',
  'texte-doux',
  'texte-accent',
] as const;

const ELEMENTS = new Set([
  'svg',
  'g',
  'path',
  'rect',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'text',
  'tspan',
  'defs',
  'marker',
]);
const FORBIDDEN_ELEMENTS = new Set(['script', 'style', 'foreignObject', 'image', 'a']);
const COLOR_ATTRIBUTES = new Set(['color', 'stop-color', 'flood-color', 'lighting-color']);
const PAINT_VALUES = new Set(['none', 'currentColor']);
const CLASSES = new Set<string>(SCHEMA_CLASSES);

/** The file of diagram `nom` of a brick: `bit.md` → `bit.<nom>.svg`, side by side. */
export const schemaFile = (brickFile: string, name: string) =>
  brickFile.replace(/\.md$/, `.${name}.svg`);

interface Tag {
  name: string;
  attributes: Map<string, string>;
  closing: boolean;
  selfClosing: boolean;
}

type Token = { kind: 'tag'; tag: Tag } | { kind: 'text'; value: string } | { kind: 'skip' };

const TOKEN = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<[^>]*>?|[^<]+/g;
const TAG = /^<(\/?)([A-Za-z][\w:.-]*)([\s\S]*?)(\/?)>$/;
const ATTRIBUTE = /\s+([^\s="'/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

function parseTag(raw: string, issues: string[]): Tag | null {
  const match = TAG.exec(raw);
  if (!match) {
    issues.push(`construction non autorisée : ${raw.slice(0, 30)}`);
    return null;
  }
  const [, slash, name, rest, selfClosing] = match as unknown as [
    string,
    string,
    string,
    string,
    string,
  ];
  const attributes = new Map<string, string>();
  for (const [, key, double, single] of rest.matchAll(ATTRIBUTE)) {
    attributes.set(key!, double ?? single ?? '');
  }
  if (rest.replace(ATTRIBUTE, '').trim() !== '') {
    issues.push(`attribut illisible dans <${name}> : chaque attribut s'écrit nom="valeur"`);
  }
  return { name, attributes, closing: slash === '/', selfClosing: selfClosing === '/' };
}

function tokenize(source: string, issues: string[]): Token[] {
  return [...source.matchAll(TOKEN)].map(([raw]): Token => {
    if (raw.startsWith('<!--') || raw.startsWith('<?')) return { kind: 'skip' };
    if (!raw.startsWith('<')) return { kind: 'text', value: raw };
    const tag = parseTag(raw, issues);
    return tag ? { kind: 'tag', tag } : { kind: 'skip' };
  });
}

function fontSize(value: string): number | null {
  const match = /^(\d+(?:\.\d+)?)(?:px)?$/.exec(value.trim());
  return match ? Number(match[1]) : null;
}

function attributeIssues(tag: Tag): string[] {
  const issues: string[] = [];
  const where = `<${tag.name}>`;
  for (const [key, value] of tag.attributes) {
    const lower = key.toLowerCase();
    if (lower === 'style') issues.push(`attribut interdit : style, dans ${where}`);
    else if (lower.startsWith('on')) issues.push(`attribut interdit : ${key}, dans ${where}`);
    else if (lower === 'href' || lower.endsWith(':href')) {
      issues.push(`attribut interdit : ${key}, dans ${where}`);
    } else if (lower === 'fill' || lower === 'stroke') {
      if (!PAINT_VALUES.has(value.trim())) {
        issues.push(
          `couleur écrite dans le fichier : ${key}="${value}" dans ${where} ; seuls none et currentColor sont admis, la couleur passe par une classe`,
        );
      }
    } else if (COLOR_ATTRIBUTES.has(lower)) {
      issues.push(`couleur écrite dans le fichier : ${key}="${value}" dans ${where}`);
    } else if (lower === 'class') {
      for (const name of value.split(/\s+/).filter(Boolean)) {
        if (!CLASSES.has(name)) issues.push(`classe inconnue : ${name}, dans ${where}`);
      }
    } else if (lower === 'font-size') {
      const size = fontSize(value);
      if (size === null || size < SCHEMA_FONT_SIZE.min || size > SCHEMA_FONT_SIZE.max) {
        issues.push(
          `font-size="${value}" dans ${where} : entre ${SCHEMA_FONT_SIZE.min} et ${SCHEMA_FONT_SIZE.max}`,
        );
      }
    }
    if (/url\(/i.test(value) && !/^url\(#[\w-]+\)$/.test(value.trim())) {
      issues.push(`référence externe interdite : ${key}="${value}" dans ${where}`);
    }
  }
  return issues;
}

function rootIssues(tag: Tag): string[] {
  const issues: string[] = [];
  const viewBox = /^0 0 640 (\d+(?:\.\d+)?)$/.exec(tag.attributes.get('viewBox')?.trim() ?? '');
  const height = viewBox ? Number(viewBox[1]) : 0;
  if (!viewBox || height <= 0 || height > SCHEMA_MAX_HEIGHT) {
    issues.push(
      `racine : viewBox="0 0 ${SCHEMA_WIDTH} H" attendu, avec H entre 1 et ${SCHEMA_MAX_HEIGHT}`,
    );
  }
  for (const key of ['width', 'height']) {
    if (tag.attributes.has(key)) {
      issues.push(`racine : attribut ${key} interdit, la taille suit la largeur du texte`);
    }
  }
  return issues;
}

/** Every broken rule of the charter, as a readable sentence; empty when the file is valid. */
export function svgIssues(source: string): string[] {
  const issues: string[] = [];
  const tokens = tokenize(source, issues);
  const open: Tag[] = [];
  let root: Tag | null = null;
  let rootClosed = false;
  const words: string[] = [];

  for (const token of tokens) {
    if (token.kind === 'skip') continue;
    if (token.kind === 'text') {
      if (!token.value.trim()) continue;
      if (!root || rootClosed) issues.push('texte hors de la racine <svg>');
      else if (open.some((tag) => tag.name === 'text')) words.push(token.value);
      else issues.push(`texte hors d'un <text> : « ${token.value.trim().slice(0, 30)} »`);
      continue;
    }
    const { tag } = token;
    if (tag.closing) {
      const last = open.pop();
      if (last?.name !== tag.name) {
        issues.push(`balise mal fermée : </${tag.name}>`);
        break;
      }
      if (open.length === 0) rootClosed = true;
      continue;
    }
    if (!root) {
      root = tag;
      if (tag.name !== 'svg') issues.push(`racine : <svg> attendu, trouvé <${tag.name}>`);
      else issues.push(...rootIssues(tag));
    } else if (rootClosed || open.length === 0) {
      issues.push(`élément hors de la racine <svg> : <${tag.name}>`);
    }
    if (FORBIDDEN_ELEMENTS.has(tag.name)) issues.push(`élément interdit : <${tag.name}>`);
    else if (!ELEMENTS.has(tag.name)) issues.push(`élément non autorisé : <${tag.name}>`);
    issues.push(...attributeIssues(tag));
    if (tag.name === 'text') {
      const inherited = [...open, tag].some((t) => t.attributes.has('font-size'));
      if (!inherited)
        issues.push(
          `<text> sans font-size (entre ${SCHEMA_FONT_SIZE.min} et ${SCHEMA_FONT_SIZE.max})`,
        );
    }
    if (!tag.selfClosing) open.push(tag);
  }

  if (!root) issues.push('racine <svg> introuvable');
  else if (open.length > 0) issues.push(`balise non fermée : <${open.at(-1)!.name}>`);
  const count = countWords(words.join(' '));
  if (count > BUDGETS.schemaWords) {
    issues.push(`${count} mots dans le dessin : ${BUDGETS.schemaWords} au plus`);
  }
  return [...new Set(issues)];
}

/**
 * The SVG ready to sit in the page: comments and XML prolog dropped, ids prefixed with the
 * diagram name (two diagrams on one page cannot collide), and an accessible name.
 */
export function inlineSvg(source: string, name: string, label: string): string {
  const prefix = `schema-${name}-`;
  return source
    .replace(/<!--[\s\S]*?-->|<\?[\s\S]*?\?>/g, '')
    .replace(/\sid="([\w-]+)"/g, ` id="${prefix}$1"`)
    .replace(/url\(#([\w-]+)\)/g, `url(#${prefix}$1)`)
    .replace(/<svg\b/, `<svg role="img" aria-label="${escapeHtml(label)}"`)
    .trim();
}

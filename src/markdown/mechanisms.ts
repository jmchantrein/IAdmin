import { BUDGETS, brickIdSchema, countWords } from '../core/schema.ts';
import { escapeHtml, unescapeHtml } from './html.ts';
import { inlineSvg, schemaFile, svgIssues } from './svg.ts';

/**
 * Authoring mechanisms of a brick body, in two stages.
 *
 * 1. While Markdown is compiled (`plugin.ts`), the syntax becomes markers:
 *    - `[texte](brique:<id>)` → a link and an empty tooltip that names the target brick;
 *    - `[texte](note "La note")` → a focusable trigger and its tooltip;
 *    - `![Texte alternatif](schema:<nom>)` → an empty `<figure>` naming the diagram.
 * 2. When the page is built (`expandMechanisms`), the markers are filled with what lives in
 *    other files: the target brick's title and summary, the SVG file. Doing it at page time,
 *    not at compile time, keeps them fresh: Astro caches a compiled body until its own file
 *    changes, so a summary or a diagram edited elsewhere would otherwise stay stale.
 */

export const NOTE_HREF = 'note';
const BRICK_SCHEME = 'brique:';
const SCHEMA_SCHEME = 'schema:';
const SCHEMA_NAME = /^[a-z0-9-]+$/;

/** A content error: names the file and the broken rule, and stops the build. */
export class ContentError extends Error {
  constructor(file: string, rule: string) {
    super(`${file} : ${rule}`);
    this.name = 'ContentError';
  }
}

/** Target id of a `brique:<id>` link, or `null` for any other link. */
export const parseBrickHref = (url: string) =>
  url.startsWith(BRICK_SCHEME) ? url.slice(BRICK_SCHEME.length) : null;

/** Name of a `schema:<nom>` image, or `null` for any other image. */
export const parseSchemaSrc = (src: string) =>
  src.startsWith(SCHEMA_SCHEME) ? src.slice(SCHEMA_SCHEME.length) : null;

export function brickIdIssue(id: string): string | null {
  return brickIdSchema.safeParse(id).success
    ? null
    : `lien de brique : identifiant « ${id} » invalide, attendu brique:<domaine>/<brique>`;
}

export function noteIssue(text: string | null | undefined): string | null {
  if (!text?.trim()) return 'note sans texte : écris [mot](note "Texte de la note")';
  const words = countWords(text);
  return words > BUDGETS.noteWords
    ? `note de ${words} mots : ${BUDGETS.noteWords} au plus (« ${text.slice(0, 40)}… »)`
    : null;
}

/** Problems of the `index`-th diagram (1-based) of a body. */
export function schemaIssues(name: string, alt: string, index: number): string[] {
  const issues: string[] = [];
  if (!SCHEMA_NAME.test(name)) issues.push(`schéma « ${name} » : nom attendu en [a-z0-9-]`);
  if (!alt.trim()) issues.push(`schéma « ${name} » : texte alternatif obligatoire`);
  const words = countWords(alt);
  if (words > BUDGETS.schemaAltWords) {
    issues.push(
      `schéma « ${name} » : texte alternatif de ${words} mots, ${BUDGETS.schemaAltWords} au plus`,
    );
  }
  if (index > BUDGETS.schemasMax) {
    issues.push(`${index} schémas : ${BUDGETS.schemasMax} au plus par brique`);
  }
  return issues;
}

/** Bricks linked from a raw Markdown body (for the content guard rails). */
export const brickRefs = (body: string) =>
  [...body.matchAll(/\]\(brique:([^)\s]*)\)/g)].map(([, id]) => id!);

/** Diagrams cited by a raw Markdown body, in order (for the content guard rails). */
export function schemaRefs(body: string): { name: string; alt: string }[] {
  return [...body.matchAll(/!\[([^\]]*)\]\(schema:([^)\s]*)\)/g)].map(([, alt, name]) => ({
    name: name!,
    alt: alt!,
  }));
}

/**
 * The body as the learner reads it at first: hover notes and alternative texts are left out.
 * They have their own budgets, so they do not eat the word budget of the explanation.
 */
export const readingText = (body: string) =>
  body.replace(/!\[[^\]]*\]\(schema:[^)\s]*\)/g, '').replace(/\]\(note\s+"[^"]*"\)/g, ']');

// --- Markers written while compiling Markdown ---

const tooltipId = (n: number) => `bulle-${n}`;

export const bubbleOpen = '<span class="bulle">';
export const bubbleClose = '</span>';

/** Attributes of the `<a>` of a brick link. */
export const brickLinkProperties = (n: number) => ({ 'aria-describedby': tooltipId(n) });

/** Empty tooltip of a brick link, filled by `expandMechanisms`. */
export const brickTooltip = (n: number, id: string) =>
  `<span class="bulle-texte" role="tooltip" id="${tooltipId(n)}" data-brique="${escapeHtml(id)}"></span>`;

/** A note trigger is a button: focusable by keyboard and by touch, and it navigates nowhere. */
export const noteOpen = (n: number) =>
  `<span class="bulle bulle-note"><button type="button" class="note" aria-describedby="${tooltipId(n)}">`;

export const noteClose = (n: number, text: string) =>
  `</button><span class="bulle-texte" role="tooltip" id="${tooltipId(n)}">${escapeHtml(text.trim())}</span></span>`;

export const schemaMarker = (name: string, alt: string) =>
  `<figure class="schema" data-schema="${escapeHtml(name)}" data-alt="${escapeHtml(alt)}"></figure>`;

// --- Filling the markers when the page is built ---

export interface ExpandContext {
  /** File of the brick, for error messages. */
  file: string;
  /** Address of a brick of the same language. */
  url: (id: string) => string;
  brick: (id: string) => { titre: string; resume: string } | undefined;
  /** Source of diagram `nom` of this brick, or `undefined` when the file is missing. */
  schema: (name: string) => { file: string; source: string } | undefined;
}

export function expandMechanisms(html: string, ctx: ExpandContext): string {
  const target = (id: string) => {
    const brick = ctx.brick(id);
    if (!brick) throw new ContentError(ctx.file, `lien vers une brique inconnue « ${id} »`);
    return brick;
  };
  return html
    .replace(/href="brique:([^"]*)"/g, (_, id: string) => {
      target(unescapeHtml(id));
      return `href="${escapeHtml(ctx.url(unescapeHtml(id)))}"`;
    })
    .replace(
      /(<span class="bulle-texte" role="tooltip" id="[\w-]+" data-brique="([^"]*)">)<\/span>/g,
      (_, open: string, id: string) => {
        const { titre, resume } = target(unescapeHtml(id));
        return `${open}<span class="bulle-titre">${escapeHtml(titre)}</span> ${escapeHtml(resume)}</span>`;
      },
    )
    .replace(
      /<figure class="schema" data-schema="([a-z0-9-]+)" data-alt="([^"]*)"><\/figure>/g,
      (_, name: string, alt: string) => {
        const schema = ctx.schema(name);
        if (!schema)
          throw new ContentError(
            ctx.file,
            `schéma « ${name} » : fichier ${schemaFile(ctx.file, name)} introuvable`,
          );
        const issues = svgIssues(schema.source);
        if (issues.length > 0) throw new ContentError(schema.file, issues.join(' ; '));
        return `<figure class="schema">${inlineSvg(schema.source, name, unescapeHtml(alt))}</figure>`;
      },
    );
}

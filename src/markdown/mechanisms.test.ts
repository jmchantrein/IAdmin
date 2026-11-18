import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';
import { describe, expect, it } from 'vitest';
import {
  brickRefs,
  expandMechanisms,
  noteIssue,
  parseBrickHref,
  parseSchemaSrc,
  readingText,
  schemaIssues,
  schemaRefs,
  type ExpandContext,
} from './mechanisms.ts';
import { mechanismsPlugin } from './plugin.ts';

const FILE = 'src/content/briques/fr/donnees/bit.md';
const SVG = '<svg viewBox="0 0 640 100"><text font-size="24" class="texte">0</text></svg>';

const context: ExpandContext = {
  file: FILE,
  url: (id) => `/IAdmin/fr/briques/${id}/`,
  brick: (id) =>
    id === 'donnees/information'
      ? { titre: "L'information", resume: 'Une réponse qui élimine des possibilités.' }
      : undefined,
  schema: (name) => (name === 'etats' ? { file: 'bit.etats.svg', source: SVG } : undefined),
};

/** Compiles a body with the same Sätteri pipeline as the site, then fills it as the page does. */
async function render(markdown: string, ctx: ExpandContext = context): Promise<string> {
  const renderer = await createSatteriMarkdownProcessor({ mdastPlugins: [mechanismsPlugin] });
  const fileURL = new URL(`file://${process.cwd()}/${FILE}`);
  const { code } = await renderer.render(markdown, { fileURL });
  return expandMechanisms(code, ctx);
}

describe('syntax parsing', () => {
  it('recognises the three schemes', () => {
    expect(parseBrickHref('brique:donnees/bit')).toBe('donnees/bit');
    expect(parseBrickHref('https://exemple.org')).toBeNull();
    expect(parseSchemaSrc('schema:etats')).toBe('etats');
    expect(parseSchemaSrc('image.png')).toBeNull();
    expect(brickRefs('un [a](brique:x/y) et [b](brique:z/w)')).toEqual(['x/y', 'z/w']);
    expect(schemaRefs('![Deux lampes](schema:etats)')).toEqual([
      { name: 'etats', alt: 'Deux lampes' },
    ]);
  });

  it('keeps notes and diagrams within their budgets', () => {
    expect(noteIssue('Une note courte.')).toBeNull();
    expect(noteIssue('mot '.repeat(40))).toBeNull();
    expect(noteIssue('mot '.repeat(41))).toMatch(/^note de 41 mots : 40 au plus/);
    expect(noteIssue(null)).toMatch(/^note sans texte/);
    expect(schemaIssues('etats', 'Deux lampes', 1)).toEqual([]);
    expect(schemaIssues('etats', '', 1)).toContain(
      'schéma « etats » : texte alternatif obligatoire',
    );
    expect(schemaIssues('etats', 'mot '.repeat(31), 1)).toContain(
      'schéma « etats » : texte alternatif de 31 mots, 30 au plus',
    );
    expect(schemaIssues('etats', 'Deux lampes', 3)).toContain('3 schémas : 2 au plus par brique');
    expect(schemaIssues('États', 'Deux lampes', 1)).toContain(
      'schéma « États » : nom attendu en [a-z0-9-]',
    );
  });
});

describe('brick link', () => {
  it('links to the brick address with a tooltip that shows its title then its summary', async () => {
    const html = await render('Une [information](brique:donnees/information) ici.');
    const doc = new DOMParserLike(html);
    expect(doc.attr('a', 'href')).toBe('/IAdmin/fr/briques/donnees/information/');
    const tooltipId = doc.attr('a', 'aria-describedby');
    expect(tooltipId).toBe('bulle-1');
    expect(html).toContain(
      `<span class="bulle-texte" role="tooltip" id="bulle-1" data-brique="donnees/information"><span class="bulle-titre">L&#39;information</span> Une réponse qui élimine des possibilités.</span>`,
    );
    expect(html).toMatch(/^<p>Une <span class="bulle"><a /);
  });

  it('keeps the formatting of the link text', async () => {
    expect(await render('[**info**](brique:donnees/information)')).toContain(
      '<strong>info</strong></a>',
    );
  });

  it('stops the build on an unknown brick, naming the file and the id', async () => {
    await expect(render('[x](brique:donnees/inconnue)')).rejects.toThrow(
      `${FILE} : lien vers une brique inconnue « donnees/inconnue »`,
    );
    await expect(render('[x](brique:Bit)')).rejects.toThrow(
      `${FILE} : lien de brique : identifiant « Bit » invalide`,
    );
  });
});

describe('note', () => {
  it('renders a focusable trigger that is not a link, with its tooltip', async () => {
    const html = await render('Un octet compte [8 bits](note "Huit, c\'est « un octet ».").');
    expect(html).toContain(
      '<span class="bulle bulle-note"><button type="button" class="note" aria-describedby="bulle-1">8 bits</button><span class="bulle-texte" role="tooltip" id="bulle-1">Huit, c&#39;est « un octet ».</span></span>',
    );
    expect(html).not.toContain('<a ');
  });

  it('numbers the tooltips of a page', async () => {
    const html = await render('[a](note "Un.") [b](brique:donnees/information) [c](note "Trois.")');
    expect(html.match(/id="bulle-\d"/g)).toEqual(['id="bulle-1"', 'id="bulle-2"', 'id="bulle-3"']);
  });

  it('stops the build over 40 words or without text', async () => {
    await expect(render(`[mot](note "${'mot '.repeat(41)}")`)).rejects.toThrow(
      `${FILE} : note de 41 mots : 40 au plus`,
    );
    await expect(render('[mot](note)')).rejects.toThrow(`${FILE} : note sans texte`);
  });
});

describe('diagram', () => {
  it('inlines the SVG in a figure, with role img and the alternative text as its name', async () => {
    const html = await render('Avant.\n\n![Deux lampes : 0 et 1.](schema:etats)\n\nAprès.');
    expect(html).toContain(
      '<figure class="schema"><svg role="img" aria-label="Deux lampes : 0 et 1." viewBox="0 0 640 100">',
    );
    expect(html).not.toContain('<img');
    expect(html).not.toMatch(/<p>\s*<figure/);
  });

  it('stops the build on a missing file, a broken charter or a misuse', async () => {
    await expect(render('![Alt](schema:absent)')).rejects.toThrow(
      `${FILE} : schéma « absent » : fichier src/content/briques/fr/donnees/bit.absent.svg introuvable`,
    );
    const broken = { ...context, schema: () => ({ file: 'bit.etats.svg', source: '<svg/>' }) };
    await expect(render('![Alt](schema:etats)', broken)).rejects.toThrow(/^bit\.etats\.svg : /);
    await expect(render('![](schema:etats)')).rejects.toThrow('texte alternatif obligatoire');
    await expect(render('Un ![Alt](schema:etats) dans une phrase.')).rejects.toThrow(
      'un schéma occupe seul son paragraphe',
    );
    await expect(
      render('![A](schema:etats)\n\n![B](schema:etats)\n\n![C](schema:etats)'),
    ).rejects.toThrow('3 schémas : 2 au plus par brique');
  });
});

/** Minimal attribute reader for the generated HTML (no DOM in `src` tests). */
class DOMParserLike {
  constructor(private html: string) {}
  attr(tag: string, name: string): string | undefined {
    const element = new RegExp(`<${tag}\\b[^>]*>`).exec(this.html)?.[0] ?? '';
    return new RegExp(`\\s${name}="([^"]*)"`).exec(element)?.[1];
  }
}

describe('readingText', () => {
  it('leaves hover notes and alternative texts out of the word budget', () => {
    const body =
      'Un [octet](note "Mot forgé en 1956.") a huit bits.\n\n![Huit cases.](schema:cases)';
    expect(readingText(body).trim()).toBe('Un [octet] a huit bits.');
    expect(readingText("Un [octet](note 'Mot forgé en 1956.') a huit bits.")).toBe(
      'Un [octet] a huit bits.',
    );
  });
});

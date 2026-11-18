import { describe, expect, it } from 'vitest';
import { inlineSvg, schemaFile, svgIssues } from './svg.ts';

const svg = (inner: string, root = 'viewBox="0 0 640 240"') =>
  `<?xml version="1.0"?>\n<!-- un commentaire -->\n<svg xmlns="http://www.w3.org/2000/svg" ${root}>${inner}</svg>\n`;

const valid = svg(`
  <defs><marker id="fleche" viewBox="0 0 10 10" refX="5" refY="5"><path d="M0 0L10 5L0 10z" class="plein" /></marker></defs>
  <g class="trait">
    <rect x="10" y="10" width="100" height="50" rx="6" class="fond trait" />
    <line x1="120" y1="35" x2="200" y2="35" marker-end="url(#fleche)" />
    <circle cx="300" cy="35" r="20" fill="none" stroke="currentColor" />
  </g>
  <text x="20" y="100" font-size="24" class="texte">éteinte <tspan class="texte-accent" font-size="22px">0</tspan></text>
`);

describe('svgIssues', () => {
  it('accepts a diagram that follows the charter', () => {
    expect(svgIssues(valid)).toEqual([]);
  });

  it('requires a 640-wide viewBox, at most 480 high, without width or height', () => {
    const rule = 'racine : viewBox="0 0 640 H" attendu, avec H entre 1 et 480';
    expect(svgIssues(svg('', 'viewBox="0 0 800 240"'))).toContain(rule);
    expect(svgIssues(svg('', 'viewBox="0 0 640 481"'))).toContain(rule);
    expect(svgIssues(svg('', ''))).toContain(rule);
    expect(svgIssues(svg('', 'viewBox="0 0 640 480" width="640"'))).toContain(
      'racine : attribut width interdit, la taille suit la largeur du texte',
    );
    expect(svgIssues(svg('', 'viewBox="0 0 640 480" height="480"'))).toContain(
      'racine : attribut height interdit, la taille suit la largeur du texte',
    );
    expect(svgIssues('<g></g>')).toContain('racine : <svg> attendu, trouvé <g>');
  });

  it('forbids elements outside the list', () => {
    for (const name of ['script', 'style', 'foreignObject', 'image', 'a']) {
      expect(svgIssues(svg(`<${name}></${name}>`))).toContain(`élément interdit : <${name}>`);
    }
    expect(svgIssues(svg('<linearGradient></linearGradient>'))).toContain(
      'élément non autorisé : <linearGradient>',
    );
  });

  it('forbids style, event and link attributes', () => {
    expect(svgIssues(svg('<rect style="fill:red" />'))).toContain(
      'attribut interdit : style, dans <rect>',
    );
    expect(svgIssues(svg('<rect onclick="alert(1)" />'))).toContain(
      'attribut interdit : onclick, dans <rect>',
    );
    expect(svgIssues(svg('<path href="#x" />'))).toContain('attribut interdit : href, dans <path>');
    expect(svgIssues(svg('<path xlink:href="#x" />'))).toContain(
      'attribut interdit : xlink:href, dans <path>',
    );
    expect(svgIssues(svg('<line marker-end="url(https://x.org/a.svg#m)" />'))).toContain(
      'référence externe interdite : marker-end="url(https://x.org/a.svg#m)" dans <line>',
    );
  });

  it('forbids colours written in the file, and unknown classes', () => {
    const issues = svgIssues(svg('<rect fill="#ff0000" stroke="red" />'));
    expect(
      issues.some((i) => i.startsWith('couleur écrite dans le fichier : fill="#ff0000"')),
    ).toBe(true);
    expect(issues.some((i) => i.startsWith('couleur écrite dans le fichier : stroke="red"'))).toBe(
      true,
    );
    expect(svgIssues(svg('<rect color="blue" />'))).toContain(
      'couleur écrite dans le fichier : color="blue" dans <rect>',
    );
    expect(svgIssues(svg('<rect class="trait rouge" />'))).toContain(
      'classe inconnue : rouge, dans <rect>',
    );
  });

  it('keeps text between 22 and 32, and at most 25 words', () => {
    expect(svgIssues(svg('<text font-size="12">a</text>'))).toContain(
      'font-size="12" dans <text> : entre 22 et 32',
    );
    expect(svgIssues(svg('<text font-size="40">a</text>'))).toContain(
      'font-size="40" dans <text> : entre 22 et 32',
    );
    expect(svgIssues(svg('<text>a</text>'))).toContain('<text> sans font-size (entre 22 et 32)');
    expect(svgIssues(svg('<g font-size="24"><text>a</text></g>'))).toEqual([]);
    expect(svgIssues(svg(`<text font-size="24">${'mot '.repeat(26)}</text>`))).toContain(
      '26 mots dans le dessin : 25 au plus',
    );
    expect(svgIssues(svg(`<text font-size="24">${'mot '.repeat(25)}</text>`))).toEqual([]);
  });

  it('rejects malformed files', () => {
    expect(svgIssues(svg('<g>'))).not.toEqual([]);
    expect(svgIssues(svg('<rect x=10 />'))).toContain(
      'attribut illisible dans <rect> : chaque attribut s\'écrit nom="valeur"',
    );
    expect(svgIssues(svg('texte libre'))).toContain("texte hors d'un <text> : « texte libre »");
    expect(svgIssues(svg('<!DOCTYPE x>'))).not.toEqual([]);
    expect(svgIssues('')).toContain('racine <svg> introuvable');
  });
});

describe('inlineSvg', () => {
  it('drops the prolog, prefixes the ids and names the image', () => {
    const html = inlineSvg(valid, 'etats', 'Deux « lampes »');
    expect(html.startsWith('<svg role="img" aria-label="Deux « lampes »"')).toBe(true);
    expect(html).not.toContain('<?xml');
    expect(html).not.toContain('<!--');
    expect(html).toContain('id="schema-etats-fleche"');
    expect(html).toContain('url(#schema-etats-fleche)');
    expect(inlineSvg(valid, 'etats', 'a "b"')).toContain('aria-label="a &quot;b&quot;"');
  });
});

describe('schemaFile', () => {
  it('sits next to the brick', () => {
    expect(schemaFile('src/content/briques/fr/donnees/bit.md', 'etats')).toBe(
      'src/content/briques/fr/donnees/bit.etats.svg',
    );
  });
});

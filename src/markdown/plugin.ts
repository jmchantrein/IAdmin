import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import {
  ContentError,
  NOTE_HREF,
  brickIdIssue,
  brickLinkProperties,
  brickTooltip,
  bubbleClose,
  bubbleOpen,
  noteClose,
  noteIssue,
  noteOpen,
  parseBrickHref,
  parseSchemaSrc,
  schemaIssues,
  schemaMarker,
} from './mechanisms.ts';

type MdastPluginEntry = NonNullable<SatteriProcessorOptions['mdastPlugins']>[number];

/**
 * Sätteri mdast plugin: turns the authoring syntax of a brick body into markers (see
 * `mechanisms.ts`), and stops the build on a malformed one. One instance per document.
 */
export const mechanismsPlugin: MdastPluginEntry = ({ fileURL }) => {
  const file = fileURL ? relative(process.cwd(), fileURLToPath(fileURL)) : 'Markdown';
  const fail = (rule: string): never => {
    throw new ContentError(file, rule);
  };
  let tooltips = 0;
  let schemas = 0;

  return {
    name: 'iadmin-mechanisms',
    link(node, ctx) {
      const id = parseBrickHref(node.url);
      if (id !== null) {
        const issue = brickIdIssue(id);
        if (issue) fail(issue);
        const n = ++tooltips;
        ctx.replaceNode(node, [
          { type: 'html', value: bubbleOpen },
          { ...node, data: { hProperties: brickLinkProperties(n) } },
          { type: 'html', value: brickTooltip(n, id) + bubbleClose },
        ]);
      } else if (node.url === NOTE_HREF) {
        const issue = noteIssue(node.title);
        if (issue) fail(issue);
        const n = ++tooltips;
        ctx.replaceNode(node, [
          { type: 'html', value: noteOpen(n) },
          ...node.children,
          { type: 'html', value: noteClose(n, node.title!) },
        ]);
      }
    },
    paragraph(node, ctx) {
      const meaningful = node.children.filter((c) => c.type !== 'text' || c.value.trim());
      const [only] = meaningful;
      if (meaningful.length !== 1 || only?.type !== 'image') return;
      const name = parseSchemaSrc(only.url);
      if (name === null) return;
      const issues = schemaIssues(name, only.alt ?? '', ++schemas);
      if (issues.length > 0) fail(issues.join(' ; '));
      ctx.replaceNode(node, { type: 'html', value: schemaMarker(name, only.alt ?? '') });
    },
    image(node, ctx) {
      if (parseSchemaSrc(node.url) === null) return;
      const siblings = ctx.parent(node)?.children ?? [];
      const index = ctx.indexOf(node);
      const alone = siblings.every((c, i) => i === index || (c.type === 'text' && !c.value.trim()));
      if (!alone) fail(`schéma « ${node.url} » : un schéma occupe seul son paragraphe`);
    },
  };
};

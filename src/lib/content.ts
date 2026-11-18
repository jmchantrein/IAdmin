import { getCollection, type CollectionEntry } from 'astro:content';
import type { Graph } from '../core/graph.ts';
import type { Path } from '../core/schema.ts';
import { typesetBrick, typesetPath } from '../core/typography.ts';
import type { Lang } from '../i18n/index.ts';

export type BrickEntry = CollectionEntry<'briques'>;

export interface Content {
  /** Bricks by id (`<domaine>/<brique>`, without the language). */
  bricks: Map<string, BrickEntry>;
  paths: Map<string, Path>;
  /** Prerequisite graph: brick id → ids it requires. */
  graph: Graph;
}

export async function loadContent(lang: Lang): Promise<Content> {
  const prefix = `${lang}/`;
  const own = <T extends { id: string }>(entries: T[]) =>
    entries.filter((entry) => entry.id.startsWith(prefix));
  const localId = (entry: { id: string }) => entry.id.slice(prefix.length);

  // The one place where the displayed texts get the typography of their language; the
  // rendered body gets it while Markdown is compiled (`src/markdown/plugin.ts`).
  const bricks = new Map(
    own(await getCollection('briques')).map((e) => [
      localId(e),
      { ...e, data: typesetBrick(e.data, lang) },
    ]),
  );
  const paths = new Map(
    own(await getCollection('parcours')).map((e) => [localId(e), typesetPath(e.data, lang)]),
  );
  const graph = new Map([...bricks].map(([id, entry]) => [id, entry.data.requiert]));
  return { bricks, paths, graph };
}

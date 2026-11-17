import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from 'yaml';
import type { z } from 'zod';
import type { Graph } from '../src/core/graph.ts';
import { brickSchema, pathSchema, type Brick, type Path } from '../src/core/schema.ts';

/** Reads the content straight from the files, with the same schema as the site build. */

const CONTENT = join(import.meta.dirname, '../src/content');

export interface LoadedContent {
  bricks: Map<string, Brick & { body: string }>;
  paths: Map<string, Path>;
  graph: Graph;
  /** Human-readable schema errors, one per problem. */
  errors: string[];
}

export function locales(): string[] {
  return readdirSync(join(CONTENT, 'briques'));
}

function files(dir: string, extension: string): string[] {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((file) => file.endsWith(extension))
    .map((file) => join(dir, file));
}

function validate<S extends z.ZodType>(schema: S, data: unknown, file: string, errors: string[]) {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  for (const issue of result.error.issues) {
    errors.push(`${relative(CONTENT, file)} › ${issue.path.join('.')} : ${issue.message}`);
  }
  return null;
}

export function loadContent(lang: string): LoadedContent {
  const errors: string[] = [];
  const bricks: LoadedContent['bricks'] = new Map();
  const paths: LoadedContent['paths'] = new Map();

  const bricksDir = join(CONTENT, 'briques', lang);
  for (const file of files(bricksDir, '.md')) {
    const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(readFileSync(file, 'utf8'));
    if (!match) {
      errors.push(`${relative(CONTENT, file)} : frontmatter introuvable`);
      continue;
    }
    const brick = validate(brickSchema, parse(match[1]!), file, errors);
    if (brick)
      bricks.set(relative(bricksDir, file).replace(/\.md$/, ''), { ...brick, body: match[2]! });
  }

  const pathsDir = join(CONTENT, 'parcours', lang);
  for (const file of files(pathsDir, '.yaml')) {
    const path = validate(pathSchema, parse(readFileSync(file, 'utf8')), file, errors);
    if (path) paths.set(relative(pathsDir, file).replace(/\.yaml$/, ''), path);
  }

  const graph = new Map([...bricks].map(([id, brick]) => [id, brick.requiert]));
  return { bricks, paths, graph, errors };
}

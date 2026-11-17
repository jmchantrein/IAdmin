import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { brickSchema, pathSchema } from './core/schema.ts';

// Entry ids keep the full relative path: `<lang>/<domaine>/<brique>` and `<lang>/<parcours>`.
const pathAsId = ({ entry }: { entry: string }) => entry.replace(/\.[^.]+$/, '');

export const collections = {
  briques: defineCollection({
    loader: glob({ base: './src/content/briques', pattern: '**/*.md', generateId: pathAsId }),
    schema: brickSchema,
  }),
  parcours: defineCollection({
    loader: glob({ base: './src/content/parcours', pattern: '**/*.yaml', generateId: pathAsId }),
    schema: pathSchema,
  }),
};

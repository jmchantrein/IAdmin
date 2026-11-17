import { routeTo, type Graph } from './graph.ts';
import type { Path } from './schema.ts';

/**
 * Targets of a path, including those of the paths it includes.
 * Fails fast on an unknown path or an inclusion loop.
 */
export function resolveTargets(paths: ReadonlyMap<string, Path>, id: string): string[] {
  const targets = new Set<string>();
  const stack: string[] = [];

  const visit = (pathId: string): void => {
    if (stack.includes(pathId)) {
      throw new Error(`parcours en boucle : ${[...stack, pathId].join(' → ')}`);
    }
    const path = paths.get(pathId);
    if (!path) throw new Error(`parcours inconnu : ${pathId}`);
    stack.push(pathId);
    path.cibles.forEach((target) => targets.add(target));
    path.inclut.forEach(visit);
    stack.pop();
  };

  visit(id);
  return [...targets];
}

/** Ordered bricks of a path: every prerequisite before the brick that needs it. */
export function pathRoute(graph: Graph, paths: ReadonlyMap<string, Path>, id: string): string[] {
  return routeTo(graph, resolveTargets(paths, id));
}

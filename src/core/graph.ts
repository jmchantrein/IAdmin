/**
 * Knowledge graph: each brick id maps to the ids it requires.
 * Pure functions, no knowledge of any domain.
 */
export type Graph = ReadonlyMap<string, readonly string[]>;

export interface DanglingLink {
  from: string;
  to: string;
}

/** Links pointing to a node that does not exist. */
export function findDangling(graph: Graph): DanglingLink[] {
  const dangling: DanglingLink[] = [];
  for (const [from, links] of graph) {
    for (const to of links) if (!graph.has(to)) dangling.push({ from, to });
  }
  return dangling;
}

/** First cycle found, as a closed route (`[a, b, a]`), or null when the graph is acyclic. */
export function findCycle(graph: Graph): string[] | null {
  const done = new Set<string>();
  const stack: string[] = [];

  const visit = (id: string): string[] | null => {
    const seenAt = stack.indexOf(id);
    if (seenAt !== -1) return [...stack.slice(seenAt), id];
    if (done.has(id)) return null;
    stack.push(id);
    for (const next of graph.get(id) ?? []) {
      const cycle = visit(next);
      if (cycle) return cycle;
    }
    stack.pop();
    done.add(id);
    return null;
  };

  for (const id of graph.keys()) {
    const cycle = visit(id);
    if (cycle) return cycle;
  }
  return null;
}

export function formatCycle(cycle: readonly string[]): string {
  return cycle.join(' → ');
}

/**
 * Route to the targets: every ancestor before its descendants (depth-first post-order,
 * which keeps chains grouped). Fails fast on a cycle or an unknown node.
 */
export function routeTo(graph: Graph, targets: readonly string[]): string[] {
  const route: string[] = [];
  const done = new Set<string>();
  const stack: string[] = [];

  const visit = (id: string): void => {
    if (done.has(id)) return;
    if (stack.includes(id)) {
      throw new Error(`cycle : ${formatCycle([...stack.slice(stack.indexOf(id)), id])}`);
    }
    const links = graph.get(id);
    if (!links) throw new Error(`nœud inconnu : ${id}`);
    stack.push(id);
    links.forEach(visit);
    stack.pop();
    done.add(id);
    route.push(id);
  };

  targets.forEach(visit);
  return route;
}

/** All nodes required, directly or not, by `id` (itself excluded). */
export function ancestors(graph: Graph, id: string): Set<string> {
  const result = new Set(routeTo(graph, [id]));
  result.delete(id);
  return result;
}

/** Nodes that directly require `id`. */
export function dependents(graph: Graph, id: string): string[] {
  return [...graph].filter(([, links]) => links.includes(id)).map(([from]) => from);
}

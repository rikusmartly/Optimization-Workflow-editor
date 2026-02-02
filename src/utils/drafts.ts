import type { Node, Connection } from '../types';

export const MY_OPTIMIZATIONS_KEY = 'my-optimizations';

export interface SavedOptimization {
  id: string;
  workflowName: string;
  nodes: Node[];
  connections: Connection[];
  savedAt: number;
}

export function getMyOptimizations(): SavedOptimization[] {
  try {
    const raw = localStorage.getItem(MY_OPTIMIZATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedOptimization[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMyOptimizations(list: SavedOptimization[]): void {
  localStorage.setItem(MY_OPTIMIZATIONS_KEY, JSON.stringify(list));
}

export function addDraft(
  workflowName: string,
  nodes: Node[],
  connections: Connection[]
): SavedOptimization {
  const list = getMyOptimizations();
  const draft: SavedOptimization = {
    id: `draft-${Date.now()}`,
    workflowName,
    nodes,
    connections,
    savedAt: Date.now(),
  };
  list.unshift(draft);
  saveMyOptimizations(list);
  return draft;
}

export function deleteDraft(id: string): void {
  const list = getMyOptimizations().filter((d) => d.id !== id);
  saveMyOptimizations(list);
}

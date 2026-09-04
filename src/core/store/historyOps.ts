import { EditorState, ProjectSnapshot } from './types';
import { Project } from '../../types/idef0';

export class HistoryOps {
  public static pushHistory(state: EditorState): void {
    const clone = JSON.parse(JSON.stringify(state.project)) as Project;
    state.history.push(clone);
    if (state.history.length > 50) {
      state.history.shift();
    }
    state.redoStack = [];
  }

  public static undo(state: EditorState): boolean {
    if (state.history.length === 0) return false;
    const prev = state.history.pop()!;
    state.redoStack.push(JSON.parse(JSON.stringify(state.project)));
    state.project = prev;
    if (!state.project.diagrams.some((d) => d.id === state.activeDiagramId)) {
      state.activeDiagramId = state.project.diagrams[0]?.id || '';
    }
    state.selectedObjectId = null;
    state.selectedObjectType = null;
    return true;
  }

  public static redo(state: EditorState): boolean {
    if (state.redoStack.length === 0) return false;
    const next = state.redoStack.pop()!;
    state.history.push(JSON.parse(JSON.stringify(state.project)));
    state.project = next;
    if (!state.project.diagrams.some((d) => d.id === state.activeDiagramId)) {
      state.activeDiagramId = state.project.diagrams[0]?.id || '';
    }
    state.selectedObjectId = null;
    state.selectedObjectType = null;
    return true;
  }

  public static saveProjectSnapshot(state: EditorState, name: string): ProjectSnapshot {
    const clone = JSON.parse(JSON.stringify(state.project)) as Project;
    const snapshot: ProjectSnapshot = {
      id: `snap-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      createdAt: new Date().toISOString(),
      diagramsCount: state.project.diagrams.length,
      blocksCount: state.project.diagrams.reduce((acc, d) => acc + d.blocks.length, 0),
      project: clone,
    };
    if (!state.project.snapshots) {
      state.project.snapshots = [];
    }
    state.project.snapshots.unshift(snapshot);
    state.snapshots.push(snapshot);
    return snapshot;
  }

  public static restoreSnapshot(state: EditorState, snapshotId: string): boolean {
    const list = state.project.snapshots || state.snapshots;
    const snap = list.find((s) => s.id === snapshotId);
    if (!snap) return false;
    HistoryOps.pushHistory(state);
    const existingSnapshots = state.project.snapshots ? [...state.project.snapshots] : [];
    state.project = JSON.parse(JSON.stringify(snap.project));
    state.project.snapshots = existingSnapshots;
    state.selectedObjectId = null;
    state.selectedObjectType = null;
    return true;
  }

  public static deleteSnapshot(state: EditorState, snapshotId: string): void {
    if (state.project.snapshots) {
      state.project.snapshots = state.project.snapshots.filter((s) => s.id !== snapshotId);
    }
    state.snapshots = state.snapshots.filter((s) => s.id !== snapshotId);
  }
}

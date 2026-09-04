export interface ProjectSnapshot {
  id: string;
  name: string;
  createdAt: string;
  diagramsCount?: number;
  blocksCount?: number;
  project: Project;
}

export interface EditorState {
  project: Project;
  activeDiagramId: string;
  selectedObjectId: string | null;
  selectedObjectType: 'block' | 'arrow' | 'junction' | null;
  activeTool: ToolMode;
  zoom: number;
  pan: Point;
  history: Project[];
  redoStack: Project[];
  autosaveStatus: 'saved' | 'saving';
  leftPanelOpen: boolean;
  rightPanelOpen: boolean;
  bottomPanelOpen?: boolean;
  gridVisible: boolean;
  snapshots: ProjectSnapshot[];
}

export type Listener = (state: EditorState) => void;

export const STORAGE_KEY = 'idef0_project_v18';

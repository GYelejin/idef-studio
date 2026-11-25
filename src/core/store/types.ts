import { Diagram, Project, Point, ProjectSnapshot, ToolMode } from '../../types/idef0';

export type { ProjectSnapshot, ToolMode };

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

export function getActiveDiagram(state: EditorState): Diagram | undefined {
  return state.project.diagrams.find((d) => d.id === state.activeDiagramId);
}

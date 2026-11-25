export type ICOMRole = 'input' | 'control' | 'output' | 'mechanism';

export type Side = 'left' | 'top' | 'right' | 'bottom';

export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  id?: string;
  arrowId?: string;
  start: Point;
  end: Point;
  orientation: 'horizontal' | 'vertical';
}

export interface ArrowEndpoint {
  type: 'border' | 'block' | 'junction' | 'arrow_segment' | 'unattached';
  id?: string; // Block ID, Junction ID, or Parent Arrow ID
  side?: Side;
  point: Point;
  role?: ICOMRole;
}

export interface Arrow {
  id: string;
  label: string;
  source: ArrowEndpoint;
  target: ArrowEndpoint;
  role: ICOMRole;
  pinned?: boolean;
  points: Point[]; // Sequence of orthogonal waypoints from source to target
  labelPos?: Point;
  showLeader?: boolean;
  leaderPoints?: Point[];
  tunnelSource?: boolean; // IDEF0 Arrow Tunneling at source ( )
  tunnelTarget?: boolean; // IDEF0 Arrow Tunneling at target ( )
  hasArcCorners?: boolean;
  arcRadius?: number;
  pathMode?: 'auto' | 'pinned';
}

export interface Junction {
  id: string;
  type: 'branch' | 'merge';
  point: Point;
  parentArrowId: string;
  childArrowIds: string[];
}

export interface Block {
  id: string;
  nodeNumber: number; // 1..6
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  decompDiagramId?: string | null;
}

export interface Diagram {
  id: string;
  code: string; // e.g. 'A-0', 'A0', 'A1', 'A11'
  title: string;
  parentBlockId: string | null;
  blocks: Block[];
  arrows: Arrow[];
  junctions: Junction[];
}

export interface ProjectSnapshot {
  id: string;
  name: string;
  timestamp?: number;
  createdAt?: string;
  diagramsCount?: number;
  blocksCount?: number;
  project: Project;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  diagrams: Diagram[];
  activeDiagramId: string;
  snapshots?: ProjectSnapshot[];
}

export interface LinterIssue {
  id: string;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  elementId?: string;
  elementType?: 'block' | 'arrow' | 'diagram';
  blockId?: string;
  arrowId?: string;
  details?: string;
}

export type ToolMode = 'select' | 'block' | 'arrow';

export interface SnapTarget {
  type: 'border' | 'block' | 'junction' | 'arrow_segment';
  id?: string;
  side?: Side;
  point: Point;
  role: ICOMRole;
  sideBounds?: { x1: number; y1: number; x2: number; y2: number };
  targetArrowId?: string;
  targetSegmentIndex?: number;
}

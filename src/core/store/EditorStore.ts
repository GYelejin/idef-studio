import {
  Project,
  Diagram,
  Block,
  Arrow,
  Point,
  ICOMRole,
  SnapTarget,
  ArrowEndpoint,
} from '../../types/idef0';
import { EditorState, Listener, ToolMode, ProjectSnapshot } from './types';
import { createDefaultProject } from './projectFactory';
import { HistoryOps } from './historyOps';
import { BlockOps } from './blockOps';
import { ArrowOps } from './arrowOps';
import { ArrowEndpointOps } from './arrowEndpointOps';
import { ArrowGeometryOps } from './arrowGeometryOps';
import { JunctionOps } from './junctionOps';
import { DecompositionOps } from './decompositionOps';
import { ProjectOps } from './projectOps';

export class EditorStore {
  private state: EditorState;
  private listeners: Set<Listener> = new Set();

  constructor() {
    const defaultProject = createDefaultProject();
    this.state = {
      project: defaultProject,
      activeDiagramId: defaultProject.activeDiagramId,
      selectedObjectId: null,
      selectedObjectType: null,
      activeTool: 'select',
      zoom: 1,
      pan: { x: 0, y: 0 },
      leftPanelOpen: true,
      rightPanelOpen: true,
      bottomPanelOpen: true,
      gridVisible: true,
      history: [],
      redoStack: [],
      autosaveStatus: 'saved',
      snapshots: [],
    };
  }

  public getState(): EditorState {
    return this.state;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  public pushHistory(): void {
    HistoryOps.pushHistory(this.state);
  }

  public getActiveDiagram(): Diagram | undefined {
    return this.state.project.diagrams.find((d) => d.id === this.state.activeDiagramId);
  }

  // --- Viewport & Tool UI State ---
  public setTool(tool: ToolMode): void {
    this.state.activeTool = tool;
    this.notify();
  }

  public selectObject(id: string | null, type: 'block' | 'arrow' | 'junction' | null): void {
    this.state.selectedObjectId = id;
    this.state.selectedObjectType = type;
    this.notify();
  }

  public clearSelection(): void {
    this.selectObject(null, null);
  }

  public setZoom(zoom: number): void {
    this.state.zoom = zoom;
    this.notify();
  }

  public setPan(pan: Point): void {
    this.state.pan = pan;
    this.notify();
  }

  public toggleLeftPanel(): void {
    this.state.leftPanelOpen = !this.state.leftPanelOpen;
    this.notify();
  }

  public toggleRightPanel(): void {
    this.state.rightPanelOpen = !this.state.rightPanelOpen;
    this.notify();
  }

  public toggleGrid(): void {
    this.state.gridVisible = !this.state.gridVisible;
    this.notify();
  }

  // --- Block Operations ---
  public createBlock(x: number, y: number, name = 'Новая функция'): Block | null {
    const block = BlockOps.createBlock(this.state, x, y, name);
    this.notify();
    return block;
  }

  public updateBlock(id: string, updates: Partial<Block>, saveHistory = true): void {
    BlockOps.updateBlock(this.state, id, updates, saveHistory);
    this.notify();
  }

  public commitBlockMove(_id: string): void {
    this.pushHistory();
  }

  public resizeBlock(id: string, bounds: { x: number; y: number; width: number; height: number }, saveHistory = true): void {
    BlockOps.resizeBlock(this.state, id, bounds, saveHistory);
    this.notify();
  }

  public commitBlockResize(_id: string): void {
    this.pushHistory();
  }

  public deleteBlock(id: string): void {
    BlockOps.deleteBlock(this.state, id);
    this.notify();
  }

  public setBlockColor(blockId: string, color: string): void {
    const diag = this.getActiveDiagram();
    if (!diag) return;
    const block = diag.blocks.find((b) => b.id === blockId);
    if (!block) return;
    this.pushHistory();
    block.color = color;
    this.notify();
  }

  // --- Arrow Operations ---
  public createArrow(arrowData: Omit<Arrow, 'id'> & { id?: string }): Arrow | null {
    const arrow = ArrowOps.createArrow(this.state, arrowData);
    this.notify();
    return arrow;
  }

  public setArrowRole(arrowId: string, newRole: ICOMRole, saveHistory = true): boolean {
    const res = ArrowOps.setArrowRole(this.state, arrowId, newRole, saveHistory);
    this.notify();
    return res;
  }

  public updateArrow(id: string, updates: Partial<Arrow>, saveHistory = true): void {
    ArrowOps.updateArrow(this.state, id, updates, saveHistory);
    this.notify();
  }

  public toggleLeader(arrowId: string): void {
    ArrowOps.toggleLeader(this.state, arrowId);
    this.notify();
  }

  public deleteArrow(id: string): void {
    ArrowOps.deleteArrow(this.state, id);
    this.notify();
  }

  public recomputeArrowRoute(arrow: Arrow, diag?: Diagram): void {
    ArrowOps.recomputeArrowRoute(this.state, arrow, diag);
  }

  public setArrowPinned(arrowId: string, pinned: boolean): void {
    ArrowOps.setArrowPinned(this.state, arrowId, pinned);
    this.notify();
  }

  public setArrowPathMode(arrowId: string, mode: 'auto' | 'pinned'): void {
    ArrowOps.setArrowPathMode(this.state, arrowId, mode);
    this.notify();
  }

  public _legacySetArrowPathMode(arrowId: string, mode: 'auto' | 'pinned'): void {
    ArrowOps._legacySetArrowPathMode(this.state, arrowId, mode);
  }

  public resetArrowRoute(arrowId: string): void {
    ArrowOps.resetArrowRoute(this.state, arrowId);
    this.notify();
  }

  public setFlowFamilyColor(arrowId: string, color: string): void {
    ArrowOps.setFlowFamilyColor(this.state, arrowId, color);
    this.notify();
  }

  // --- Arrow Endpoints & Geometry ---
  public reconnectArrowEndpoint(
    arrowId: string,
    endType: 'source' | 'target',
    snapTarget: SnapTarget | null,
    pointerPos: Point
  ): boolean {
    const res = ArrowEndpointOps.reconnectArrowEndpoint(this.state, arrowId, endType, snapTarget, pointerPos);
    this.notify();
    return res;
  }

  public setArrowEndpointKey(
    arrowId: string,
    endType: 'source' | 'target',
    optionKey: string
  ): boolean {
    const res = ArrowEndpointOps.setArrowEndpointKey(this.state, arrowId, endType, optionKey);
    this.notify();
    return res;
  }

  public shiftArrowSegment(
    arrowId: string,
    segmentIndex: number,
    newCoord: number,
    saveHistory = true,
    initialPoints?: Point[]
  ): void {
    ArrowGeometryOps.shiftArrowSegment(this.state, arrowId, segmentIndex, newCoord, saveHistory, initialPoints);
    this.notify();
  }

  public removeArrowPoint(arrowId: string, pointIndex: number): void {
    ArrowGeometryOps.removeArrowPoint(this.state, arrowId, pointIndex);
    this.notify();
  }

  public removeArrowSegment(arrowId: string, segmentIndex: number): void {
    ArrowGeometryOps.removeArrowSegment(this.state, arrowId, segmentIndex);
    this.notify();
  }

  public straightenArrow(arrowId: string): void {
    ArrowGeometryOps.straightenArrow(this.state, arrowId);
    this.notify();
  }

  public updateArrowPointCoord(arrowId: string, pointIndex: number, coord: 'x' | 'y', value: number): void {
    ArrowGeometryOps.updateArrowPointCoord(this.state, arrowId, pointIndex, coord, value);
    this.notify();
  }

  // --- Junction Operations ---
  public createJunction(type: 'branch' | 'merge', point: Point, parentArrowId?: string): { id: string; type: 'branch' | 'merge'; point: Point; parentArrowId?: string; childArrowIds: string[] } {
    const diag = this.getActiveDiagram();
    const junc = {
      id: `junc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      point: { ...point },
      parentArrowId,
      childArrowIds: [] as string[],
    };
    if (diag) {
      diag.junctions.push(junc);
    }
    this.notify();
    return junc;
  }

  public moveJunction(juncId: string, targetPt: Point, saveHistory = true): void {
    JunctionOps.moveJunction(this.state, juncId, targetPt, saveHistory);
    this.notify();
  }

  // --- Decomposition Operations ---
  public decomposeBlock(blockId: string): string {
    const newId = DecompositionOps.decomposeBlock(this.state, blockId);
    this.notify();
    return newId;
  }

  public createDiagram(code: string, title: string, parentBlockId: string | null = null): Diagram {
    const diag = DecompositionOps.createDiagram(this.state, code, title, parentBlockId);
    this.notify();
    return diag;
  }

  public switchDiagram(diagramId: string): void {
    DecompositionOps.switchDiagram(this.state, diagramId);
    this.notify();
  }

  // --- Project Operations ---
  public resetProject(): void {
    ProjectOps.resetProject(this.state);
    this.notify();
  }

  public loadExample(): void {
    ProjectOps.loadExample(this.state);
    this.notify();
  }

  public importProject(projOrJson: Project | string): boolean {
    const res = ProjectOps.importProject(this.state, projOrJson);
    this.notify();
    return res;
  }

  public updateProjectMeta(name: string, description: string): void {
    ProjectOps.updateProjectMeta(this.state, name, description);
    this.notify();
  }

  public autoLayoutCurrentDiagram(): void {
    ProjectOps.autoLayoutCurrentDiagram(this.state);
    this.notify();
  }

  // --- History & Snapshots ---
  public saveProjectSnapshot(name: string): ProjectSnapshot {
    const snap = HistoryOps.saveProjectSnapshot(this.state, name);
    this.notify();
    return snap;
  }

  public createSnapshot(name: string): ProjectSnapshot {
    return this.saveProjectSnapshot(name);
  }

  public restoreSnapshot(snapshotId: string): boolean {
    const res = HistoryOps.restoreSnapshot(this.state, snapshotId);
    this.notify();
    return res;
  }

  public deleteSnapshot(snapshotId: string): void {
    HistoryOps.deleteSnapshot(this.state, snapshotId);
    this.notify();
  }

  public undo(): void {
    const res = HistoryOps.undo(this.state);
    if (res) this.notify();
  }

  public redo(): void {
    const res = HistoryOps.redo(this.state);
    if (res) this.notify();
  }
}

export const store = new EditorStore();

import { Point, SnapTarget } from '../../types/idef0';

export interface DragState {
  type: 'block' | 'block_resize' | 'arrow_draw' | 'segment_drag' | 'label_drag' | 'junction_drag' | 'endpoint_drag';
  blockId?: string;
  resizeHandle?: 'nw' | 'ne' | 'se' | 'sw';
  startBounds?: { x: number; y: number; width: number; height: number };
  arrowId?: string;
  juncId?: string;
  segmentIndex?: number;
  endType?: 'source' | 'target';
  startMouse: Point;
  startBlockPos?: Point;
  startArrowPoints?: Point[];
  startLabelPos?: Point;
  draftSource?: SnapTarget;
  currentPoint?: Point;
  currentSnap?: SnapTarget | null;
}

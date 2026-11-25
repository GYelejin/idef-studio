import { Arrow, ArrowEndpoint, Block, Diagram, ICOMRole, Point, Project, Side } from '../types/idef0';
import { CANVAS_HEIGHT, CANVAS_WIDTH, buildOrthogonalRoute, clampLabelToCanvas } from './geometry';

export interface RsfImportResult {
  success: boolean;
  project?: Project;
  error?: string;
}

type TableRow = Record<string, string>;

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * Lightweight, environment-independent parser for Ramus XML table files.
 */
function parseRamusXmlTable(xml: string): TableRow[] {
  const fields: Record<string, string> = {};
  const fieldRe = /<field\b[^>]*\bid="([^"]+)"[^>]*\bname="([^"]+)"[^>]*\/?>/g;
  let fm: RegExpExecArray | null;
  while ((fm = fieldRe.exec(xml)) !== null) {
    fields[fm[1]] = fm[2];
  }

  const rows: TableRow[] = [];
  const rowRe = /<row>([\s\S]*?)<\/row>/g;
  let rm: RegExpExecArray | null;
  while ((rm = rowRe.exec(xml)) !== null) {
    const rowBody = rm[1];
    const row: TableRow = {};
    const cellRe = /<f\b[^>]*\bid="([^"]+)"[^>]*(?:\/>|>([\s\S]*?)<\/f>)/g;
    let cm: RegExpExecArray | null;
    while ((cm = cellRe.exec(rowBody)) !== null) {
      const colName = fields[cm[1]];
      if (colName) {
        row[colName] = cm[2] ? decodeXmlEntities(cm[2].trim()) : '';
      }
    }
    rows.push(row);
  }
  return rows;
}

function mapRamusSide(code: string): Side | undefined {
  switch (code) {
    case '0':
      return 'right';
    case '1':
      return 'bottom';
    case '2':
      return 'left';
    case '3':
      return 'top';
    default:
      return undefined;
  }
}

function roleFromSides(srcSide?: Side, tgtSide?: Side): ICOMRole {
  if (tgtSide === 'top') return 'control';
  if (tgtSide === 'bottom') return 'mechanism';
  if (tgtSide === 'left') return 'input';
  if (srcSide === 'right' || tgtSide === 'right') return 'output';
  return 'input';
}

async function readOptionalTable(zip: import('jszip'), path: string): Promise<TableRow[]> {
  const file = zip.file(path);
  if (!file) return [];
  const xml = await file.async('string');
  return parseRamusXmlTable(xml);
}

/**
 * Imports a Ramus (.rsf) ZIP/XML IDEF0 model into an IDEF0 Studio Project.
 */
export async function importProjectFromRsf(
  data: ArrayBuffer | Uint8Array,
  fileName = 'ramus-model.rsf'
): Promise<RsfImportResult> {
  try {
    const JSZip = (await import('jszip')).default;
    const zip = await JSZip.loadAsync(data);

    const [
      rectangles,
      hierarchicals,
      texts,
      sectorBorders,
      sectorPoints,
      otherElements,
    ] = await Promise.all([
      readOptionalTable(zip, 'data/IDEF0/attribute_rectangles.xml'),
      readOptionalTable(zip, 'data/Core/attribute_hierarchicals.xml'),
      readOptionalTable(zip, 'data/Core/attribute_texts.xml'),
      readOptionalTable(zip, 'data/IDEF0/attribute_sector_borders.xml'),
      readOptionalTable(zip, 'data/IDEF0/attribute_sector_points.xml'),
      readOptionalTable(zip, 'data/Core/attribute_other_elements.xml'),
    ]);

    if (rectangles.length === 0) {
      return {
        success: false,
        error: 'В файле .rsf не найдены функциональные блоки IDEF0 (attribute_rectangles.xml).',
      };
    }

    // Map elementId -> parentElementId (ATTRIBUTE_ID === '1')
    const parentOf = new Map<string, string>();
    for (const h of hierarchicals) {
      if (h.ATTRIBUTE_ID === '1' && h.ELEMENT_ID) {
        parentOf.set(h.ELEMENT_ID, h.PARENT_ELEMENT_ID || '0');
      }
    }

    // Map elementId -> text name (prefer ATTRIBUTE_ID '55' for blocks, '39' for streams)
    const textMap = new Map<string, string>();
    for (const t of texts) {
      if (!t.ELEMENT_ID || !t.VALUE) continue;
      if (!textMap.has(t.ELEMENT_ID) || t.ATTRIBUTE_ID === '55' || t.ATTRIBUTE_ID === '39') {
        textMap.set(t.ELEMENT_ID, t.VALUE);
      }
    }

    // Group rectangles by their parent element (each parent element is a diagram)
    const rectsByParent = new Map<string, TableRow[]>();
    const rectByElemId = new Map<string, TableRow>();
    for (const r of rectangles) {
      const elemId = r.ELEMENT_ID;
      if (!elemId) continue;
      rectByElemId.set(elemId, r);
      const pId = parentOf.get(elemId) || '0';
      const list = rectsByParent.get(pId) || [];
      list.push(r);
      rectsByParent.set(pId, list);
    }

    // Find root diagram container (a parent ID that is NOT itself a rectangle element)
    const parentIds = Array.from(rectsByParent.keys());
    const rootParentId =
      parentIds.find((pid) => !rectByElemId.has(pid)) ?? parentIds[0];

    // Compute coordinate bounds across all rectangles and sector points to scale onto 1600x900
    let maxRamusX = 800;
    let maxRamusY = 450;
    for (const r of rectangles) {
      const rx = (parseFloat(r.X || '0') || 0) + (parseFloat(r.WIDTH || '80') || 80);
      const ry = (parseFloat(r.Y || '0') || 0) + (parseFloat(r.HEIGHT || '50') || 50);
      if (rx > maxRamusX) maxRamusX = rx;
      if (ry > maxRamusY) maxRamusY = ry;
    }
    for (const pt of sectorPoints) {
      const px = parseFloat(pt.X_POSITION || '0') || 0;
      const py = parseFloat(pt.Y_POSITION || '0') || 0;
      if (px > maxRamusX) maxRamusX = px;
      if (py > maxRamusY) maxRamusY = py;
    }

    const scaleX = (CANVAS_WIDTH - 120) / Math.max(maxRamusX, 1);
    const scaleY = (CANVAS_HEIGHT - 100) / Math.max(maxRamusY, 1);
    const scalePt = (x: number, y: number): Point => ({
      x: Math.max(30, Math.min(CANVAS_WIDTH - 30, Math.round(x * scaleX + 40))),
      y: Math.max(30, Math.min(CANVAS_HEIGHT - 30, Math.round(y * scaleY + 40))),
    });

    // Build diagrams BFS from rootParentId
    const diagrams: Diagram[] = [];
    const blockIdByRamusId = new Map<string, string>();
    const diagIdByRamusParent = new Map<string, string>();
    const blocksByDiagId = new Map<string, Block[]>();

    const rootRects = rectsByParent.get(rootParentId) || [];
    const isSingleRootContext = rootRects.length === 1;

    interface QueueItem {
      ramusParentId: string;
      code: string;
      parentBlockId: string | null;
    }

    const queue: QueueItem[] = [
      {
        ramusParentId: rootParentId,
        code: isSingleRootContext ? 'A-0' : 'A0',
        parentBlockId: null,
      },
    ];

    while (queue.length > 0) {
      const item = queue.shift();
      if (!item) break;
      const diagId = `diag-rsf-${item.ramusParentId}`;
      diagIdByRamusParent.set(item.ramusParentId, diagId);

      const rawRects = [...(rectsByParent.get(item.ramusParentId) || [])].sort(
        (a, b) => (parseFloat(a.X || '0') || 0) - (parseFloat(b.X || '0') || 0)
      );

      const blocks: Block[] = rawRects.map((r, idx) => {
        const elemId = r.ELEMENT_ID;
        const blockId = `block-rsf-${elemId}`;
        blockIdByRamusId.set(elemId, blockId);

        const topLeft = scalePt(parseFloat(r.X || '0') || 0, parseFloat(r.Y || '0') || 0);
        const w = Math.max(120, Math.round((parseFloat(r.WIDTH || '80') || 80) * scaleX));
        const h = Math.max(70, Math.round((parseFloat(r.HEIGHT || '50') || 50) * scaleY));
        const hasChildDiag = rectsByParent.has(elemId);
        const nodeNumber = item.code === 'A-0' ? 0 : idx + 1;
        const childCode =
          item.code === 'A-0'
            ? 'A0'
            : item.code === 'A0'
              ? `A${nodeNumber}`
              : `${item.code}${nodeNumber}`;

        if (hasChildDiag) {
          queue.push({
            ramusParentId: elemId,
            code: childCode,
            parentBlockId: blockId,
          });
        }

        return {
          id: blockId,
          nodeNumber,
          name: textMap.get(elemId) || `Функция ${nodeNumber}`,
          x: Math.min(topLeft.x, CANVAS_WIDTH - w - 30),
          y: Math.min(topLeft.y, CANVAS_HEIGHT - h - 30),
          width: w,
          height: h,
          decompDiagramId: hasChildDiag ? `diag-rsf-${elemId}` : null,
        };
      });

      blocksByDiagId.set(diagId, blocks);
      const parentTitle = textMap.get(item.ramusParentId);
      diagrams.push({
        id: diagId,
        code: item.code,
        title: parentTitle
          ? `${item.code === 'A-0' ? 'Контекстная диаграмма' : 'Декомпозиция'}: ${parentTitle}`
          : `Диаграмма ${item.code}`,
        parentBlockId: item.parentBlockId,
        blocks,
        arrows: [],
        junctions: [],
      });
    }

    // Map sectorId -> diagram ramusParentId (ATTRIBUTE_ID '35') and label element (ATTRIBUTE_ID '36')
    const sectorDiagram = new Map<string, string>();
    const sectorLabelElem = new Map<string, string>();
    for (const oe of otherElements) {
      if (!oe.ELEMENT_ID || !oe.OTHER_ELEMENT) continue;
      if (oe.ATTRIBUTE_ID === '35') {
        sectorDiagram.set(oe.ELEMENT_ID, oe.OTHER_ELEMENT);
      } else if (oe.ATTRIBUTE_ID === '36') {
        sectorLabelElem.set(oe.ELEMENT_ID, oe.OTHER_ELEMENT);
      }
    }

    // Group sector points by sectorId
    const pointsBySector = new Map<string, { pos: number; x: number; y: number }[]>();
    for (const pt of sectorPoints) {
      if (!pt.ELEMENT_ID) continue;
      const list = pointsBySector.get(pt.ELEMENT_ID) || [];
      list.push({
        pos: parseInt(pt.POSITION || '0', 10) || 0,
        x: parseFloat(pt.X_POSITION || '0') || 0,
        y: parseFloat(pt.Y_POSITION || '0') || 0,
      });
      pointsBySector.set(pt.ELEMENT_ID, list);
    }

    // Group sector borders by sectorId (41 = source, 42 = target)
    const bordersBySector = new Map<string, { src?: TableRow; tgt?: TableRow }>();
    for (const b of sectorBorders) {
      if (!b.ELEMENT_ID) continue;
      const entry = bordersBySector.get(b.ELEMENT_ID) || {};
      if (b.ATTRIBUTE_ID === '41') entry.src = b;
      else if (b.ATTRIBUTE_ID === '42') entry.tgt = b;
      bordersBySector.set(b.ELEMENT_ID, entry);
    }

    const diagById = new Map<string, Diagram>(diagrams.map((d) => [d.id, d]));

    const buildEndpoint = (
      borderRow: TableRow | undefined,
      fallbackPt: Point,
      diagBlocks: Block[]
    ): ArrowEndpoint => {
      if (!borderRow) {
        return { type: 'unattached', point: fallbackPt };
      }

      const fnId = borderRow.FUNCTION;
      const fnSide = mapRamusSide(borderRow.FUNCTION_TYPE);
      if (fnId && fnId !== '-1' && fnSide) {
        const blockId = blockIdByRamusId.get(fnId);
        const blk = diagBlocks.find((b) => b.id === blockId);
        if (blk) {
          let portPt: Point;
          if (fnSide === 'left') portPt = { x: blk.x, y: Math.round(blk.y + blk.height / 2) };
          else if (fnSide === 'right') portPt = { x: blk.x + blk.width, y: Math.round(blk.y + blk.height / 2) };
          else if (fnSide === 'top') portPt = { x: Math.round(blk.x + blk.width / 2), y: blk.y };
          else portPt = { x: Math.round(blk.x + blk.width / 2), y: blk.y + blk.height };
          return {
            type: 'block',
            id: blk.id,
            side: fnSide,
            point: portPt,
          };
        }
      }

      const borderSide = mapRamusSide(borderRow.BORDER_TYPE);
      if (borderSide) {
        let bPt: Point;
        if (borderSide === 'left') bPt = { x: 30, y: fallbackPt.y };
        else if (borderSide === 'right') bPt = { x: CANVAS_WIDTH - 30, y: fallbackPt.y };
        else if (borderSide === 'top') bPt = { x: fallbackPt.x, y: 30 };
        else bPt = { x: fallbackPt.x, y: CANVAS_HEIGHT - 30 };
        return {
          type: 'border',
          side: borderSide,
          point: bPt,
        };
      }

      return { type: 'unattached', point: fallbackPt };
    };

    for (const [sectorId, ends] of bordersBySector.entries()) {
      const ramusParentId = sectorDiagram.get(sectorId);
      if (!ramusParentId) continue;
      const diagId = diagIdByRamusParent.get(ramusParentId);
      if (!diagId) continue;
      const diag = diagById.get(diagId);
      if (!diag) continue;

      const rawPts = [...(pointsBySector.get(sectorId) || [])].sort((a, b) => a.pos - b.pos);
      const scaledPts = rawPts.map((p) => scalePt(p.x, p.y));
      const startFallback = scaledPts[0] || { x: 100, y: 200 };
      const endFallback = scaledPts[scaledPts.length - 1] || { x: 400, y: 200 };

      const source = buildEndpoint(ends.src, startFallback, diag.blocks);
      const target = buildEndpoint(ends.tgt, endFallback, diag.blocks);
      if (source.type === 'unattached' && target.type === 'unattached') {
        continue;
      }

      const role = roleFromSides(source.side, target.side);
      const points = buildOrthogonalRoute(source, target, diag.blocks);
      const labelId = sectorLabelElem.get(sectorId);
      const label = (labelId ? textMap.get(labelId) : '') || '';
      const midPt = points[Math.floor(points.length / 2)] || startFallback;

      const arrow: Arrow = {
        id: `flow-rsf-${sectorId}`,
        label,
        source,
        target,
        role,
        points,
        labelPos: label ? clampLabelToCanvas({ x: midPt.x, y: midPt.y - 16 }, label) : undefined,
        pinned: false,
      };
      diag.arrows.push(arrow);
    }

    const baseName = fileName.replace(/\.rsf$/i, '') || 'Импорт из Ramus';
    const rootDiag = diagrams[0];
    const rootBlockName = rootDiag?.blocks[0]?.name;

    const project: Project = {
      id: `proj-rsf-${Date.now()}`,
      name: rootBlockName || baseName,
      description: `Импортировано из Ramus (${fileName})`,
      diagrams,
      activeDiagramId: rootDiag?.id || '',
    };

    return { success: true, project };
  } catch (err: unknown) {
    return {
      success: false,
      error: `Ошибка разбора файла .rsf: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

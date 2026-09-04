import { Diagram, Project } from '../types/idef0';
import { pointsToSvgPath, getRenderPointsForArrow, getBlockCode } from './geometry';

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function exportDiagramToSvg(diagram: Diagram): string {
  // SVG Header & Defs
  let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   viewBox="0 0 1600 900"
   width="100%"
   height="100%"
   version="1.1"
   id="idef0-diagram"
   xmlns="http://www.w3.org/2000/svg">
  <defs id="defs1">
    <marker
       id="arrow"
       viewBox="0 0 10 10"
       refX="8"
       refY="5"
       markerWidth="6"
       markerHeight="6"
       orient="auto">
      <path
         d="M 0,1.5 L 8,5 L 0,8.5 Z"
         fill="#000000"
         id="marker-path" />
    </marker>
`;

  // Dynamic colored markers for flows
  for (const arrow of diagram.arrows) {
    const col = '#000000';
    svg += `    <marker
       id="marker-arrow-${arrow.id}"
       viewBox="0 0 10 10"
       refX="8"
       refY="5"
       markerWidth="6"
       markerHeight="6"
       orient="auto">
      <path d="M 0,1.5 L 8,5 L 0,8.5 Z" fill="${col}" />
    </marker>\n`;
  }

  svg += `    <style id="style1">
      .block-rect { stroke: #000000; stroke-width: 1.5; }
      .block-text { font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: bold; fill: #000000; text-anchor: middle; }
      .flow-line { fill: none; stroke-width: 1.2; stroke-linecap: square; stroke-linejoin: miter; }
      .flow-leader { fill: none; stroke-width: 1.2; stroke-linecap: round; stroke-linejoin: miter; }
      .flow-label { font-family: Arial, Helvetica, sans-serif; font-size: 12px; fill: #000000; }
      .junction-dot { r: 3; }
    </style>
  </defs>
  <rect
     width="100%"
     height="100%"
     fill="#ffffff"
     id="background" />
`;

  // Render Arrows / Flows
  for (const arrow of diagram.arrows) {
    const renderPoints = getRenderPointsForArrow(arrow, diagram.junctions, diagram.arrows);
    const pathD = pointsToSvgPath(renderPoints, true, 8);
    const hasMarker = arrow.target.type !== 'junction';
    const arrowCol = '#000000';

    svg += `  <g id="${arrow.id}" class="flow-group">\n`;
    svg += `    <path class="flow-line" d="${pathD}" stroke="${arrowCol}"${hasMarker ? ` marker-end="url(#marker-arrow-${arrow.id})"` : ''} id="path-${arrow.id}" />\n`;

    if (arrow.showLeader && arrow.leaderPoints && arrow.leaderPoints.length >= 2) {
      const leaderD = pointsToSvgPath(arrow.leaderPoints, false);
      svg += `    <path class="flow-leader" d="${leaderD}" stroke="${arrowCol}" id="leader-${arrow.id}" />\n`;
    }

    if (arrow.label) {
      const labelX = arrow.labelPos ? arrow.labelPos.x : arrow.points[0].x + 10;
      const labelY = arrow.labelPos ? arrow.labelPos.y : arrow.points[0].y - 10;
      const lines = arrow.label.split('\n');

      if (lines.length === 1) {
        svg += `    <text class="flow-label" x="${labelX}" y="${labelY}" id="text-${arrow.id}">${escapeXml(lines[0])}</text>\n`;
      } else {
        svg += `    <text class="flow-label" x="${labelX}" y="${labelY}" id="text-${arrow.id}">`;
        lines.forEach((line, idx) => {
          svg += `<tspan x="${labelX}" dy="${idx === 0 ? 0 : 15}" id="tspan-${arrow.id}-${idx + 1}">${escapeXml(line)}</tspan>`;
        });
        svg += `</text>\n`;
      }
    }

    svg += `  </g>\n`;
  }

  // Render Functional Blocks
  svg += `  <g id="blocks">\n`;
  for (const block of diagram.blocks) {
    const textCenterX = block.x + block.width / 2;
    const textCenterY = block.y + block.height / 2;
    const lines = block.name.split('\n');
    const blockFill = '#ffffff';

    svg += `    <g id="${block.id}">\n`;
    svg += `      <rect class="block-rect" x="${block.x}" y="${block.y}" width="${block.width}" height="${block.height}" fill="${blockFill}" id="rect-${block.id}" />\n`;

    if (lines.length === 1) {
      svg += `      <text class="block-text" x="${textCenterX}" y="${textCenterY + 5}" id="text-${block.id}">${escapeXml(lines[0])}</text>\n`;
    } else {
      svg += `      <text class="block-text" x="${textCenterX}" y="${textCenterY}" id="text-${block.id}">`;
      lines.forEach((line, idx) => {
        const dy = idx === 0 ? -6 * (lines.length - 1) : 20;
        svg += `<tspan x="${textCenterX}" dy="${dy}" id="tspan-${block.id}-${idx + 1}">${escapeXml(line)}</tspan>`;
      });
      svg += `</text>\n`;
    }

    const nodeNum = getBlockCode(diagram.code, block.nodeNumber);
    svg += `      <text class="block-number" x="${block.x + block.width - 8}" y="${block.y + block.height - 8}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="bold" fill="#000000">${nodeNum}</text>\n`;

    svg += `    </g>\n`;
  }
  svg += `  </g>\n`;
  svg += `</svg>`;
  return svg;
}

export function exportProjectToJson(project: Project): string {
  return JSON.stringify(project, null, 2);
}

/**
 * Converts SVG string into high-resolution PNG Blob using HTML5 Canvas.
 */
export async function exportSvgToPngBlob(svgString: string, scale = 2): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1600 * scale;
        canvas.height = 900 * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Не удалось сгенерировать PNG файл'));
          }
        }, 'image/png');
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error('Ошибка загрузки SVG в растровый конвертер'));
    };

    img.src = url;
  });
}

/**
 * Packages multiple diagrams into a single ZIP archive formatted as SVG or PNG.
 */
export async function exportDiagramsToZip(
  diagrams: Diagram[],
  format: 'svg' | 'png'
): Promise<Blob> {
  const JSZipModule = (await import('jszip')).default;
  const zip = new JSZipModule();

  for (const diag of diagrams) {
    const svgContent = exportDiagramToSvg(diag);
    const safeTitle = (diag.title || 'diagram').replace(/[/\\:*?"<>|]/g, '_').substring(0, 40);
    const fileName = `${diag.code}_${safeTitle}`;

    if (format === 'svg') {
      zip.file(`${fileName}.svg`, svgContent);
    } else {
      const pngBlob = await exportSvgToPngBlob(svgContent);
      const arrayBuffer = await pngBlob.arrayBuffer();
      zip.file(`${fileName}.png`, arrayBuffer);
    }
  }

  return await zip.generateAsync({ type: 'blob' });
}

export function importProjectFromJson(jsonString: string): { success: boolean; project?: Project; error?: string } {
  try {
    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { success: false, error: 'Файл не содержит валидный JSON объект' };
    }

    if (!data.id || !data.name || !Array.isArray(data.diagrams)) {
      return { success: false, error: 'Отсутствуют обязательные системные поля проекта (id, name, diagrams)' };
    }

    // Validate diagrams
    const diagramIds = new Set<string>();
    for (const diag of data.diagrams) {
      if (!diag.id || !diag.code || !Array.isArray(diag.blocks) || !Array.isArray(diag.arrows)) {
        return { success: false, error: `Диаграмма ${diag.id || 'неизвестная'} имеет поврежденную структуру` };
      }
      if (diagramIds.has(diag.id)) {
        return { success: false, error: `Обнаружен дубликат идентификатора диаграммы: ${diag.id}` };
      }
      diagramIds.add(diag.id);

      // Validate blocks
      const blockIds = new Set<string>();
      for (const block of diag.blocks) {
        if (!block.id || typeof block.x !== 'number' || typeof block.y !== 'number' || typeof block.width !== 'number' || typeof block.height !== 'number') {
          return { success: false, error: `Блок ${block.id || 'неизвестный'} содержит некорректные координаты` };
        }
        if (blockIds.has(block.id)) {
          return { success: false, error: `Обнаружен дубликат блока: ${block.id} на диаграмме ${diag.code}` };
        }
        blockIds.add(block.id);
      }

      // Validate arrows
      for (const arrow of diag.arrows) {
        if (!arrow.id || !arrow.source || !arrow.target || !Array.isArray(arrow.points) || arrow.points.length < 2) {
          return { success: false, error: `Стрелка ${arrow.id || 'неизвестная'} содержит поврежденные сегменты` };
        }
      }
    }

    return { success: true, project: data as Project };
  } catch (err: any) {
    return { success: false, error: `Ошибка синтаксического анализа JSON: ${err?.message || err}` };
  }
}

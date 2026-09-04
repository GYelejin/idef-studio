import { recordUsecase, slowClick, getScreenCoords } from './common';

export async function run() {
  await recordUsecase(
    'video_decompose_block',
    async (page) => {
      await page.evaluate(() => {
        const s = (window as any).store;
        s.resetProject();
        const d = s.getActiveDiagram();
        if (d && d.blocks[0]) {
          d.blocks[0].name = 'Закупочная деятельность предприятия';
          d.blocks[0].x = 590;
          d.blocks[0].y = 330;
          d.blocks[0].width = 420;
          d.blocks[0].height = 240;
          s.createArrow({
            label: 'Заявки на закупку',
            source: { type: 'border', side: 'left', point: { x: 30, y: 400 } },
            target: { type: 'block', id: d.blocks[0].id, side: 'left', point: { x: 590, y: 400 } },
            role: 'input',
            points: [{ x: 30, y: 400 }, { x: 590, y: 400 }]
          });
          s.createArrow({
            label: 'Бюджетный регламент',
            source: { type: 'border', side: 'top', point: { x: 750, y: 40 } },
            target: { type: 'block', id: d.blocks[0].id, side: 'top', point: { x: 750, y: 330 } },
            role: 'control',
            points: [{ x: 750, y: 40 }, { x: 750, y: 330 }]
          });
          s.createArrow({
            label: 'Поставленный товар',
            source: { type: 'block', id: d.blocks[0].id, side: 'right', point: { x: 1010, y: 450 } },
            target: { type: 'border', side: 'right', point: { x: 1570, y: 450 } },
            role: 'output',
            points: [{ x: 1010, y: 450 }, { x: 1570, y: 450 }]
          });
          s.notify();
        }
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const blk = page.locator('rect.block-rect').first();
      const b = await blk.boundingBox();
      if (b) {
        await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(400);
        await slowClick(page, '[data-testid="btn-decompose-block"]');
        await page.waitForTimeout(800);
        // Place Block 2 diagonally on diagram A0
        await slowClick(page, '[data-testid="tool-block"]');
        const p2 = await getScreenCoords(page, 590 + 105, 330 + 65);
        await page.mouse.click(p2.x, p2.y);
        await page.waitForTimeout(600);
      }
    }
  );
}

if (import.meta.main) {
  await run();
}

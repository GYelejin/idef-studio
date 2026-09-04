import { recordUsecase, slowClick, slowDrag } from './common';

export async function run() {
  await recordUsecase(
    'video_move_block',
    async (page) => {
      await page.evaluate(() => {
        const s = (window as any).store;
        s.resetProject();
        const b0 = s.getActiveDiagram().blocks[0];
        b0.name = 'Закупочная деятельность предприятия';
        s.decomposeBlock(b0.id);
        const d = s.getActiveDiagram();
        const b1 = d.blocks[0];
        b1.x = 310;
        b1.y = 170;
        b1.name = 'Выбор поставщиков';
        const b2 = s.createBlock(590, 330, 'Формирование заказа');
        const b3 = s.createBlock(870, 490, 'Контроль исполнения');

        if (b1 && b2) {
          s.createArrow({
            label: 'Перечень поставщиков',
            source: { type: 'block', id: b1.id, side: 'right', point: { x: 520, y: 235 } },
            target: { type: 'block', id: b2.id, side: 'left', point: { x: 590, y: 395 } },
            role: 'output',
            points: [{ x: 520, y: 235 }, { x: 555, y: 235 }, { x: 555, y: 395 }, { x: 590, y: 395 }],
            pinned: false,
          });
        }
        if (b2 && b3) {
          s.createArrow({
            label: 'Параметры заказа',
            source: { type: 'block', id: b2.id, side: 'right', point: { x: 800, y: 395 } },
            target: { type: 'block', id: b3.id, side: 'left', point: { x: 870, y: 555 } },
            role: 'output',
            points: [{ x: 800, y: 395 }, { x: 835, y: 395 }, { x: 835, y: 555 }, { x: 870, y: 555 }],
            pinned: false,
          });
        }
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const blk1 = page.locator('rect.block-rect').first();
      const b1Box = await blk1.boundingBox();
      if (b1Box) {
        const fromX = b1Box.x + b1Box.width / 2;
        const fromY = b1Box.y + b1Box.height / 2;
        await slowDrag(page, fromX, fromY, fromX, fromY + 70, 25);
        await page.waitForTimeout(400);
        await slowDrag(page, fromX, fromY + 70, fromX, fromY, 20);
        await page.waitForTimeout(400);
      }
      const blk2 = page.locator('rect.block-rect').nth(1);
      const b2Box = await blk2.boundingBox();
      if (b2Box) {
        const fromX = b2Box.x + b2Box.width / 2;
        const fromY = b2Box.y + b2Box.height / 2;
        await slowDrag(page, fromX, fromY, fromX + 40, fromY + 40, 20);
        await page.waitForTimeout(400);
        await slowDrag(page, fromX + 40, fromY + 40, fromX, fromY, 20);
      }
    }
  );
}

if (import.meta.main) {
  await run();
}

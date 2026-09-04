import { recordUsecase, slowClick, getScreenCoords } from './common';

export async function run() {
  await recordUsecase(
    'video_remove_corner_bend',
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
        b1.y = 200;
        b1.name = 'Выбор поставщиков';
        const b2 = s.createBlock(750, 200, 'Формирование заказа');
        if (b1 && b2) {
          s.createArrow({
            label: 'Связующий поток',
            source: { type: 'block', id: b1.id, side: 'right', point: { x: 520, y: 265 } },
            target: { type: 'block', id: b2.id, side: 'left', point: { x: 750, y: 265 } },
            role: 'output',
            points: [
              { x: 520, y: 265 },
              { x: 600, y: 265 },
              { x: 600, y: 350 },
              { x: 670, y: 350 },
              { x: 670, y: 265 },
              { x: 750, y: 265 }
            ],
            pinned: true,
          });
        }
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const pArr = await getScreenCoords(page, 635, 350);
      await page.mouse.click(pArr.x, pArr.y);
      await page.waitForTimeout(400);
      const removeBtn = page.locator('[data-testid^="btn-remove-segment"]').first();
      if (await removeBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
        await slowClick(page, '[data-testid^="btn-remove-segment"]');
      }
      await page.waitForTimeout(600);
    }
  );
}

if (import.meta.main) {
  await run();
}

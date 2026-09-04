import { recordUsecase, slowClick, slowDrag, getScreenCoords } from './common';

export async function run() {
  await recordUsecase(
    'video_create_arrow',
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
        s.createBlock(590, 330, 'Формирование заказа');
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-arrow"]');
      await page.waitForTimeout(300);
      const pStart = await getScreenCoords(page, 520, 235); // right of b1
      const pTarget = await getScreenCoords(page, 590, 395); // left of b2
      await slowDrag(page, pStart.x, pStart.y, pTarget.x, pTarget.y, 35);
      await page.waitForTimeout(600);
      await slowClick(page, '[data-testid="tool-select"]');
    }
  );
}

if (import.meta.main) {
  await run();
}

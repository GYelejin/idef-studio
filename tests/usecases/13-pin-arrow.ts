import { recordUsecase, slowClick, getScreenCoords } from './common';

export async function run() {
  await recordUsecase(
    'video_pin_arrow',
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
        if (b1 && b2) {
          s.createArrow({
            label: 'Интерфейсный поток',
            source: { type: 'block', id: b1.id, side: 'right', point: { x: 520, y: 235 } },
            target: { type: 'block', id: b2.id, side: 'left', point: { x: 590, y: 395 } },
            role: 'output',
            points: [{ x: 520, y: 235 }, { x: 555, y: 235 }, { x: 555, y: 395 }, { x: 590, y: 395 }],
            pinned: false,
          });
        }
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const pArr = await getScreenCoords(page, 555, 315);
      await page.mouse.click(pArr.x, pArr.y);
      await page.waitForTimeout(400);
      const pinCheckbox = page.locator('[data-testid="checkbox-pin-arrow"]').first();
      if (await pinCheckbox.isVisible({ timeout: 1500 }).catch(() => false)) {
        await slowClick(page, '[data-testid="checkbox-pin-arrow"]');
      }
      await page.waitForTimeout(500);
    }
  );
}

if (import.meta.main) {
  await run();
}

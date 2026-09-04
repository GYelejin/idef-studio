import { recordUsecase, slowClick, slowDrag } from './common';

export async function run() {
  await recordUsecase(
    'video_resize_block',
    async (page) => {
      await page.evaluate(() => {
        const s = (window as any).store;
        s.resetProject();
        const b0 = s.getActiveDiagram().blocks[0];
        b0.name = 'Закупочная деятельность предприятия';
        s.decomposeBlock(b0.id);
        const d = s.getActiveDiagram();
        const b1 = d.blocks[0];
        b1.x = 590;
        b1.y = 330;
        b1.name = 'Формирование заказа';
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const blk = page.locator('rect.block-rect').first();
      const b = await blk.boundingBox();
      if (b) {
        await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(400);
        const seHandle = page.locator('[data-testid$="-se"]').first();
        if (await seHandle.count() > 0) {
          const h = await seHandle.boundingBox();
          if (h) {
            await slowDrag(page, h.x + h.width / 2, h.y + h.height / 2, h.x + h.width / 2 + 80, h.y + h.height / 2 + 50, 30);
          }
        }
      }
    }
  );
}

if (import.meta.main) {
  await run();
}

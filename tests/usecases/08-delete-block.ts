import { recordUsecase, slowClick } from './common';

export async function run() {
  await recordUsecase(
    'video_delete_block',
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
        s.createBlock(870, 490, 'Временный блок');
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const blk = page.locator('rect.block-rect').last();
      const b = await blk.boundingBox();
      if (b) {
        await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(400);
        const delBtn = page.locator('[data-testid="btn-delete"]').first();
        if (await delBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
          await slowClick(page, '[data-testid="btn-delete"]');
        } else {
          await page.keyboard.press("Delete");
        }
        await page.waitForTimeout(600);
        await page.keyboard.press("Control+z");
        await page.waitForTimeout(600);
      }
    }
  );
}

if (import.meta.main) {
  await run();
}

import { recordUsecase, slowClick } from './common';

export async function run() {
  await recordUsecase(
    'video_edit_block_name',
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
        const nameInput = page.locator('[data-testid="input-block-name"]').first();
        if (await nameInput.isVisible({ timeout: 2000 }).catch(() => false)) {
          await nameInput.click({ timeout: 3000 }).catch(() => {});
          await page.keyboard.press("Control+A");
          await page.keyboard.press("Backspace");
          await page.keyboard.type("Выбор и оценка поставщиков", { delay: 35 });
          await page.waitForTimeout(400);
          await page.keyboard.press("Enter");
        }
      }
    }
  );
}

if (import.meta.main) {
  await run();
}

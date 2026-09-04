import { recordUsecase, slowClick, slowMove } from './common';

export async function run() {
  await recordUsecase(
    'video_add_block',
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
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-block"]');
      const canvas = page.locator('[data-testid="idef0-svg-canvas"]');
      const cBox = await canvas.boundingBox();
      if (cBox) {
        const targetX = cBox.x + 590 * 0.75 + 75;
        const targetY = cBox.y + 330 * 0.75 + 45;
        await slowMove(page, targetX, targetY, 20);
        await page.mouse.click(targetX, targetY);
        await page.waitForTimeout(600);
      }
      await slowClick(page, '[data-testid="tool-select"]');
    }
  );
}

if (import.meta.main) {
  await run();
}

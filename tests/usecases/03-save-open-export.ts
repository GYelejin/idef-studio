import { recordUsecase, slowClick } from './common';

export async function run() {
  await recordUsecase(
    'video_save_open_export',
    async (page) => {
      await page.evaluate(() => {
        (window as any).store.loadExample();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="btn-export"]');
      await page.waitForSelector('.export-dialog, [data-testid="export-modal"], .modal', { timeout: 3000 });
      await page.waitForTimeout(700);
      const closeBtn = page.locator('.btn-close, [data-testid="btn-close-export"], button:has-text("✕"), button:has-text("Закрыть")').first();
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
      } else {
        await page.keyboard.press('Escape');
      }
      await page.waitForTimeout(500);
    }
  );
}

if (import.meta.main) {
  await run();
}

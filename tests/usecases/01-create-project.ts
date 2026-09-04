import { recordUsecase, slowClick } from './common';

export async function run() {
  await recordUsecase(
    'video_create_project',
    async (page) => {
      await page.evaluate(() => {
        (window as any).store.loadExample();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="btn-create"]');
      await page.waitForSelector('[data-testid="new-project-modal"]', { timeout: 3000 });
      await page.waitForTimeout(600);
      await slowClick(page, '[data-testid="btn-confirm-new-project"]');
      await page.waitForTimeout(600);
    }
  );
}

if (import.meta.main) {
  await run();
}

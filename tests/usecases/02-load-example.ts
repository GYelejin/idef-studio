import { recordUsecase, slowClick } from './common';

export async function run() {
  await recordUsecase(
    'video_load_example',
    async (page) => {
      await page.evaluate(() => {
        (window as any).store.resetProject();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="btn-example"]');
      await page.waitForTimeout(1000);
    }
  );
}

if (import.meta.main) {
  await run();
}

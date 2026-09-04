import { recordUsecase, slowClick } from './common';

export async function run() {
  await recordUsecase(
    'video_tree_navigation',
    async (page) => {
      await page.evaluate(() => {
        (window as any).store.loadExample();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tree-node-A1"]');
      await page.waitForTimeout(800);
      await slowClick(page, '[data-testid="tree-node-A0"]');
      await page.waitForTimeout(800);
    }
  );
}

if (import.meta.main) {
  await run();
}

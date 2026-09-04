import { recordUsecase, slowClick, slowDrag, getScreenCoords } from './common';

export async function run() {
  await recordUsecase(
    'video_branch_and_merge',
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
        s.createArrow({
          label: 'Договоры поставки',
          source: { type: 'block', id: b1.id, side: 'right', point: { x: 520, y: 235 } },
          target: { type: 'border', side: 'right', point: { x: 1570, y: 235 } },
          role: 'output',
          points: [{ x: 520, y: 235 }, { x: 1570, y: 235 }],
          pinned: false,
        });
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-arrow"]');
      await page.waitForTimeout(300);
      const pTrunk = await getScreenCoords(page, 695, 235);
      const pBranchTarget = await getScreenCoords(page, 695, 330);
      await slowDrag(page, pTrunk.x, pTrunk.y, pBranchTarget.x, pBranchTarget.y, 35);
      await page.waitForTimeout(700);
      await slowClick(page, '[data-testid="tool-select"]');
    }
  );
}

if (import.meta.main) {
  await run();
}

import { recordUsecase, slowClick, slowDrag, getScreenCoords } from './common';

export async function run() {
  await recordUsecase(
    'video_shift_segment',
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
        const b2 = s.createBlock(690, 370, 'Формирование заказа');
        if (b1 && b2) {
          s.createArrow({
            label: 'Перечень поставщиков',
            source: { type: 'block', id: b1.id, side: 'right', point: { x: 520, y: 235 } },
            target: { type: 'block', id: b2.id, side: 'left', point: { x: 690, y: 435 } },
            role: 'output',
            points: [{ x: 520, y: 235 }, { x: 605, y: 235 }, { x: 605, y: 435 }, { x: 690, y: 435 }],
            pinned: true,
          });
        }
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const pFrom = await getScreenCoords(page, 605, 335);
      const pTo = await getScreenCoords(page, 560, 335);
      await slowDrag(page, pFrom.x, pFrom.y, pTo.x, pTo.y, 30);
      await page.waitForTimeout(600);
    }
  );
}

if (import.meta.main) {
  await run();
}

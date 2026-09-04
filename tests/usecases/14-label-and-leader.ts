import { recordUsecase, slowClick, slowDrag } from './common';

export async function run() {
  await recordUsecase(
    'video_label_and_leader',
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
        b1.y = 200;
        b1.name = 'Выбор поставщиков';
        const b2 = s.createBlock(690, 370, 'Формирование заказа');
        if (b1 && b2) {
          s.createArrow({
            label: 'Сертификат соответствия ГОСТ',
            source: { type: 'block', id: b1.id, side: 'right', point: { x: 520, y: 265 } },
            target: { type: 'block', id: b2.id, side: 'left', point: { x: 690, y: 435 } },
            role: 'output',
            points: [{ x: 520, y: 265 }, { x: 605, y: 265 }, { x: 605, y: 435 }, { x: 690, y: 435 }],
            pinned: false,
            labelPos: { x: 540, y: 250 },
            showLeader: true
          });
        }
        s.notify();
      });
    },
    async (page) => {
      await slowClick(page, '[data-testid="tool-select"]');
      const labelEl = page.locator('text.flow-label').first();
      const lb = await labelEl.boundingBox();
      if (lb) {
        const startX = lb.x + lb.width / 2;
        const startY = lb.y + lb.height / 2;
        await slowDrag(page, startX, startY, startX + 90, startY - 90, 30);
        await page.waitForTimeout(700);
      }
    }
  );
}

if (import.meta.main) {
  await run();
}

import { chromium, Browser, Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import { injectVisibleCursor } from '../helpers/cursor-helper';

export const OUTPUT_DIRS = [
  path.resolve('./wiki/videos'),
  '/home/gy/Documents/antigravity/lspramusclojurescript2026.wiki/videos',
];

export function ensureOutputDirs() {
  for (const dir of OUTPUT_DIRS) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

export async function getScreenCoords(page: Page, svgX: number, svgY: number): Promise<{ x: number; y: number }> {
  return await page.evaluate(({ sx, sy }) => {
    const svg = document.querySelector('svg.canvas-svg') as SVGSVGElement;
    if (!svg) return { x: sx, y: sy };
    const pt = svg.createSVGPoint();
    pt.x = sx;
    pt.y = sy;
    const screenPt = pt.matrixTransform(svg.getScreenCTM()!);
    return { x: screenPt.x, y: screenPt.y };
  }, { sx: svgX, sy: svgY });
}

export async function slowMove(page: Page, toX: number, toY: number, steps = 18) {
  await page.mouse.move(toX, toY, { steps });
  await page.waitForTimeout(100);
}

export async function slowClick(page: Page, selector: string) {
  const el = page.locator(selector).first();
  await el.waitFor({ state: 'visible', timeout: 10000 });
  const box = await el.boundingBox();
  if (box) {
    await slowMove(page, box.x + box.width / 2, box.y + box.height / 2, 18);
    await page.waitForTimeout(150);
    await page.mouse.down();
    await page.waitForTimeout(150);
    await page.mouse.up();
    await page.waitForTimeout(250);
  } else {
    await el.click();
    await page.waitForTimeout(250);
  }
}

export async function slowDrag(page: Page, fromX: number, fromY: number, toX: number, toY: number, steps = 28) {
  await slowMove(page, fromX, fromY, 18);
  await page.waitForTimeout(200);
  await page.mouse.down();
  await page.waitForTimeout(150);
  await page.mouse.move(toX, toY, { steps });
  await page.waitForTimeout(200);
  await page.mouse.up();
  await page.waitForTimeout(300);
}

export async function recordUsecase(
  videoBaseName: string, // e.g. "video_create_project"
  setupFn?: (page: Page) => Promise<void>,
  actionFn?: (page: Page) => Promise<void>
) {
  ensureOutputDirs();
  const filenameWebm = `${videoBaseName}.webm`;
  const filenameMp4 = `${videoBaseName}.mp4`;
  console.log(`🎬 Recording ${filenameWebm} (1920x1080 @ 75% zoom)...`);

  const tmpDir = path.resolve(`/tmp/usecase-rec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: tmpDir, size: { width: 1920, height: 1080 } },
  });

  const page = await context.newPage();
  const video = page.video();
  await injectVisibleCursor(page);

  await page.goto('http://localhost:3000/');
  await page.waitForSelector('[data-testid="tool-select"]', { timeout: 15000 });
  await page.waitForTimeout(400);

  // Ensure full canvas visibility at 75% zoom
  await page.evaluate(() => {
    const s = (window as any).store;
    if (s && s.setZoom) s.setZoom(0.75);
  });
  await page.waitForTimeout(300);

  if (setupFn) {
    await setupFn(page);
    await page.waitForTimeout(300);
  }

  if (actionFn) {
    await actionFn(page);
    await page.waitForTimeout(500);
  }

  await page.close();
  await context.close();

  let recordedWebm: string | null = null;
  if (video) {
    try {
      recordedWebm = await video.path();
    } catch {}
  }
  await browser.close();

  if (recordedWebm && fs.existsSync(recordedWebm)) {
    const tmpMp4 = path.join(tmpDir, filenameMp4);
    try {
      execSync(`ffmpeg -y -i "${recordedWebm}" -c:v libx264 -preset ultrafast -crf 23 -pix_fmt yuv420p -movflags faststart "${tmpMp4}"`, {
        stdio: 'ignore',
      });
    } catch {}

    for (const outDir of OUTPUT_DIRS) {
      fs.copyFileSync(recordedWebm, path.join(outDir, filenameWebm));
      if (fs.existsSync(tmpMp4)) {
        fs.copyFileSync(tmpMp4, path.join(outDir, filenameMp4));
      }
    }
    console.log(`✓ Saved ${filenameWebm} & ${filenameMp4}`);
  }

  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
}

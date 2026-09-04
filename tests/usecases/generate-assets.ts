import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

export async function generateAssets() {
  const outDir = path.resolve('./assets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log("📸 Capturing full-interface screenshots into assets/ ...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  await page.goto("http://localhost:3000/");
  await page.waitForSelector('[data-testid="idef0-svg-canvas"]', { timeout: 10000 });

  // Load canonical example
  await page.evaluate(() => {
    const s = (window as any).store;
    s.loadExample();
    s.setZoom(0.75);
  });
  await page.waitForTimeout(600);

  // 1. Context Diagram screenshot (A-0 / root A0)
  // Switch to root context diagram via tree
  const rootNode = page.locator('[data-testid="tree-node-A0"]').first();
  if (await rootNode.count() > 0) {
    await rootNode.click();
    await page.waitForTimeout(500);
  }

  const contextScreenshotPath = path.join(outDir, "01_context_diagram.png");
  await page.screenshot({ path: contextScreenshotPath });
  console.log(`✓ Saved ${contextScreenshotPath}`);

  // 2. Decomposition Diagram screenshot (A0 child decomposition with A1..A4)
  const childNode = page.locator('[data-testid="tree-node-A1"], [data-testid="tree-node-diag-A0"]').first();
  if (await childNode.count() > 0) {
    await childNode.click();
    await page.waitForTimeout(500);
  } else {
    // Fallback switch diagram via store
    await page.evaluate(() => {
      const s = (window as any).store;
      const d = s.project.diagrams.find((diag: any) => diag.parentBlockId !== null);
      if (d) s.switchDiagram(d.id);
    });
    await page.waitForTimeout(500);
  }

  const decompScreenshotPath = path.join(outDir, "02_decomposition_diagram.png");
  await page.screenshot({ path: decompScreenshotPath });
  console.log(`✓ Saved ${decompScreenshotPath}`);

  await browser.close();
  console.log("🎉 Assets generation completed!");
}

if (import.meta.main) {
  await generateAssets();
}

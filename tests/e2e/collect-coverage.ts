/**
 * E2E Coverage Collector
 * Uses Playwright's built-in V8 JS coverage API (Chromium-native, no plugins needed).
 * Run: bun run test:coverage:e2e
 */

import { chromium } from "playwright";
import * as path from "path";
import * as fs from "fs";
// @ts-ignore
import v8ToIstanbul from "v8-to-istanbul";

const OUTPUT_DIR = path.resolve(".nyc_output");

async function collectE2ECoverage() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  await page.coverage.startJSCoverage({ resetOnNavigation: false });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // Load example model (exercises store, geometry, linter)
  await page.evaluate(() => (window as any).store?.loadExample());
  await page.waitForTimeout(500);

  // Switch to A1 decomposition (exercises diagram switching)
  await page.evaluate(() => {
    const store = (window as any).store;
    const a1 = store?.getState()?.project?.diagrams?.find((d: any) => d.code === "A1");
    if (a1) store.switchDiagram(a1.id);
  });
  await page.waitForTimeout(400);

  // Auto-layout (exercises adjuster.ts + layout.ts)
  await page.evaluate(() => (window as any).store?.autoLayoutCurrentDiagram());
  await page.waitForTimeout(300);

  // Open Export modal (exercises exporter.ts)
  const exportBtn = page.locator('button:has-text("Экспорт"), [data-testid="btn-export"]').first();
  if (await exportBtn.isVisible().catch(() => false)) {
    await exportBtn.click();
    await page.waitForTimeout(400);
    await page.keyboard.press("Escape");
  }

  // Open Diagnostics (exercises all linter rules)
  const diagBtn = page.locator('button:has-text("Диагностика"), [data-testid="btn-diagnostics"]').first();
  if (await diagBtn.isVisible().catch(() => false)) {
    await diagBtn.click();
    await page.waitForTimeout(400);
    await page.keyboard.press("Escape");
  }

  const jsCoverage = await page.coverage.stopJSCoverage();
  await browser.close();

  const srcCoverage = jsCoverage.filter(
    e => e.url.includes("localhost:3000") && !e.url.includes("node_modules")
  );

  console.log(`\n📊 Processing coverage from ${srcCoverage.length} source modules...`);

  const istanbulCoverage: Record<string, object> = {};
  let covStmt = 0, totStmt = 0, covFn = 0, totFn = 0;

  for (const entry of srcCoverage) {
    try {
      const converter = v8ToIstanbul(entry.url, 0, { source: entry.source });
      await converter.load();
      converter.applyCoverage(entry.functions);
      const data = converter.toIstanbul();
      for (const [file, fd] of Object.entries(data)) {
        istanbulCoverage[file] = fd;
        const stmts = Object.values((fd as any).s || {}) as number[];
        const fns = Object.values((fd as any).f || {}) as number[];
        covStmt += stmts.filter(v => v > 0).length;
        totStmt += stmts.length;
        covFn += fns.filter(v => v > 0).length;
        totFn += fns.length;
      }
    } catch { /* skip non-convertible entries */ }
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, "e2e-coverage.json"), JSON.stringify(istanbulCoverage, null, 2));

  const sp = totStmt > 0 ? ((covStmt / totStmt) * 100).toFixed(1) : "0.0";
  const fp = totFn > 0 ? ((covFn / totFn) * 100).toFixed(1) : "0.0";

  console.log(`
╔══════════════════════════════════════════════════════╗
║          📊 E2E BROWSER COVERAGE REPORT              ║
╠══════════════════════════════════════════════════════╣
║  Statements : ${covStmt}/${totStmt} (${sp}%)
║  Functions  : ${covFn}/${totFn} (${fp}%)
╠══════════════════════════════════════════════════════╣
║  Saved → .nyc_output/e2e-coverage.json               ║
║  HTML  → bunx nyc report --reporter=html             ║
╚══════════════════════════════════════════════════════╝`);
}

collectE2ECoverage().catch(err => { console.error(err); process.exit(1); });

import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import { injectVisibleCursor } from './tests/helpers/cursor-helper';

const outDir = path.resolve('./recordings');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function slowMove(page: any, toX: number, toY: number, steps = 18) {
  await page.mouse.move(toX, toY, { steps });
  await page.waitForTimeout(100);
}

async function slowClick(page: any, selector: string) {
  const el = page.locator(selector).first();
  await el.waitFor({ state: 'visible', timeout: 15000 });
  const box = await el.boundingBox();
  if (box) {
    await slowMove(page, box.x + box.width / 2, box.y + box.height / 2, 16);
    await page.waitForTimeout(150);
    await page.mouse.down();
    await page.waitForTimeout(150);
    await page.mouse.up();
    await page.waitForTimeout(300);
  } else {
    await el.click();
    await page.waitForTimeout(300);
  }
}

async function main() {
  console.log("🎬 Starting demo recording (IDEF0 review -> LLM generation -> Code review -> Execution)...");
  const tmpDir = path.resolve(`/tmp/rec-demo-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: tmpDir, size: { width: 1920, height: 1080 } },
  });

  const page = await context.newPage();
  const video = page.video();
  await injectVisibleCursor(page);

  // Pre-seed localStorage with user's LLM config before navigation
  await page.addInitScript(() => {
    const cfg = {
      apiUrl: 'http://localhost:8080/v1',
      apiKey: 'sk-7f69956671262ed1-ee076d-8bed58a2',
      model: 'kmc/kimi-for-coding',
      timeoutSeconds: 120,
      systemPrompt: `You are an expert Python functional programming engineer.
We are developing a complete Python software application step-by-step in this single conversational session.
Each step you implement one self-contained, pure function for a computational task.

CRITICAL ARCHITECTURE RULES:
1. Every function must be completely self-contained: ANY imports needed by this function (e.g. from typing import ..., import random, import math, etc.) MUST be placed directly inside the function body at the top.
2. The response MUST start directly with \`def <function_name>(...):\` and end with the \`return ...\` statement.
3. No top-level module imports, no classes, no global state, no side effects. Pure functions only.
4. ABSOLUTELY NO comments or docstrings mentioning "IDEF0", "ICOM", "листовой блок", "Activity Block", "Inputs (I)", "Controls (C)", "Mechanisms (M)", "Outputs (O)", or diagram codes.
5. In composite functions that coordinate previously generated functions, call them directly by name.
6. Return ONLY the raw Python code of the function (inside \`\`\`python ... \`\`\` or as raw code). No explanations, conversational filler, or markdown text outside the code.`
    };
    localStorage.setItem('idef0_llm_config', JSON.stringify(cfg));
  });

  // 1. Open app
  console.log("1. Opening app at http://localhost:3000/ ...");
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('[data-testid="btn-llm-magic"]', { timeout: 15000 });
  await page.waitForTimeout(600);

  // 2. Load the fibonacci model
  console.log("2. Loading fibonacci model into project store...");
  const fibonacciModel = JSON.parse(fs.readFileSync('./fibonacci-matrix-model.json', 'utf8'));
  await page.evaluate((proj) => {
    const s = (window as any).store;
    s.importProject(proj);
    s.setZoom(0.85);
  }, fibonacciModel);
  await page.waitForTimeout(1000);

  // 3. Review Context Diagram (A0)
  console.log("3. Reviewing Context Diagram A0...");
  await page.mouse.move(960, 480, { steps: 20 });
  await page.waitForTimeout(2500);

  // Switch to decomposition A1..A3
  console.log("4. Reviewing Decomposition Diagram A0 (blocks A1, A2, A3)...");
  await page.evaluate(() => {
    (window as any).store.switchDiagram('diag-a1');
  });
  await page.mouse.move(800, 450, { steps: 16 });
  await page.waitForTimeout(3000);

  // Switch to deepest decomposition A3 (blocks A31, A32, A33)
  console.log("5. Reviewing Deepest Decomposition Diagram A3 (A31, A32, A33)...");
  await page.evaluate(() => {
    (window as any).store.switchDiagram('diag-a3');
  });
  await page.mouse.move(700, 500, { steps: 16 });
  await page.waitForTimeout(3000);

  // 6. Open LLM Magic Wand Modal
  console.log("6. Clicking Magic Wand to open LLM Code Generator...");
  await slowClick(page, '[data-testid="btn-llm-magic"]');
  await page.waitForSelector('[data-testid="tab-pipeline"]', { timeout: 8000 });
  await page.waitForTimeout(1000);

  // 7. Show settings tab to review model configuration
  console.log("7. Reviewing LLM Settings tab (endpoint, model, timeout)...");
  await slowClick(page, '[data-testid="tab-settings"]');
  await page.waitForTimeout(2000);

  // 8. Go back to Pipeline Tab and Start Bottom-Up Generation
  console.log("8. Starting live LLM Generation from bottom to top...");
  await slowClick(page, '[data-testid="tab-pipeline"]');
  await page.waitForTimeout(800);
  await slowClick(page, '[data-testid="btn-start-generation"]');

  // Wait for all 7 functions to finish generating
  console.log("9. Waiting for functions to generate via kmc/kimi-for-coding...");
  for (let sec = 0; sec < 180; sec++) {
    await page.waitForTimeout(1000);
    const count = await page.evaluate(() => {
      const badges = Array.from(document.querySelectorAll('.modal-card span'));
      return badges.filter(b => b.textContent?.includes('Готово')).length;
    });
    if (count >= 7) {
      console.log(`✓ All 7 functions generated in ~${sec}s!`);
      break;
    }
  }
  await page.waitForTimeout(2000);

  // 9. Review generated functions by scrolling pipeline
  console.log("10. Reviewing generated functions in pipeline...");
  const modalScrollEl = page.locator('.modal-card > div:nth-child(3)').first();
  const scrollBox = await modalScrollEl.boundingBox();
  if (scrollBox) {
    await page.mouse.move(scrollBox.x + scrollBox.width / 2, scrollBox.y + scrollBox.height / 2);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, -900);
    await page.waitForTimeout(1500);
  }

  // 10. Switch to main.py Tab & Review full code
  console.log("11. Reviewing assembled main.py...");
  await slowClick(page, '[data-testid="tab-mainpy"]');
  await page.waitForTimeout(1500);

  // Scroll main.py code
  const preEl = page.locator('pre').first();
  const preBox = await preEl.boundingBox();
  if (preBox) {
    await page.mouse.move(preBox.x + preBox.width / 2, preBox.y + 100);
    await page.mouse.wheel(0, 350);
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, 350);
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, -700);
    await page.waitForTimeout(1500);
  }

  // Extract generated code and write to main.py in project root
  const generatedMainPy = await page.evaluate(() => {
    const pre = document.querySelector('pre');
    return pre ? pre.textContent || '' : '';
  });
  if (generatedMainPy) {
    fs.writeFileSync('./main.py', generatedMainPy, 'utf8');
    console.log("✓ Saved generated main.py to disk.");
  }

  await page.waitForTimeout(2000);
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
    const finalMp4 = path.join(outDir, 'idef0_llm_fibonacci_demo.mp4');
    const finalWebm = path.join(outDir, 'idef0_llm_fibonacci_demo.webm');
    execSync(`ffmpeg -y -i "${recordedWebm}" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -movflags faststart "${finalMp4}"`);
    fs.copyFileSync(recordedWebm, finalWebm);
    console.log(`🎉 Demo video successfully saved:`);
    console.log(`   - ${finalMp4}`);
    console.log(`   - ${finalWebm}`);
  }

  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
}

main().catch(err => {
  console.error("Error during recording:", err);
  process.exit(1);
});

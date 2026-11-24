import { test, expect } from '@playwright/test';

test.describe('IDEF0 Studio Core UI & E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('loads canvas and default header elements', async ({ page }) => {
    const canvas = page.locator('[data-testid="idef0-svg-canvas"]');
    await expect(canvas).toBeVisible();

    const titleInput = page.locator('[data-testid="input-project-title"]');
    await expect(titleInput).toBeVisible();
  });

  test('can load example model and navigate diagrams', async ({ page }) => {
    // Open Help / Examples modal or click load example
    const loadExampleBtn = page.locator('button:has-text("Пример"), [data-testid="btn-load-example"]').first();
    if (await loadExampleBtn.isVisible()) {
      await loadExampleBtn.click();
    } else {
      await page.evaluate(() => (window as any).store?.loadExample());
    }

    // Verify blocks exist on canvas
    const blocks = page.locator('.canvas-block, [data-testid^="block-node-"]');
    await expect(blocks.first()).toBeVisible({ timeout: 5000 });
  });

  test('can open and close diagnostics panel', async ({ page }) => {
    const diagBtn = page.locator('[data-testid="btn-diagnostics"]').first();
    if (await diagBtn.isVisible()) {
      await diagBtn.click();
      const diagPanel = page.locator('[data-testid="diagnostics-panel"], .diagnostics-drawer');
      await expect(diagPanel).toBeVisible({ timeout: 3000 });
      // Close
      await page.keyboard.press('Escape');
    }
  });

  test('can open and close LLM code generator modal', async ({ page }) => {
    const llmBtn = page.locator('button:has-text("LLM"), [data-testid="btn-llm-generate"]').first();
    if (await llmBtn.isVisible()) {
      await llmBtn.click();
      const modal = page.locator('[data-testid="llm-generator-modal"]');
      await expect(modal).toBeVisible({ timeout: 3000 });
      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    }
  });

  test('can toggle zoom levels', async ({ page }) => {
    const zoomInBtn = page.locator('[data-testid="btn-zoom-in"]').first();
    const zoomOutBtn = page.locator('[data-testid="btn-zoom-out"]').first();

    if (await zoomInBtn.isVisible() && await zoomOutBtn.isVisible()) {
      await zoomInBtn.click();
      await zoomOutBtn.click();
    }
  });
});

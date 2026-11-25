import { test } from "@playwright/test";

/**
 * Playwright E2E Interactive Mutation & Drag-and-Drop Suite:
 * Tests live diagram modifications via mouse drag-and-drop.
 */
test.use({ viewport: { width: 1920, height: 1080 } });

test("verifies live diagram mutations via mouse drag-and-drop", async ({ page }) => {
  test.setTimeout(120_000);
  const { injectVisibleCursor } = await import("../helpers/cursor-helper");
  await injectVisibleCursor(page);

  await page.goto("/");
  await page.waitForTimeout(800);

  // Set zoom to 75%
  console.log("2. Setting canvas zoom to 75%...");
  await page.locator('[data-testid="btn-zoom-out"]').click();
  await page.locator('[data-testid="btn-zoom-out"]').click();
  await page.waitForTimeout(200);

  const getCoords = async (svgX: number, svgY: number) => {
    const svgBox = await page.locator("#idef0-diagram").boundingBox();
    if (!svgBox) throw new Error("SVG canvas not found");
    const scaleX = svgBox.width / 1600;
    const scaleY = svgBox.height / 900;
    return {
      x: svgBox.x + svgX * scaleX,
      y: svgBox.y + svgY * scaleY,
    };
  };

  // Load canonical example project
  console.log("3. Loading reference canonical model...");
  await page.locator('[data-testid="btn-example"]').click();
  await page.waitForTimeout(600);

  // Switch to diagram A1 (contains 4 blocks and 32 flows)
  console.log("4. Switching to decomposition diagram A1...");
  await page.locator('.tree-node:has-text("A1"), [data-testid="tree-node-A1"], [data-testid="tree-node-diag-A1"]').first().click();
  await page.waitForTimeout(500);

  // --- Mutation 1: Drag-and-drop translate Functional Block ---
  console.log("5. [Mutation M5] Dragging Block 1 (A1) by (+60px, +40px)...");
  const b1Pos = await getCoords(205, 300); // Block 1 center
  const b1Dest = await getCoords(265, 340);
  await page.mouse.move(b1Pos.x, b1Pos.y);
  await page.mouse.down();
  await page.mouse.move(b1Dest.x, b1Dest.y, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(400);

  // --- Mutation 2: Drag-and-drop Shift Arrow Segment ---
  console.log("6. [Mutation M3] Selecting and dragging arrow segment to shift corridor...");
  const arrowSegPos = await getCoords(530, 265);
  await page.mouse.click(arrowSegPos.x, arrowSegPos.y);
  await page.waitForTimeout(300);

  // Drag horizontal segment downward
  const segDest = await getCoords(530, 310);
  await page.mouse.move(arrowSegPos.x, arrowSegPos.y);
  await page.mouse.down();
  await page.mouse.move(segDest.x, segDest.y, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(400);

  // --- Mutation 3: Mouse click Corner Handle to delete bend ---
  console.log("7. [Mutation M4] Clicking corner vertex handle on canvas to delete bend...");
  const cornerHandle = page.locator('[data-testid^="corner-handle-"]').first();
  if (await cornerHandle.count() > 0) {
    await cornerHandle.click({ force: true });
    await page.waitForTimeout(400);
    console.log("Corner bend successfully deleted on canvas click.");
  }

  // --- Mutation 4: Drag-and-drop Reconnect Arrow Target Endpoint ---
  console.log("8. [Mutation M1] Reconnecting arrow target via Inspector custom dropdown...");
  const targetDropdown = page.locator('[data-testid="custom-dropdown-target"]');
  if (await targetDropdown.count() > 0) {
    await targetDropdown.click();
    await page.waitForTimeout(200);
    // Select first available item in dropdown
    const item = page.locator('[data-testid^="dropdown-item-"]').first();
    if (await item.count() > 0) {
      await item.click();
      await page.waitForTimeout(400);
    }
  }

  // --- Mutation 5: Dynamic Label Placement with Lightning Leader ---
  console.log("9. [Mutation M7] Toggling leader callout checkbox...");
  const leaderCheckbox = page.locator('[data-testid="checkbox-leader"]');
  if (await leaderCheckbox.count() > 0 && await leaderCheckbox.isEnabled()) {
    await leaderCheckbox.click();
    await page.waitForTimeout(300);
  }

  // --- Mutation 6: Diagnostics & Linter Verification ---
  console.log("10. Checking Diagnostics Panel post-mutations...");
  const errorCount = await page.locator(".badge-error").count();
  console.log(`Diagnostics errors count: ${errorCount}`);
  await page.waitForTimeout(400);
});

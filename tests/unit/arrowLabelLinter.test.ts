import { describe, test, expect } from "bun:test";
import { store } from "../../src/core/store";
import { runIDEF0Linter } from "../../src/core/linter";

describe("Linter FR-LINT-08: Arrow Label Requirement", () => {
  test("flags empty arrows that have no label and no parent trunk label", () => {
    store.resetProject();
    const proj = store.getState().project;
    const diag = store.getActiveDiagram()!;

    // Initial clean diagram should have no missing label issues
    let issues = runIDEF0Linter(proj, diag.id);
    expect(issues.some(i => i.ruleId === 'FR-LINT-08')).toBe(false);

    // Add arrow without label
    const emptyArrowId = "arr-empty-test";
    diag.arrows.push({
      id: emptyArrowId,
      label: "   ",
      source: { type: "border", side: "left", point: { x: 30, y: 300 } },
      target: { type: "block", id: diag.blocks[0].id, side: "left", point: { x: diag.blocks[0].x, y: 300 } },
      role: "input",
      points: [{ x: 30, y: 300 }, { x: diag.blocks[0].x, y: 300 }],
      pinned: false,
    });

    issues = runIDEF0Linter(proj, diag.id);
    const labelIssue = issues.find(i => i.ruleId === 'FR-LINT-08' && i.elementId === emptyArrowId);
    expect(labelIssue).toBeDefined();
    expect(labelIssue?.severity).toBe('warning');

    // Give it a label -> issue should disappear
    const targetArrow = diag.arrows.find(a => a.id === emptyArrowId)!;
    targetArrow.label = "Входящий документ";

    issues = runIDEF0Linter(proj, diag.id);
    expect(issues.some(i => i.ruleId === 'FR-LINT-08' && i.elementId === emptyArrowId)).toBe(false);
  });
});

import { describe, test, expect } from "bun:test";
import { EditorStore } from "../../src/core/store";
import { runIDEF0Linter } from "../../src/core/linter";
import { exportDiagramToSvg } from "../../src/core/exporter";

describe("Arrow Tunneling (IDEF0 Parentheses)", () => {
  test("toggleArrowTunnel toggles source and target tunneling", () => {
    const store = new EditorStore();
    store.loadExample();
    const diag = store.getActiveDiagram()!;
    const arrow = diag.arrows[0];
    expect(arrow).toBeDefined();

    expect(arrow.tunnelSource).toBeFalsy();
    expect(arrow.tunnelTarget).toBeFalsy();

    store.toggleArrowTunnel(arrow.id, 'source');
    expect(arrow.tunnelSource).toBe(true);

    store.toggleArrowTunnel(arrow.id, 'target');
    expect(arrow.tunnelTarget).toBe(true);

    store.toggleArrowTunnel(arrow.id, 'source');
    expect(arrow.tunnelSource).toBe(false);
    expect(arrow.tunnelTarget).toBe(true);
  });

  test("exportDiagramToSvg includes tunneling markers", () => {
    const store = new EditorStore();
    store.loadExample();
    const diag = store.getActiveDiagram()!;
    const arrow = diag.arrows[0];

    store.toggleArrowTunnel(arrow.id, 'source');
    store.toggleArrowTunnel(arrow.id, 'target');

    const svg = exportDiagramToSvg(diag);
    expect(svg).toContain(`id="tunnel-src-${arrow.id}"`);
    expect(svg).toContain(`id="tunnel-tgt-${arrow.id}"`);
  });

  test("linter ignores tunneled arrows for boundary balance check", () => {
    const store = new EditorStore();
    const proj = store.state.project;
    const rootDiag = proj.diagrams.find(d => d.code === "A0")!;
    const rootBlock = rootDiag.blocks[0];

    rootDiag.arrows.push({
      id: "arr-feed-test",
      label: "Сырье",
      source: { type: "border", side: "left", point: { x: 30, y: 400 } },
      target: { type: "block", id: rootBlock.id, side: "left", point: { x: rootBlock.x, y: 400 } },
      role: "input",
      points: [{ x: 30, y: 400 }, { x: rootBlock.x, y: 400 }],
      pinned: false,
    });

    const childId = store.decomposeBlock(rootBlock.id);
    const childDiag = proj.diagrams.find(d => d.id === childId)!;
    childDiag.arrows = []; // Remove boundary stream on child diagram

    // Without tunneling, linter should detect imbalance
    let issues = runIDEF0Linter(proj, childId);
    let hasImbalance = issues.some(i => i.ruleId === "FR-LINT-04");
    expect(hasImbalance).toBe(true);

    // Now tunnel the target of the parent inflow (flow enters tunnel at the block)
    const parentInflow = rootDiag.arrows.find(a => a.id === "arr-feed-test")!;
    parentInflow.tunnelTarget = true;

    // With tunneling at target, FR-LINT-04 should NOT complain about missing flow on child diagram
    issues = runIDEF0Linter(proj, childId);
    hasImbalance = issues.some(i => i.ruleId === "FR-LINT-04");
    expect(hasImbalance).toBe(false);
  });
});

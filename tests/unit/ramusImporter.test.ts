import { describe, it, expect } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { importProjectFromRsf } from '../../src/core/ramusImporter';

describe('Ramus .rsf Importer', () => {
  it('imports 2.rsf with context diagram, decomposition, blocks, and arrows', async () => {
    const rsfPath = path.resolve(__dirname, '../../export-from-ramus/2.rsf');
    const buf = fs.readFileSync(rsfPath);
    const res = await importProjectFromRsf(buf, '2.rsf');

    expect(res.success).toBe(true);
    expect(res.project).toBeDefined();
    const proj = res.project!;
    expect(proj.diagrams.length).toBeGreaterThanOrEqual(2);

    const rootDiag = proj.diagrams[0];
    expect(rootDiag.code).toBe('A-0');
    expect(rootDiag.blocks.length).toBe(1);
    expect(rootDiag.arrows.length).toBeGreaterThanOrEqual(4);

    const decomp = proj.diagrams[1];
    expect(decomp.code).toBe('A0');
    expect(decomp.blocks.length).toBe(5);
    expect(decomp.arrows.length).toBeGreaterThan(0);
  });

  it('imports IDZ.rsf and Lab_03.rsf without errors', async () => {
    for (const file of ['IDZ.rsf', 'Lab_03.rsf']) {
      const rsfPath = path.resolve(__dirname, `../../export-from-ramus/${file}`);
      const buf = fs.readFileSync(rsfPath);
      const res = await importProjectFromRsf(buf, file);

      expect(res.success).toBe(true);
      expect(res.project).toBeDefined();
      expect(res.project!.diagrams.length).toBeGreaterThanOrEqual(1);
      expect(res.project!.diagrams[0].blocks.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('returns error result for invalid .rsf binary payload', async () => {
    const res = await importProjectFromRsf(new Uint8Array([1, 2, 3, 4]), 'broken.rsf');
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
  });
});

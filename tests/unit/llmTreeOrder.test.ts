import { describe, it, expect } from 'bun:test';
import fs from 'fs';
import path from 'path';
import { buildBottomUpBlockTasks, extractBlockIcom } from '../../src/core/llm/treeOrder';
import { Project } from '../../src/types/idef0';

describe('LLM Tree Order & Bottom-Up Traversal', () => {
  it('correctly traverses Fibonacci Matrix model bottom-up (leaves first -> A0 last)', () => {
    const jsonPath = path.resolve(__dirname, '../../fibonacci-matrix-model.json');
    const project: Project = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const tasks = buildBottomUpBlockTasks(project);

    // Total blocks in fibonacci model:
    // A0 (1) + A1, A2, A3 (3) + A31, A32, A33 (3) = 7 blocks
    expect(tasks.length).toBe(7);

    const codes = tasks.map(t => t.code);

    // Deepest leaves (A31, A32, A33) must come before composite block A3
    const idxA31 = codes.indexOf('A31');
    const idxA32 = codes.indexOf('A32');
    const idxA33 = codes.indexOf('A33');
    const idxA3 = codes.indexOf('A3');
    const idxA1 = codes.indexOf('A1');
    const idxA2 = codes.indexOf('A2');
    const idxA0 = codes.indexOf('A0');

    expect(idxA31).toBeGreaterThanOrEqual(0);
    expect(idxA32).toBeGreaterThanOrEqual(0);
    expect(idxA33).toBeGreaterThanOrEqual(0);

    expect(idxA31).toBeLessThan(idxA3);
    expect(idxA32).toBeLessThan(idxA3);
    expect(idxA33).toBeLessThan(idxA3);

    // Intermediate blocks must come before root context A0
    expect(idxA1).toBeLessThan(idxA0);
    expect(idxA2).toBeLessThan(idxA0);
    expect(idxA3).toBeLessThan(idxA0);

    // Root context A0 must be the very last task
    expect(idxA0).toBe(tasks.length - 1);
  });

  it('correctly extracts ICOM roles for activity blocks', () => {
    const jsonPath = path.resolve(__dirname, '../../fibonacci-matrix-model.json');
    const project: Project = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const diagA0 = project.diagrams.find(d => d.code === 'A0' && !d.parentBlockId)!;
    const blockA0 = diagA0.blocks[0];

    const icom = extractBlockIcom(diagA0, blockA0.id);

    expect(icom.inputs).toContain('Размер матрицы');
    expect(icom.controls.some(c => c.includes('Логика генерации'))).toBe(true);
    expect(icom.outputs.some(o => o.includes('Матрица заполненная'))).toBe(true);
    expect(icom.mechanisms.some(m => m.includes('Генератор случайных чисел'))).toBe(true);
  });
});

import { Project, Diagram, Block } from '../../types/idef0';
import { getBlockCode } from '../geometry';
import { BlockGenerationTask, BlockIcomContext } from './types';

function sanitizeFunctionName(code: string, name: string): string {
  // Use pure Russian identifier (Python 3 natively supports UTF-8 Russian identifiers)
  // No transliteration, as requested by user.
  let clean = name
    .toLowerCase()
    .replace(/[^а-яё0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  const cleanCode = code.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!clean) return `блок_${cleanCode}`;
  return `${clean}_${cleanCode}`;
}

export function extractBlockIcom(diagram: Diagram, blockId: string): BlockIcomContext {
  const inputs: string[] = [];
  const controls: string[] = [];
  const mechanisms: string[] = [];
  const outputs: string[] = [];

  for (const arrow of diagram.arrows) {
    const label = (arrow.label || '').replace(/\s+/g, ' ').trim();
    if (arrow.target.type === 'block' && arrow.target.id === blockId) {
      if (arrow.target.side === 'top' || arrow.role === 'control') {
        if (label && !controls.includes(label)) controls.push(label);
      } else if (arrow.target.side === 'bottom' || arrow.role === 'mechanism') {
        if (label && !mechanisms.includes(label)) mechanisms.push(label);
      } else {
        if (label && !inputs.includes(label)) inputs.push(label);
      }
    }
    if (arrow.source.type === 'block' && arrow.source.id === blockId) {
      if (label && !outputs.includes(label)) outputs.push(label);
    }
  }

  return { inputs, controls, mechanisms, outputs };
}

/**
 * Builds a Bottom-Up list of tasks (leaves first, then composite blocks, finishing with A0).
 */
export function buildBottomUpBlockTasks(project: Project): BlockGenerationTask[] {
  const tasksMap = new Map<string, BlockGenerationTask>();
  const allTasks: BlockGenerationTask[] = [];

  // 1. Create a task representation for each block in every diagram
  for (const diag of project.diagrams) {
    for (const block of diag.blocks) {
      const code = getBlockCode(diag.code, block.nodeNumber);
      const funcName = sanitizeFunctionName(code, block.name);
      const icom = extractBlockIcom(diag, block.id);
      const decomp = project.diagrams.find(d => d.parentBlockId === block.id || d.id === block.decompDiagramId);

      const task: BlockGenerationTask = {
        id: block.id,
        code,
        name: block.name.replace(/\n/g, ' ').trim(),
        functionName: funcName,
        diagramCode: diag.code,
        diagramTitle: diag.title,
        isLeaf: !decomp,
        icom,
        status: 'pending',
        block,
        diagram: diag,
      };

      if (decomp) {
        task.childBlockCodes = decomp.blocks.map(b => getBlockCode(decomp.code, b.nodeNumber));
        task.childFunctionNames = decomp.blocks.map(b => sanitizeFunctionName(getBlockCode(decomp.code, b.nodeNumber), b.name));
      }

      tasksMap.set(block.id, task);
    }
  }

  // 2. Perform post-order traversal from root diagram(s)
  const rootDiagram = project.diagrams.find(d => !d.parentBlockId) || project.diagrams[0];
  if (!rootDiagram) return [];

  const visited = new Set<string>();

  function traverseBlock(block: Block, diag: Diagram) {
    if (visited.has(block.id)) return;

    // Check if this block has a child diagram
    const decomp = project.diagrams.find(d => d.parentBlockId === block.id || d.id === block.decompDiagramId);
    if (decomp) {
      // First traverse all blocks of the decomposition (bottom-up)
      for (const childBlock of decomp.blocks) {
        traverseBlock(childBlock, decomp);
      }
    }

    visited.add(block.id);
    const task = tasksMap.get(block.id);
    if (task) {
      allTasks.push(task);
    }
  }

  for (const rootBlock of rootDiagram.blocks) {
    traverseBlock(rootBlock, rootDiagram);
  }

  // Include any orphan/unvisited blocks at the beginning just in case
  for (const [id, t] of tasksMap.entries()) {
    if (!visited.has(id)) {
      allTasks.unshift(t);
    }
  }

  return allTasks;
}

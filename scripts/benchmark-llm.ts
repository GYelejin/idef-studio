/**
 * Reproducible Benchmark Harness for IDEF0-Topological Synthesis & Cross-Model Verification.
 *
 * Usage:
 *   bun run benchmark -- --dry-run         # Offline structural & traversal benchmark on all 16 models
 *   LLM_API_KEY=... bun run benchmark      # Live LLM generation + stateless verification benchmark
 */
import * as fs from 'fs';
import * as path from 'path';
import { Project } from '../src/types/idef0';
import { buildBottomUpBlockTasks } from '../src/core/llm/treeOrder';
import {
  assembleMainPy,
  generateAndVerifyFunctionInChat,
  initConversationHistory,
  validatePythonStructure,
} from '../src/core/llm/client';
import { DEFAULT_LLM_CONFIG, LlmConfig } from '../src/core/llm/types';

function loadAllProjectModels(): { name: string; project: Project }[] {
  const models: { name: string; project: Project }[] = [];
  const rootAssets = [
    path.resolve('src/assets/example-model.json'),
    path.resolve('src/assets/fibonacci-matrix-model.json'),
  ];
  for (const fp of rootAssets) {
    if (fs.existsSync(fp)) {
      models.push({
        name: path.basename(fp),
        project: JSON.parse(fs.readFileSync(fp, 'utf-8')) as Project,
      });
    }
  }

  const examplesDir = path.resolve('src/assets/examples');
  if (fs.existsSync(examplesDir)) {
    for (const f of fs.readdirSync(examplesDir).filter((x) => x.endsWith('.json')).sort()) {
      const fp = path.join(examplesDir, f);
      models.push({
        name: f,
        project: JSON.parse(fs.readFileSync(fp, 'utf-8')) as Project,
      });
    }
  }
  return models;
}

async function runBenchmark() {
  const dryRun = process.argv.includes('--dry-run') || !process.env.LLM_API_KEY;
  const models = loadAllProjectModels();

  const config: LlmConfig = {
    ...DEFAULT_LLM_CONFIG,
    apiUrl: process.env.LLM_API_URL || DEFAULT_LLM_CONFIG.apiUrl,
    apiKey: process.env.LLM_API_KEY || '',
    model: process.env.LLM_MODEL || DEFAULT_LLM_CONFIG.model,
  };

  console.log(`=== IDEF0 Studio Benchmark (${dryRun ? 'DRY-RUN / STRUCTURAL' : `LIVE LLM: ${config.model}`}) ===`);
  console.log(`Loaded ${models.length} IDEF0 models.\n`);

  let totalBlocks = 0;
  let totalVerified = 0;
  let totalRepairs = 0;
  let totalCompiled = 0;

  for (const item of models) {
    const tasks = buildBottomUpBlockTasks(item.project);
    totalBlocks += tasks.length;

    if (dryRun) {
      // Deterministic offline check: verify post-order invariants & structural scaffold
      for (const task of tasks) {
        const params = [
          ...task.icom.inputs,
          ...task.icom.controls,
          ...task.icom.mechanisms,
        ]
          .map((_, idx) => `arg_${idx}`)
          .join(', ');
        const childCalls = (task.childFunctionNames || []).map((fn) => `${fn}()`).join('; ');
        const stub = `def ${task.functionName}(${params}):\n    ${childCalls ? childCalls + '\n    ' : ''}return None`;
        const check = validatePythonStructure(stub, task);
        if (check.passed) totalVerified++;
        task.generatedCode = stub;
      }
      const mainPy = assembleMainPy(tasks, item.project.name);
      if (mainPy.includes('def main()')) totalCompiled++;
      console.log(`[DRY-RUN] ${item.name}: ${item.project.diagrams.length} diagrams, ${tasks.length} post-order tasks`);
    } else {
      const history = initConversationHistory(config, tasks, item.project.name);
      let allOk = true;
      for (let i = 0; i < tasks.length; i++) {
        const res = await generateAndVerifyFunctionInChat(config, tasks[i], i, tasks.length, history);
        tasks[i].generatedCode = res.code;
        totalRepairs += res.repairAttempts;
        if (res.verified) totalVerified++;
        else allOk = false;
      }
      if (allOk) totalCompiled++;
      console.log(`[LIVE] ${item.name}: ${tasks.length} blocks, verified=${tasks.filter((t) => t.generatedCode).length}`);
    }
  }

  const cr = models.length ? ((totalCompiled / models.length) * 100).toFixed(1) : '0.0';
  const icc = totalBlocks ? ((totalVerified / totalBlocks) * 100).toFixed(1) : '0.0';
  const avgRepairs = totalBlocks ? (totalRepairs / totalBlocks).toFixed(2) : '0.00';

  console.log('\n--- Summary ---');
  console.log(`Models evaluated: ${models.length}`);
  console.log(`Total functional blocks: ${totalBlocks}`);
  console.log(`Compilation/Assembly Rate (CR): ${cr}%`);
  console.log(`Contract/Structure Verification (ICC): ${icc}%`);
  console.log(`Avg repair iterations/block: ${avgRepairs}`);
}

runBenchmark().catch((err) => {
  console.error('Benchmark failed:', err);
  process.exit(1);
});

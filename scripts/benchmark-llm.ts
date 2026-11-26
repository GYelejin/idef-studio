/**
 * Reproducible Benchmark Harness for IDEF0-Topological Synthesis & Cross-Model Verification.
 *
 * Usage:
 *   bun run benchmark -- --dry-run         # Offline structural & traversal benchmark on all 16 models
 *   LLM_API_KEY=... bun run benchmark      # Live LLM generation + stateless verification benchmark
 */
import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { Project } from '../src/types/idef0';
import { buildBottomUpBlockTasks } from '../src/core/llm/treeOrder';
import {
  assembleMainPy,
  callChatCompletions,
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

function checkPythonSyntax(pythonCode: string): boolean {
  const res = spawnSync('python3', ['-c', 'import ast, sys; ast.parse(sys.stdin.read())'], {
    input: pythonCode,
    encoding: 'utf-8',
  });
  return res.status === 0;
}

const SOFTWARE_MODEL_NAMES = new Set([
  'fibonacci-matrix-model.json',
  'handwritten-solution-ocr.json',
  'classroom-schedule-optimizer.json',
  'exam-proctoring-monitor.json',
  'learning-recommender.json',
  'schedule-management-system.json',
  'automated-bug-fix-pipeline.json',
]);

function extractCodeBlock(raw: string): string {
  const m = raw.match(/```(?:python)?\s*\n([\s\S]*?)```/i);
  return (m ? m[1] : raw).trim();
}

function countNonStubFunctions(code: string, tasks: ReturnType<typeof buildBottomUpBlockTasks>): number {
  let ok = 0;
  for (const t of tasks) {
    const fnRegex = new RegExp(`def\\s+${t.functionName}\\s*\\([^)]*\\):([\\s\\S]*?)(?=\\ndef\\s+|$)`);
    const match = code.match(fnRegex);
    if (!match) continue;
    const body = match[1].trim();
    if (!body || body === 'pass' || /NotImplementedError|TODO/i.test(body)) continue;
    if (/\breturn\b/.test(body)) ok++;
  }
  return ok;
}

async function runComparison(config: LlmConfig, models: { name: string; project: Project }[], resume: boolean) {
  const swModels = models.filter((m) => SOFTWARE_MODEL_NAMES.has(m.name));
  console.log(`=== Comparison Benchmark (M-ZS vs M-CoT vs IDEF0) on ${swModels.length} software models (${config.model}) ===\n`);

  const comparePath = path.resolve('paper/compare_results.json');
  const existingResultsPath = path.resolve('paper/benchmark_results.json');
  let cachedIdef0: Record<string, { verified: number; astValid: boolean }> = {};
  if (fs.existsSync(existingResultsPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(existingResultsPath, 'utf-8')) as {
        models?: { model: string; verified: number; astValid: boolean }[];
      };
      for (const m of prev.models || []) {
        cachedIdef0[m.model] = { verified: m.verified, astValid: m.astValid };
      }
    } catch {
      // ignore
    }
  }

  interface CompareRow {
    model: string;
    blocks: number;
    mzs: { ast: boolean; fn: number };
    mcot: { ast: boolean; fn: number };
    idef0: { ast: boolean; fn: number };
  }

  let perModel: CompareRow[] = [];
  if (resume && fs.existsSync(comparePath)) {
    try {
      const prevCmp = JSON.parse(fs.readFileSync(comparePath, 'utf-8')) as { perModel?: CompareRow[] };
      if (Array.isArray(prevCmp.perModel)) perModel = prevCmp.perModel;
    } catch {
      // ignore
    }
  }

  const summary = {
    mzs: { astOk: 0, fnOk: 0, totalBlocks: 0 },
    mcot: { astOk: 0, fnOk: 0, totalBlocks: 0 },
    idef0: { astOk: 0, fnOk: 0, totalBlocks: 0 },
  };

  for (const item of swModels) {
    const existingRow = perModel.find((r) => r.model === item.name);
    if (resume && existingRow) {
      console.log(
        `[COMPARE-SKIP] ${item.name} (${existingRow.blocks} blocks) | M-ZS: fn=${existingRow.mzs.fn}/${existingRow.blocks} | M-CoT: fn=${existingRow.mcot.fn}/${existingRow.blocks} | IDEF0: fn=${existingRow.idef0.fn}/${existingRow.blocks}`
      );
      continue;
    }

    const tasks = buildBottomUpBlockTasks(item.project);
    const specLines = tasks.map(
      (t) =>
        `- ${t.functionName}(${[...t.icom.inputs, ...t.icom.controls, ...t.icom.mechanisms].join(', ')}) -> ${t.icom.outputs.join(', ') || 'None'}: ${t.name.replace(/\s+/g, ' ').trim()}`
    );
    const specText = `Program: ${item.project.name}\nRequired functions:\n${specLines.join('\n')}`;

    // 1. Monolithic Zero-Shot
    const zsRaw = await callChatCompletions(
      config,
      [
        { role: 'system', content: 'Write a complete Python module implementing all requested functions. Return only Python code.' },
        { role: 'user', content: specText },
      ],
      undefined,
      0.2
    );
    const zsCode = extractCodeBlock(zsRaw);
    const zsAst = checkPythonSyntax(zsCode);
    const zsFn = countNonStubFunctions(zsCode, tasks);

    // 2. Monolithic CoT
    const cotRaw = await callChatCompletions(
      config,
      [
        {
          role: 'system',
          content:
            'Think step by step about the architecture, data flow between functions, and edge cases, then write the full Python module inside a ```python block.',
        },
        {
          role: 'user',
          content: `Plan each function step-by-step from leaf subroutines to the top coordinator, then implement:\n${specText}`,
        },
      ],
      undefined,
      0.2
    );
    const cotCode = extractCodeBlock(cotRaw);
    const cotAst = checkPythonSyntax(cotCode);
    const cotFn = countNonStubFunctions(cotCode, tasks);

    // 3. IDEF0-Guided (reuse saved results/artifacts when available to avoid redundant API usage)
    let idefVerified = 0;
    let idefAst = false;
    const cached = cachedIdef0[item.name];
    if (cached) {
      idefVerified = cached.verified;
      idefAst = cached.astValid;
    } else {
      const history = initConversationHistory(config, tasks, item.project.name);
      for (let i = 0; i < tasks.length; i++) {
        const res = await generateAndVerifyFunctionInChat(config, tasks[i], i, tasks.length, history);
        tasks[i].generatedCode = res.code;
        if (res.verified) idefVerified++;
      }
      const idefCode = assembleMainPy(tasks, item.project.name);
      idefAst = checkPythonSyntax(idefCode);
    }

    console.log(
      `[COMPARE] ${item.name} (${tasks.length} blocks) | M-ZS: ast=${zsAst} fn=${zsFn}/${tasks.length} | M-CoT: ast=${cotAst} fn=${cotFn}/${tasks.length} | IDEF0: ast=${idefAst} fn=${idefVerified}/${tasks.length}`
    );
    perModel.push({
      model: item.name,
      blocks: tasks.length,
      mzs: { ast: zsAst, fn: zsFn },
      mcot: { ast: cotAst, fn: cotFn },
      idef0: { ast: idefAst, fn: idefVerified },
    });

    // Recompute summary and save incrementally after each model
    summary.mzs = { astOk: 0, fnOk: 0, totalBlocks: 0 };
    summary.mcot = { astOk: 0, fnOk: 0, totalBlocks: 0 };
    summary.idef0 = { astOk: 0, fnOk: 0, totalBlocks: 0 };
    for (const r of perModel) {
      summary.mzs.totalBlocks += r.blocks;
      summary.mcot.totalBlocks += r.blocks;
      summary.idef0.totalBlocks += r.blocks;
      if (r.mzs.ast) summary.mzs.astOk++;
      if (r.mcot.ast) summary.mcot.astOk++;
      if (r.idef0.ast) summary.idef0.astOk++;
      summary.mzs.fnOk += r.mzs.fn;
      summary.mcot.fnOk += r.mcot.fn;
      summary.idef0.fnOk += r.idef0.fn;
    }
    fs.writeFileSync(comparePath, JSON.stringify({ model: config.model, summary, perModel }, null, 2), 'utf-8');
  }

  console.log('\nSaved comparison results to paper/compare_results.json');
}

async function runBenchmark() {
  const dryRun = process.argv.includes('--dry-run') || (!process.env.LLM_API_KEY && !process.env.VITE_LLM_API_KEY);
  const compare = process.argv.includes('--compare');
  const resume = process.argv.includes('--resume');
  const limitArg = process.argv.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 0;
  const allModels = loadAllProjectModels();
  const models = limit > 0 ? allModels.slice(0, limit) : allModels;

  const resultsPath = path.resolve('paper/benchmark_results.json');
  const outputsDir = path.resolve('paper/benchmark_outputs');
  if (!dryRun && !fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true });
  }

  interface ModelResult {
    model: string;
    diagrams: number;
    blocks: number;
    verified: number;
    firstPassOk: number;
    repairedBlocks: number;
    totalRepairs: number;
    avgRepairs: string;
    astValid: boolean;
  }

  let liveResults: ModelResult[] = [];
  if (!dryRun && resume && fs.existsSync(resultsPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(resultsPath, 'utf-8')) as { models?: ModelResult[] };
      if (Array.isArray(prev.models)) liveResults = prev.models;
    } catch {
      // ignore corrupt cache
    }
  }

  const config: LlmConfig = {
    ...DEFAULT_LLM_CONFIG,
    apiUrl: process.env.LLM_API_URL || process.env.VITE_LLM_API_URL || DEFAULT_LLM_CONFIG.apiUrl,
    apiKey: process.env.LLM_API_KEY || process.env.VITE_LLM_API_KEY || '',
    model: process.env.LLM_MODEL || process.env.VITE_LLM_MODEL || DEFAULT_LLM_CONFIG.model,
    verifierApiUrl: process.env.VERIFIER_API_URL || undefined,
    verifierApiKey: process.env.VERIFIER_API_KEY || undefined,
    verifierModel: process.env.VERIFIER_MODEL || undefined,
  };

  if (compare && !dryRun) {
    await runComparison(config, models, resume);
    return;
  }

  console.log(`=== IDEF0 Studio Benchmark (${dryRun ? 'DRY-RUN / STRUCTURAL' : `LIVE LLM: ${config.model}`}) ===`);
  console.log(`Loaded ${models.length} IDEF0 models.\n`);

  let totalDiagrams = 0;
  let totalBlocks = 0;
  let totalLeafBlocks = 0;
  let totalCompositeBlocks = 0;
  let totalIcomPorts = 0;
  let totalVerified = 0;
  let totalRepairs = 0;
  let totalCompiled = 0;

  for (const item of models) {
    const tasks = buildBottomUpBlockTasks(item.project);
    totalDiagrams += item.project.diagrams.length;
    totalBlocks += tasks.length;
    for (const t of tasks) {
      if (t.isLeaf) totalLeafBlocks++;
      else totalCompositeBlocks++;
      totalIcomPorts +=
        t.icom.inputs.length +
        t.icom.controls.length +
        t.icom.mechanisms.length +
        t.icom.outputs.length;
    }

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
      if (mainPy.includes('def main()') && checkPythonSyntax(mainPy)) totalCompiled++;
      console.log(`[DRY-RUN] ${item.name}: ${item.project.diagrams.length} diagrams, ${tasks.length} post-order tasks`);
    } else {
      const existing = liveResults.find((r) => r.model === item.name);
      if (resume && existing) {
        totalVerified += existing.verified;
        totalRepairs += existing.totalRepairs;
        if (existing.verified === existing.blocks && existing.astValid) totalCompiled++;
        console.log(`[RESUME-SKIP] ${item.name}: ${existing.verified}/${existing.blocks} verified, astValid=${existing.astValid}, avgRepairs=${existing.avgRepairs}`);
        continue;
      }

      const history = initConversationHistory(config, tasks, item.project.name);
      let modelVerified = 0;
      let modelFirstPass = 0;
      let modelRepairedBlocks = 0;
      let modelRepairs = 0;
      for (let i = 0; i < tasks.length; i++) {
        const res = await generateAndVerifyFunctionInChat(config, tasks[i], i, tasks.length, history);
        tasks[i].generatedCode = res.code;
        modelRepairs += res.repairAttempts;
        totalRepairs += res.repairAttempts;
        if (res.verified) {
          modelVerified++;
          totalVerified++;
          if (res.repairAttempts === 0) modelFirstPass++;
          else modelRepairedBlocks++;
        }
      }
      const mainPy = assembleMainPy(tasks, item.project.name);
      const astValid = checkPythonSyntax(mainPy);
      if (modelVerified === tasks.length && astValid) totalCompiled++;

      const outPyPath = path.join(outputsDir, `${item.name.replace(/\.json$/i, '')}.py`);
      fs.writeFileSync(outPyPath, mainPy, 'utf-8');

      const avgModelRepairs = tasks.length ? (modelRepairs / tasks.length).toFixed(2) : '0.00';
      liveResults.push({
        model: item.name,
        diagrams: item.project.diagrams.length,
        blocks: tasks.length,
        verified: modelVerified,
        firstPassOk: modelFirstPass,
        repairedBlocks: modelRepairedBlocks,
        totalRepairs: modelRepairs,
        avgRepairs: avgModelRepairs,
        astValid,
      });
      fs.writeFileSync(
        resultsPath,
        JSON.stringify({ generatorModel: config.model, verifierModel: config.verifierModel || config.model, models: liveResults }, null, 2),
        'utf-8'
      );

      console.log(
        `[LIVE] ${item.name}: ${modelVerified}/${tasks.length} verified (1st-pass=${modelFirstPass}, repaired=${modelRepairedBlocks}), astValid=${astValid}, avgRepairs=${avgModelRepairs}`
      );
    }
  }

  const cr = models.length ? ((totalCompiled / models.length) * 100).toFixed(1) : '0.0';
  const icc = totalBlocks ? ((totalVerified / totalBlocks) * 100).toFixed(1) : '0.0';
  const avgRepairs = totalBlocks ? (totalRepairs / totalBlocks).toFixed(2) : '0.00';

  console.log('\n--- Summary ---');
  console.log(`Models evaluated: ${models.length}`);
  console.log(`Total diagrams: ${totalDiagrams}`);
  console.log(`Total functional blocks: ${totalBlocks} (leaf=${totalLeafBlocks}, composite=${totalCompositeBlocks})`);
  console.log(`Total bound ICOM ports: ${totalIcomPorts} (avg ${(totalBlocks ? totalIcomPorts / totalBlocks : 0).toFixed(2)}/block)`);
  console.log(`Compilation/Assembly Rate (CR): ${cr}%`);
  console.log(`Contract/Structure Verification (ICC): ${icc}%`);
  console.log(`Avg repair iterations/block: ${avgRepairs}`);
}

runBenchmark().catch((err) => {
  console.error('Benchmark failed:', err);
  process.exit(1);
});

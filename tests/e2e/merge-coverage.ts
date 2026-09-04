/**
 * Объединяет все Istanbul-совместимые coverage файлы из .nyc_output/
 * и выводит итоговый отчёт по файлам.
 */
import * as fs from "fs";
import * as path from "path";

const nycDir = path.resolve(".nyc_output");
const files = fs.readdirSync(nycDir).filter(f => f.endsWith(".json") && f !== "merged.json");

console.log(`\nОбъединяем ${files.length} coverage файлов: ${files.join(", ")}\n`);

// Merge: суммируем счётчики для одинаковых файлов
const merged: Record<string, any> = {};

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(nycDir, file), "utf-8"));
  for (const [filePath, fd] of Object.entries(data) as [string, any][]) {
    if (!merged[filePath]) {
      // Первый раз — копируем как есть
      merged[filePath] = JSON.parse(JSON.stringify(fd));
    } else {
      // Суммируем statement/function/branch счётчики
      const m = merged[filePath];
      for (const k of Object.keys(fd.s || {})) {
        m.s[k] = (m.s[k] || 0) + (fd.s[k] || 0);
      }
      for (const k of Object.keys(fd.f || {})) {
        m.f[k] = (m.f[k] || 0) + (fd.f[k] || 0);
      }
      for (const k of Object.keys(fd.b || {})) {
        m.b[k] = (m.b[k] || []).map((v: number, i: number) => v + (fd.b[k]?.[i] || 0));
      }
    }
  }
}

// Сохранить merged
fs.writeFileSync(path.join(nycDir, "merged.json"), JSON.stringify(merged, null, 2));

// Отчёт
let covStmt = 0, totStmt = 0, covFn = 0, totFn = 0, covBr = 0, totBr = 0;
const rows: { file: string; s: number; f: number; b: number }[] = [];

for (const [filePath, fd] of Object.entries(merged)) {
  if (filePath.includes("node_modules") || filePath.includes("@vite") || filePath.includes("@react")) continue;
  const stmts = Object.values(fd.s || {}) as number[];
  const fns = Object.values(fd.f || {}) as number[];
  const brs = (Object.values(fd.b || {}) as number[][]).flat();
  if (!stmts.length) continue;
  const cs = stmts.filter(v => v > 0).length;
  const cf = fns.filter(v => v > 0).length;
  const cb = brs.filter(v => v > 0).length;
  covStmt += cs; totStmt += stmts.length;
  covFn += cf; totFn += fns.length;
  covBr += cb; totBr += brs.length;
  rows.push({
    file: filePath.replace(/.*\/src\//, "src/").replace(/.*localhost:3000\//, ""),
    s: Math.round(cs / stmts.length * 100),
    f: fns.length ? Math.round(cf / fns.length * 100) : 100,
    b: brs.length ? Math.round(cb / brs.length * 100) : 100,
  });
}

rows.sort((a, b) => a.s - b.s);

console.log("Файл                                        | Stmts | Fns  | Branches");
console.log("--------------------------------------------|-------|------|----------");
for (const r of rows) {
  const icon = r.s === 100 ? "✅" : r.s >= 80 ? "🟡" : "🔴";
  console.log(`${icon} ${r.file.padEnd(41)}| ${String(r.s + "%").padEnd(6)}| ${String(r.f + "%").padEnd(5)}| ${r.b}%`);
}
console.log("--------------------------------------------|-------|------|----------");
const sp = (covStmt / totStmt * 100).toFixed(1);
const fp = (covFn / totFn * 100).toFixed(1);
const bp = (covBr / totBr * 100).toFixed(1);
console.log(`\n🎯 ИТОГО (объединённые E2E): Statements=${sp}%  Functions=${fp}%  Branches=${bp}%\n`);

import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';

const wikiDir = path.resolve('wiki');
const outTyp = path.join(wikiDir, 'user_guide_ru.typ');
const outPdf = path.resolve(process.argv[2] || 'wiki/IDEF0_Studio_User_Guide_RU.pdf');

function escapeTypst(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\*/g, '\\*')
    .replace(/#/g, '\\#')
    .replace(/\$/g, '\\$')
    .replace(/@/g, '\\@')
    .replace(/</g, '\\<')
    .replace(/>/g, '\\>')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]');
}

function formatInline(text: string): string {
  // Handle inline code `...` and bold **...** safely
  const parts = text.split(/(`[^`]+`)/g);
  return parts
    .map((p) => {
      if (p.startsWith('`') && p.endsWith('`')) {
        return `#raw(${JSON.stringify(p.slice(1, -1))})`;
      }
      const boldParts = p.split(/(\*\*[^*]+\*\*)/g);
      return boldParts
        .map((bp) => {
          if (bp.startsWith('**') && bp.endsWith('**')) {
            return `*${escapeTypst(bp.slice(2, -2))}*`;
          }
          return escapeTypst(bp);
        })
        .join('');
    })
    .join('');
}

function resolveImage(imgRelPath: string): string | null {
  const direct = path.join(wikiDir, imgRelPath);
  if (fs.existsSync(direct)) return imgRelPath;
  const base = path.basename(imgRelPath);
  const imgDir = path.join(wikiDir, 'images');
  if (fs.existsSync(imgDir)) {
    const match = fs.readdirSync(imgDir).find((f) => f === base || f.endsWith('_' + base));
    if (match) return `images/${match}`;
  }
  return null;
}

function convertMarkdownToTypst(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (line === '---' || line === '***') {
      out.push('#line(length: 100%, stroke: 0.4pt + luma(200))');
      i++;
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (hMatch) {
      const level = '='.repeat(hMatch[1].length);
      out.push(`${level} ${formatInline(hMatch[2])}`);
      i++;
      continue;
    }

    // Video player, animated GIF, or blockquote link
    if (line.startsWith('<video ') || line.startsWith('> 🎥') || (line.startsWith('![') && line.includes('videos/'))) {
      const vidMatch = line.match(/videos\/([^\s"')]+\.(?:mp4|gif))/);
      if (vidMatch) {
        const mp4Name = vidMatch[1].replace(/\.gif$/, '.mp4');
        out.push(`#block(inset: 6pt, fill: luma(248), stroke: (left: 2pt + rgb("#2563eb")), radius: 2pt)[_Видеодемонстрация в GitHub Wiki:_ #raw(${JSON.stringify(`videos/${mp4Name}`)})]`);
      }
      i++;
      continue;
    }

    // Media ![alt](url)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const target = imgMatch[2];
      if (target.endsWith('.mp4') || target.endsWith('.webm')) {
        out.push(`#block(inset: 6pt, fill: luma(248), stroke: (left: 2pt + rgb("#2563eb")), radius: 2pt)[_${escapeTypst(alt)}_ (доступно в GitHub Wiki: #raw(${JSON.stringify(target)}))]`);
      } else {
        const resolved = resolveImage(target);
        if (resolved) {
          out.push(`#figure(image(${JSON.stringify(resolved)}, width: 92%), caption: [${formatInline(alt)}])`);
        }
      }
      i++;
      continue;
    }

    // Markdown table
    if (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|:') || (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|-'))) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (r: string) =>
          r
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((c) => c.trim());
        const headers = parseRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseRow);
        const cols = headers.length;
        out.push(`#table(`);
        out.push(`  columns: (${Array(cols).fill('1fr').join(', ')}),`);
        out.push(`  inset: 5pt,`);
        out.push(`  stroke: 0.5pt + luma(190),`);
        out.push(`  fill: (x, y) => if y == 0 { luma(238) } else { none },`);
        out.push(`  ${headers.map((h) => `[*${formatInline(h)}*]`).join(', ')},`);
        for (const row of bodyRows) {
          const padded = [...row, ...Array(Math.max(0, cols - row.length)).fill('')].slice(0, cols);
          out.push(`  ${padded.map((c) => `[${formatInline(c)}]`).join(', ')},`);
        }
        out.push(`)`);
      }
      continue;
    }

    // Numbered list (including indented)
    const numMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);
    if (numMatch) {
      out.push(`${numMatch[1]}+ ${formatInline(numMatch[2])}`);
      i++;
      continue;
    }

    // Bullet list (including indented)
    const bulMatch = line.match(/^(\s*)[*+-]\s+(.*)$/);
    if (bulMatch) {
      out.push(`${bulMatch[1]}- ${formatInline(bulMatch[2])}`);
      i++;
      continue;
    }

    if (!line.trim()) {
      out.push('');
      i++;
      continue;
    }

    out.push(formatInline(line));
    i++;
  }

  return out.join('\n');
}

function main() {
  const guideMd = fs.readFileSync(path.join(wikiDir, 'Руководство.md'), 'utf-8');
  const refMd = fs.readFileSync(path.join(wikiDir, 'Справочник.md'), 'utf-8');

  const typSource = `#set page(
  paper: "a4",
  margin: (top: 20mm, bottom: 20mm, left: 18mm, right: 18mm),
  numbering: "1",
)
#set text(font: ("Liberation Sans", "DejaVu Sans"), size: 10pt, lang: "ru")
#set heading(numbering: "1.1.")
#show heading.where(level: 1): set text(size: 15pt, weight: "bold", fill: rgb("#0f172a"))
#show heading.where(level: 2): set text(size: 12.5pt, weight: "bold", fill: rgb("#1e293b"))
#show heading.where(level: 3): set text(size: 11pt, weight: "bold", fill: rgb("#334155"))

#align(center)[
  #v(12mm)
  #text(size: 22pt, weight: "bold", fill: rgb("#0f172a"))[IDEF0 Studio]
  #v(3mm)
  #text(size: 14pt, fill: rgb("#334155"))[Руководство пользователя и справочник интерфейса]
  #v(4mm)
  #text(size: 10pt, fill: luma(110))[Сгенерировано из официальной документации Wiki]
  #v(8mm)
]

#outline(title: [Содержание], indent: 1.2em)
#pagebreak()

${convertMarkdownToTypst(guideMd)}

#pagebreak()

${convertMarkdownToTypst(refMd)}
`;

  fs.writeFileSync(outTyp, typSource, 'utf-8');
  const res = spawnSync('typst', ['compile', outTyp, outPdf], { encoding: 'utf-8' });
  if (res.status !== 0) {
    console.error('Typst compile error:\n', res.stderr);
    process.exit(1);
  }
  console.log(`Built user guide PDF: ${outPdf}`);
}

main();

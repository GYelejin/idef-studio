import { run as run01 } from './01-create-project';
import { run as run02 } from './02-load-example';
import { run as run03 } from './03-save-open-export';
import { run as run04 } from './04-add-block';
import { run as run05 } from './05-move-block';
import { run as run06 } from './06-resize-block';
import { run as run07 } from './07-edit-block-name';
import { run as run08 } from './08-delete-block';
import { run as run09 } from './09-create-arrow';
import { run as run10 } from './10-shift-segment';
import { run as run11 } from './11-remove-corner-bend';
import { run as run12 } from './12-branch-and-merge';
import { run as run13 } from './13-pin-arrow';
import { run as run14 } from './14-label-and-leader';
import { run as run15 } from './15-decompose-block';
import { run as run16 } from './16-tree-navigation';

export async function main() {
  console.log("🚀 Starting generation of all 16 modular usecase video guides (1920x1080 @ 75% zoom)...");
  const usecases = [
    { name: '01-create-project', fn: run01 },
    { name: '02-load-example', fn: run02 },
    { name: '03-save-open-export', fn: run03 },
    { name: '04-add-block', fn: run04 },
    { name: '05-move-block', fn: run05 },
    { name: '06-resize-block', fn: run06 },
    { name: '07-edit-block-name', fn: run07 },
    { name: '08-delete-block', fn: run08 },
    { name: '09-create-arrow', fn: run09 },
    { name: '10-shift-segment', fn: run10 },
    { name: '11-remove-corner-bend', fn: run11 },
    { name: '12-branch-and-merge', fn: run12 },
    { name: '13-pin-arrow', fn: run13 },
    { name: '14-label-and-leader', fn: run14 },
    { name: '15-decompose-block', fn: run15 },
    { name: '16-tree-navigation', fn: run16 },
  ];

  for (const uc of usecases) {
    console.log(`\n▶ Running usecase: ${uc.name}...`);
    await uc.fn();
  }
  console.log("\n🎉 All 16 modular usecase video guides recorded and saved successfully!");
}

if (import.meta.main) {
  await main();
}

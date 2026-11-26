import { Project } from '../types/idef0';
import canonicalExample from '../assets/example-model.json';
import fibonacciExample from '../assets/fibonacci-matrix-model.json';
import ramus2 from '../assets/examples/handwritten-solution-ocr.json';
import ramus3 from '../assets/examples/classroom-schedule-optimizer.json';
import ramus4 from '../assets/examples/exam-proctoring-monitor.json';
import ramus5 from '../assets/examples/learning-recommender.json';
import ramusIdz from '../assets/examples/schedule-management-system.json';
import ramusLab03 from '../assets/examples/automated-bug-fix-pipeline.json';
import ramusLab04 from '../assets/examples/fibonacci-matrix-variant-a.json';
import ramusRk21 from '../assets/examples/weekly-grocery-planner.json';
import ramusRk22 from '../assets/examples/triangle-radii-optimizer.json';
import ramusPraktika from '../assets/examples/ml-production-analytics.json';
import ramusTask03 from '../assets/examples/program-error-fixer.json';
import ramusTask4 from '../assets/examples/fibonacci-matrix-variant-b.json';
import ramusRk1 from '../assets/examples/cinema-trip-planner.json';
import ramusRk2 from '../assets/examples/plane-points-bisector.json';

export interface ExampleCatalogItem {
  id: string;
  title: string;
  source: string;
  project: Project;
}

export const EXAMPLE_PROJECTS: ExampleCatalogItem[] = [
  {
    id: 'canonical',
    title: 'Закупочная деятельность предприятия (Канонический)',
    source: 'IDEF0 Studio',
    project: canonicalExample as Project,
  },
  {
    id: 'fibonacci',
    title: 'Матрица Фибоначчи',
    source: 'IDEF0 Studio',
    project: fibonacciExample as Project,
  },
  { id: 'ramus-2', title: (ramus2 as Project).name, source: 'Ramus (2.rsf)', project: ramus2 as Project },
  { id: 'ramus-3', title: (ramus3 as Project).name, source: 'Ramus (3.rsf)', project: ramus3 as Project },
  { id: 'ramus-4', title: (ramus4 as Project).name, source: 'Ramus (4.rsf)', project: ramus4 as Project },
  { id: 'ramus-5', title: (ramus5 as Project).name, source: 'Ramus (5.rsf)', project: ramus5 as Project },
  { id: 'ramus-idz', title: (ramusIdz as Project).name, source: 'Ramus (IDZ.rsf)', project: ramusIdz as Project },
  { id: 'ramus-lab03', title: (ramusLab03 as Project).name, source: 'Ramus (Lab_03.rsf)', project: ramusLab03 as Project },
  { id: 'ramus-lab04', title: (ramusLab04 as Project).name, source: 'Ramus (Lab_04.rsf)', project: ramusLab04 as Project },
  { id: 'ramus-rk21', title: (ramusRk21 as Project).name, source: 'Ramus (RK_2_1.rsf)', project: ramusRk21 as Project },
  { id: 'ramus-rk22', title: (ramusRk22 as Project).name, source: 'Ramus (RK_2_2.rsf)', project: ramusRk22 as Project },
  { id: 'ramus-praktika', title: (ramusPraktika as Project).name, source: 'Ramus (praktika.rsf)', project: ramusPraktika as Project },
  { id: 'ramus-task03', title: (ramusTask03 as Project).name, source: 'Ramus (task_03.rsf)', project: ramusTask03 as Project },
  { id: 'ramus-task4', title: (ramusTask4 as Project).name, source: 'Ramus (task_4.rsf)', project: ramusTask4 as Project },
  { id: 'ramus-rk1', title: (ramusRk1 as Project).name, source: 'Ramus (рк__1.rsf)', project: ramusRk1 as Project },
  { id: 'ramus-rk2', title: (ramusRk2 as Project).name, source: 'Ramus (рк__2.rsf)', project: ramusRk2 as Project },
];

import { Project } from '../../types/idef0';
import { STORAGE_KEY } from './types';

export function cloneProject(p: Project): Project {
  return JSON.parse(JSON.stringify(p));
}

export function createCleanProject(): Project {
  return {
    id: `proj-${Date.now()}`,
    name: 'Закупочная деятельность предприятия',
    description: 'Функциональная модель IDEF0',
    diagrams: [
      {
        id: 'diag-a0',
        code: 'A0',
        title: 'Контекстная диаграмма: Закупочная деятельность предприятия',
        parentBlockId: null,
        blocks: [
          {
            id: 'block-a0',
            nodeNumber: 0,
            name: 'Закупочная деятельность предприятия',
            x: 650,
            y: 350,
            width: 300,
            height: 180,
            decompDiagramId: null,
          }
        ],
        arrows: [],
        junctions: [],
      }
    ],
    activeDiagramId: 'diag-a0',
  };
}

export function createInitialProject(): Project {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.diagrams && parsed.diagrams.length > 0) {
          return parsed;
        }
      } catch {
        // Fallback to clean project
      }
    }
  }
  return createCleanProject();
}

export const createDefaultProject = createInitialProject;

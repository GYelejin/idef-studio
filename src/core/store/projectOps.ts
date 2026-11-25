import { Project } from '../../types/idef0';
import { autoLayoutIdef0 } from '../geometry';
import { createExampleModel } from '../exampleModel';
import { EditorState } from './types';
import { HistoryOps } from './historyOps';

export const ProjectOps = {
  resetProject(state: EditorState): void {
    HistoryOps.pushHistory(state);
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: 'Новый проект IDEF0',
      description: 'Функциональная модель IDEF0',
      diagrams: [
        {
          id: 'diag-a0',
          code: 'A0',
          title: 'Контекстная диаграмма',
          parentBlockId: null,
          blocks: [
            {
              id: `block-${Date.now()}-a0`,
              nodeNumber: 0,
              name: 'Новая функция',
              x: 650,
              y: 360,
              width: 300,
              height: 180,
              decompDiagramId: null,
            },
          ],
          arrows: [],
          junctions: [],
        },
      ],
      activeDiagramId: 'diag-a0',
    };
    state.project = newProject;
    state.activeDiagramId = 'diag-a0';
    state.selectedObjectId = null;
    state.selectedObjectType = null;
  },

  loadExample(state: EditorState): void {
    HistoryOps.pushHistory(state);
    const ex = createExampleModel();
    state.project = ex;
    state.activeDiagramId = ex.activeDiagramId || 'diag-a1';
    state.selectedObjectId = null;
    state.selectedObjectType = null;
  },

  importProject(state: EditorState, projOrJson: Project | string): boolean {
    let proj: Project;
    if (typeof projOrJson === 'string') {
      try {
        proj = JSON.parse(projOrJson);
      } catch {
        console.warn('[Import Error] Некорректный JSON проекта');
        return false;
      }
    } else {
      proj = projOrJson;
    }

    if (!proj || typeof proj !== 'object' || !Array.isArray(proj.diagrams) || proj.diagrams.length === 0) {
      console.warn('[Import Error] Некорректный формат проекта IDEF0');
      return false;
    }

    HistoryOps.pushHistory(state);
    state.project = proj;
    state.activeDiagramId = proj.activeDiagramId || proj.diagrams[0]?.id || 'diag-a0';
    state.selectedObjectId = null;
    state.selectedObjectType = null;
    return true;
  },

  updateProjectMeta(state: EditorState, name: string, description: string): void {
    HistoryOps.pushHistory(state);
    state.project.name = name;
    state.project.description = description;
  },

  autoLayoutCurrentDiagram(state: EditorState): void {
    const diag = state.project.diagrams.find((d) => d.id === state.activeDiagramId);
    if (!diag) return;
    HistoryOps.pushHistory(state);
    const updated = autoLayoutIdef0(diag);
    const idx = state.project.diagrams.findIndex((d) => d.id === diag.id);
    if (idx !== -1) {
      state.project.diagrams[idx] = updated;
    }
  }
};

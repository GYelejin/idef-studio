import { Project, LinterIssue } from '../../types/idef0';
import { linterRegistry } from './registry';

export * from './types';
export * from './registry';
export * from './rules/blockCount';
export * from './rules/icomCompleteness';
export * from './rules/geometryOrtho';
export * from './rules/boundaryBalance';
export * from './rules/intersections';

/**
 * Главная функция проверки диаграммы (обратная совместимость со всем приложением)
 */
export function runIDEF0Linter(project: Project, diagramId: string): LinterIssue[] {
  return linterRegistry.run(project, diagramId);
}

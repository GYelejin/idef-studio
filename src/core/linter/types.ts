import { Diagram, Project, LinterIssue } from '../../types/idef0';

export type RuleSeverity = 'error' | 'warning' | 'info' | 'off';

export interface LinterContext {
  project: Project;
  diagram: Diagram;
}

export interface LinterRule {
  /** Уникальный идентификатор правила, например 'FR-LINT-01' */
  id: string;
  /** Краткое понятное имя правила */
  name: string;
  /** Описание требования стандарта (РД IDEF0 - 2000) */
  description: string;
  /** Категория правила */
  category: 'syntax' | 'semantics' | 'geometry' | 'style';
  /** Строгость по умолчанию */
  defaultSeverity: 'error' | 'warning' | 'info';

  /**
   * Функция проверки правила.
   * Возвращает список обнаруженных несоответствий или пустой массив.
   */
  validate(context: LinterContext): LinterIssue[];
}

export interface LinterConfig {
  /** Переопределение строгости правил: { 'FR-LINT-01': 'off', 'FR-LINT-02': 'error' } */
  rules?: Record<string, RuleSeverity>;
}

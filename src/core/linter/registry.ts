import { LinterRule, LinterConfig, LinterContext, RuleSeverity } from './types';
import { LinterIssue, Project } from '../../types/idef0';

// Import all built-in rules
import { blockCountRule } from './rules/blockCount';
import { icomCompletenessRule } from './rules/icomCompleteness';
import { geometryOrthoRule } from './rules/geometryOrtho';
import { boundaryBalanceRule } from './rules/boundaryBalance';
import { intersectionsRule } from './rules/intersections';
import { unattachedArrowRule } from './rules/unattachedArrow';
import { labelOverlapRule } from './rules/labelOverlap';
import { arrowLabelRule } from './rules/arrowLabel';

/**
 * Реестр правил линтера IDEF0 (Linter Registry)
 * Позволяет регистрировать, включать/выключать правила и гибко расширять проверки.
 */
export class LinterRegistry {
  private rules = new Map<string, LinterRule>();
  private config: LinterConfig = {};

  constructor() {
    // Регистрация встроенных правил по умолчанию
    this.register(blockCountRule);
    this.register(icomCompletenessRule);
    this.register(geometryOrthoRule);
    this.register(boundaryBalanceRule);
    this.register(intersectionsRule);
    this.register(unattachedArrowRule);
    this.register(labelOverlapRule);
    this.register(arrowLabelRule);
  }

  /**
   * Зарегистрировать новое правило или модуль
   */
  public register(rule: LinterRule): this {
    this.rules.set(rule.id, rule);
    return this;
  }

  /**
   * Удалить правило из реестра
   */
  public unregister(ruleId: string): boolean {
    return this.rules.delete(ruleId);
  }

  /**
   * Получить список всех зарегистрированных правил
   */
  public getRules(): LinterRule[] {
    return Array.from(this.rules.values());
  }

  /**
   * Получить конкретное правило по ID
   */
  public getRule(ruleId: string): LinterRule | undefined {
    return this.rules.get(ruleId);
  }

  /**
   * Установить конфигурацию строгости правил
   */
  public setConfig(config: LinterConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Запустить проверку диаграммы по всем активным правилам
   */
  public run(project: Project, diagramId: string): LinterIssue[] {
    const diagram = project.diagrams.find(d => d.id === diagramId);
    if (!diagram) return [];

    const context: LinterContext = { project, diagram };
    const allIssues: LinterIssue[] = [];

    for (const rule of this.rules.values()) {
      // Проверка конфигурации строгости правила
      const configuredSeverity: RuleSeverity = this.config.rules?.[rule.id] ?? rule.defaultSeverity;
      if (configuredSeverity === 'off') {
        continue; // Правило отключено
      }

      try {
        const issues = rule.validate(context);
        for (const issue of issues) {
          allIssues.push({
            ...issue,
            ruleId: rule.id,
            // Если в конфиге переопределена строгость (например warning вместо error), применяем ее
            severity: (configuredSeverity === 'error' || configuredSeverity === 'warning' || configuredSeverity === 'info')
              ? configuredSeverity
              : issue.severity,
          });
        }
      } catch (err) {
        console.error(`[Linter] Ошибка выполнения правила ${rule.id}:`, err);
      }
    }

    return allIssues;
  }
}

/** Глобальный синглтон реестра линтера */
export const linterRegistry = new LinterRegistry();

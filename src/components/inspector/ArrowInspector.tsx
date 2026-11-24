import React from "react";
import { CornerDownRight, GitFork, GitMerge, Unlink, Trash2, Box, Square, ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
import { store, EditorState } from "../../core/store";
import { Arrow, ICOMRole, Side } from "../../types/idef0";
import { getSegmentsFromPoints, getBlockCode, getArrowParent, getArrowDisplayName } from "../../core/geometry";
import AutoResizingTextarea from "./AutoResizingTextarea";
import EndpointDropdown from "./EndpointDropdown";
import ArrowSegmentsList from "./ArrowSegmentsList";

interface ArrowInspectorProps {
  arrow: Arrow;
  state: EditorState;
}

export const ArrowInspector: React.FC<ArrowInspectorProps> = ({ arrow, state }) => {
  const diag = state.project.diagrams.find(d => d.id === state.activeDiagramId);
  if (!diag) return null;

      const parentArrow = getArrowParent(arrow, diag);
      const isBranch = Boolean(parentArrow);
      const parentLabelClean = parentArrow?.label?.trim()
        ? parentArrow.label.replace(/\n/g, ' ').trim()
        : (parentArrow ? 'Основной поток' : null);
  
      const hasLabelText = Boolean(arrow.label && arrow.label.trim().length > 0);
  
      return (
        <div className="panel-body" data-testid="inspector-arrow-view">
          {isBranch ? (
            <>
              {/* Parent Trunk Stream (Read-only) */}
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <GitMerge size={13} color="var(--text-secondary, #64748b)" />
                  <label className="form-label" style={{ margin: 0 }}>Основной поток</label>
                </div>
                <input
                  type="text"
                  className="form-input"
                  value={parentLabelClean || 'Основной поток'}
                  readOnly
                  disabled
                  style={{
                    background: 'var(--bg-card, #f8fafc)',
                    color: 'var(--text-secondary, #475569)',
                    cursor: 'not-allowed',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                  data-testid="input-parent-flow-name"
                />
              </div>
  
              {/* Custom Branch Name (Optional) */}
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CornerDownRight size={13} color="var(--accent-primary, #2563eb)" />
                  <label className="form-label" style={{ margin: 0 }}>
                    Название ответвления <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({arrow.label.length}/80)</span>
                  </label>
                </div>
                <AutoResizingTextarea
                  rows={2}
                  maxLength={80}
                  value={arrow.label}
                  placeholder={parentLabelClean ? `Ответвление от «${parentLabelClean}»` : 'По умолчанию наследует основной поток'}
                  onChange={(e) => store.updateArrow(arrow.id, { label: e.target.value })}
                  data-testid="input-arrow-label"
                />
                <span style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)', marginTop: '2px', display: 'block' }}>
                  Если оставить пустым, на диаграмме действует наименование родительского потока.
                </span>
              </div>
            </>
          ) : (
            /* Normal Stream Name */
            <div className="form-group">
              <label className="form-label">
                Название потока <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({arrow.label.length}/80)</span>
              </label>
              <AutoResizingTextarea
                rows={2}
                maxLength={80}
                value={arrow.label}
                placeholder="Например, Заявка на закупку"
                onChange={(e) => store.updateArrow(arrow.id, { label: e.target.value })}
                data-testid="input-arrow-label"
              />
            </div>
          )}
  
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" style={{ margin: 0 }}>Роль</label>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color:
                    arrow.role === 'control' ? '#7c3aed' :
                    arrow.role === 'mechanism' ? '#059669' :
                    arrow.role === 'output' ? '#d97706' : '#2563eb',
                  background:
                    arrow.role === 'control' ? 'rgba(124, 58, 237, 0.1)' :
                    arrow.role === 'mechanism' ? 'rgba(5, 150, 105, 0.1)' :
                    arrow.role === 'output' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
                data-testid="badge-arrow-role"
              >
                {arrow.role === 'control' ? 'Управление' :
                 arrow.role === 'mechanism' ? 'Механизм' :
                 arrow.role === 'output' ? 'Выход' : 'Вход'}
              </span>
            </div>
          </div>
  
          {/* Source Endpoint Selector */}
          {(() => {
            const getSourceValue = () => {
              if (arrow.source.type === 'unattached') return 'unattached';
              if (arrow.source.type === 'junction') {
                const junc = diag.junctions.find(j => j.id === arrow.source.id);
                return junc ? `junction:branch:${junc.parentArrowId}` : 'unattached';
              }
              if (arrow.source.type === 'border') return `border:${arrow.source.side || 'left'}`;
              return `block:${arrow.source.id}:${arrow.source.side || 'right'}`;
            };
  
            const getTargetValue = () => {
              if (arrow.target.type === 'unattached') return 'unattached';
              if (arrow.target.type === 'junction') {
                const junc = diag.junctions.find(j => j.id === arrow.target.id);
                return junc ? `junction:merge:${junc.parentArrowId}` : 'unattached';
              }
              if (arrow.target.type === 'border') return `border:${arrow.target.side || 'right'}`;
              return `block:${arrow.target.id}:${arrow.target.side || 'left'}`;
            };
  
            const getSourceBadge = () => {
              if (arrow.source.type === 'unattached') {
                return { label: 'Не привязана', color: 'var(--danger, #ef4444)', bg: 'rgba(239, 68, 68, 0.1)' };
              }
              if (arrow.source.type === 'junction') {
                return { label: 'Разветвление', color: 'var(--accent-primary, #2563eb)', bg: 'rgba(37, 99, 235, 0.1)' };
              }
              if (arrow.source.type === 'block') {
                return { label: 'Блок', color: 'var(--success, #059669)', bg: 'rgba(5, 150, 105, 0.1)' };
              }
              return { label: 'Граница', color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)' };
            };
  
            const getTargetBadge = () => {
              if (arrow.target.type === 'unattached') {
                return { label: 'Не привязана', color: 'var(--danger, #ef4444)', bg: 'rgba(239, 68, 68, 0.1)' };
              }
              if (arrow.target.type === 'junction') {
                return { label: 'Слияние', color: 'var(--accent-primary, #2563eb)', bg: 'rgba(37, 99, 235, 0.1)' };
              }
              if (arrow.target.type === 'block') {
                return { label: 'Блок', color: 'var(--success, #059669)', bg: 'rgba(5, 150, 105, 0.1)' };
              }
              return { label: 'Граница', color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)' };
            };
  
            const sourceOptions = [
              {
                group: 'Блоки',
                items: diag.blocks.map((b) => ({
                  key: `block:${b.id}:right`,
                  icon: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#059669' }}>
                      <Box size={13} />
                      <ArrowRight size={13} />
                    </div>
                  ),
                  label: getBlockCode(diag.code, b.nodeNumber),
                  sublabel: 'Выход',
                })),
              },
              {
                group: 'Разветвления',
                items: diag.arrows
                  .filter(a => a.id !== arrow.id && a.source.type !== 'junction')
                  .map(a => {
                    const name = getArrowDisplayName(a, diag);
                    return {
                      key: `junction:branch:${a.id}`,
                      icon: <GitMerge size={13} color="#2563eb" />,
                      label: name,
                      sublabel: 'ветвь',
                    };
                  }),
              },
              {
                group: 'Границы',
                items: [
                  {
                    key: 'border:left',
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                        <Square size={13} />
                        <ArrowRight size={13} />
                      </div>
                    ),
                    label: 'Левая граница',
                    sublabel: 'Вход',
                  },
                  {
                    key: 'border:top',
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                        <Square size={13} />
                        <ArrowDown size={13} />
                      </div>
                    ),
                    label: 'Верхняя граница',
                    sublabel: 'Управление',
                  },
                  {
                    key: 'border:bottom',
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                        <Square size={13} />
                        <ArrowUp size={13} />
                      </div>
                    ),
                    label: 'Нижняя граница',
                    sublabel: 'Механизм',
                  },
                ],
              },
              {
                group: 'Статус',
                items: [
                  {
                    key: 'unattached',
                    icon: <Unlink size={13} color="#ef4444" />,
                    label: 'Не привязана',
                    disabled: arrow.target.type === 'unattached',
                  },
                ],
              },
            ];
  
            const targetOptions = [
              {
                group: 'Блоки',
                items: diag.blocks.flatMap((b) => [
                  {
                    key: `block:${b.id}:left`,
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#2563eb' }}>
                        <Box size={13} />
                        <ArrowRight size={13} />
                      </div>
                    ),
                    label: getBlockCode(diag.code, b.nodeNumber),
                    sublabel: 'Вход',
                  },
                  {
                    key: `block:${b.id}:top`,
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#7c3aed' }}>
                        <Box size={13} />
                        <ArrowDown size={13} />
                      </div>
                    ),
                    label: getBlockCode(diag.code, b.nodeNumber),
                    sublabel: 'Управление',
                  },
                  {
                    key: `block:${b.id}:bottom`,
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#059669' }}>
                        <Box size={13} />
                        <ArrowUp size={13} />
                      </div>
                    ),
                    label: getBlockCode(diag.code, b.nodeNumber),
                    sublabel: 'Механизм',
                  },
                ]),
              },
              {
                group: 'Слияния',
                items: diag.arrows
                  .filter(a => a.id !== arrow.id && a.target.type !== 'junction')
                  .map(a => {
                    const name = getArrowDisplayName(a, diag);
                    return {
                      key: `junction:merge:${a.id}`,
                      icon: <GitFork size={13} color="#2563eb" />,
                      label: name,
                      sublabel: 'слияние',
                    };
                  }),
              },
              {
                group: 'Границы',
                items: [
                  {
                    key: 'border:right',
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                        <Square size={13} />
                        <ArrowRight size={13} />
                      </div>
                    ),
                    label: 'Правая граница',
                    sublabel: 'Выход',
                  },
                  {
                    key: 'border:top',
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                        <Square size={13} />
                        <ArrowUp size={13} />
                      </div>
                    ),
                    label: 'Верхняя граница',
                    sublabel: 'Выход',
                  },
                  {
                    key: 'border:bottom',
                    icon: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b' }}>
                        <Square size={13} />
                        <ArrowDown size={13} />
                      </div>
                    ),
                    label: 'Нижняя граница',
                    sublabel: 'Выход',
                  },
                ],
              },
              {
                group: 'Статус',
                items: [
                  {
                    key: 'unattached',
                    icon: <Unlink size={13} color="#ef4444" />,
                    label: 'Не привязана',
                    disabled: arrow.source.type === 'unattached',
                  },
                ],
              },
            ];
  
            return (
              <>
                <EndpointDropdown
                  label="Источник"
                  value={getSourceValue()}
                  onChange={(newKey) => store.setArrowEndpointKey(arrow.id, 'source', newKey)}
                  statusBadge={getSourceBadge()}
                  options={sourceOptions}
                  dataTestId="select-arrow-source"
                />
  
                <EndpointDropdown
                  label="Приёмник"
                  value={getTargetValue()}
                  onChange={(newKey) => store.setArrowEndpointKey(arrow.id, 'target', newKey)}
                  statusBadge={getTargetBadge()}
                  options={targetOptions}
                  dataTestId="select-arrow-target"
                />
              </>
            );
          })()}
  
          <div className="form-group">
            <label className="form-label">Цвет ветки потока (Ствол + Ответвления)</label>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Классический черный', color: '#1e293b' },
                { label: 'Сапфировый синий', color: '#2563eb' },
                { label: 'Изумрудный зеленый', color: '#059669' },
                { label: 'Рубиновый красный', color: '#dc2626' },
                { label: 'Фиолетовый', color: '#7c3aed' },
                { label: 'Янтарный охра', color: '#d97706' },
                { label: 'Морской циан', color: '#0891b2' },
                { label: 'Малиновый', color: '#db2777' },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => store.setFlowFamilyColor(arrow.id, c.color)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: c.color,
                    border: (arrow.color || '#1e293b') === c.color ? '2px solid #ffffff' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    boxShadow: (arrow.color || '#1e293b') === c.color ? '0 0 0 2px var(--accent-primary)' : 'none',
                  }}
                  title={c.label}
                  data-testid={`flow-color-${c.color.replace('#', '')}`}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Туннелирование стрелки (IDEF0)
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400, marginTop: '2px' }}>
                Круглые скобки ( ) скрывают поток на родительской или дочерней диаграмме
              </span>
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`btn-tool ${arrow.tunnelSource ? 'active' : ''}`}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: arrow.tunnelSource ? 'rgba(37, 99, 235, 0.15)' : undefined,
                  borderColor: arrow.tunnelSource ? 'var(--accent-primary)' : undefined,
                  fontWeight: arrow.tunnelSource ? 600 : 400,
                  fontSize: '12px',
                  padding: '6px 8px',
                }}
                onClick={() => store.toggleArrowTunnel(arrow.id, 'source')}
                title="Исток (откуда выходит поток): ( ) на начале стрелки означает, что поток скрыт на родительской диаграмме"
                data-testid="btn-toggle-tunnel-source"
              >
                ( Исток ) {arrow.tunnelSource ? '✓' : ''}
              </button>
              <button
                className={`btn-tool ${arrow.tunnelTarget ? 'active' : ''}`}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: arrow.tunnelTarget ? 'rgba(37, 99, 235, 0.15)' : undefined,
                  borderColor: arrow.tunnelTarget ? 'var(--accent-primary)' : undefined,
                  fontWeight: arrow.tunnelTarget ? 600 : 400,
                  fontSize: '12px',
                  padding: '6px 8px',
                }}
                onClick={() => store.toggleArrowTunnel(arrow.id, 'target')}
                title="Сток (куда входит стрелка): ( ) у наконечника означает, что поток не продолжается на дочерней декомпозиции"
                data-testid="btn-toggle-tunnel-target"
              >
                ( Сток ) {arrow.tunnelTarget ? '✓' : ''}
              </button>
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label
              className="checkbox-label"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '2px 0',
              }}
            >
              <input
                type="checkbox"
                checked={!!arrow.pinned}
                onChange={(e) => {
                  store.setArrowPinned(arrow.id, e.target.checked);
                }}
                data-testid="checkbox-pin-arrow"
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 500, fontSize: '12px' }}>
                Закрепить
              </span>
            </label>
  
            <label
              className="checkbox-label"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: hasLabelText ? 'pointer' : 'not-allowed',
                opacity: hasLabelText ? 1 : 0.5,
                userSelect: 'none',
                padding: '2px 0',
              }}
              title={!hasLabelText ? 'Для показа выноски необходимо указать название стрелки' : undefined}
            >
              <input
                type="checkbox"
                disabled={!hasLabelText}
                checked={!!arrow.showLeader && !!hasLabelText}
                onChange={() => {
                  if (hasLabelText) {
                    store.toggleLeader(arrow.id);
                  }
                }}
                data-testid="checkbox-leader"
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--accent-primary)',
                  cursor: hasLabelText ? 'pointer' : 'not-allowed',
                }}
              />
              <span style={{ fontWeight: 500, fontSize: '12px' }}>
                Показать выноску
              </span>
            </label>
          </div>
  
          <div className="form-group">
            <label className="form-label">Действия</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                className="btn-tool"
                style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.4)', justifyContent: 'center' }}
                onClick={() => store.deleteArrow(arrow.id)}
                data-testid="btn-delete-arrow"
              >
                <Trash2 size={13} />
                <span>Удалить</span>
              </button>
            </div>
          </div>
  
          {/* Segments and Bends Manager */}
          <ArrowSegmentsList arrow={arrow} />
        </div>
      );
};
export default ArrowInspector;
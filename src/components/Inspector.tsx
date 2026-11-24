import React, { useState, useEffect, useRef } from 'react';
import { Sliders, X } from 'lucide-react';
import { store } from '../core/store';
import { EditorState } from '../core/store/types';
import { Arrow, Block, Diagram } from '../types/idef0';
import ProjectInspector from './inspector/ProjectInspector';
import BlockInspector from './inspector/BlockInspector';
import ArrowInspector from './inspector/ArrowInspector';

interface InspectorProps {
  state: EditorState;
}

export const Inspector: React.FC<InspectorProps> = ({ state }) => {
  const { project, activeDiagramId, selectedObjectId, selectedObjectType, rightPanelOpen } = state;
  const diagrams = project?.diagrams || [];
  const diag = diagrams.find((d: Diagram) => d.id === activeDiagramId);
  const [panelWidth, setPanelWidth] = useState(340);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const isResizing = useRef(false);

  const toggleSection = (role: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [role]: !prev[role],
    }));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        const newW = Math.max(280, Math.min(650, window.innerWidth - e.clientX));
        setPanelWidth(newW);
      }
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!diag) return null;

  const selectedBlock =
    selectedObjectType === 'block'
      ? diag.blocks.find((b: Block) => b.id === selectedObjectId)
      : undefined;
  const selectedArrow =
    selectedObjectType === 'arrow'
      ? diag.arrows.find((a: Arrow) => a.id === selectedObjectId)
      : undefined;

  const titleText = selectedBlock ? 'Блок' : selectedArrow ? 'Стрелка' : 'Проект';

  return (
    <aside
      className={`side-panel right${!rightPanelOpen ? ' collapsed' : ''}`}
      style={{ width: rightPanelOpen ? `${panelWidth}px` : 0 }}
      data-testid="inspector-panel"
    >
      {rightPanelOpen && (
        <div
          className="panel-resize-handle left-edge"
          onMouseDown={(e) => {
            e.preventDefault();
            isResizing.current = true;
            document.body.style.cursor = 'ew-resize';
          }}
          title="Изменить ширину"
          data-testid="resize-handle-right"
        />
      )}

      <div className="panel-header">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sliders size={14} />
          <span>{titleText}</span>
        </span>
        <button
          className="btn-icon"
          onClick={() => store.toggleRightPanel()}
          title="Скрыть панель"
          data-testid="btn-collapse-right"
        >
          <X size={15} />
        </button>
      </div>

      {selectedBlock ? (
        <BlockInspector
          block={selectedBlock}
          state={state}
          collapsedSections={collapsedSections}
          toggleSection={toggleSection}
        />
      ) : selectedArrow ? (
        <ArrowInspector arrow={selectedArrow} state={state} />
      ) : (
        <ProjectInspector state={state} />
      )}
    </aside>
  );
};

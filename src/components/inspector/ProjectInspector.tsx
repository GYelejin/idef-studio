import React from "react";
import { store, EditorState } from "../../core/store";
import AutoResizingTextarea from "./AutoResizingTextarea";

interface ProjectInspectorProps {
  state: EditorState;
}

export const ProjectInspector: React.FC<ProjectInspectorProps> = ({ state }) => {
  const { project, activeDiagramId } = state;
  const diag = project.diagrams.find((d) => d.id === activeDiagramId);
  return (
      <div className="panel-body" data-testid="inspector-project-view">
        <div className="form-group">
          <label className="form-label">Название</label>
          <input
            type="text"
            className="form-input"
            value={project.name}
            onChange={(e) => store.updateProjectMeta(e.target.value, project.description)}
            data-testid="input-project-name"
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Описание</label>
          <AutoResizingTextarea
            rows={3}
            maxLength={300}
            value={project.description}
            onChange={(e) => store.updateProjectMeta(project.name, e.target.value)}
            data-testid="input-project-desc"
          />
        </div>
  
        <div className="form-group">
          <label className="form-label">Диаграмма</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontWeight: 700,
                padding: '4px 8px',
                background: 'var(--bg-card)',
                borderRadius: '4px',
              }}
            >
              {diag.code}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{diag.title}</span>
          </div>
        </div>
      </div>
    );
};
export default ProjectInspector;
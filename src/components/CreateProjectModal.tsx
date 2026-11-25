import React from 'react';
import { FilePlus, X } from 'lucide-react';

interface CreateProjectModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onConfirm }) => (
  <div
    className="modal-backdrop"
    data-testid="new-project-modal"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.55)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(2px)',
    }}
  >
    <div
      className="modal-dialog"
      style={{
        width: '100%',
        maxWidth: '480px',
        background: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      <div
        className="modal-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-panel-header)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 600,
            fontSize: '15px',
            color: 'var(--text-primary)',
          }}
        >
          <FilePlus size={18} color="var(--accent-primary)" />
          <span>Создать новый проект</span>
        </div>
        <button
          className="btn-icon"
          onClick={onClose}
          data-testid="btn-close-new-project-modal"
          title="Закрыть"
        >
          <X size={16} />
        </button>
      </div>
      <div
        className="modal-body"
        style={{
          padding: '20px',
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
        }}
      >
        <p
          style={{
            margin: '0 0 8px 0',
            fontSize: '14px',
            color: 'var(--text-primary)',
            fontWeight: 500,
          }}
        >
          Вы действительно хотите создать новый проект?
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
          Все несохраненные изменения текущей модели будут удалены. Будет инициализирован
          чистый проект с контекстной диаграммой.
        </p>
      </div>
      <div
        className="modal-footer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px',
          padding: '14px 20px',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-panel-header)',
        }}
      >
        <button
          className="btn"
          onClick={onClose}
          data-testid="btn-cancel-new-project"
          style={{ padding: '7px 16px', fontSize: '13px' }}
        >
          Отмена
        </button>
        <button
          className="btn btn-primary"
          onClick={onConfirm}
          data-testid="btn-confirm-new-project"
          style={{ padding: '7px 18px', fontSize: '13px' }}
        >
          Создать проект
        </button>
      </div>
    </div>
  </div>
);

export default CreateProjectModal;

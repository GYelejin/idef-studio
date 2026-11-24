import React from 'react';
import { X, Keyboard, HelpCircle, BookOpen } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

const shortcuts = [
  { key: '1 или V', label: 'Инструмент «Указатель» (выбор и перемещение блоков)' },
  { key: '2 или B', label: 'Инструмент «Блок» (создание функционального блока)' },
  { key: '3 или A', label: 'Инструмент «Стрелка» (проведение связей и потоков)' },
  { key: '4 или L', label: 'Инструмент «Метка и выноска» (перемещение метки и линия выноски)' },
  { key: 'Ctrl + Z', label: 'Отменить последнее действие' },
  { key: 'Ctrl + Y / Ctrl + Shift + Z', label: 'Повторить отмененное действие' },
  { key: 'Delete / Backspace', label: 'Удалить выбранный блок или стрелку' },
  { key: 'Двойной клик', label: 'Быстрое редактирование текста блока или стрелки на холсте' },
  { key: 'Ctrl + Колесико мыши', label: 'Плавное масштабирование холста' },
  { key: 'Колесико мыши', label: 'Вертикальная прокрутка холста / панели' },
  { key: 'Escape', label: 'Сброс выбора / закрытие модальных окон' },
  { key: '?', label: 'Открыть эту справку по горячим клавишам' },
];

const icomRules = [
  { role: 'Вход (слева)', desc: 'Материалы, информация или сырье, преобразуемые функцией в выход.' },
  { role: 'Управление (сверху)', desc: 'Правила, регламенты, стандарты, управляющие выполнением функции.' },
  { role: 'Выход (справа)', desc: 'Результат выполнения функции (готовая продукция, отчеты, статус).' },
  { role: 'Механизм (снизу)', desc: 'Ресурсы, исполняющие функцию (персонал, оборудование, ПО).' },
];

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="modal-backdrop" data-testid="help-modal">
      <div className="modal-dialog" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={16} />
            <span>Справка и горячие клавиши IDEF0</span>
          </span>
          <button className="btn-icon" onClick={onClose} data-testid="btn-close-help-modal">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Section: Shortcuts */}
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '13px',
                marginBottom: '10px',
              }}
            >
              <Keyboard size={15} />
              <span>Горячие клавиши</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
              {shortcuts.map(({ key, label }) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  <kbd
                    style={{
                      background: 'var(--bg-panel-header)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Section: ICOM Principle */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
                fontSize: '13px',
                marginBottom: '10px',
              }}
            >
              <BookOpen size={15} />
              <span>Семантика потоков стандарта IDEF0</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
              {icomRules.map(({ role, desc }) => (
                <div
                  key={role}
                  style={{
                    padding: '8px 10px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: 'var(--accent-primary)',
                      marginBottom: '2px',
                    }}
                  >
                    {role}
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

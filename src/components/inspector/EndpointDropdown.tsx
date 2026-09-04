import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";

interface EndpointDropdownProps {
  label: string;
  value: string;
  onChange: (key: string) => void;
  statusBadge?: { label: string; color: string; bg: string };
  options: {
    group: string;
    items: {
      key: string;
      icon: React.ReactNode;
      label: string;
      sublabel?: string;
      disabled?: boolean;
    }[];
  }[];
  dataTestId: string;
}

const EndpointDropdown: React.FC<EndpointDropdownProps> = ({
  label,
  value,
  onChange,
  statusBadge,
  options,
  dataTestId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  let selectedItem: { key: string; icon: React.ReactNode; label: string; sublabel?: string } | null = null;
  for (const group of options) {
    for (const item of group.items) {
      if (item.key === value) {
        selectedItem = item;
        break;
      }
    }
    if (selectedItem) break;
  }

  return (
    <div className="form-group" ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <label className="form-label" style={{ margin: 0 }}>{label}</label>
        {statusBadge && (
          <span style={{ fontSize: '10px', color: statusBadge.color, fontWeight: 600, background: statusBadge.bg, padding: '1px 6px', borderRadius: '4px' }}>
            {statusBadge.label}
          </span>
        )}
      </div>

      <button
        type="button"
        className="form-input"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          padding: '6px 10px',
          textAlign: 'left',
          background: 'var(--bg-input, #ffffff)',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', flex: 1 }}>
          {selectedItem?.icon}
          <span style={{ fontWeight: 500, fontSize: '12px', color: 'var(--text-primary, #0f172a)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedItem?.label || 'Выберите...'}
          </span>
          {selectedItem?.sublabel && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)', whiteSpace: 'nowrap' }}>
              ({selectedItem.sublabel})
            </span>
          )}
        </div>
        <ChevronDown size={14} style={{ color: 'var(--text-muted, #64748b)', flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {/* Hidden Native Select for test compatibility */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={dataTestId}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0, margin: 0, padding: 0 }}
        tabIndex={-1}
      >
        {options.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.items.map((item) => (
              <option key={item.key} value={item.key} disabled={item.disabled}>
                {item.label} {item.sublabel ? `(${item.sublabel})` : ''}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'var(--bg-panel, #ffffff)',
            border: '1px solid var(--border-color, #cbd5e1)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            maxHeight: '260px',
            overflowY: 'auto',
            padding: '4px',
          }}
        >
          {options.map((group) => (
            <div key={group.group} style={{ marginBottom: '6px' }}>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text-muted, #64748b)',
                  padding: '4px 8px 2px 8px',
                }}
              >
                {group.group}
              </div>
              {group.items.map((item) => {
                const isSelected = item.key === value;
                return (
                  <div
                    key={item.key}
                    onClick={() => {
                      if (!item.disabled) {
                        onChange(item.key);
                        setIsOpen(false);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      opacity: item.disabled ? 0.45 : 1,
                      background: isSelected ? 'var(--bg-hover, #eff6ff)' : 'transparent',
                      color: isSelected ? 'var(--accent-primary, #2563eb)' : 'var(--text-primary, #0f172a)',
                    }}
                    onMouseEnter={(e) => {
                      if (!item.disabled && !isSelected) {
                        e.currentTarget.style.background = 'var(--bg-hover, #f8fafc)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!item.disabled && !isSelected) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', flex: 1 }}>
                      {item.icon}
                      <span style={{ fontSize: '12px', fontWeight: isSelected ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.label}
                      </span>
                      {item.sublabel && (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)' }}>
                          {item.sublabel}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check size={14} color="#2563eb" style={{ flexShrink: 0 }} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EndpointDropdown;
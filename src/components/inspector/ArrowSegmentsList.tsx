import React from 'react';
import { Trash2 } from 'lucide-react';
import { Arrow } from '../../types/idef0';
import { getSegmentsFromPoints } from '../../core/geometry';
import { store } from '../../core/store';

interface ArrowSegmentsListProps {
  arrow: Arrow;
}

const ArrowSegmentsList: React.FC<ArrowSegmentsListProps> = ({ arrow }) => {
  const segs = getSegmentsFromPoints(arrow.points || [], arrow.id, arrow.source.side, arrow.target.side);

  return (
    <div className="form-group" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label className="form-label" style={{ margin: 0, fontWeight: 600 }}>
          Сегменты ({segs.length})
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {segs.map((seg, sIdx) => {
          const isStart = sIdx === 0;
          const isEnd = sIdx === segs.length - 1;
          const isIntermediate = !isStart && !isEnd;
          const isHoriz = seg.orientation === 'horizontal';

          return (
            <div
              key={sIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                fontSize: '11px',
              }}
              data-testid={`arrow-segment-row-${sIdx}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: isIntermediate ? '2px' : '50%',
                    background: isStart ? '#10b981' : isEnd ? '#ef4444' : '#2563eb',
                    display: 'inline-block',
                  }}
                />
                <div>
                  <span style={{ fontWeight: 600 }}>
                    {isStart ? 'Вход' : isEnd ? 'Выход' : `Изгиб #${sIdx}`}
                  </span>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {isHoriz ? `Y=${seg.start.y}` : `X=${seg.start.x}`}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '10px' }}>
                  {isHoriz ? `${seg.start.x}..${seg.end.x}` : `${seg.start.y}..${seg.end.y}`}
                </span>

                {isIntermediate && (
                  <button
                    className="btn-icon"
                    style={{ width: '22px', height: '22px', color: 'var(--danger)', padding: '2px' }}
                    title="Удалить промежуточный отрезок"
                    onClick={() => store.removeArrowSegment(arrow.id, sIdx)}
                    data-testid={`btn-remove-segment-${sIdx}`}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArrowSegmentsList;

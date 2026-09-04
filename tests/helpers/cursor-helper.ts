import { Page } from 'playwright';

export async function injectVisibleCursor(page: Page) {
  await page.addInitScript(() => {
    function ensureCursor() {
      let cursor = document.getElementById('visible-mouse-cursor');
      if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'visible-mouse-cursor';
        cursor.style.position = 'fixed';
        cursor.style.top = '0';
        cursor.style.left = '0';
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '2147483647';
        cursor.style.transform = 'translate(-4px, -2px)';
        cursor.style.transition = 'none';
        cursor.innerHTML = `
          <svg width="30" height="30" viewBox="0 0 24 24" style="position: absolute; top: 0; left: 0; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.7)); pointer-events: none;">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35z" fill="#dc2626" stroke="#ffffff" stroke-width="1.8"/>
            <circle cx="5.5" cy="3.5" r="2.5" fill="#facc15" stroke="#ffffff" stroke-width="0.8"/>
          </svg>
          <div id="cursor-click-ring" style="position: absolute; top: -14px; left: -14px; width: 40px; height: 40px; border-radius: 50%; border: 3px solid #ef4444; background: rgba(239, 68, 68, 0.25); opacity: 0; transform: scale(0.2); transition: transform 0.22s ease-out, opacity 0.22s ease-out; pointer-events: none;"></div>
        `;
        (document.body || document.documentElement).appendChild(cursor);
      }
      return cursor;
    }

    window.addEventListener('DOMContentLoaded', ensureCursor);

    window.addEventListener('mousemove', (e) => {
      const cursor = ensureCursor();
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }, true);

    window.addEventListener('mousedown', () => {
      const cursor = ensureCursor();
      const ring = document.getElementById('cursor-click-ring');
      if (ring) {
        ring.style.opacity = '1';
        ring.style.transform = 'scale(1.5)';
      }
    }, true);

    window.addEventListener('mouseup', () => {
      const cursor = ensureCursor();
      const ring = document.getElementById('cursor-click-ring');
      if (ring) {
        ring.style.opacity = '0';
        ring.style.transform = 'scale(0.2)';
      }
    }, true);
  });
}

'use client';

import { useState } from 'react';
import { T } from './tokens';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open articles menu"
        style={{
          position: 'fixed',
          top: 14,
          left: 14,
          zIndex: 50,
          background: 'rgba(243,232,202,0.92)',
          border: `1px solid ${T.blue}`,
          padding: '6px 8px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 18, height: 1.5, background: T.blue }} />
        ))}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            background: 'transparent',
          }}
        />
      )}

      {/* Slide-out panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 220,
        zIndex: 45,
        background: 'rgba(237,226,188,0.97)',
        borderRight: `2px solid ${T.blue}`,
        transform: `translateX(${open ? 0 : -224}px)`,
        transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: open ? '4px 0 18px rgba(24,56,90,0.12)' : 'none',
      }}>
        {/* Panel header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 14px 10px',
          borderBottom: `1px solid ${T.blue}44`,
        }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.blue, letterSpacing: 2 }}>
            ▸ ARTICLES
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: T.mono,
              fontSize: 13,
              color: T.blue,
              padding: '0 2px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Panel body */}
        <div style={{ padding: '16px 14px', flex: 1, overflow: 'auto' }}>
          <p style={{ fontFamily: T.body, fontSize: 12, color: T.ink2, fontStyle: 'italic', lineHeight: 1.6 }}>
            No articles yet.
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 14px', borderTop: `1px solid ${T.blue}33` }}>
          <span style={{ fontFamily: T.mono, fontSize: 8, color: T.fade, letterSpacing: 1 }}>
            SHANNONWARE · ARTICLE ARCHIVE
          </span>
        </div>
      </div>
    </>
  );
}

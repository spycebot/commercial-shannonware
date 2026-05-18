'use client';

import { useState } from 'react';
import { T } from './tokens';

export default function GearMenu() {
  const [open, setOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <>
      {/* Gear button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open settings panel"
        style={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 50,
          background: 'rgba(243,232,202,0.92)',
          border: `1px solid ${T.blue}`,
          padding: '5px 8px',
          cursor: 'pointer',
          fontFamily: T.mono,
          fontSize: 14,
          color: T.blue,
          lineHeight: 1,
        }}
      >
        ⚙
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
        right: 0,
        bottom: 0,
        width: 220,
        zIndex: 45,
        background: 'rgba(237,226,188,0.97)',
        borderLeft: `2px solid ${T.blue}`,
        transform: `translateX(${open ? 0 : 224}px)`,
        transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: open ? '-4px 0 18px rgba(24,56,90,0.12)' : 'none',
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
            ⚙ SETTINGS
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close settings"
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
        <div style={{ padding: '14px', flex: 1, overflow: 'auto' }}>

          {/* Operator section */}
          <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 10 }}>
            OPERATOR
          </div>
          <button style={{
            fontFamily: T.body,
            fontSize: 12,
            color: T.ink,
            border: `1px solid ${T.blue}`,
            background: 'rgba(243,232,202,0.7)',
            padding: '6px 12px',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            marginBottom: 14,
          }}>
            Sign in with Google
          </button>

          <hr style={{ border: 'none', borderTop: `1px solid ${T.blue}44`, marginBottom: 14 }} />

          {/* Navigation links */}
          <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 10 }}>
            NAVIGATE
          </div>
          {[
            { label: 'Impressum', href: '#impressum' },
            { label: 'Contact',   href: '#contact'   },
            { label: 'Terms',     href: '#terms'      },
            { label: 'Privacy Policy', href: '#privacy' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: T.body,
                fontSize: 12,
                color: T.ink,
                textDecoration: 'none',
                padding: '5px 0',
                borderBottom: `1px solid ${T.ink}11`,
              }}
            >
              {label}
            </a>
          ))}

          <hr style={{ border: 'none', borderTop: `1px solid ${T.blue}44`, margin: '14px 0' }} />

          {/* Accessibility */}
          <div style={{ fontFamily: T.mono, fontSize: 8, color: T.blue, letterSpacing: 2, marginBottom: 10 }}>
            ACCESSIBILITY
          </div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: T.body,
            fontSize: 12,
            color: T.ink,
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={reduceMotion}
              onChange={e => setReduceMotion(e.target.checked)}
              style={{ accentColor: T.blue }}
            />
            Reduce motion
          </label>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 14px', borderTop: `1px solid ${T.blue}33` }}>
          <span style={{ fontFamily: T.mono, fontSize: 8, color: T.fade, letterSpacing: 1 }}>
            SHANNONWARE · BUILD 2.0.0
          </span>
        </div>
      </div>
    </>
  );
}

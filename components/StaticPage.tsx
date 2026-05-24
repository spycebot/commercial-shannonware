'use client';

import Link from 'next/link';
import { T, PAPER } from './tokens';
import type { ReactNode } from 'react';

interface Props {
  label: string;
  title: string;
  children: ReactNode;
}

export default function StaticPage({ label, title, children }: Props) {
  return (
    <div style={{ ...PAPER, minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Top bar */}
      <div style={{
        borderBottom: `2px solid ${T.blue}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.blue,
          textDecoration: 'none',
          letterSpacing: 2,
        }}>
          ← SHANNONWARE
        </Link>
        <span style={{ fontFamily: T.mono, fontSize: 9, color: T.fade, letterSpacing: 2 }}>
          {label}
        </span>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{
          fontFamily: T.mono,
          fontSize: 22,
          color: T.blue,
          letterSpacing: 3,
          borderBottom: `1px solid ${T.blue}44`,
          paddingBottom: 12,
          marginBottom: 32,
          textTransform: 'uppercase',
        }}>
          {title}
        </h1>
        <div style={{
          fontFamily: T.body,
          fontSize: 14,
          color: T.ink,
          lineHeight: 1.8,
        }}>
          {children}
        </div>
      </div>

      {/* Footer links */}
      <div style={{
        borderTop: `1px solid ${T.blue}33`,
        padding: '16px 24px',
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'Impressum', href: '/impressum' },
          { label: 'Contact',   href: '/contact'   },
          { label: 'Terms',     href: '/terms'      },
          { label: 'Privacy',   href: '/privacy'    },
        ].map(({ label, href }) => (
          <Link key={href} href={href} style={{
            fontFamily: T.mono,
            fontSize: 9,
            color: T.fade,
            textDecoration: 'none',
            letterSpacing: 1,
          }}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

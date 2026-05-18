'use client';

import { useState, useEffect } from 'react';
import { T } from './tokens';

interface SlideAlertProps {
  side?: 'left' | 'right';
  yPct?: string;
  text: string;
  sub?: string;
  delay?: number;
  accent?: string;
}

export default function SlideAlert({ side = 'right', yPct = '30%', text, sub, delay = 0, accent = T.amber }: SlideAlertProps) {
  const [state, setState] = useState<'pre' | 'in' | 'out'>('pre');

  useEffect(() => {
    const t1 = setTimeout(() => setState('in'),  delay);
    const t2 = setTimeout(() => setState('out'), delay + 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [delay]);

  const W = 148;
  const off = side === 'right' ? W + 4 : -(W + 4);
  const tx = state === 'in' ? 0 : off;

  return (
    <div style={{
      position: 'fixed',
      top: yPct,
      [side]: 0,
      width: W,
      transform: `translateX(${tx}px)`,
      transition: state === 'in'
        ? 'transform 0.52s cubic-bezier(0.22,1,0.36,1)'
        : 'transform 0.44s cubic-bezier(0.55,0,1,0.45)',
      zIndex: 20,
      pointerEvents: 'none',
    }}>
      <div style={{
        margin: 3,
        border: `1px solid ${accent}`,
        borderLeft:  side === 'left'  ? `2px solid ${accent}` : undefined,
        borderRight: side === 'right' ? `2px solid ${accent}` : undefined,
        background: 'rgba(243,232,202,0.93)',
        padding: '6px 9px',
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: accent, letterSpacing: 1.5, marginBottom: 2 }}>
          {text}
        </div>
        {sub && (
          <div style={{ fontFamily: T.body, fontSize: 10, color: T.fade }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

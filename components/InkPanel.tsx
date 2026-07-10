'use client';

import { useState, useEffect } from 'react';
import { useTypewriter, useReducedMotion } from './hooks';
import { T, FS } from './tokens';

const PH = { WAIT: 0, GROW: 1, TYPE: 2, DONE: 3 } as const;
type Phase = typeof PH[keyof typeof PH];

interface InkPanelProps {
  title: string;
  text: string;
  delay?: number;
  accent?: string;
  active?: boolean;
}

export default function InkPanel({ title, text, delay = 0, accent = T.blue, active = true }: InkPanelProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(PH.WAIT);
  const [sy, setSy] = useState(0);
  const [typed, done] = useTypewriter(text, phase === PH.TYPE || (reduced && phase !== PH.WAIT), 17);

  useEffect(() => {
    if (reduced) {
      if (active) setPhase(PH.TYPE);
      return;
    }
    if (!active) return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === PH.WAIT) t = setTimeout(() => setPhase(PH.GROW), delay);
    else if (phase === PH.GROW) t = setTimeout(() => setPhase(PH.TYPE), 450);
    else if (phase === PH.TYPE && done) setPhase(PH.DONE);
    return () => clearTimeout(t);
  }, [phase, done, delay, active, reduced]);

  useEffect(() => {
    if (phase === PH.GROW) requestAnimationFrame(() => setSy(1));
  }, [phase]);

  if (phase === PH.WAIT) return null;

  const growStyle: React.CSSProperties = reduced
    ? {}
    : {
        transform: `scaleY(${sy})`,
        transformOrigin: 'top',
        transition: phase === PH.GROW ? 'transform 0.44s cubic-bezier(0.22,1,0.36,1)' : 'none',
      };

  return (
    <div style={{
      ...growStyle,
      border: `1px solid ${accent}`,
      flex: '1 1 155px',
      minWidth: 155,
      background: 'rgba(244,234,204,0.5)',
    }}>
      <div style={{
        borderBottom: `1px solid ${accent}`,
        padding: '3px 8px',
        background: `${accent}11`,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <div style={{ width: 4, height: 4, background: accent, flexShrink: 0 }} />
        <span style={{ fontFamily: T.mono, fontSize: FS.label, color: accent, letterSpacing: 2 }}>
          {title}
        </span>
      </div>
      <div style={{ padding: '7px 10px' }}>
        <pre style={{
          fontFamily: T.body,
          fontSize: FS.detail,
          color: T.ink,
          lineHeight: 1.65,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}>
          {reduced || phase === PH.DONE ? text : typed}
          {phase === PH.TYPE && !done && !reduced && (
            <span style={{
              display: 'inline-block',
              width: 6,
              height: FS.detail,
              background: T.ink,
              marginLeft: 1,
              verticalAlign: 'middle',
              animation: 'blink 0.65s step-end infinite',
            }} />
          )}
        </pre>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useTypewriter, useReducedMotion } from './hooks';

interface TypedProps {
  text: string;
  delay?: number;
  speed?: number;
  active?: boolean;
  style?: React.CSSProperties;
}

export default function Typed({ text, delay = 0, speed = 22, active = true, style = {} }: TypedProps) {
  const reduced = useReducedMotion();
  const [go, setGo] = useState(false);
  const [out, done] = useTypewriter(text, go, speed);

  useEffect(() => {
    if (reduced) { setGo(true); return; }
    if (!active) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [active, delay, reduced]);

  if (reduced) return <span style={style}>{text}</span>;

  return (
    <span style={style}>
      {out}
      {go && !done && (
        <span style={{
          display: 'inline-block',
          width: 6,
          height: '0.85em',
          background: 'currentColor',
          marginLeft: 1,
          verticalAlign: 'middle',
          animation: 'blink 0.65s step-end infinite',
        }} />
      )}
    </span>
  );
}

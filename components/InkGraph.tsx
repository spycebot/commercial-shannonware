'use client';

import { useState, useRef } from 'react';
import { useInterval } from './hooks';
import { T } from './tokens';

interface InkGraphProps {
  label?: string;
  w?: number;
  h?: number;
}

export default function InkGraph({ label, w = 280, h = 52 }: InkGraphProps) {
  const id = useRef(`g${Math.random().toString(36).slice(2, 7)}`).current;
  const [pts, setPts] = useState(() =>
    Array.from({ length: 50 }, (_, i) =>
      0.5 + 0.28 * Math.sin(i * 0.38) + (Math.random() - 0.5) * 0.1
    )
  );

  useInterval(() => {
    setPts(p => {
      const last = p[p.length - 1];
      const next = Math.max(0.06, Math.min(0.94, last + (Math.random() - 0.5) * 0.1));
      return [...p.slice(1), next];
    });
  }, 90);

  const step = w / (pts.length - 1);
  const pathD = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - v * h}`).join(' ');
  const fillD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <div>
      {label && (
        <div style={{
          fontFamily: T.mono,
          fontSize: 8,
          color: T.blue,
          letterSpacing: 1.5,
          marginBottom: 3,
          opacity: 0.8,
        }}>
          {label}
        </div>
      )}
      <svg width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={T.blue} stopOpacity="0.18" />
            <stop offset="100%" stopColor={T.blue} stopOpacity="0.01" />
          </linearGradient>
          <pattern id={`${id}p`} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.45" fill={T.blue} opacity="0.22" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#${id}p)`} />
        <path d={fillD} fill={`url(#${id}f)`} />
        <path d={pathD} fill="none" stroke={T.blue} strokeWidth="1.1" />
        <line x1={w - 0.5} y1={0} x2={w - 0.5} y2={h}
          stroke={T.blue} strokeWidth="0.5" opacity="0.45" />
        <circle cx={w} cy={h - pts[pts.length - 1] * h} r="2.5" fill={T.blue} />
      </svg>
    </div>
  );
}

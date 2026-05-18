'use client';

import { useState, useEffect } from 'react';
import { T } from './tokens';

interface DiagramProps {
  active?: boolean;
}

export default function Diagram({ active = true }: DiagramProps) {
  const [s, setS] = useState(0);

  useEffect(() => {
    if (!active) return;
    const delays = [300, 700, 1100, 1500, 1900, 2300];
    const ts = delays.map((d, i) => setTimeout(() => setS(i + 1), d));
    return () => ts.forEach(clearTimeout);
  }, [active]);

  const op = (i: number): React.CSSProperties => ({
    opacity: s > i ? 1 : 0,
    transition: 'opacity 0.4s ease',
  });

  type BoxProps = { x: number; y: number; w: number; h: number; label: string; sub?: string; i: number };
  const Box = ({ x, y, w, h, label, sub, i }: BoxProps) => (
    <g style={op(i)}>
      <rect x={x} y={y} width={w} height={h}
        fill="rgba(243,234,205,0.75)" stroke={T.blue} strokeWidth="0.9" />
      <text x={x + w / 2} y={sub ? y + h / 2 - 5 : y + h / 2 + 4}
        textAnchor="middle" fill={T.ink}
        style={{ fontSize: 9, fontFamily: T.mono }}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle"
          fill={T.fade} style={{ fontSize: 7.5, fontFamily: T.body }}>
          {sub}
        </text>
      )}
    </g>
  );

  type LineProps = { x1: number; y1: number; x2: number; y2: number; i: number };
  const Arr = ({ x1, y1, x2, y2, i }: LineProps) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={T.blue} strokeWidth="0.9"
      markerEnd="url(#darr1)" style={op(i)} />
  );

  const Ln = ({ x1, y1, x2, y2, i }: LineProps) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={T.blue} strokeWidth="0.9" style={op(i)} />
  );

  return (
    <svg viewBox="0 0 400 185" width="100%" style={{ maxWidth: 400, display: 'block' }}>
      <defs>
        <marker id="darr1" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={T.blue} />
        </marker>
      </defs>

      <Box x={150} y={6}   w={100} h={26} label="OPERATOR"        i={0} />
      <Arr x1={200} y1={32} x2={200} y2={50} i={0} />

      <Box x={112} y={50}  w={176} h={32} label="INTERFACE LAYER"
        sub="animated paper · HUD behaviours" i={1} />

      <Arr x1={155} y1={82}  x2={90}  y2={102} i={2} />
      <Arr x1={245} y1={82}  x2={310} y2={102} i={2} />

      <Box x={28}  y={102}  w={124} h={28} label="CIRCUIT LAYER"
        sub="electronic state" i={2} />
      <Box x={248} y={102}  w={124} h={28} label="PRINT LAYER"
        sub="physical substrate" i={3} />

      <Ln x1={90}  y1={130} x2={90}  y2={155} i={4} />
      <Ln x1={310} y1={130} x2={310} y2={155} i={4} />
      <Ln x1={90}  y1={155} x2={310} y2={155} i={4} />
      <Arr x1={200} y1={155} x2={200} y2={168} i={4} />

      <Box x={140} y={168} w={120} h={16} label="SYNTHESISED OUTPUT" i={5} />
    </svg>
  );
}

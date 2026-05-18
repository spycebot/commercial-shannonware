'use client';

import { useState, useEffect } from 'react';
import { T } from './tokens';

interface DeliveryDiagramProps {
  active?: boolean;
}

export default function DeliveryDiagram({ active = true }: DeliveryDiagramProps) {
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
      markerEnd="url(#darr2)" style={op(i)} />
  );

  return (
    <svg viewBox="0 0 400 215" width="100%" style={{ maxWidth: 400, display: 'block' }}>
      <defs>
        <marker id="darr2" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={T.blue} />
        </marker>
      </defs>

      {/* i=0: CLIENT COMMISSION */}
      <Box x={140} y={6}   w={120} h={22} label="CLIENT COMMISSION"    sub="brief · constraints · budget"           i={0} />
      {/* commission bottom → design top */}
      <Arr x1={200} y1={28} x2={200} y2={44} i={0} />

      {/* i=1: SERVICE DESIGN */}
      <Box x={140} y={44}  w={120} h={22} label="SERVICE DESIGN"        sub="ITIL4 · data flow · SLAs"               i={1} />
      {/* design left → application top */}
      <Arr x1={140} y1={55} x2={108} y2={88} i={1} />
      {/* design right → integration top */}
      <Arr x1={260} y1={55} x2={292} y2={88} i={1} />

      {/* i=2: APPLICATION LAYER */}
      <Box x={28}  y={88}  w={160} h={26} label="APPLICATION LAYER"     sub="Python · C# · TS · Flask · React"       i={2} />
      {/* application bottom → infra */}
      <Arr x1={108} y1={114} x2={150} y2={140} i={2} />

      {/* i=3: INTEGRATION LAYER */}
      <Box x={212} y={88}  w={160} h={26} label="INTEGRATION LAYER"     sub="REST · WebSockets · SQL · Oracle eBS"   i={3} />
      {/* integration bottom → infra */}
      <Arr x1={292} y1={114} x2={250} y2={140} i={3} />

      {/* i=4: INFRASTRUCTURE LAYER */}
      <Box x={80}  y={140} w={240} h={26} label="INFRASTRUCTURE LAYER"  sub="Linux VPS · Heroku · Azure · AWS"        i={4} />
      {/* infra bottom → service top */}
      <Arr x1={200} y1={166} x2={200} y2={184} i={4} />

      {/* i=5: OPERATING SERVICE */}
      <Box x={140} y={184} w={120} h={22} label="OPERATING SERVICE"     sub="monitored · documented · billed"         i={5} />
    </svg>
  );
}

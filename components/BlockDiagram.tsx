'use client';

import { T } from './tokens';

const STEPS = 7;

interface BlockDiagramProps {
  progress: number;
}

// FIG. 1 — self-drawing schematic, driven by scrub progress rather than timers.
// PAPER → CIRCUIT → INTERFACE → LIVING INK: 4 boxes + 3 arrows = 7 reveal steps.
export default function BlockDiagram({ progress }: BlockDiagramProps) {
  const op = (i: number): React.CSSProperties => ({
    opacity: progress >= (i + 0.6) / STEPS ? 1 : 0,
    transition: 'opacity 0.3s ease',
  });

  return (
    <svg viewBox="0 0 420 300" width="100%" style={{ maxHeight: 360, display: 'block' }}
      fontFamily={T.mono}>
      <g style={op(0)}>
        <rect x="30" y="34" width="130" height="58"
          fill="rgba(244,234,204,0.7)" stroke={T.blue} strokeWidth="1.5" />
        <text x="95" y="68" fill={T.blue} fontSize="13" letterSpacing="1" textAnchor="middle">PAPER</text>
      </g>
      <g style={op(1)}>
        <line x1="160" y1="63" x2="252" y2="63" stroke={T.blue} strokeWidth="1.5" />
        <path d="M252 63 l-9 -4 v8 z" fill={T.blue} />
      </g>
      <g style={op(2)}>
        <rect x="258" y="34" width="130" height="58"
          fill="rgba(244,234,204,0.7)" stroke={T.blue} strokeWidth="1.5" />
        <text x="323" y="68" fill={T.blue} fontSize="13" letterSpacing="1" textAnchor="middle">CIRCUIT</text>
      </g>
      <g style={op(3)}>
        <line x1="323" y1="92" x2="323" y2="196" stroke={T.blue} strokeWidth="1.5" />
        <path d="M323 196 l-4 -9 h8 z" fill={T.blue} />
      </g>
      <g style={op(4)}>
        <rect x="258" y="200" width="130" height="58"
          fill="rgba(244,234,204,0.7)" stroke={T.blue} strokeWidth="1.5" />
        <text x="323" y="234" fill={T.blue} fontSize="13" letterSpacing="1" textAnchor="middle">INTERFACE</text>
      </g>
      <g style={op(5)}>
        <line x1="258" y1="229" x2="166" y2="229" stroke={T.blue} strokeWidth="1.5" />
        <path d="M166 229 l9 -4 v8 z" fill={T.blue} />
      </g>
      <g style={op(6)}>
        <rect x="30" y="200" width="130" height="58"
          fill="rgba(122,92,10,0.10)" stroke={T.amber} strokeWidth="1.5" />
        <text x="95" y="226" fill={T.amber} fontSize="11" letterSpacing="1" textAnchor="middle">LIVING</text>
        <text x="95" y="242" fill={T.amber} fontSize="11" letterSpacing="1" textAnchor="middle">INK</text>
      </g>
    </svg>
  );
}

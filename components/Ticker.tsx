'use client';

import { useState } from 'react';
import { useInterval } from './hooks';
import { T, FS } from './tokens';

export default function Ticker() {
  const msgs = [
    'SYSTEM NOMINAL · INTERFACE ACTIVE · BUILD 2.0.0 · UPTIME 00:14:22',
    'SHANNON APPLIED COMPUTING · DIVISION OF INTERFACE RESEARCH · BANTRY CO. CORK',
    'OPERATOR AVAILABLE FOR COMMISSION · IRELAND AND REMOTE · ALL CHANNELS OPEN',
    'APPLICATION DESIGN · SOFTWARE ENGINEERING · SUPPORT ENGINEERING',
  ];
  const full = msgs.join('  · · · · ·  ');
  const [pos, setPos] = useState(0);
  useInterval(() => setPos(p => (p + 1) % full.length), 58);
  const rep = full + '  · · · · ·  ' + full;
  const view = rep.slice(pos, pos + 72);

  return (
    <div style={{
      borderTop: `1px solid ${T.blue}44`,
      padding: '6px 0',
      marginTop: 30,
      overflow: 'hidden',
    }}>
      <span style={{ fontFamily: T.mono, fontSize: FS.label, color: T.blue, letterSpacing: 1, opacity: 0.72 }}>
        {view}
      </span>
    </div>
  );
}

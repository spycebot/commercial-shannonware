'use client';

import { T, FS } from './tokens';
import Appear from './Appear';
import Typed from './Typed';

interface SHProps {
  n: number;
  title: string;
  delay?: number;
  active?: boolean;
}

export default function SH({ n, title, delay = 0, active = true }: SHProps) {
  const line = '='.repeat(title.length + 6);
  return (
    <Appear delay={delay} active={active}>
      <div style={{ marginTop: 26, marginBottom: 10 }}>
        <div style={{ fontFamily: T.body, fontSize: FS.heading, color: T.ink }}>
          <Typed text={`§ ${n}. ${title}`} delay={delay + 450} speed={28} active={active} />
        </div>
        <div style={{ fontFamily: T.mono, fontSize: FS.label, color: T.ink2, marginTop: 1 }}>
          <Typed text={line} delay={delay + 560} speed={9} active={active} />
        </div>
      </div>
    </Appear>
  );
}

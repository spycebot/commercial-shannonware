'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from './hooks';

interface AppearProps {
  delay?: number;
  active?: boolean;
  children: React.ReactNode;
}

export default function Appear({ delay = 0, active = true, children }: AppearProps) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(false);

  useEffect(() => {
    if (reduced) { setV(true); return; }
    if (!active) return;
    const t = setTimeout(() => setV(true), delay);
    return () => clearTimeout(t);
  }, [active, delay, reduced]);

  if (reduced) return <>{children}</>;

  return (
    <div style={{
      transform: `scaleY(${v ? 1 : 0})`,
      transformOrigin: 'top',
      opacity: v ? 1 : 0,
      transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
    }}>
      {children}
    </div>
  );
}

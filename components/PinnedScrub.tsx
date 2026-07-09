'use client';

import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from './hooks';

interface PinnedScrubProps {
  height?: string;
  children: (p: number) => React.ReactNode;
}

// Tall wrapper with a sticky inner stage. Scrub progress p runs 0 → 1 as the
// viewport traverses the wrapper's scroll range.
export default function PinnedScrub({ height = '220vh', children }: PinnedScrubProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduced) { setP(1); return; }
    const el = ref.current;
    if (!el) return;
    let raf: number | null = null;
    const run = () => {
      raf = null;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const raw = (window.scrollY - (top - vh * 0.12)) / (el.offsetHeight - vh * 0.62);
      setP(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(run);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    run();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={ref} style={{ position: 'relative', height }}>
      <div style={{ position: 'sticky', top: 34 }}>
        {children(p)}
      </div>
    </div>
  );
}

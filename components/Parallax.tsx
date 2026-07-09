'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from './hooks';

interface ParallaxProps {
  factor: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function Parallax({ factor, style, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.transform = 'none';
      return;
    }
    let raf: number | null = null;
    const run = () => {
      raf = null;
      el.style.transform = `translateY(${(window.scrollY * factor).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(run);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    run();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [factor, reduced]);

  return <div ref={ref} style={style}>{children}</div>;
}

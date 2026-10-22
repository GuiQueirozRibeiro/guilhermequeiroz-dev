'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/animation';

interface SplitTitleProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

/** Heading whose lines rise out of a mask on scroll, GSAP SplitText + ScrollTrigger. */
export function SplitTitle({ children, as: Tag = 'h2', className = '' }: SplitTitleProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled || !el) return;
      split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 120,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        },
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      split?.revert();
    };
     
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

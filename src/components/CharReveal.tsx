'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '@/lib/animation';

interface CharRevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

/**
 * Heading whose letters rise out of a line mask on scroll, one by one - the
 * stagger spreads across the whole reveal (~0.8-1.6s) regardless of length,
 * so a short and a long heading both read at a similar pace. Nested markup
 * (e.g. an accent-colored <span>) keeps its own color: SplitText only wraps
 * text nodes in spans, so descendants inherit color through the cascade as
 * usual - no manual per-character repainting needed.
 */
export function CharReveal({ children, as: Tag = 'h2', className = '' }: CharRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let split: SplitText | null = null;
    let cancelled = false;

    const run = () => {
      if (cancelled || !el) return;
      split = SplitText.create(el, {
        type: 'lines, words, chars',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          const spread = gsap.utils.clamp(0.8, 1.6, gsap.utils.mapRange(20, 90, 0.8, 1.6, self.chars.length));
          return gsap.from(self.chars, {
            yPercent: 120,
            duration: 0.9,
            ease: 'power3.out',
            stagger: { amount: spread },
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
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

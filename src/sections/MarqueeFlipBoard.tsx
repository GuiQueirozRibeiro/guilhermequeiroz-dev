'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANIES } from '../data/companies';
import type { Lang } from '../types';

interface MarqueeFlipBoardProps {
  lang: Lang;
}

const SHUFFLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/** One split-flap letter: flips through a few random glyphs, landing on `finalChar` at the last step. Swap happens at the edge-on (rotateX -90) midpoint of each flip, like a real flap display. */
function flap(el: HTMLElement, finalChar: string, steps: number, stepDuration: number): gsap.core.Timeline {
  const tl = gsap.timeline();
  if (finalChar === ' ') return tl;
  for (let i = 0; i < steps; i++) {
    const isLast = i === steps - 1;
    const char = isLast ? finalChar : SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
    tl.to(el, { rotateX: -90, duration: stepDuration, ease: 'power1.in' })
      .call(() => { el.textContent = char; })
      .fromTo(el, { rotateX: 90 }, { rotateX: 0, duration: stepDuration, ease: 'power1.out' });
  }
  return tl;
}

export function MarqueeFlipBoard({ lang }: MarqueeFlipBoardProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let idleInterval: ReturnType<typeof setInterval> | undefined;
    const removeListeners: (() => void)[] = [];
    // The idle re-flap keeps firing every few seconds for as long as the page
    // is open, even long after this board has scrolled out of view - skip it
    // while offscreen so it isn't spawning GSAP timelines for nothing.
    let visible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { rootMargin: '100px' }
    );
    if (rootRef.current) visibilityObserver.observe(rootRef.current);

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>('.flip-tile');
      const letters = gsap.utils.toArray<HTMLElement>('.flip-letter');
      const meta = gsap.utils.toArray<HTMLElement>('.flip-meta');

      letters.forEach((el) => { el.dataset.char = el.textContent ?? ''; });

      /** Re-flaps every letter in a tile to its own current text - a quick "board update" flicker. Skips a tile that's already mid-shuffle. */
      function shuffleTile(tile: HTMLElement, steps: number, stepDuration: number) {
        if (tile.dataset.shuffling === '1') return;
        tile.dataset.shuffling = '1';
        const tileLetters = Array.from(tile.querySelectorAll<HTMLElement>('.flip-letter'));
        const tl = gsap.timeline({ onComplete: () => { tile.dataset.shuffling = '0'; } });
        tileLetters.forEach((el, i) => {
          const finalChar = el.dataset.char ?? el.textContent ?? '';
          tl.add(flap(el, finalChar, steps, stepDuration), i * 0.02);
        });
      }

      if (reduced) {
        gsap.set(letters, { rotateX: 0, opacity: 1 });
        gsap.set(meta, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(letters, { opacity: 0, transformOrigin: '50% 50%' });
      gsap.set(meta, { opacity: 0, y: 6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          once: true,
        },
        onComplete: () => {
          // Ambient life after the reveal - every few seconds, one random
          // tile re-flaps, like a real departure board quietly updating.
          idleInterval = setInterval(() => {
            if (!visible) return;
            const tile = tiles[Math.floor(Math.random() * tiles.length)];
            shuffleTile(tile, 3, 0.045);
          }, 3200 + Math.random() * 2600);
        },
      });

      tiles.forEach((tile, tileIndex) => {
        const tileLetters = Array.from(tile.querySelectorAll<HTMLElement>('.flip-letter'));
        const tileMeta = tile.querySelectorAll('.flip-meta');
        const start = tileIndex * 0.12;

        tl.set(tileLetters, { opacity: 1 }, start);
        tileLetters.forEach((el, i) => {
          tl.add(flap(el, el.dataset.char ?? '', 5, 0.05), start + i * 0.03);
        });
        tl.to(tileMeta, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, start + 0.35);

        const onEnter = () => shuffleTile(tile, 4, 0.045);
        tile.addEventListener('mouseenter', onEnter);
        removeListeners.push(() => tile.removeEventListener('mouseenter', onEnter));
      });
    }, rootRef);

    return () => {
      if (idleInterval) clearInterval(idleInterval);
      visibilityObserver.disconnect();
      removeListeners.forEach((fn) => fn());
      ctx.revert();
    };
  }, [lang]);

  return (
    <div ref={rootRef} className="py-10 md:py-12 px-5">
      <div className="max-w-[880px] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-2">
        {COMPANIES.map((company) => (
          <div
            key={company.name}
            className="flip-tile rounded-lg border px-3.5 py-2.5 overflow-hidden cursor-default"
            style={{ background: '#121316', borderColor: '#232428', perspective: 300 }}
          >
            <div className="font-mono text-[12px] md:text-[13px] font-semibold tracking-[0.01em] uppercase flex flex-wrap" style={{ color: '#f5c451' }}>
              {company.name.split('').map((char, i) => (
                <span key={i} className="flip-letter inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                  {char}
                </span>
              ))}
            </div>
            <div className="flip-meta font-mono text-[8.5px] uppercase tracking-[0.06em] mt-1 flex items-center justify-between gap-2" style={{ color: '#8a8a92' }}>
              <span className="opacity-90 truncate">{company.role[lang]}</span>
              <span className="opacity-70 flex-shrink-0">{company.period}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/animation';

interface HeroPreloaderProps {
  /** Called once the "G" has landed on `[data-hero-g-target]` (or immediately, if the intro is skipped). */
  onComplete: (result: { skipped: boolean }) => void;
}

const MAX_WAIT_TOTAL_MS = 8000;
const MIN_VISIBLE_MS = 900;
// The counter never reaches 100 on its own - it eases toward this ceiling
// continuously, so it always reads as one smooth climb rather than jumping
// between whatever few real load events happen to resolve. Real completion
// (fonts + full page load) then closes the remaining gap to 100 quickly.
const COSMETIC_CEILING = 92;
const COSMETIC_DURATION = 1.4;

/**
 * Full-screen loading "G" (0% -> 100%) that then flies into the hero's
 * kinetic word stack, landing exactly on the "G" of "GUILHERME" - one letter
 * handing off from the loading glyph to the real headline, while the solid
 * backdrop slides up and off-screen to reveal the page underneath. Plays on
 * every load/reload of the home page; skips straight to `onComplete` only
 * under `prefers-reduced-motion: reduce`.
 */
export function HeroPreloader({ onComplete }: HeroPreloaderProps) {
  const [mounted, setMounted] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const percentRowRef = useRef<HTMLParagraphElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  // Captured once at mount: this component fires its callback exactly once,
  // shortly after mounting, so the closure from the initial render is all it
  // ever needs - no re-render can invalidate it before that single call.
  const onCompleteRef = useRef(onComplete);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      // Deferred a tick (still well before paint) so the state update isn't
      // a direct synchronous call in the effect body.
      queueMicrotask(() => {
        const target = document.querySelector<HTMLElement>('[data-hero-g-target]');
        const rest = document.querySelector<HTMLElement>('[data-hero-rest]');
        if (target) gsap.set(target, { opacity: 1 });
        if (rest) gsap.set(rest, { opacity: 1 });
        setMounted(false);
        onCompleteRef.current({ skipped: true });
      });
      return;
    }

    // A reload anywhere on the page should still land the visitor at the top
    // to actually see the intro - the browser's own scroll restoration would
    // otherwise keep them mid-page while this plays out of view.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const startedAt = performance.now();
    const progress = { value: 0 };
    let finished = false;
    // React (Strict Mode, dev only) mounts, cleans up, and re-mounts this
    // effect once to surface missing-cleanup bugs. clearTimeout/tween.kill()
    // can't cancel an already-in-flight Promise, so without this flag the
    // first (throwaway) invocation's `ready.then(...)` could still resolve
    // after its own cleanup ran and replay the whole finish() sequence on
    // top of the second, real one - the entire animation visibly playing
    // twice back to back.
    let cancelled = false;

    const paint = (v: number) => {
      if (percentRef.current) percentRef.current.textContent = String(Math.round(v));
      if (fillRef.current) fillRef.current.style.clipPath = `inset(${100 - v}% 0 0 0)`;
    };

    const cosmeticTween = gsap.to(progress, {
      value: COSMETIC_CEILING,
      duration: COSMETIC_DURATION,
      ease: 'power1.out',
      onUpdate: () => paint(progress.value),
    });

    // Real readiness (fonts + full page load) - the safety timeout below
    // guards slow/broken cases so the page is never stuck behind this.
    const ready = Promise.all([
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true })),
    ]);

    const totalGuard = setTimeout(finish, MAX_WAIT_TOTAL_MS);

    ready.then(() => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      gsap.delayedCall(wait / 1000, finish);
    });

    function finish() {
      if (finished || cancelled) return;
      finished = true;
      clearTimeout(totalGuard);
      cosmeticTween.kill();
      // Close whatever gap is left up to 100 quickly rather than snapping -
      // the counter still reads as one continuous climb, never a jump.
      gsap.to(progress, { value: 100, duration: 0.3, ease: 'power2.out', onUpdate: () => paint(progress.value) });

      const glyph = glyphRef.current;
      const targetEl = document.querySelector<HTMLElement>('[data-hero-g-target]');
      if (!glyph || !targetEl) {
        setMounted(false);
        onCompleteRef.current({ skipped: true });
        return;
      }

      const from = glyph.getBoundingClientRect();
      const to = targetEl.getBoundingClientRect();
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      const scale = to.width / from.width;

      gsap.timeline({
        onComplete: () => {
          setMounted(false);
          onCompleteRef.current({ skipped: false });
        },
      })
        .to(percentRowRef.current, { autoAlpha: 0, y: 10, duration: 0.3, ease: 'power2.out' }, 0)
        // The "G" flies to its spot in the headline first...
        .to(glyph, { x: dx, y: dy, scale, duration: 1.1, ease: 'power3.inOut' }, 0.1)
        // ...then the backdrop slides up and off-screen, uncovering the hero
        // underneath - the same beat as the Nexxivo reference's preloader.
        .to(bgRef.current, { yPercent: -100, duration: 1.1, ease: 'power3.inOut' }, 0.4)
        // The real letter snaps in exactly as the flying one arrives...
        .call(() => gsap.set(targetEl, { opacity: 1 }), undefined, 1.15)
        // ...and the flying glyph itself disappears, completing the handoff.
        .to(glyph, { autoAlpha: 0, duration: 0.25, ease: 'power2.out' }, 1.15);
    }

    return () => {
      cancelled = true;
      clearTimeout(totalGuard);
      cosmeticTween.kill();
    };
    // Intentional one-time setup per mount.
     
  }, []);

  if (!mounted) return null;

  return (
    <div ref={wrapRef} className="hero-preloader" aria-hidden="true">
      <div ref={bgRef} className="hero-preloader__bg" />
      <div className="hero-preloader__stage">
        <div ref={glyphRef} className="hero-preloader__glyph">
          <span className="hero-preloader__glyph-ghost">G</span>
          <span ref={fillRef} className="hero-preloader__glyph-fill">G</span>
        </div>
        <p ref={percentRowRef} className="hero-preloader__percent"><span ref={percentRef}>0</span>%</p>
      </div>
    </div>
  );
}

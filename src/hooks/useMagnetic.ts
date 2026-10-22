'use client';

import { useEffect, type RefObject } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/animation';

/** Pulls the element a fraction of the way toward the pointer while it's hovered, desktop-only. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strengthX = 0.35, strengthY = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    // Reading getBoundingClientRect() on every pointermove forces the browser
    // to flush layout on every single event (pointermove can fire dozens of
    // times per frame on a high-poll-rate mouse) - that's what made the drag
    // feel stuttery. The button's own on-screen position doesn't change mid-hover
    // (only its `transform` does, which getBoundingClientRect must resolve
    // through), so it's cached once on entry instead.
    let rect = el.getBoundingClientRect();

    function onEnter() {
      rect = el!.getBoundingClientRect();
    }
    function onMove(e: PointerEvent) {
      xTo((e.clientX - rect.left - rect.width / 2) * strengthX);
      yTo((e.clientY - rect.top - rect.height / 2) * strengthY);
    }
    function onLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
     
  }, [ref, strengthX, strengthY]);
}

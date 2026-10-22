'use client';

// Port of the Batida em Movimento effects (painel-esportes-agenciasisters/…/animacoes.jsx)
// from Framer Motion to GSAP, so the site keeps a single animation engine.
// Everything respects "reduce motion": the server HTML already has the final state.

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/animation';

interface MarcadorProps {
  children: React.ReactNode;
  /** Highlighter color — any CSS color, defaults to the accent at 35%. */
  cor?: string;
  /** Seconds before the stroke starts once it scrolls into view. */
  atraso?: number;
  className?: string;
}

/** Highlighter stroke that paints left → right when the text scrolls into view. */
export function Marcador({ children, cor = 'color-mix(in oklab, var(--accent) 35%, transparent)', atraso = 0.3, className = '' }: MarcadorProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { backgroundSize: '0% 100%' }, {
        backgroundSize: '100% 100%',
        duration: 0.9,
        delay: atraso,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 80%', once: true },
      });
    });
    return () => ctx.revert();
  }, [atraso]);

  return (
    <span
      ref={ref}
      className={`px-1 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${cor}, ${cor})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: '100% 100%',
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
      }}
    >
      {children}
    </span>
  );
}

interface ContadorProps {
  ate: number;
  de?: number;
  /** Seconds. */
  duracao?: number;
  sufixo?: string;
}

/** Number that counts up to `ate` when it appears. SSR renders the final value. */
export function Contador({ ate, de = 0, duracao = 1.8, sufixo = '' }: ContadorProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(ate);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const obj = { n: de };
      gsap.to(obj, {
        n: ate,
        duration: duracao,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => setValor(obj.n),
      });
    });

    return () => ctx.revert();
  }, [ate, de, duracao]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {Math.round(valor)}{sufixo}
    </span>
  );
}

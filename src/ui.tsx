'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import GradientText from './components/GradientText';
import DecryptedText from './components/DecryptedText';
import SpotlightCard from './components/SpotlightCard';
import { gsap, prefersReducedMotion } from './lib/animation';
import { useMagnetic } from './hooks/useMagnetic';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Same feel as the Batida em Movimento landing (animacoes.jsx → Revelar):
// rises ~40px and comes into focus from blur(8px), ease ≈ cubic-bezier(.22,1,.36,1).
export function Reveal({ children, delay = 0, as: Tag = 'div', y = 32, className = '', style = {} }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  // Runs before the browser paints the hydrated result: elements already in
  // the initial viewport are left exactly as SSR rendered them (visible), so
  // there's no flash of hidden-then-shown content for above-the-fold reveals.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const alreadyVisible = rect.top < vh - 40;
    if (alreadyVisible) return;

    // blur() repaints every frame — desktop only, same rule as the hero.
    const blur = window.innerWidth >= 768;

    const ctx = gsap.context(() => {
      gsap.set(el, { autoAlpha: 0, y, filter: blur ? 'blur(8px)' : 'none' });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        delay: delay / 1000,
        ease: 'power4.out',
        clearProps: 'transform,filter',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

    return () => ctx.revert();
    // Intentional one-time setup per mount — delay/y come from static call-site props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

interface SectionProps {
  id: string;
  eyebrow?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section({ id, eyebrow, children, style = {} }: SectionProps) {
  return (
    <section id={id} className="relative py-16 md:py-[120px]" style={style}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        {eyebrow && (
          <Reveal>
            <div className="flex items-center gap-3 mb-10 font-mono text-[11.5px] tracking-[0.14em] uppercase text-ink-3">
              <span className="w-6 h-px bg-accent" />
              <GradientText colors={["var(--ink-3)", "var(--ink-2)", "var(--ink-3)"]} animationSpeed={10}>
                {eyebrow}
              </GradientText>
            </div>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * Renders string children as one span per character so CSS can roll each
 * letter up on `.btn:hover` (with a per-letter delay via the `--i` custom
 * property). Falls back to plain children when the content isn't a simple
 * string — the effect only makes sense for the short CTA labels it's used on.
 */
function HoverRollLabel({ children }: { children: React.ReactNode }) {
  if (typeof children !== 'string') return <span className="btn-label">{children}</span>;
  const words = children.split(' ');
  let i = 0;
  return (
    <span className="btn-label">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="btn-label-visual">
        {words.map((word, wi) => (
          <React.Fragment key={wi}>
            <span className="btn-word">
              {word.split('').map((ch) => {
                const idx = i++;
                return (
                  <span key={idx} className="btn-char" data-char={ch} style={{ '--i': idx } as React.CSSProperties}>
                    {ch}
                  </span>
                );
              })}
            </span>
            {wi < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}

/**
 * Renders a `.btn-icon-wrap` with two stacked icons so CSS can roll the
 * resting one out on `.btn:hover` while the (accent-colored) `next` icon
 * rolls in underneath it — the icon-side counterpart to `HoverRollLabel`.
 */
function HoverRollIcon({ icon, next }: { icon: React.ReactNode; next: React.ReactNode }) {
  return (
    <span className="btn-icon-wrap">
      <span className="btn-icon-face">{icon}</span>
      <span className="btn-icon-face--next" aria-hidden="true">{next}</span>
    </span>
  );
}

const ArrowIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

interface BtnPrimaryProps {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
}

export function BtnPrimary({ children, href, onClick, target }: BtnPrimaryProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);
  return (
    <a ref={ref} href={href} onClick={onClick} target={target}
      className="btn inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-ink text-bg text-sm font-medium tracking-[-0.01em] transition-transform duration-[250ms] hover:-translate-y-px"
    >
      <HoverRollLabel>{children}</HoverRollLabel>
      <HoverRollIcon icon={<ArrowIcon />} next={<ArrowIcon />} />
    </a>
  );
}

interface BtnGhostProps {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
}

export function BtnGhost({ children, href, onClick, target }: BtnGhostProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);
  return (
    <a ref={ref} href={href} onClick={onClick} target={target}
      className="btn inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-line text-ink text-sm font-medium transition-[border-color,background] duration-[250ms] hover:border-ink-2"
    ><HoverRollLabel>{children}</HoverRollLabel></a>
  );
}

interface PulseDotProps {
  color?: string;
}

export function PulseDot({ color = 'var(--accent-2)' }: PulseDotProps) {
  return (
    <span className="relative inline-block w-2 h-2">
      <span className="absolute inset-0 rounded-full" style={{ background: color }} />
      <span className="absolute inset-0 rounded-full animate-pulse-dot" style={{ background: color }} />
    </span>
  );
}

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

// Cover videos can be several MB — with plain autoPlay, the browser starts
// fetching the whole thing the instant the element mounts, even if it's a
// card far below the fold. Defer the fetch (and playback) until the element
// is actually near the viewport.
export function LazyVideo({ src, className, style }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (inView) ref.current?.play().catch(() => {});
  }, [inView]);

  return (
    <video
      ref={ref}
      src={inView ? src : undefined}
      preload="none"
      className={className}
      style={style}
      loop
      muted
      playsInline
    />
  );
}

interface CarouselImageProps {
  images: string | string[];
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CarouselImage({ images, alt = "", className = "", style = {} }: CarouselImageProps) {
  const arr = Array.isArray(images) ? images : [images];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (arr.length <= 1) return;
    const t = setInterval(() => {
      setIndex(prev => (prev + 1) % arr.length);
    }, 5000);
    return () => clearInterval(t);
  }, [arr.length]);

  if (arr.length === 1) {
    const src = arr[0];
    return src.endsWith('.mp4') ? (
      <LazyVideo src={src} className={className} style={style} />
    ) : (
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className={className} style={style} />
    );
  }

  return (
    <div className={`${className} overflow-hidden relative`} style={style}>
      <div
        className="w-full h-full flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {arr.map((src, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0 flex items-center justify-center">
            {src.endsWith('.mp4') ? (
              <LazyVideo src={src} className="w-full h-full object-contain object-center" />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface BrowserFrameProps {
  url: string;
  accent?: string;
  aspect?: string;
  onOpen?: () => void;
  openLabel?: string;
  children: React.ReactNode;
}

export function BrowserFrame({ url, accent, aspect = 'aspect-[16/10]', onOpen, openLabel, children }: BrowserFrameProps) {
  return (
    <div className="rounded-[10px] border border-line overflow-hidden bg-bg-2">
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-line bg-bg-3">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-[10px] h-[10px] rounded-full opacity-80" style={{ background: '#ff5f57' }} />
          <span className="w-[10px] h-[10px] rounded-full opacity-80" style={{ background: '#febc2e' }} />
          <span className="w-[10px] h-[10px] rounded-full opacity-80" style={{ background: '#28c840' }} />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2 bg-bg rounded-full pl-3 pr-4 py-[7px] border border-line-2">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2" className="flex-shrink-0">
            <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          <span className="font-mono text-[11.5px] text-ink-2 truncate">{url}</span>
        </div>
      </div>
      <div
        onClick={onOpen}
        role={onOpen ? 'button' : undefined}
        tabIndex={onOpen ? 0 : undefined}
        onKeyDown={onOpen ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } } : undefined}
        className={`relative ${aspect} ${onOpen ? 'cursor-pointer group' : ''}`}
        style={accent ? { background: `linear-gradient(145deg, ${accent}18, transparent 60%), var(--bg-3)` } : undefined}
      >
        {children}
        {onOpen && (
          <span className="absolute bottom-3 right-3 font-mono text-[10.5px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-full bg-ink text-bg opacity-90 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {openLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export { GradientText, DecryptedText, SpotlightCard, HoverRollLabel, HoverRollIcon, ArrowIcon };

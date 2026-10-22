'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap, SplitText, prefersReducedMotion } from '../lib/animation';
import { Reveal, BtnPrimary, BtnGhost, PulseDot } from '../ui';
import { HeroPreloader } from '../components/HeroPreloader';
import { Marcador, Contador } from '../components/animacoes';
import type { Lang, Translations } from '../types';

interface HeroProps {
  t: Translations;
  lang: Lang;
}

const STACK_CHIPS = ['React Native', 'Flutter', 'Next.js', 'Node.js'];

// One entry per `.hero-badge`, in DOM order (availability, role, stack chips,
// experience) — each travels in from roughly the direction its resting spot
// sits in, so the group reads as pieces assembling into place rather than a
// single block rising together.
const BADGE_ENTRANCE = [
  { x: 0, y: -46, rotate: -5 },
  { x: 10, y: 46, rotate: 4 },
  { x: -64, y: 14, rotate: -4 },
  { x: 64, y: -24, rotate: 5 },
];

export function Hero({ t, lang }: HeroProps) {
  const words = t.hero.heroWords;
  const [introReady, setIntroReady] = useState(false);
  const skippedIntroRef = useRef(false);

  // Initial word/badge/photo state — runs once on mount, independent of the
  // preloader, so `[data-hero-g-target]` already has its real layout position
  // (opacity 0 still occupies space) by the time the preloader measures it.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLElement>('.hero-word');
      const badges = gsap.utils.toArray<HTMLElement>('.hero-badge');
      // `filter: blur()` forces a repaint every frame instead of just a
      // compositor pass — fine for one element on desktop, but stacking it
      // across the photo + up to four badges is what makes the handoff from
      // the preloader feel "travado" on weaker/mobile devices. Skip the blur
      // there and fall back to opacity/transform only.
      const isMobile = window.innerWidth < 768;

      gsap.set(wordEls, { opacity: 0, yPercent: 0 });
      gsap.set(wordEls[0], { opacity: 1 });
      gsap.set('.hero-photo-wrap', { opacity: 0, y: 60, filter: isMobile ? 'none' : 'blur(6px)' });

      if (prefersReducedMotion()) {
        gsap.set(badges, { opacity: 0 });
      } else {
        badges.forEach((badge, i) => {
          const p = BADGE_ENTRANCE[i % BADGE_ENTRANCE.length];
          gsap.set(badge, { opacity: 0, x: p.x, y: p.y, rotate: p.rotate, scale: 0.72, filter: isMobile ? 'none' : 'blur(10px)' });
        });
      }
    });

    return () => ctx.revert();
  }, [lang]);

  // Everything below only starts once the "G" has landed (or the preloader
  // skipped itself under reduced motion / a repeat visit this session).
  useEffect(() => {
    if (!introReady) return;

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLElement>('.hero-word');
      const badges = gsap.utils.toArray<HTMLElement>('.hero-badge');
      const heroRest = document.querySelector<HTMLElement>('[data-hero-rest]');
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({ delay: 0.1 });

      if (heroRest && !skippedIntroRef.current) {
        gsap.set(heroRest, { opacity: 1 });
        SplitText.create(heroRest, {
          type: 'chars',
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.chars, { opacity: 0, yPercent: 100, duration: 0.5, stagger: 0.025, ease: 'power2.out' });
          },
        });
      }

      tl.to('.hero-photo-wrap', { opacity: 1, y: 0, filter: isMobile ? 'none' : 'blur(0px)', duration: 1.1, ease: 'power3.out' }, 0);

      if (prefersReducedMotion()) {
        tl.to(badges, { opacity: 1, duration: 0.4 }, 0.15);
      } else {
        // Each badge flies in from its own BADGE_ENTRANCE offset back to (0,0),
        // sharpening into focus as it lands, with a touch of overshoot —
        // "assembling" into place rather than a uniform block rising together.
        tl.to(badges, {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          filter: isMobile ? 'none' : 'blur(0px)',
          duration: 1.3,
          stagger: 0.12,
          ease: 'back.out(1.6)',
        }, 0.15);
      }

      let floatObserver: IntersectionObserver | null = null;

      tl.add(() => {
        // Idle float — desktop only. On mobile the badges sit in tight,
        // safe-positioned spots near the fixed nav and headline; letting
        // them drift there risks sliding under the nav or into the photo.
        if (window.innerWidth < 1024 || prefersReducedMotion()) return;

        // Each badge gets its own direction (not just its own timing), so
        // they read as independent objects instead of one synchronized
        // bobbing group. The sign/axis is fixed per badge; only the
        // magnitude/duration/delay get a bit of random jitter.
        const floatPatterns = [
          { x: 8, y: -16, rotate: -2.5 },
          { x: -12, y: 15, rotate: 3 },
          { x: -15, y: -11, rotate: -3.5 },
          { x: 13, y: 14, rotate: 2.5 },
        ];
        const floatTweens = badges.map((badge, i) => {
          const p = floatPatterns[i % floatPatterns.length];
          return gsap.to(badge, {
            x: `+=${p.x}`,
            y: `+=${p.y}`,
            rotate: p.rotate,
            duration: gsap.utils.random(2.6, 3.8),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          });
        });

        // These 4 tweens run forever once the intro settles — pause them
        // while the hero has scrolled out of view so a visitor reading the
        // rest of the page isn't paying their main-thread cost for nothing.
        const heroSection = document.getElementById('top');
        if (heroSection) {
          floatObserver = new IntersectionObserver(
            ([entry]) => {
              floatTweens.forEach((tween) => (entry.isIntersecting ? tween.resume() : tween.pause()));
            },
            { rootMargin: '200px' }
          );
          floatObserver.observe(heroSection);
        }
      });

      // Kinetic word swap: the old word fully exits before the next one enters —
      // sequential, not simultaneous, so they never overlap mid-transition.
      let current = 0;
      let swapTl: gsap.core.Timeline | null = null;

      function resetWords() {
        swapTl?.kill();
        gsap.set(wordEls, { opacity: 0, yPercent: 0 });
        gsap.set(wordEls[current], { opacity: 1 });
      }

      function swapWord() {
        // Background tabs still fire setInterval (throttled, not paused), but
        // GSAP's own ticker is paused while hidden — so a tween created here
        // never renders and just sits there. If several of these pile up while
        // the tab is away, they'd all snap to their end state at once on
        // return, leaving multiple words visible simultaneously. Simplest fix:
        // never spawn a new crossfade while the tab isn't visible.
        if (document.hidden) return;
        const next = (current + 1) % wordEls.length;
        swapTl?.kill();
        swapTl = gsap.timeline()
          .to(wordEls[current], { opacity: 0, yPercent: -20, duration: 0.45, ease: 'power2.in' })
          .fromTo(wordEls[next], { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0, duration: 0.45, ease: 'power2.out' });
        current = next;
      }

      const interval = setInterval(swapWord, 1800);

      // On return to the tab, don't let any leftover/in-flight crossfade play
      // catch-up — snap straight to a single clean word and resume normally.
      function handleVisibility() {
        if (!document.hidden) resetWords();
      }
      document.addEventListener('visibilitychange', handleVisibility);

      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', handleVisibility);
        swapTl?.kill();
        floatObserver?.disconnect();
      };
    });

    return () => ctx.revert();
  }, [introReady, lang]);

  return (
    <section
      id="top"
      className="relative w-full min-h-screen flex flex-col items-center pt-[148px] pb-10 overflow-hidden lg:h-screen lg:min-h-[640px] lg:pt-0 lg:pb-0 lg:flex-row lg:items-center lg:justify-center"
    >
      <HeroPreloader onComplete={({ skipped }) => { skippedIntroRef.current = skipped; setIntroReady(true); }} />

      {/* Giant kinetic word stack, behind the photo */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        {words.map((word, i) => (
          <div
            key={word}
            className="hero-word absolute font-black leading-none whitespace-normal lg:whitespace-nowrap text-center select-none text-transparent"
            data-word={i}
            style={{
              fontFamily: 'var(--font-archivo), sans-serif',
              fontSize: 'clamp(36px, 18vw, 220px)',
              letterSpacing: '-0.03em',
              WebkitTextStroke: '1.5px color-mix(in oklab, var(--ink) 22%, transparent)',
              opacity: 0,
              maxWidth: '100vw',
              padding: '0 8px',
              boxSizing: 'border-box' as const,
            }}
          >
            {i === 0 ? (
              <span className="whitespace-nowrap">
                <span data-hero-g-target style={{ opacity: 0 }}>{word[0]}</span>
                <span data-hero-rest style={{ opacity: 0 }}>{word.slice(1)}</span>
              </span>
            ) : (
              word
            )}
          </div>
        ))}
      </div>

      {/* Availability badge — pinned near the nav at every size */}
      <div className="hero-badge absolute z-[4] flex items-center gap-2 rounded-full border border-line bg-bg-2/90 backdrop-blur-md px-3.5 py-2 md:px-4 md:py-2.5 font-mono text-[10px] md:text-[11px] text-ink-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] whitespace-nowrap top-[76px] left-1/2 -translate-x-1/2 lg:top-[14%] lg:left-[8%] lg:translate-x-0">
        <PulseDot /> {t.hero.availability}
      </div>

      {/* Photo */}
      <div className="hero-photo-wrap relative z-[3] w-[min(64vw,280px)] md:w-[min(42vw,320px)] lg:w-[min(30vw,360px)] aspect-[3/4] rounded-[28px] overflow-hidden border border-line shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <Image
          src="/guilherme-queiroz-engenheiro-de-software.webp"
          alt="Guilherme Queiroz Ribeiro, Engenheiro de Software, em Brasília"
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) min(64vw, 280px), (max-width: 1024px) min(42vw, 320px), min(30vw, 360px)"
          style={{ objectFit: 'cover', objectPosition: '50% 55%' }}
        />
      </div>

      {/* Role badge — sits in flow right under the photo on mobile, floats near it on desktop */}
      <div className="hero-badge relative z-[4] mt-4 flex flex-row items-center gap-1.5 lg:absolute lg:mt-0 lg:flex-col lg:items-start rounded-[26px] border border-line bg-bg-2/90 backdrop-blur-md px-3.5 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3.5 font-mono text-[10px] md:text-[11px] text-ink-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] whitespace-nowrap lg:top-auto lg:bottom-[15%] lg:left-auto lg:right-[6%]">
        <span className="text-ink-3">{t.work.role.toUpperCase()}</span>
        <span className="text-ink text-[13px] font-sans font-semibold">{t.hero.role}</span>
      </div>

      <div className="hero-badge hidden lg:flex absolute z-[4] items-center gap-3 rounded-full border border-line bg-bg-2/90 backdrop-blur-md px-[18px] py-[11px] font-mono text-[11.5px] text-ink-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] bottom-[28%] left-[8%]">
        {STACK_CHIPS.map((chip) => (
          <span key={chip} className="rounded-full border border-line bg-bg-3 px-2.5 py-0.5 text-ink-3">{chip}</span>
        ))}
      </div>

      <div className="hero-badge hidden lg:flex absolute z-[4] flex-col items-center text-center rounded-[26px] border border-line bg-bg-2/90 backdrop-blur-md px-5 py-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] top-[20%] right-[9%]">
        <span className="font-black leading-none text-ink text-[22px]" style={{ fontFamily: 'var(--font-archivo), sans-serif' }}><Contador ate={4} sufixo="+" duracao={1.4} /></span>
        <span className="font-mono text-[10px] text-ink-3">{t.hero.experienceLabel}</span>
      </div>

      {/* Headline + CTAs — flows below the photo on mobile (pushed to the bottom via mt-auto when there's room), pinned to the bottom edge on desktop */}
      <div className="relative z-[5] mt-auto flex flex-col items-center px-5 pt-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:pt-0 lg:pb-10 xl:pb-14">
        <Reveal>
          <h1 className="text-center text-[clamp(20px,3.4vw,32px)] leading-[1.15] tracking-[-0.02em] font-semibold max-w-[620px]">
            <span className="sr-only">{t.hero.seoLead} </span>
            {t.hero.headline_a} <Marcador atraso={1.4}>{t.hero.headline_b}</Marcador>{' '}
            <span className="text-ink-2 font-medium">{t.hero.headline_c}</span>
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex gap-2.5 flex-wrap justify-center mt-6">
            <BtnPrimary href="#contact">{t.hero.cta_primary}</BtnPrimary>
            <BtnGhost href="#work">{t.hero.cta_secondary}</BtnGhost>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

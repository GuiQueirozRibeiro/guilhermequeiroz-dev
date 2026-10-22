'use client';

import { Reveal, Section, DecryptedText } from '../ui';
import { SplitTitle } from '../components/SplitTitle';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Translations } from '../types';

interface AboutProps {
  t: Translations;
}

export function About({ t }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    function measure() {
      rafId = null;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      setOffset(progress);
    }
    function onScroll() {
      // Coalesce reflow-forcing getBoundingClientRect reads to once per frame
      // instead of once per scroll event (scroll can fire much faster than rAF).
      if (rafId !== null) return;
      rafId = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Section id="about" eyebrow={t.about.eyebrow}>
      <div ref={sectionRef} className="grid grid-cols-1 gap-10 items-start md:grid-cols-[1fr_1.2fr] md:gap-16">
        <div className="md:sticky md:top-[120px]">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-line shadow-[0_25px_60px_-25px_rgba(0,0,0,0.55)]">
            <Image
              src="/guilherme-queiroz-engenheiro-de-software.webp"
              alt="Guilherme Queiroz Ribeiro trabalhando no notebook em Brasília"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-[50%_60%]"
              style={{ transform: `translateY(${offset * 10}px) scale(1.06)` }}
            />
          </div>
          <Reveal delay={200}>
            <div className="mt-5 grid grid-cols-2 border border-line rounded-xl overflow-hidden bg-bg-2">
              {t.about.facts.map((fact, index) => (
                <div
                  key={index}
                  className={`p-4 md:p-[18px] border-line ${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b' : ''}`}
                >
                  <div className="font-mono text-[10px] text-ink-3 tracking-[0.12em] uppercase mb-1.5">
                    {fact.k}
                  </div>
                  <div className="text-sm">
                    <DecryptedText
                      text={fact.v}
                      animateOn="view"
                      speed={100}
                      maxIterations={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <SplitTitle as="h2" className="text-[clamp(28px,3.4vw,44px)] leading-[1.15] tracking-[-0.02em] font-semibold">
            {t.about.title}
          </SplitTitle>
          <Reveal delay={50}>
            <p className="text-base leading-[1.80] text-ink">
              {t.about.intro}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base leading-[1.80] text-ink-2">
              {t.about.p1}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[15px] leading-[1.80] text-ink-3">
              {t.about.p2}
            </p>
          </Reveal>
          <Reveal delay={350}>
            <Link href="/sobre" className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition-colors duration-200 w-fit">
              {t.nav.aboutMe}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

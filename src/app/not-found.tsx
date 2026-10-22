'use client';

import { useEffect, useState } from 'react';
import { Reveal, BtnPrimary, BtnGhost, PulseDot } from '@/ui';
import { useAppShell } from './app-shell';

export default function NotFound() {
  const { t, onGoHome } = useAppShell();
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 550);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-5 pt-[120px] pb-16 md:px-8">
      <div className="max-w-[560px] w-full text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-[13px] py-[6px] rounded-full border border-line bg-bg-2 text-[11.5px] font-mono text-ink-2 mb-8">
            <PulseDot color="var(--accent)" /> {t.notFound.eyebrow}
          </div>
        </Reveal>

        <style>{`
          @keyframes digit-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes digit-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes digit-glitch {
            0%, 92%, 100% { transform: translate(0, 0); opacity: 1; }
            93% { transform: translate(-3px, 2px); opacity: 0.85; }
            94.5% { transform: translate(3px, -2px); opacity: 0.85; }
            96% { transform: translate(-2px, -1px); opacity: 1; }
          }
        `}</style>

        <Reveal delay={80}>
          <div
            className="inline-flex text-[clamp(72px,12vw,140px)] leading-none font-semibold tracking-[-0.04em] mb-6"
            style={{ animation: 'digit-glitch 7s ease-in-out infinite' }}
          >
            {'404'.split('').map((ch, i) => (
              <span
                key={i}
                className="inline-block bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% 200%',
                  animation: `digit-float 2.6s ease-in-out ${i * 0.15}s infinite, digit-gradient 4s ease-in-out ${i * 0.2}s infinite`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="text-left rounded-2xl border border-line bg-bg-2 p-5 mb-8 font-mono text-[13px] leading-[1.9] text-ink-2 overflow-x-auto">
            <div>
              <span className="text-accent-2">{t.notFound.terminalLine1}</span>
            </div>
            <div className="text-ink-3">
              {t.notFound.terminalLine2}
              <span className={`inline-block w-[7px] h-[15px] translate-y-[2px] ml-1 bg-ink-3 ${cursorOn ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.02em] leading-[1.2] mb-3">
            {t.notFound.title}
          </h1>
          <p className="text-[15px] leading-[1.6] text-ink-2 mb-9 max-w-[440px] mx-auto">
            {t.notFound.sub}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <BtnPrimary href="#" onClick={(e) => { e.preventDefault(); onGoHome(); }}>
              {t.notFound.cta}
            </BtnPrimary>
            <BtnGhost href="/#work">
              {t.notFound.ctaSecondary}
            </BtnGhost>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { Section, Reveal, BtnGhost } from '../ui';
import Folder from '../components/Folder';
import type { Translations } from '../types';

interface AboutMeProps {
  t: Translations;
  onGoHome: () => void;
}

const HOBBY_ICONS: Record<string, React.ReactNode> = {
  mentor: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  ),
  study: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M10 18h4" />
    </svg>
  ),
  city: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V10h4v11M15 21V4h4v17" />
      <path d="M9 13h6" />
    </svg>
  ),
  sport: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16.5l-3 3 1.5 1.5 3-3" />
      <path d="M18 7.5l3-3-1.5-1.5-3 3" />
      <path d="M14.5 4.5l5 5-9 9-5-5 9-9z" />
    </svg>
  ),
  game: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="6" />
      <path d="M6 12h4m-2-2v4m9-3h.01m2 2h.01" />
    </svg>
  ),
  project: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
};

export function AboutMe({ t, onGoHome }: AboutMeProps) {
  const at = t.aboutMe;

  return (
    <>
      <Section id="about-me" eyebrow={at.eyebrow}>
        <div className="grid grid-cols-1 gap-10 items-start md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div className="md:sticky md:top-[120px]">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-line shadow-[0_25px_60px_-25px_rgba(0,0,0,0.55)]">
              <Image
                src="/guilherme-queiroz-engenheiro-de-software.webp"
                alt="Guilherme Queiroz Ribeiro, Engenheiro de Software, em Brasília"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <Reveal delay={200}>
              <div className="mt-5 flex flex-col gap-3">
                <div className="text-[13px] text-ink-3">{at.hobbiesTitle}</div>
                {at.hobbies.map((hobby) => (
                  <div key={hobby.title} className="rounded-2xl border border-line bg-card p-4 flex items-start gap-3.5">
                    <div className="w-9 h-9 shrink-0 rounded-full border border-line flex items-center justify-center text-accent">
                      {HOBBY_ICONS[hobby.icon]}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold tracking-[-0.01em]">{hobby.title}</div>
                      <p className="text-[13px] leading-[1.6] text-ink-3 mt-0.5">{hobby.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal>
              <h1 className="text-[clamp(28px,3.4vw,44px)] leading-[1.15] tracking-[-0.02em] font-semibold">
                {at.title}
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base leading-[1.8] text-ink-2 max-w-[60ch]">{at.intro}</p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-2 rounded-2xl border border-line bg-bg-2 p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-shrink-0 flex justify-center py-2 sm:py-4 sm:pl-2">
                  <Folder
                    color="#f59e0b"
                    size={0.85}
                    items={[
                      <a
                        key="pt"
                        href="/curriculo-pt.pdf"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={at.resumePt}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold tracking-[0.04em] text-[#1a1a1a]"
                      >
                        PT-BR
                      </a>,
                      <a
                        key="en"
                        href="/curriculo-en.pdf"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={at.resumeEn}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold tracking-[0.04em] text-[#1a1a1a]"
                      >
                        EN
                      </a>,
                    ]}
                  />
                </div>
                <div>
                  <div className="text-[15px] font-semibold tracking-[-0.01em] mb-1.5">{at.resumeTitle}</div>
                  <p className="text-[13.5px] leading-[1.7] text-ink-3">{at.resumeSub}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <div className="mt-2">
                <BtnGhost onClick={(e) => { e.preventDefault(); onGoHome(); }} href="/">{at.back}</BtnGhost>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

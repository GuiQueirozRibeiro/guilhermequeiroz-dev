'use client';

import Image from 'next/image';
import { Section, Reveal, BtnGhost } from '../ui';
import type { Lang, Translations } from '../types';

interface AboutMeProps {
  t: Translations;
  lang?: Lang;
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

export function AboutMe({ t, lang = 'pt', onGoHome }: AboutMeProps) {
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

              <div className="mt-2 rounded-2xl border border-line bg-bg-2 p-6 flex flex-col gap-4">
                <div>
                  <div className="text-[15px] font-semibold tracking-[-0.01em] mb-1">
                    {lang === 'pt' ? 'Currículo Profissional' : 'Professional Resume'}
                  </div>
                  <p className="text-[13.5px] leading-[1.7] text-ink-3">
                    {lang === 'pt'
                      ? 'Faça o download do currículo principal atualizado em PDF ou visualize online.'
                      : 'Download the primary updated resume in PDF format or view online.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {lang === 'pt' ? (
                    <>
                      <a
                        href="/Curriculo Guilherme Queiroz Ribeiro.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download="Curriculo Guilherme Queiroz Ribeiro.pdf"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink text-bg text-[13.5px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Baixar Currículo Principal (PDF)</span>
                      </a>
                      <a
                        href="/Resume Guilherme Queiroz Ribeiro.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download="Resume Guilherme Queiroz Ribeiro.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-card hover:border-ink-2 text-ink-2 hover:text-ink text-[13px] font-medium transition-colors"
                      >
                        <span>English Resume (EN) ↗</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href="/Resume Guilherme Queiroz Ribeiro.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download="Resume Guilherme Queiroz Ribeiro.pdf"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink text-bg text-[13.5px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        <span>Download Primary Resume (PDF)</span>
                      </a>
                      <a
                        href="/Curriculo Guilherme Queiroz Ribeiro.pdf"
                        target="_blank"
                        rel="noreferrer"
                        download="Curriculo Guilherme Queiroz Ribeiro.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-card hover:border-ink-2 text-ink-2 hover:text-ink text-[13px] font-medium transition-colors"
                      >
                        <span>Versão em Português (PT) ↗</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

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

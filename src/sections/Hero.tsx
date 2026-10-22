'use client';

import { DeviceShowcase } from '../components/DeviceShowcase';
import type { Lang, Translations } from '../types';

interface HeroProps {
  t: Translations;
  lang: Lang;
}

export function Hero({ t, lang }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Glows Sutis */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna da Esquerda: Bio, Headline, Métricas e CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[12.5px] font-medium text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.hero.availability}</span>
            </div>

            {/* Título e Headline */}
            <div>
              <p className="text-[13.5px] uppercase tracking-wider font-semibold text-cyan-400 mb-2 font-mono">
                {t.hero.role}
              </p>
              <h1 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-white leading-[1.08]">
                Guilherme Queiroz Ribeiro
              </h1>
              <p className="text-[clamp(18px,2.5vw,26px)] font-medium text-zinc-300 mt-2 leading-snug">
                {lang === 'pt'
                  ? 'Mobile, Web & APIs em produção.'
                  : 'Mobile, Web & APIs in production.'}
              </p>
            </div>

            {/* Bio Direta */}
            <p className="text-[15.5px] text-zinc-400 leading-relaxed max-w-[560px]">
              {lang === 'pt'
                ? 'Mais de 4 anos construindo aplicações corporativas publicadas na Google Play e App Store com Flutter e React Native, sistemas offline-first e plataformas web em Next.js com APIs em Node.js.'
                : 'Over 4 years building enterprise applications published on Google Play and the App Store with Flutter and React Native, offline-first systems, and Next.js web platforms with Node.js APIs.'}
            </p>

            {/* Tags da Stack */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 text-[12px] font-mono rounded-md bg-zinc-900 border border-zinc-800 text-cyan-400">
                Flutter &amp; React Native
              </span>
              <span className="px-2.5 py-1 text-[12px] font-mono rounded-md bg-zinc-900 border border-zinc-800 text-amber-400">
                Next.js &amp; TypeScript
              </span>
              <span className="px-2.5 py-1 text-[12px] font-mono rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400">
                Node.js &amp; Prisma
              </span>
              <span className="px-2.5 py-1 text-[12px] font-mono rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                PostgreSQL &amp; MySQL
              </span>
            </div>

            {/* Métricas Reais em Mini-Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[20px] font-bold text-white font-mono">4+ anos</div>
                <div className="text-[11.5px] text-zinc-400 mt-0.5 leading-tight">
                  {lang === 'pt' ? 'de engenharia' : 'engineering'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[20px] font-bold text-cyan-400 font-mono">App &amp; Play</div>
                <div className="text-[11.5px] text-zinc-400 mt-0.5 leading-tight">
                  {lang === 'pt' ? 'nas lojas oficiais' : 'on app stores'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[20px] font-bold text-emerald-400 font-mono">95%+</div>
                <div className="text-[11.5px] text-zinc-400 mt-0.5 leading-tight">
                  {lang === 'pt' ? 'testes Michelin' : 'Michelin tests'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[20px] font-bold text-amber-400 font-mono">12 Devs</div>
                <div className="text-[11.5px] text-zinc-400 mt-0.5 leading-tight">
                  {lang === 'pt' ? 'mentorados UCB' : 'mentored UCB'}
                </div>
              </div>
            </div>

            {/* Botões de Ação - Corrigido: sem bloco branco chapado */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/5561992661000?text=Ol%C3%A1%20Guilherme%2C%20vi%20seu%20portf%C3%B3lio!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-[14px] transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>{t.hero.cta_primary}</span>
                <span>↗</span>
              </a>

              <a
                href="#work"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-semibold text-[14px] transition-colors flex items-center gap-2"
              >
                <span>{t.hero.cta_secondary}</span>
                <span>↓</span>
              </a>

              <a
                href="https://www.linkedin.com/in/guilherme-queiroz-ribeiro/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-zinc-400 hover:text-white text-[13.5px] font-medium transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Coluna da Direita: Mockup do iPhone Interativo */}
          <div className="lg:col-span-5 flex justify-center">
            <DeviceShowcase lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

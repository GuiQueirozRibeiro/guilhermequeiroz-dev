'use client';

import { Section, Reveal, SpotlightCard } from '../ui';
import { SplitTitle } from '../components/SplitTitle';
import { SERVICES } from '../data/services';
import type { Lang, Translations, Service } from '../types';

const POPULAR_LABEL = { pt: 'popular', en: 'popular' } as const;

interface ServicesProps {
  t: Translations;
  lang: Lang;
}

export function Services({ t, lang }: ServicesProps) {
  const items = SERVICES[lang];
  return (
    <Section id="services" eyebrow={t.services.eyebrow}>
      <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 md:gap-8 items-end">
        <SplitTitle as="h2" className="text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.025em] font-semibold">{t.services.title}</SplitTitle>
        <p className="text-[15px] leading-[1.55] text-ink-2 max-w-[420px]">{t.services.sub}</p>
      </div>
      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
        {items.map((service, index) => <ServiceCard key={service.num} service={service} index={index} lang={lang} />)}
      </div>
    </Section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  lang: Lang;
}

export function ServiceCard({ service, index, lang }: ServiceCardProps) {
  return (
    <Reveal delay={index * 80}>
      <SpotlightCard
        spotlightColor="var(--accent)"
        className={`group relative h-full rounded-2xl p-[1px] [transition:transform_400ms_cubic-bezier(.2,.7,.15,1),box-shadow_300ms] hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,var(--accent)_35%,transparent)] ${service.popular ? 'bg-[linear-gradient(135deg,var(--accent),var(--accent-2))]' : 'bg-line'}`}
      >
        <div className="relative z-10 bg-card w-full h-full min-h-[280px] rounded-[15px] p-7 flex flex-col justify-between overflow-hidden">
          {/* Inner subtle glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] blur-[30px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {service.popular && (
            <span className="absolute top-5 right-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
              ★ {POPULAR_LABEL[lang]}
            </span>
          )}

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="font-mono text-[11px] text-ink-3 tracking-[0.12em]">{service.num} / 04</span>
            </div>
            <h3 className="text-[22px] font-semibold tracking-[-0.02em] leading-[1.2] mb-3">{service.title}</h3>
            <p className="text-sm leading-[1.55] text-ink-2">{service.description}</p>
          </div>

          <ul className="relative flex flex-col gap-2 mt-6">
            {service.features.map(feature => (
              <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-ink-2">
                <span className="flex-shrink-0 mt-[3px] text-accent font-mono">+</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

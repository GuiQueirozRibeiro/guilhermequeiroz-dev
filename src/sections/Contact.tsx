'use client';

import { Reveal, PulseDot } from '../ui';
import { CharReveal } from '../components/CharReveal';
import { useState, useEffect } from 'react';
import { CONTACT, whatsappLink } from '../lib/seo';
import type { Translations } from '../types';

interface ContactProps {
  t: Translations;
}

export function Contact({ t }: ContactProps) {
  const links = [
    { name: t.contact.whatsapp, href: whatsappLink(), hint: CONTACT.whatsappDisplay },
    { name: t.contact.email, href: `mailto:${CONTACT.email}`, hint: CONTACT.email },
    { name: t.contact.linkedin, href: CONTACT.linkedin, hint: '/in/guilherme-queiroz-ribeiro' },
    { name: t.contact.github, href: CONTACT.github, hint: `/${CONTACT.githubUser}` },
  ];

  return (
    <section id="contact" className="relative pt-16 md:pt-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-3">
        <Reveal>
          <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 font-mono text-[11px] md:text-[12.6px] tracking-[0.14em] uppercase text-ink-3">
            <span className="w-4 h-px bg-accent" />
            {t.contact.eyebrow}
          </div>
        </Reveal>

        <CharReveal as="h2" className="text-[clamp(36px,6vw,84px)] leading-none tracking-[-0.035em] font-semibold mb-7 md:mb-9">
          {t.contact.title_a}<br />
          <span className="text-accent">{t.contact.title_b}</span>
        </CharReveal>

        <div className="grid grid-cols-1 gap-8 items-start mb-12 md:grid-cols-2 md:gap-10 md:items-end md:mb-[60px]">
          <p className="text-base leading-[1.55] text-ink-2 max-w-[440px]">
            {t.contact.sub}
          </p>
          <div className="border border-line rounded-[14px] overflow-hidden bg-card divide-y divide-line">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener"
                className="grid grid-cols-[1fr_auto_auto] gap-3 md:gap-[18px] items-center py-4 md:py-[18px] px-4 md:px-[22px] text-base bg-transparent hover:bg-bg-3 hover:md:pl-8 [transition:background_250ms,padding-left_400ms_cubic-bezier(.2,.7,.15,1)]"
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs text-ink-3">{link.hint}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-line py-6 md:py-8 px-5 md:px-8 flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_1fr] items-center font-mono text-ink-3 text-[0.8em] mx-auto max-w-[1280px] tracking-widest">
        <span>{t.contact.footer}</span>
        <span className="flex items-center gap-4">
          <PulseDot /> BR / <Clock />
        </span>
        <span className="md:justify-self-end text-ink-2">
          ↑{' '}
          <a href="#top" className="text-ink-3">back to top</a>
        </span>
      </footer>
    </section>
  );
}

// Isolated in its own component so the once-a-second tick only re-renders
// this text node - not the whole Contact section (links list, CharReveal,
// footer) that used to re-render alongside it every second, forever, for as
// long as the page stayed open.
function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(
      new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      }).format(new Date())
    );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{time}</>;
}

'use client';

import { MarqueeFlipBoard } from './MarqueeFlipBoard';
import type { Lang, Translations } from '../types';

interface MarqueeProps {
  t: Translations;
  lang: Lang;
}

export function Marquee({ t, lang }: MarqueeProps) {
  return (
    <div className="relative">
      <div className="pt-6 flex items-center justify-center gap-2.5 font-mono text-[10.5px] text-ink-3 tracking-[0.18em] uppercase">
        <span className="w-5 h-px bg-accent" />
        {t.marquee.label}
        <span className="w-5 h-px bg-accent" />
      </div>

      <MarqueeFlipBoard lang={lang} />
    </div>
  );
}

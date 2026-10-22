'use client';

import { Reveal, Section } from '../ui';
import { SplitTitle } from '../components/SplitTitle';
import { ICONS } from '../icons';
import { STACK } from '../data/stack';
import { useState } from 'react';
import type { Lang, Translations } from '../types';

interface StackProps {
  t: Translations;
  lang: Lang;
}

const ALL_LABEL = { pt: 'Tudo', en: 'All' } as const;

export function Stack({ t, lang }: StackProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const items = activeGroup
    ? STACK.find(group => group.group.en === activeGroup)?.items ?? []
    : STACK.flatMap(group => group.items);

  return (
    <Section id="stack" eyebrow={t.stack.eyebrow}>
      <div className="grid grid-cols-1 gap-4 mb-10 md:grid-cols-2 md:gap-8 items-end">
        <SplitTitle as="h2" className="text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.025em] font-semibold">{t.stack.title}</SplitTitle>
        <p className="text-[15px] leading-[1.55] text-ink-2 max-w-[420px]">{t.stack.sub}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveGroup(null)}
          className="font-mono text-[11px] uppercase tracking-[0.06em] px-3.5 py-[7px] rounded-full border transition-colors duration-200"
          style={
            activeGroup === null
              ? { borderColor: 'var(--ink-2)', color: 'var(--ink)', background: 'var(--bg-2)' }
              : { borderColor: 'var(--line)', color: 'var(--ink-3)' }
          }
        >
          {ALL_LABEL[lang]}
        </button>
        {STACK.map(group => (
          <button
            key={group.group.en}
            onClick={() => setActiveGroup(group.group.en)}
            className="font-mono text-[11px] uppercase tracking-[0.06em] px-3.5 py-[7px] rounded-full border transition-colors duration-200"
            style={
              activeGroup === group.group.en
                ? { borderColor: 'var(--ink-2)', color: 'var(--ink)', background: 'var(--bg-2)' }
                : { borderColor: 'var(--line)', color: 'var(--ink-3)' }
            }
          >
            {group.group[lang]}
          </button>
        ))}
      </div>

      <Reveal>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 items-start">
          {items.map(key => (
            <IconTile key={key} iconKey={key} lang={lang} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

interface IconTileProps {
  iconKey: string;
  lang: Lang;
}

export function IconTile({ iconKey, lang }: IconTileProps) {
  const icon = ICONS[iconKey];
  if (!icon) return null;

  const tileColor = icon.color === 'currentColor' ? 'var(--ink)' : icon.color;
  const tileShadow = icon.color === 'currentColor' ? 'rgba(0,0,0,0.25)' : `${icon.color}55`;

  return (
    <div
      className="group relative p-4 rounded-xl border border-line bg-card flex flex-col gap-2.5 overflow-hidden [transition:border-color_250ms_ease,transform_300ms_cubic-bezier(.2,.7,.15,1),box-shadow_300ms_ease] hover:-translate-y-[3px] hover:border-[var(--tile-color)] hover:shadow-[0_10px_30px_-10px_var(--tile-sqhadow)]"
      style={{ '--tile-color': tileColor, '--tile-shadow': tileShadow } as React.CSSProperties}
    >
      <div
        className="w-10 h-10 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.15,1)] group-hover:scale-[1.08] group-hover:-rotate-[4deg]"
        style={{ color: icon.color }}
      >
        <svg width="40" height="40" viewBox="0 0 48 48">{icon.svg}</svg>
      </div>
      <div>
        <div className="text-[13.5px] font-medium tracking-[-0.01em]">{icon.label}</div>
        <div className="font-mono text-[10.5px] text-ink-3 leading-[1.45] mt-1 overflow-hidden max-h-0 opacity-0 group-hover:max-h-[60px] group-hover:opacity-100 transition-[max-height,opacity] duration-[350ms,300ms] ease">
          {icon.desc[lang]}
        </div>
      </div>
    </div>
  );
}

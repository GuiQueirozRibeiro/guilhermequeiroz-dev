'use client';

import type { Lang, Theme, Translations } from '../types';

interface TweaksProps {
  enabled: boolean;
  t: Translations;
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function Tweaks({ enabled, t, lang, setLang, theme, setTheme }: TweaksProps) {
  if (!enabled) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[200] p-4 min-w-[240px] bg-bg-2 backdrop-blur-[18px] border border-line rounded-[14px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]">
      <div className="font-mono text-[11px] text-ink-3 tracking-[0.14em] uppercase mb-3 pb-[10px] border-b border-line">
        {t.tweaks.title}
      </div>

      <div className="mb-3">
        <div className="font-mono text-[10.5px] text-ink-3 tracking-[0.08em] uppercase mb-1.5">
          {t.tweaks.theme}
        </div>
        <div className="flex gap-1 p-[3px] border border-line rounded-[10px]">
          {(['dark', 'light'] as Theme[]).map(themeOption => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={`flex-1 py-[6px] px-[10px] rounded-[7px] text-xs capitalize transition-colors duration-150 ${theme === themeOption ? 'bg-ink text-bg' : 'bg-transparent text-ink-2'}`}
            >
              {themeOption}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="font-mono text-[10.5px] text-ink-3 tracking-[0.08em] uppercase mb-1.5">
          {t.tweaks.lang}
        </div>
        <div className="flex gap-1 p-[3px] border border-line rounded-[10px]">
          {(['pt', 'en'] as Lang[]).map(language => (
            <button
              key={language}
              onClick={() => setLang(language)}
              className={`flex-1 py-[6px] px-[10px] rounded-[7px] text-xs uppercase tracking-[0.08em] transition-colors duration-150 ${lang === language ? 'bg-ink text-bg' : 'bg-transparent text-ink-2'}`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { createContext, useContext, useEffect, useRef, useState, Fragment, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { I18N } from '@/i18n';
import type { Lang, Theme, Translations } from '@/types';
// Imported directly from their own files, not the `@/sections` barrel:
// `AppShell` wraps every route, so anything pulled in through the barrel
// (which re-exports every section from one module) would ship Work/About/
// Highlights/etc. on every page load, including `/project/[id]`.
import { Nav } from '@/sections/Nav';
import { Tweaks } from '@/sections/Tweaks';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  language: 'pt',
  theme: 'dark',
} /*EDITMODE-END*/;

interface AppShellContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: Translations;
  onOpenProject: (id: string) => void;
  onGoHome: () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell(): AppShellContextValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within <AppShell>');
  return ctx;
}

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>(TWEAK_DEFAULTS.language as Lang);
  // Always starts at the same default the server rendered with - reading the
  // real (possibly different) value from the DOM here, during render, would
  // make the very first client render diverge from the SSR output and throw
  // a hydration-mismatch error. The actual value is picked up right after,
  // in an effect (see below).
  const [theme, setTheme] = useState<Theme>(TWEAK_DEFAULTS.theme as Theme);
  const [tweaksOn, setTweaksOn] = useState(false);
  const skipNextThemeWrite = useRef(true);


  // The inline script in layout.tsx already set the correct data-theme
  // attribute (from localStorage / prefers-color-scheme) before hydration -
  // that's what avoids a flash of the wrong theme. Pick that real value up
  // into React state post-mount, so it never affects the hydration diff.
  useEffect(() => {
    const initial = document.documentElement.getAttribute('data-theme');
    if ((initial === 'light' || initial === 'dark') && initial !== theme) {
      // Intentional: this is the one-time hand-off from the pre-hydration
      // inline script's DOM state into React state, not a derived value that
      // could be computed during render instead.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Skip the first run - the DOM attribute is already correct pre-hydration
    // (see effect above), so writing here too would just flash back to the
    // SSR default before the real value gets applied.
    if (skipNextThemeWrite.current) {
      skipNextThemeWrite.current = false;
      return;
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  useEffect(() => {
    function onMsg(e: MessageEvent) {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOn(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOn(false);
    }
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const [isChangingLang, setIsChangingLang] = useState(false);

  const updateLang = (l: Lang) => {
    if (l === lang) return;
    setIsChangingLang(true);
    setTimeout(() => {
      setLang(l);
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { language: l } }, '*');
      setTimeout(() => {
        setIsChangingLang(false);
      }, 60);
    }, 160);
  };

  const updateTheme = (v: Theme) => {
    setTheme(v);
    try {
      window.localStorage.setItem('theme', v);
    } catch {
      // localStorage unavailable (private mode, etc.) - theme just won't persist
    }
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: v } }, '*');
  };

  const onOpenProject = (id: string) => {
    router.push(`/project/${id}`);
  };

  const onGoHome = () => {
    router.push('/');
  };

  const t: Translations = I18N[lang];

  return (
    <AppShellContext.Provider value={{ lang, setLang: updateLang, theme, setTheme: updateTheme, t, onOpenProject, onGoHome }}>
      <Fragment>
        <Nav lang={lang} setLang={updateLang} t={t} theme={theme} setTheme={updateTheme} onRouteHome={onGoHome} />
        <div className={`transition-all duration-300 ease-out ${isChangingLang ? 'opacity-0 translate-y-1 blur-[1px] pointer-events-none' : 'opacity-100 translate-y-0 blur-0'}`}>
          {children}
        </div>
        <Tweaks enabled={tweaksOn} t={t} lang={lang} setLang={updateLang} theme={theme} setTheme={updateTheme} />
      </Fragment>
    </AppShellContext.Provider>
  );
}

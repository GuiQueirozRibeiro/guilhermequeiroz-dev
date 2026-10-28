'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Lang, Theme, Translations } from '../types';

interface NavProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  theme: Theme;
  setTheme: (v: Theme) => void;
  onRouteHome: () => void;
}

export function Nav({ lang, setLang, t, theme, setTheme, onRouteHome }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onRouteHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navItems = [
    { id: 'work', label: t.nav.work },
    { id: 'about', label: t.nav.about },
    { id: 'highlights', label: t.nav.highlights },
    { id: 'stack', label: t.nav.stack },
    { id: 'services', label: t.nav.services },
  ];

  return (
    <>
      {/* Desktop/tablet nav pill */}
      <header className={`hidden md:flex fixed top-0 inset-x-0 z-50 justify-center pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(.2,.7,.15,1)] ${scrolled ? 'py-[14px] px-6' : 'py-[22px] px-6'}`}>
        <nav className={`pointer-events-auto grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-full backdrop-blur-[18px] backdrop-saturate-[1.3] border border-line transition-all duration-500 ease-[cubic-bezier(.2,.7,.15,1)] ${
          scrolled
            ? 'w-[min(640px,calc(100%-40px))] py-2 pr-[10px] pl-[18px] bg-[color-mix(in_oklab,var(--bg-2)_85%,transparent)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]'
            : 'w-[min(1200px,calc(100%-40px))] py-3 pr-[14px] pl-[22px] bg-[color-mix(in_oklab,var(--bg-2)_55%,transparent)] shadow-[0_2px_14px_rgba(0,0,0,0.1)]'
        }`}>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onRouteHome();
            }}
            className="flex items-center gap-2.5 font-semibold tracking-[-0.02em]"
          >
            <Image src="/logo.png" alt="Logo" width={26} height={26} className="w-[26px] h-[26px] object-contain rounded-[7px]" />
            <span className={`text-[13.5px] ${scrolled ? 'hidden' : 'inline'}`}>
              guilherme<span className="text-ink-3">ribeiro</span>
            </span>
          </a>

          <ul className={`flex justify-center list-none text-[13px] ${scrolled ? 'gap-4' : 'gap-6'}`}>
            {navItems.map(navItem => (
              <li key={navItem.id}>
                <a
                  href={`#${navItem.id}`}
                  onClick={(e) => scrollToSection(e, navItem.id)}
                  className="text-ink-2 py-1.5 px-1 transition-colors duration-200 hover:text-ink"
                >
                  {navItem.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/sobre" className="text-ink-2 py-1.5 px-1 transition-colors duration-200 hover:text-ink">
                {t.nav.aboutMe}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="toggle theme"
              className="w-8 h-8 rounded-full border border-line inline-flex items-center justify-center text-ink-2 transition-all duration-200 hover:text-ink hover:border-ink-2"
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>

            {/* Language Switch Toggle */}
            <div className="relative flex items-center bg-bg-2 border border-line rounded-full p-0.5 text-[11px] font-mono select-none">
              <span
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-ink transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm pointer-events-none ${
                  lang === 'en' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
                }`}
              />
              <button
                type="button"
                onClick={() => setLang('pt')}
                className={`relative z-10 py-1 px-2.5 rounded-full uppercase tracking-[0.08em] transition-colors duration-200 font-semibold ${
                  lang === 'pt' ? 'text-bg' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`relative z-10 py-1 px-2.5 rounded-full uppercase tracking-[0.08em] transition-colors duration-200 font-semibold ${
                  lang === 'en' ? 'text-bg' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`items-center gap-2 py-[7px] px-[14px] rounded-full bg-ink text-bg text-[12.5px] font-medium ${scrolled ? 'hidden' : 'inline-flex'}`}
            >
              {t.nav.contact}
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile: hamburger only, no bar - toggles into an X and stays on top of the drawer */}
      <button
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label="menu"
        aria-expanded={menuOpen}
        className="md:hidden fixed top-4 right-4 z-50 w-11 h-11 rounded-full border border-line bg-[color-mix(in_oklab,var(--bg-2)_78%,transparent)] backdrop-blur-md inline-flex items-center justify-center text-ink-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] transition-all duration-200"
      >
        {menuOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        )}
      </button>

      {/* Mobile drawer backdrop - dims the page without covering it, drawer takes only part of the width */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
        style={{ background: 'color-mix(in oklab, var(--bg) 55%, transparent)', backdropFilter: 'blur(3px)' }}
        aria-hidden="true"
      />

      {/* Mobile drawer panel - slides in from the right, partial width */}
      <div
        className={`md:hidden fixed top-0 right-0 z-[45] h-full w-[78%] max-w-[320px] flex flex-col border-l border-line bg-[color-mix(in_oklab,var(--bg-2)_96%,transparent)] backdrop-blur-xl shadow-[-20px_0_50px_-20px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-[cubic-bezier(.2,.7,.15,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onRouteHome();
          }}
          className="flex items-center gap-2.5 font-semibold tracking-[-0.02em] px-6 pt-6 pb-2"
        >
          <Image src="/logo.png" alt="Logo" width={26} height={26} className="w-[26px] h-[26px] object-contain rounded-[7px]" />
          <span className="text-[13.5px]">guilherme<span className="text-ink-3">queiroz</span></span>
        </a>

        <nav className="flex flex-col mt-4 px-2 overflow-y-auto">
          {navItems.map((navItem, i) => (
            <a
              key={navItem.id}
              href={`#${navItem.id}`}
              onClick={(e) => scrollToSection(e, navItem.id)}
              className="text-[19px] font-semibold tracking-[-0.02em] text-ink-2 py-3 px-4 rounded-lg transition-colors duration-200 hover:text-ink hover:bg-bg-3"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              {navItem.label}
            </a>
          ))}
          <Link
            href="/sobre"
            onClick={() => setMenuOpen(false)}
            className="text-[19px] font-semibold tracking-[-0.02em] text-ink-2 py-3 px-4 rounded-lg transition-colors duration-200 hover:text-ink hover:bg-bg-3"
            style={{ transitionDelay: menuOpen ? `${navItems.length * 40}ms` : '0ms' }}
          >
            {t.nav.aboutMe}
          </Link>
        </nav>

        <div className="mt-auto flex flex-col gap-4 p-6 border-t border-line">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="py-3 px-5 rounded-full bg-ink text-bg text-[14px] font-medium text-center"
          >
            {t.nav.contact}
          </a>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="toggle theme"
              className="w-9 h-9 rounded-full border border-line inline-flex items-center justify-center text-ink-2 transition-all duration-200 hover:text-ink hover:border-ink-2"
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>

            {/* Language Switch Toggle Mobile */}
            <div className="relative flex items-center bg-bg-2 border border-line rounded-full p-0.5 text-[11px] font-mono select-none">
              <span
                className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-ink transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm pointer-events-none ${
                  lang === 'en' ? 'translate-x-[calc(100%+2px)]' : 'translate-x-0'
                }`}
              />
              <button
                type="button"
                onClick={() => setLang('pt')}
                className={`relative z-10 py-1 px-2.5 rounded-full uppercase tracking-[0.08em] transition-colors duration-200 font-semibold ${
                  lang === 'pt' ? 'text-bg' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`relative z-10 py-1 px-2.5 rounded-full uppercase tracking-[0.08em] transition-colors duration-200 font-semibold ${
                  lang === 'en' ? 'text-bg' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

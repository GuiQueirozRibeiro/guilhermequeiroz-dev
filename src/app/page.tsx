'use client';

import dynamic from 'next/dynamic';
import { useAppShell } from './app-shell';
// Imported directly from their own files rather than the `@/sections` barrel
// (`src/sections/index.ts`) - that barrel re-exports every section from one
// module, so importing anything through it (even just Hero/Marquee) pulls
// every other section's module into the same eager chunk, which would
// silently defeat the `dynamic()` splitting below.
import { Hero } from '@/sections/Hero';
import { Marquee } from '@/sections/Marquee';

// Everything below is below-the-fold on first paint (the hero fills the
// viewport). Splitting these out of the initial client bundle keeps their
// weight (GSAP timelines, the GitHub calendar chain, icon set, etc.) off
// the critical path for hydrating
// the hero. `ssr` stays at its default (true), so the HTML is still fully
// server-rendered for content/SEO - only the client JS is deferred.
const Work = dynamic(() => import('@/sections/Work').then((mod) => mod.Work));
const About = dynamic(() => import('@/sections/About').then((mod) => mod.About));
const Highlights = dynamic(() => import('@/sections/Highlights').then((mod) => mod.Highlights));
const Stack = dynamic(() => import('@/sections/Stack').then((mod) => mod.Stack));
const Services = dynamic(() => import('@/sections/Services').then((mod) => mod.Services));
const Contact = dynamic(() => import('@/sections/Contact').then((mod) => mod.Contact));

export default function HomePage() {
  const { t, lang, onOpenProject } = useAppShell();
  return (
    <main>
      <Hero t={t} lang={lang} />
      <Marquee t={t} lang={lang} />
      <Work t={t} lang={lang} onOpenProject={onOpenProject} />
      <About t={t} />
      <Highlights t={t} lang={lang} onOpenProject={onOpenProject} />
      <Stack t={t} lang={lang} />
      <Services t={t} lang={lang} />
      <Contact t={t} />
    </main>
  );
}

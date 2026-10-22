'use client';

import { useAppShell } from '../app-shell';
// Imported directly, not from the `@/sections` barrel - see the note in
// `app-shell.tsx` / `page.tsx`: importing through `index.ts` would pull every
// home-page section into this route's bundle too.
import { AboutMe } from '@/sections/AboutMe';

export function AboutMeClient() {
  const { t, onGoHome } = useAppShell();

  return <AboutMe t={t} onGoHome={onGoHome} />;
}

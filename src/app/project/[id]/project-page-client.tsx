'use client';

import { useAppShell } from '../../app-shell';
// Imported directly, not from the `@/sections` barrel - see the same note in
// `app-shell.tsx` / `page.tsx`: going through `index.ts` would pull every
// home-page section into this route's bundle too.
import { ProjectPage } from '@/sections/ProjectPage';

interface ProjectPageClientProps {
  id: string;
}

export function ProjectPageClient({ id }: ProjectPageClientProps) {
  const { t, lang, onGoHome, onOpenProject } = useAppShell();

  return <ProjectPage id={id} lang={lang} t={t} onBack={onGoHome} onOpenProject={onOpenProject} />;
}

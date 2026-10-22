import type { Metadata } from 'next';
import { OG_LOCALE, SITE_NAME, SITE_URL, SOBRE_OG_IMAGE } from '@/lib/seo';
import { AboutMeClient } from './about-me-client';

const TITLE = 'Sobre mim - Guilherme Queiroz Ribeiro | Engenheiro de Software';
const DESCRIPTION = 'Um pouco além do código: quem é Guilherme Queiroz Ribeiro, engenheiro de software em Brasília - trajetória, mentoria e currículo para baixar.';
const PAGE_URL = `${SITE_URL}/sobre`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'profile',
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: OG_LOCALE,
    images: [{ ...SOBRE_OG_IMAGE, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: SOBRE_OG_IMAGE.url, alt: TITLE }],
  },
};

export default function SobrePage() {
  return (
    <main>
      <AboutMeClient />
    </main>
  );
}

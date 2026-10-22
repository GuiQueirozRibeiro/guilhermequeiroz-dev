import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { DM_Sans, JetBrains_Mono, Outfit, Archivo } from 'next/font/google';
import { AppShell } from './app-shell';
import { OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, OG_LOCALE, PERSON, SITE_NAME, SITE_URL } from '@/lib/seo';
import './globals.css';

// Only the weights actually referenced by a Tailwind `font-*` utility (or a
// hardcoded `font-weight` in globals.css) anywhere in the app — verified via
// a full-repo grep before trimming. Every unused weight is a whole separate
// font file the browser has to fetch; e.g. Archivo was shipping 5 weights
// (400/500/600/700/900) for a family that's only ever rendered at 900
// (`font-black`, hero word stack + preloader glyph).
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // 700 (font-bold) is never applied to DM Sans — every font-bold in the app pairs with font-mono, so it renders in JetBrains Mono instead
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'], // 300/500 unused
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'], // every h1/h2/h3 in the app renders with font-semibold (600) — no other weight
  variable: '--font-outfit',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['900'], // only ever used at font-black (900) — hero word stack + "2+" badge + preloader glyph
  variable: '--font-archivo',
  display: 'swap',
});

const SITE_TITLE = 'Guilherme Queiroz Ribeiro | Engenheiro de Software · Mobile, Web & APIs';
const SITE_DESCRIPTION = 'Engenheiro de software em Brasília. Apps React Native e Flutter, sites em Next.js e APIs em Node.js — do banco de dados à publicação nas lojas. Fundador da Exímia Tech.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/guilherme-icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/guilherme-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/guilherme-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/guilherme-icon-192.png',
    apple: '/guilherme-icon-180.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: OG_LOCALE,
    images: [{ url: OG_IMAGE, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: OG_IMAGE, alt: SITE_TITLE }],
  },
  // Cole aqui o código gerado pelo Google Search Console (Settings > Ownership verification > HTML tag):
  // verification: { google: 'SEU_CODIGO_AQUI' },
};

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON.name,
  alternateName: PERSON.alternateName,
  jobTitle: PERSON.jobTitle,
  description: PERSON.description,
  url: PERSON.url,
  image: PERSON.image,
  worksFor: {
    '@type': 'Organization',
    name: PERSON.worksFor,
  },
  knowsAbout: PERSON.knowsAbout,
  sameAs: PERSON.sameAs,
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

const THEME_INIT_SCRIPT = `(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${outfit.variable} ${archivo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script type="application/ld+json">{JSON.stringify(PERSON_JSON_LD)}</script>
      </head>
      <body>
        <div id="app">
          <AppShell>{children}</AppShell>
        </div>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

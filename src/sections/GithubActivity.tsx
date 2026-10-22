'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppShell } from '../app/app-shell';
import { Reveal } from '../ui';
import { gsap, prefersReducedMotion } from '../lib/animation';
import { CONTACT } from '../lib/seo';
import type { Lang } from '../types';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then(mod => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div className="text-ink-3 text-xs font-mono animate-pulse">carregando contribuições…</div>,
  }
);

const GITHUB_USERNAME = CONTACT.githubUser;

const STRINGS = {
  pt: {
    title: 'Atividade no GitHub',
    sub: 'Contribuições dos últimos 12 meses — direto do meu perfil.',
    link: 'Ver perfil completo',
    error: 'não consegui carregar as contribuições agora — tenta de novo mais tarde.',
    available: 'Aberto a novas oportunidades',
    streakCurrent: (n: number) => `${n} dia${n === 1 ? '' : 's'} seguidos commitando`,
    streakStarting: 'começando um novo streak hoje',
    streakLongest: (n: number) => `recorde: ${n} dias consecutivos`,
  },
  en: {
    title: 'GitHub activity',
    sub: "Contributions over the last 12 months — pulled straight from my profile.",
    link: 'View full profile',
    error: "couldn't load contributions right now — try again later.",
    available: 'Open to new opportunities',
    streakCurrent: (n: number) => `${n} day${n === 1 ? '' : 's'} streak going`,
    streakStarting: 'starting a new streak today',
    streakLongest: (n: number) => `record: ${n}-day streak`,
  },
} as const;

/** [startHour, endHour) in America/Sao_Paulo time -> a little quip about what I'm probably doing. */
const TIME_JOKES: Record<Lang, { from: number; to: number; icon: string; text: string }[]> = {
  pt: [
    { from: 0, to: 5, icon: '🌙', text: 'de madrugada e ainda codando' },
    { from: 5, to: 8, icon: '🌅', text: 'acabou de amanhecer e já tô no teclado' },
    { from: 8, to: 12, icon: '☕', text: 'café na mão, código na tela' },
    { from: 12, to: 14, icon: '🍽️', text: 'hora do almoço, mas o commit não espera' },
    { from: 14, to: 18, icon: '💻', text: 'tarde de foco total' },
    { from: 18, to: 22, icon: '🌆', text: 'fim de tarde resolvendo mais um bug' },
    { from: 22, to: 24, icon: '🌃', text: 'madrugando de novo' },
  ],
  en: [
    { from: 0, to: 5, icon: '🌙', text: 'up at this hour still coding' },
    { from: 5, to: 8, icon: '🌅', text: 'just woke up and already at the keyboard' },
    { from: 8, to: 12, icon: '☕', text: 'coffee in hand, code on screen' },
    { from: 12, to: 14, icon: '🍽️', text: "it's lunchtime, but the commit won't wait" },
    { from: 14, to: 18, icon: '💻', text: 'deep focus afternoon' },
    { from: 18, to: 22, icon: '🌆', text: 'evening, still chasing one more bug' },
    { from: 22, to: 24, icon: '🌃', text: 'up late again' },
  ],
};

const DEV_QUIPS: Record<Lang, string[]> = {
  pt: [
    'tabs > spaces (não brigue comigo)',
    '99 problemas e todos são CSS',
    'funciona na minha máquina 🤷',
    'git commit -m "fix" (de novo)',
    'café: sim. sono: não.',
    '"depois eu refatoro" — eu, sempre',
    'prod tá on, reza',
  ],
  en: [
    'tabs > spaces (fight me)',
    '99 problems and they are all CSS',
    'works on my machine 🤷',
    'git commit -m "fix" (again)',
    'coffee: yes. sleep: no.',
    '"I\'ll refactor it later" — me, always',
    "prod is up, don't jinx it",
  ],
};

interface GithubActivityProps {
  lang: Lang;
}

interface GitHubProfile {
  avatar_url: string;
  login: string;
  bio: string | null;
}

interface Streaks {
  current: number;
  longest: number;
}

interface StatusSlide {
  icon: string;
  text: string;
  href?: string;
}

function computeStreaks(contributions: { date: string; count: number }[]): Streaks {
  let longest = 0;
  let running = 0;
  for (const day of contributions) {
    if (day.count > 0) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  let current = 0;
  for (let i = contributions.length - 1; i >= 0; i -= 1) {
    const day = contributions[i];
    if (day.count > 0) {
      current += 1;
      continue;
    }
    if (i === contributions.length - 1) continue; // today isn't over yet — no penalty
    break;
  }
  return { current, longest };
}

function getSaoPauloHour(): number {
  const hourStr = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  }).format(new Date());
  return Number.parseInt(hourStr, 10) % 24;
}

export function GithubActivity({ lang }: GithubActivityProps) {
  const { theme } = useAppShell();
  const s = STRINGS[lang];

  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [streaks, setStreaks] = useState<Streaks | null>(null);
  // Picked once per mount (lazy initializer), not inside the slides useMemo —
  // Math.random()/the current hour are impure reads and useMemo must stay pure.
  const [quipIndex] = useState(() => Math.floor(Math.random() * DEV_QUIPS.pt.length));
  const [mountHour] = useState(() => getSaoPauloHour());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`GitHub API responded ${res.status}`))))
      .then((data) => {
        if (data?.avatar_url) setProfile(data);
      })
      .catch((error) => console.error('Error fetching GitHub user data:', error));
  }, []);

  // Same public contribution-data source the calendar itself uses under the
  // hood (see node_modules/react-github-calendar), fetched independently here
  // just to derive streaks — decoupled on purpose so it doesn't depend on
  // reaching into the calendar's internals.
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`Contributions API responded ${res.status}`))))
      .then((data) => {
        if (Array.isArray(data?.contributions)) setStreaks(computeStreaks(data.contributions));
      })
      .catch((error) => console.error('Error fetching GitHub contribution data:', error));
  }, []);

  const bio = profile?.bio;
  const streakCurrent = streaks?.current;
  const streakLongest = streaks?.longest;

  const slides = useMemo<StatusSlide[]>(() => {
    if (!profile) return [];
    const list: StatusSlide[] = [];

    if (bio) list.push({ icon: '💭', text: bio });

    if (streakCurrent !== undefined) {
      list.push(
        streakCurrent > 0
          ? { icon: '🔥', text: s.streakCurrent(streakCurrent) }
          : { icon: '🌱', text: s.streakStarting }
      );
      if (streakLongest && streakLongest > 0) list.push({ icon: '🏆', text: s.streakLongest(streakLongest) });
    }

    list.push({ icon: '🚀', text: s.available });

    const joke = TIME_JOKES[lang].find((j) => mountHour >= j.from && mountHour < j.to) ?? TIME_JOKES[lang][0];
    list.push({ icon: joke.icon, text: joke.text });

    list.push({ icon: '💬', text: DEV_QUIPS[lang][quipIndex] });

    return list;
  }, [profile, bio, streakCurrent, streakLongest, lang, mountHour, quipIndex, s]);

  // react-activity-calendar (used under react-github-calendar) renders real
  // <rect> day-blocks even in its own internal "loading" state (empty
  // placeholder data), then swaps in a brand-new set of <rect> elements once
  // its data fetch resolves — so a one-shot "wait for the first rects" observer
  // ends up animating the placeholder blocks and going silent once they're
  // replaced. Instead, the observer keeps watching for the lifetime of the
  // component and every childList mutation re-applies the blink to whatever
  // <rect> set currently exists, killing/replacing tweens each time so we
  // always end up animating the final, real calendar.
  useEffect(() => {
    const container = calendarRef.current;
    if (!container || prefersReducedMotion()) return;

    let tweens: gsap.core.Tween[] = [];
    // A full year of contributions is ~365+ day-cells — that's 365+ independent
    // repeat:-1/yoyo:true tweens on GSAP's ticker, forever, even long after the
    // user has scrolled past this card. Each one is cheap alone, but GSAP still
    // has to advance every tween on every ticker frame, so at this count it's a
    // real, permanent main-thread cost. Pausing them while the card is off-
    // screen (and resuming on the way back) removes that cost without changing
    // how the blink looks or times while it's actually visible.
    let visible = true;

    const applyBlink = () => {
      const blocks = container.querySelectorAll('rect[data-date]');
      tweens.forEach((tween) => tween.kill());
      tweens = Array.from(blocks).map((block) => {
        const tween = gsap.to(block, {
          opacity: 0.2,
          duration: gsap.utils.random(0.45, 0.85),
          delay: gsap.utils.random(0, 2.5),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        if (!visible) tween.pause();
        return tween;
      });
    };

    const mutationObserver = new MutationObserver(applyBlink);
    mutationObserver.observe(container, { childList: true, subtree: true });
    applyBlink();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        tweens.forEach((tween) => (visible ? tween.resume() : tween.pause()));
      },
      { rootMargin: '200px' }
    );
    visibilityObserver.observe(container);

    return () => {
      mutationObserver.disconnect();
      visibilityObserver.disconnect();
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

  return (
    <Reveal className="mt-6 rounded-2xl border border-line bg-card p-5 md:p-6">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-line hover:border-ink-2 transition-colors duration-200"
          >
            {profile ? (
              <Image src={profile.avatar_url} alt={profile.login} width={40} height={40} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-line animate-pulse" />
            )}
          </a>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-ink flex items-center gap-2">
              {s.title}
              {profile && <span className="font-mono text-[11px] font-normal text-ink-3 truncate">@{profile.login}</span>}
            </div>
            <div className="text-[12px] text-ink-3 mt-1 font-mono">{s.sub}</div>
          </div>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 hover:text-ink transition-colors duration-200 flex-shrink-0"
        >
          {s.link}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </div>

      <div className="flex items-center gap-8">
        <div ref={calendarRef} className="overflow-x-auto text-ink-3 min-w-0 w-full lg:w-auto">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme={theme}
            blockSize={11}
            blockMargin={4}
            blockRadius={2}
            fontSize={11}
            errorMessage={s.error}
            labels={{
              totalCount:
                lang === 'pt'
                  ? '{{count}} contribuições em {{year}}'
                  : '{{count}} contributions in {{year}}',
            }}
          />
        </div>

        <StatusTickerRotator slides={slides} />
      </div>
    </Reveal>
  );
}


// Owns the rotation's own interval/state so the tick every 4.5s only
// re-renders this small subtree — not the whole GithubActivity section
// (profile fetch state, the calendar wrapper, etc.) that was previously
// re-rendered alongside it every time the slide advanced.
function StatusTickerRotator({ slides }: { slides: StatusSlide[] }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setSlideIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="hidden lg:block ml-auto pl-8 border-l border-line flex-shrink-0 w-[210px] min-h-[32px]"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <StatusTicker slide={slides[slideIndex % slides.length]} />
    </div>
  );
}

function StatusTicker({ slide }: { slide: StatusSlide }) {
  const content = (
    <span key={slide.text} className="gh-ticker-slide flex items-start gap-2">
      <span className="text-[15px] leading-[1.2] flex-shrink-0" aria-hidden="true">{slide.icon}</span>
      <span className="text-[12px] text-ink-2 leading-[1.4]">{slide.text}</span>
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes gh-ticker-fade { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
        .gh-ticker-slide { animation: gh-ticker-fade 0.4s ease; }
        @media (prefers-reduced-motion: reduce) {
          .gh-ticker-slide { animation: none; }
        }
      `}</style>
      {slide.href ? (
        <a href={slide.href} target="_blank" rel="noreferrer" className="block hover:text-ink transition-colors duration-200">
          {content}
        </a>
      ) : (
        content
      )}
    </>
  );
}

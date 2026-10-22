import type { Icon } from './types';

const ICONS: Record<string, Icon> = {
  typescript: {
    label: "TypeScript", color: "#3178c6", desc: { pt: "Tipagem estática para JavaScript em escala.", en: "Static typing for JavaScript at scale." },
    svg: <g>
      <rect x="4" y="4" width="40" height="40" rx="5" fill="currentColor" />
      <text x="24" y="32" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="16" fill="#fff">TS</text>
    </g>
  },
  javascript: {
    label: "JavaScript", color: "#f7df1e", desc: { pt: "Fundação da web moderna.", en: "Foundation of the modern web." },
    svg: <g>
      <rect x="4" y="4" width="40" height="40" rx="5" fill="currentColor" />
      <text x="24" y="32" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="16" fill="#000">JS</text>
    </g>
  },
  sql: {
    label: "SQL / PL/pgSQL", color: "#0891b2", desc: { pt: "Queries, funções e políticas de segurança.", en: "Queries, functions and security policies." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="24" cy="12" rx="14" ry="5" />
      <path d="M10 12v10c0 2.76 6.27 5 14 5s14-2.24 14-5V12" />
      <path d="M10 22v10c0 2.76 6.27 5 14 5s14-2.24 14-5V22" />
    </g>
  },
  react: {
    label: "React", color: "#61dafb", desc: { pt: "UI declarativa baseada em componentes.", en: "Declarative component-based UI." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <ellipse cx="24" cy="24" rx="18" ry="7" />
      <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)" />
    </g>
  },
  nextjs: {
    label: "Next.js", color: "currentColor", desc: { pt: "Framework React full-stack com SSR híbrido.", en: "Full-stack React framework with hybrid SSR." },
    svg: <g>
      <circle cx="24" cy="24" r="20" fill="currentColor" />
      <path d="M17 14v20M31 14l0 9" stroke="var(--bg)" strokeWidth="2" />
      <path d="M17 14 L34 34" stroke="var(--bg)" strokeWidth="2" />
    </g>
  },
  tailwind: {
    label: "Tailwind CSS", color: "#06b6d4", desc: { pt: "Utilitários CSS para velocidade e consistência.", en: "CSS utilities for speed and consistency." },
    svg: <g fill="currentColor">
      <path d="M14 20c2-5 5-7 10-7s7 2 9 6c-2-3-4-4-7-3-2 1-3 2-5 5-3 5-6 7-11 7-5 0-7-2-9-6 2 3 4 4 7 3 2-1 3-2 6-5z" />
      <path d="M22 30c2-5 5-7 10-7s7 2 9 6c-2-3-4-4-7-3-2 1-3 2-5 5-3 5-6 7-11 7-5 0-7-2-9-6 2 3 4 4 7 3 2-1 3-2 6-5z" opacity="0.6" />
    </g>
  },
  shadcn: {
    label: "Shadcn/ui", color: "currentColor", desc: { pt: "Biblioteca de componentes copiáveis em React.", en: "Copy-paste React component library." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M34 10 L10 34" />
      <path d="M40 20 L20 40" />
    </g>
  },
  gsap: {
    label: "GSAP", color: "#88ce02", desc: { pt: "Motor de animação performático e expressivo.", en: "Performant, expressive animation engine." },
    svg: <g fill="currentColor">
      <circle cx="24" cy="24" r="18" />
      <text x="24" y="29" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="12" fill="#000">GSAP</text>
    </g>
  },
  nodejs: {
    label: "Node.js", color: "#5fa04e", desc: { pt: "JavaScript no servidor.", en: "JavaScript on the server." },
    svg: <g fill="currentColor">
      <path d="M24 4 L42 14 V34 L24 44 L6 34 V14 Z" />
    </g>
  },
  supabase: {
    label: "Supabase", color: "#3ecf8e", desc: { pt: "Backend-as-a-service baseado em PostgreSQL.", en: "PostgreSQL-backed backend-as-a-service." },
    svg: <g>
      <path d="M27 6 L10 28 h14 L22 44 L38 20 h-14 Z" fill="currentColor" />
    </g>
  },
  firebase: {
    label: "Firebase",
    color: "#FFCA28", // Cor de destaque para o texto/borda se necessário
    desc: {
      pt: "Backend como serviço e infraestrutura cloud.",
      en: "Backend as a service and cloud infrastructure."
    },
    svg: (
      <g transform="scale(0.4) translate(0, 0)">
        <path
          d="M22.5752 87.933C26.3634 89.4568 30.4722 90.3615 34.7873 90.5132C40.6261 90.717 46.1816 89.5089 51.1455 87.2147C45.1923 84.8757 39.8009 81.4554 35.1974 77.2024C32.2171 81.9798 27.805 85.7506 22.5752 87.933Z"
          fill="#FF9100"
        />
        <path
          d="M35.1996 77.2049C24.6952 67.4909 18.3219 53.4295 18.8613 38.0059C18.8787 37.5063 18.906 37.0042 18.9359 36.5046C17.0542 36.0174 15.0905 35.7216 13.0697 35.6495C10.1764 35.5476 7.37501 35.908 4.73026 36.6512C1.92643 41.5629 0.233686 47.1979 0.0224039 53.2356C-0.521958 68.8158 8.90619 82.4273 22.5749 87.9331C27.8047 85.7532 32.2168 81.9849 35.1996 77.2049Z"
          fill="#FFC400"
        />
        <path
          d="M35.1998 77.2047C37.6433 73.2973 39.1222 68.7137 39.2962 63.7772C39.7486 50.792 31.019 39.6214 18.9361 36.5044C18.9063 37.004 18.8789 37.5061 18.8615 38.0057C18.3246 53.4268 24.6954 67.4883 35.1998 77.2047Z"
          fill="#FF9100"
        />
        <path
          d="M37.9435 0C31.0632 5.51321 25.6271 12.7813 22.341 21.1555C20.4594 25.9529 19.2762 31.1032 18.9307 36.5045C31.0135 39.6216 39.7432 50.7922 39.2883 63.7798C39.1168 68.7163 37.6304 73.2949 35.1919 77.2074C39.7929 81.4653 45.1868 84.8806 51.14 87.2196C63.0911 81.6965 71.5697 69.81 72.0594 55.7511C72.3775 46.6411 68.8777 38.5229 63.9337 31.6699C58.7113 24.4242 37.9435 0 37.9435 0Z"
          fill="#DD2C00"
        />
      </g>
    )
  },
  postgres: {
    label: "PostgreSQL", color: "#4169e1", desc: { pt: "Banco relacional com RLS e extensibilidade.", en: "Relational database with RLS and extensibility." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <ellipse cx="24" cy="12" rx="15" ry="5" />
      <path d="M9 12v24c0 2.76 6.72 5 15 5s15-2.24 15-5V12" />
      <path d="M9 24c0 2.76 6.72 5 15 5s15-2.24 15-5" />
    </g>
  },
  rest: {
    label: "APIs REST", color: "currentColor", desc: { pt: "Protocolos HTTP bem modelados.", en: "Well-modeled HTTP protocols." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 24h8 M32 24h8" />
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      <circle cx="24" cy="24" r="10" />
    </g>
  },
  rls: {
    label: "Row Level Security", color: "#38bdf8", desc: { pt: "Isolamento de dados por linha no PostgreSQL.", en: "Row-level data isolation in PostgreSQL." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="10" width="32" height="6" rx="1" />
      <rect x="8" y="21" width="32" height="6" rx="1" />
      <rect x="8" y="32" width="32" height="6" rx="1" fill="currentColor" fillOpacity="0.25" />
      <circle cx="36" cy="35" r="2" fill="currentColor" />
    </g>
  },
  rbac: {
    label: "RBAC", color: "#8b5cf6", desc: { pt: "Controle granular de acesso por papel.", en: "Granular role-based access control." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="16" r="6" />
      <path d="M12 38c0-6 5-10 12-10s12 4 12 10" />
      <path d="M34 10l3 3 5-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  },
  multitenant: {
    label: "Multi-tenant", color: "#22d3ee", desc: { pt: "Arquitetura compartilhada com isolamento lógico.", en: "Shared architecture with logical isolation." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="8" width="14" height="14" rx="2" />
      <rect x="28" y="8" width="14" height="14" rx="2" />
      <rect x="6" y="26" width="14" height="14" rx="2" />
      <rect x="28" y="26" width="14" height="14" rx="2" />
    </g>
  },
  stripe: {
    label: "Stripe", color: "#635bff", desc: { pt: "Pagamentos e assinaturas recorrentes.", en: "Payments and recurring subscriptions." },
    svg: <g fill="currentColor">
      <rect x="4" y="4" width="40" height="40" rx="6" />
      <text x="24" y="32" textAnchor="middle" fontFamily="DM Sans" fontWeight="700" fontSize="18" fill="#fff">S</text>
    </g>
  },
  docker: {
    label: "Docker", color: "#2496ed", desc: { pt: "Containers reprodutíveis.", en: "Reproducible containers." },
    svg: <g fill="currentColor">
      <rect x="6" y="22" width="6" height="6" rx="1" />
      <rect x="14" y="22" width="6" height="6" rx="1" />
      <rect x="22" y="22" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
      <rect x="22" y="14" width="6" height="6" rx="1" />
      <rect x="22" y="6" width="6" height="6" rx="1" />
      <path d="M4 30 h34 c0 6-5 10-12 10 H14 C8 40 4 36 4 30z" />
    </g>
  },
  git: {
    label: "Git / GitHub", color: "currentColor", desc: { pt: "Versionamento e fluxos de trabalho.", en: "Versioning and workflows." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="36" r="4" />
      <circle cx="36" cy="24" r="4" />
      <path d="M12 16v16" />
      <path d="M12 24c6 0 10-3 14-6" strokeDasharray="2 3" />
      <path d="M32 24h-8" />
    </g>
  },
  clean: {
    label: "Clean Architecture", color: "#06b6d4", desc: { pt: "Separação de camadas por dependência.", en: "Layered separation by dependency direction." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="12" />
      <circle cx="24" cy="24" r="6" fill="currentColor" fillOpacity="0.3" />
    </g>
  },
  solid: {
    label: "SOLID", color: "#f59e0b", desc: { pt: "Princípios de orientação a objetos.", en: "Object-oriented design principles." },
    svg: <g fill="currentColor">
      <text x="24" y="29" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11">SOLID</text>
      <rect x="4" y="4" width="40" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  },
  ddd: {
    label: "Domain-Driven Design", color: "#ec4899", desc: { pt: "Modelagem guiada pelo domínio.", en: "Domain-guided modeling." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M24 6 L42 16 V32 L24 42 L6 32 V16 Z" />
      <path d="M24 6 V24 L42 16 M24 24 L6 16 M24 24 V42" />
    </g>
  },
  express: {
    label: "Express", color: "currentColor", desc: { pt: "Framework web minimalista para Node.js.", en: "Minimalist web framework for Node.js." },
    svg: <g fill="currentColor">
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16">ex</text>
    </g>
  },
  prisma: {
    label: "Prisma ORM", color: "currentColor", desc: { pt: "ORM moderno para Node.js e TypeScript.", en: "Modern ORM for Node.js and TypeScript." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 6 L12 38 L36 38 Z" />
      <path d="M24 6 L24 38" />
      <path d="M12 38 L24 24" />
    </g>
  },
  reactnative: {
    label: "React Native", color: "#61dafb", desc: { pt: "Apps nativos para iOS e Android com React.", en: "Native iOS and Android apps with React." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="15" y="4" width="18" height="40" rx="4" />
      <circle cx="24" cy="24" r="2.4" fill="currentColor" />
      <ellipse cx="24" cy="24" rx="12" ry="4.6" />
      <ellipse cx="24" cy="24" rx="12" ry="4.6" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="12" ry="4.6" transform="rotate(120 24 24)" />
    </g>
  },
  expo: {
    label: "Expo & EAS", color: "currentColor", desc: { pt: "Build, envio às lojas e atualizações OTA.", en: "Builds, store submission and OTA updates." },
    svg: <g fill="currentColor">
      <path d="M24 8c1.4 0 2.2 1 3 2.4l13.2 23.4c1 1.8.2 4.2-2 4.2-1.2 0-2-.6-2.8-1.8L24 16.6 12.6 36.2C11.8 37.4 11 38 9.8 38c-2.2 0-3-2.4-2-4.2L21 10.4C21.8 9 22.6 8 24 8z" />
    </g>
  },
  flutter: {
    label: "Flutter", color: "#02569b", desc: { pt: "UI multiplataforma compilada para nativo.", en: "Cross-platform UI compiled to native." },
    svg: <g>
      <path d="M28 4 L8 24 l6 6 L40 4z" fill="#47c5fb" />
      <path d="M28 22 L17 33 l11 11 h12 L29 33 l11-11z" fill="currentColor" />
      <path d="M17 33 l6-6 6 6 -6 6z" fill="#47c5fb" />
    </g>
  },
  dart: {
    label: "Dart", color: "#0175c2", desc: { pt: "Linguagem do Flutter, tipada e rápida.", en: "Flutter's fast, typed language." },
    svg: <g fill="currentColor">
      <path d="M12 12 L30 6 L42 18 L36 36 L18 42 L6 30 Z" />
      <path d="M12 12 L30 30 L36 36 L18 42 L6 30Z" fill="#40c4ff" />
    </g>
  },
  bloc: {
    label: "BLoC", color: "#4dd0e1", desc: { pt: "Estado previsível orientado a eventos.", en: "Predictable event-driven state." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="18" width="12" height="12" rx="2" />
      <rect x="30" y="18" width="12" height="12" rx="2" />
      <path d="M18 21 h12 M26 17 l4 4 -4 4" />
      <path d="M30 27 H18 M22 31 l-4 -4 4 -4" opacity="0.6" />
    </g>
  },
  swiftkotlin: {
    label: "Swift & Kotlin", color: "#f05138", desc: { pt: "Native Modules e Platform Channels.", en: "Native Modules and Platform Channels." },
    svg: <g>
      <rect x="4" y="4" width="19" height="40" rx="5" fill="currentColor" />
      <rect x="25" y="4" width="19" height="40" rx="5" fill="#7f52ff" />
      <text x="13.5" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="13" fill="#fff">S</text>
      <text x="34.5" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="13" fill="#fff">K</text>
    </g>
  },
  sqlite: {
    label: "SQLite", color: "#0f80cc", desc: { pt: "Banco local para apps que funcionam offline.", en: "Local database for apps that work offline." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="6" width="28" height="36" rx="4" />
      <path d="M16 16h16 M16 23h16 M16 30h10" strokeLinecap="round" />
    </g>
  },
  framermotion: {
    label: "Framer Motion", color: "#e93fe0", desc: { pt: "Animações declarativas em React.", en: "Declarative animations in React." },
    svg: <g fill="currentColor">
      <path d="M10 6 h28 v14 H24z" />
      <path d="M10 20 h14 l14 14 H24 v8 L10 34z" opacity="0.75" />
    </g>
  },
  mui: {
    label: "Material UI", color: "#007fff", desc: { pt: "Componentes React para painéis e sistemas.", en: "React components for dashboards and systems." },
    svg: <g fill="currentColor">
      <path d="M4 12 l10 6 v18 l-10 -6z" />
      <path d="M14 18 l10 -6 10 6 v6 l-10 -6 -10 6z" opacity="0.8" />
      <path d="M34 18 l10 -6 v18 l-10 6z" />
      <path d="M24 30 l10 6 v-6 l-10 -6z" opacity="0.6" />
    </g>
  },
  mysql: {
    label: "MySQL", color: "#00758f", desc: { pt: "Banco relacional de alto volume em produção.", en: "High-volume relational database in production." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <ellipse cx="24" cy="12" rx="15" ry="5" />
      <path d="M9 12v24c0 2.76 6.72 5 15 5s15-2.24 15-5V12" />
      <path d="M17 22 l4 8 4-8 M29 22 v8 h4" stroke="#f29111" />
    </g>
  },
  grpc: {
    label: "gRPC & WebSocket", color: "#244c5a", desc: { pt: "Comunicação em tempo real e streaming.", en: "Real-time communication and streaming." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 18 h28 M28 12 l6 6 -6 6" />
      <path d="M42 30 H14 M20 24 l-6 6 6 6" />
    </g>
  },
  webhooks: {
    label: "Pagamentos & Webhooks", color: "#22c55e", desc: { pt: "Asaas, Kiwify e conciliação automática.", en: "Asaas, Kiwify and automatic reconciliation." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="4" y="12" width="40" height="26" rx="4" />
      <path d="M4 20 h40" strokeWidth="4" />
      <path d="M10 31 h10" />
    </g>
  },
  youtube: {
    label: "YouTube Live API", color: "#ff0000", desc: { pt: "Estado das transmissões em tempo real.", en: "Real-time broadcast state." },
    svg: <g>
      <rect x="4" y="10" width="40" height="28" rx="8" fill="currentColor" />
      <path d="M20 17 L31 24 L20 31Z" fill="#fff" />
    </g>
  },
  whatsapp: {
    label: "WhatsApp & IA", color: "#25d366", desc: { pt: "Agentes e automações de atendimento.", en: "Support agents and automations." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M24 6 a18 18 0 0 1 0 36 a18 18 0 0 1 -9 -2.4 L6 42 l2.4 -8.6 A18 18 0 0 1 24 6z" />
      <path d="M18 17 c0 7 6 13 13 13 l1 -4 -4 -2 -2 2 c-2 -1 -4 -3 -5 -5 l2 -2 -2 -4z" fill="currentColor" stroke="none" />
    </g>
  },
  postmark: {
    label: "Postmark & SMS", color: "#ffde00", desc: { pt: "Mensageria transacional confiável.", en: "Reliable transactional messaging." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <rect x="6" y="12" width="36" height="24" rx="3" />
      <path d="M6 14 L24 27 L42 14" />
    </g>
  },
  aws: {
    label: "AWS", color: "#ff9900", desc: { pt: "Infraestrutura em nuvem.", en: "Cloud infrastructure." },
    svg: <g fill="currentColor">
      <text x="24" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="15" fill="var(--ink)">aws</text>
      <path d="M10 32 q14 8 28 0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M34 29 l5 2 -2 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  },
  githubactions: {
    label: "CI/CD", color: "#2088ff", desc: { pt: "GitHub Actions, EAS e pipelines automatizados.", en: "GitHub Actions, EAS and automated pipelines." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="10" cy="24" r="4" />
      <circle cx="38" cy="12" r="4" />
      <circle cx="38" cy="36" r="4" />
      <path d="M14 24 h8 M22 24 c4 0 6 -12 12 -12 M22 24 c4 0 6 12 12 12" />
    </g>
  },
  offlinefirst: {
    label: "Offline-first", color: "#a3e635", desc: { pt: "Funciona sem sinal e sincroniza depois.", en: "Works without signal, syncs later." },
    svg: <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M8 20 a22 22 0 0 1 32 0 M14 26 a14 14 0 0 1 20 0 M20 32 a6 6 0 0 1 8 0" />
      <path d="M8 8 L40 40" />
    </g>
  },
};

export { ICONS };

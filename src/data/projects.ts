import type { Project, ProjectCategory } from '../types';

/** Standardized accent per project category - products built at Exímia Tech vs. systems built inside a company. Keeps the whole site's project theming consistent instead of one-off colors per project. */
export const PROJECT_CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  enterprise: "#22d3ee",
  eximia: "#f59e0b",
};

/** Display order = array order (first item is the first case on the page). */
export const PROJECTS: Project[] = ([
  {
    id: "vida360",
    name: "Movimento Vida 360",
    type: { pt: "Ecossistema multi-app", en: "Multi-app ecosystem" },
    year: "2026",
    role: { pt: "Engenheiro de Software · Sistema Boss", en: "Software Engineer · Sistema Boss" },
    tags: ["Plataforma", "Mobile", "Ao vivo"],
    category: "enterprise",
    accent: PROJECT_CATEGORY_ACCENT.enterprise,
    tagline: {
      pt: "Plataforma de bem-estar corporativo com aulas ao vivo para servidores públicos.",
      en: "Corporate well-being platform with live classes for public servants.",
    },
    blurb: {
      pt: "Cinco aplicações conectadas a uma API central: portal, app mobile, painel administrativo, painel do gestor e agente de atendimento.",
      en: "Five applications connected to one central API: portal, mobile app, admin panel, manager panel and support agent.",
    },
    stackMain: ["Node.js", "Prisma", "MySQL", "Next.js", "React Native"],
    stackFull: ["Node.js", "Express", "TypeScript", "Prisma ORM", "MySQL", "Next.js", "React", "Material UI", "React Native", "Expo", "EAS Build & Submit", "OTA Updates", "YouTube Live API", "Postmark", "Asaas", "Zod", "JWT"],
    overview: {
      pt: "O Movimento Vida 360 leva educação continuada e saúde mental para instituições públicas: aulas ao vivo, conteúdo gravado, trilhas e indicadores para o gestor. Faço parte do time do Sistema Boss, o braço de tecnologia que sustenta esse ecossistema e os eventos da Agência Sisters.",
      en: "Movimento Vida 360 brings continuing education and mental health to public institutions: live classes, recorded content, learning paths and dashboards for managers. I'm part of the Sistema Boss team, the technology arm behind this ecosystem and Agência Sisters' events.",
    },
    challenge: {
      pt: "Tudo nasceu num monólito PHP/Laravel. Com muita gente entrando ao mesmo tempo numa transmissão, cada regra de negócio - quem pode fazer check-in, quando uma live vira reprise, que certificado sai - precisava ser consistente em cinco aplicações diferentes.",
      en: "It all started as a PHP/Laravel monolith. With many people joining a broadcast at once, every business rule - who can check in, when a live turns into a replay, which certificate is issued - had to stay consistent across five different apps.",
    },
    solution: {
      pt: "Migramos a lógica para uma API em Node.js/TypeScript com Express e Prisma sobre MySQL, como fonte única das regras. O estado das transmissões é detectado direto na YouTube Live API, o app mobile em Expo sai pelas lojas via EAS com atualizações OTA, e e-mails transacionais e cobranças rodam via Postmark e webhooks do Asaas.",
      en: "We moved the logic into a Node.js/TypeScript API with Express and Prisma on MySQL as the single source of business rules. Broadcast state is detected straight from the YouTube Live API, the Expo mobile app ships through EAS with OTA updates, and transactional e-mail and billing run on Postmark and Asaas webhooks.",
    },
    outcome: {
      pt: "Em produção, atendendo instituições públicas - e o legado está sendo desligado módulo a módulo.",
      en: "In production, serving public institutions - and the legacy system is being shut down module by module.",
    },
    cover: ["/projects/vida360/01-portal.webp", "/projects/vida360/02-programacao.webp"],
    ogImage: "/projects/vida360/01-portal.webp",
    links: [
      { label: { pt: "Visitar site", en: "Visit site" }, url: "https://movimentovida360.com.br/", icon: "external" },
    ],
    gallery: [
      { src: "/projects/vida360/01-portal.webp", caption: { pt: "Portal público - bem-estar corporativo e NR-1", en: "Public portal - corporate well-being and NR-1" } },
      { src: "/projects/vida360/02-programacao.webp", caption: { pt: "Programação de eventos e aulas ao vivo", en: "Event and live class schedule" } },
    ],
  },
  {
    id: "sisters-esportes",
    name: "Sisters Esportes",
    type: { pt: "Plataforma de eventos esportivos", en: "Sports events platform" },
    year: "2026",
    role: { pt: "Engenheiro de Software · Sistema Boss", en: "Software Engineer · Sistema Boss" },
    tags: ["Web", "Checkout", "Motion"],
    category: "enterprise",
    accent: PROJECT_CATEGORY_ACCENT.enterprise,
    tagline: {
      pt: "Do organizador que cria a prova ao corredor que se inscreve.",
      en: "From the organizer who creates the race to the runner who signs up.",
    },
    blurb: {
      pt: "Painel do organizador, inscrições com Pix e cartão, categorias e cortesias, e a landing do clube de corrida Batida em Movimento.",
      en: "Organizer dashboard, sign-ups with Pix and card, categories and comps, and the landing page for the Batida em Movimento running club.",
    },
    stackMain: ["Next.js", "Framer Motion", "Express", "MySQL"],
    stackFull: ["Next.js", "React", "TypeScript", "Framer Motion", "Tailwind CSS", "Material UI", "Node.js", "Express", "MySQL", "Asaas", "Kiwify", "Webhooks", "Postmark"],
    overview: {
      pt: "A Sisters Esportes organiza corridas de rua em Brasília. Construí o Organizador - onde qualquer pessoa monta a própria prova em minutos - e a landing do Batida em Movimento, o clube de corrida da Sisters.",
      en: "Sisters Esportes runs street races in Brasília. I built the Organizer - where anyone can set up their own race in minutes - and the landing page for Batida em Movimento, Sisters' running club.",
    },
    challenge: {
      pt: "Inscrição de corrida tem muita regra escondida: lotes, categoria de servidor, prova kids, cortesia de patrocinador, Pix que cai depois. ",
      en: "Race registration hides a lot of rules: ticket batches, public-servant categories, kids' races, sponsor comps, Pix payments that land later. ",
    },
    solution: {
      pt: "Modelei categorias e preços por lote no backend, conciliação automática de pagamentos via webhooks (Asaas e Kiwify) e e-mails transacionais. Na landing, uma biblioteca própria de animações com Framer Motion - revelar com blur, cascata, contadores e marca-texto - sempre respeitando 'reduzir movimento'.",
      en: "I modeled per-batch categories and pricing on the backend, automatic payment reconciliation via webhooks (Asaas and Kiwify) and transactional e-mail. On the landing, a home-grown Framer Motion animation library - blur reveals, cascades, counters and highlighter strokes - always honoring 'reduce motion'.",
    },
    outcome: {
      pt: "No ar: o Organizador e a landing do Batida em Movimento.",
      en: "Live: the Organizer and the Batida em Movimento landing page.",
    },
    cover: "/projects/sisters-esportes/organizador.mp4",
    ogImage: "/projects/sisters-esportes/01-organizador.webp",
    links: [
      { label: { pt: "Organizador", en: "Organizer" }, url: "https://organizador.agenciasisters.com.br/", icon: "external" },
      { label: { pt: "Portal Esportes", en: "Sports Portal" }, url: "https://esportes.agenciasisters.com.br/", icon: "external" },
      { label: { pt: "Batida em Movimento", en: "Batida em Movimento" }, url: "https://esportes.agenciasisters.com.br/batidaemmovimento", icon: "external" },
    ],
    gallery: [
      { src: "/projects/sisters-esportes/organizador.mp4", caption: { pt: "Organizador - crie sua prova em minutos", en: "Organizer - create your race in minutes" } },
      { src: "/projects/sisters-esportes/01-organizador.webp", caption: { pt: "Inscrições em tempo real, Pix e cartão", en: "Real-time sign-ups, Pix and card" } },
      { src: "/projects/sisters-esportes/02-batida-hero.webp", caption: { pt: "Batida em Movimento - landing do clube de corrida", en: "Batida em Movimento - running club landing" } },
      { src: "/projects/sisters-esportes/03-batida-clube.webp", caption: { pt: "Seções com animação de revelar e marca-texto", en: "Sections with reveal and highlighter animations" } },
    ],
  },
  {
    id: "agendai",
    name: "Agendai",
    type: { pt: "SaaS white-label", en: "White-label SaaS" },
    year: "2025",
    role: { pt: "Fundador · Arquiteto de Software", en: "Founder · Software Architect" },
    tags: ["SaaS", "Multi-tenant", "IA"],
    category: "eximia",
    accent: PROJECT_CATEGORY_ACCENT.eximia,
    tagline: {
      pt: "Agendamento online com IA no WhatsApp - o primeiro produto da Exímia Tech.",
      en: "Online scheduling with AI on WhatsApp - Exímia Tech's first product.",
    },
    blurb: {
      pt: "Três aplicações integradas (cliente, empresa e site da marca), isolamento de dados por tenant com RLS e um agente de IA que agenda pelo WhatsApp 24/7.",
      en: "Three integrated apps (customer, business and branded site), per-tenant data isolation with RLS and an AI agent that books over WhatsApp 24/7.",
    },
    stackMain: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    stackFull: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Row Level Security", "Realtime", "WhatsApp + IA", "Google Maps API", "Flutter", "Clean Architecture"],
    overview: {
      pt: "Barbearias, clínicas e estúdios ainda agendam no WhatsApp na mão - e perdem horário com isso. O Agendai dá a cada negócio um site próprio, agenda, gestão de profissionais, comissões e fidelidade.",
      en: "Barbershops, clinics and studios still book by hand over WhatsApp - and lose slots because of it. Agendai gives each business its own site, calendar, staff management, commissions and loyalty program.",
    },
    challenge: {
      pt: "Um produto só, servindo muitas empresas com marcas diferentes, sem que um dado vaze de um tenant para outro - e que funcione tanto para o autônomo quanto para uma rede.",
      en: "One product serving many businesses with different brands, without a single record leaking between tenants - and working for both a solo professional and a chain.",
    },
    solution: {
      pt: "Next.js com App Router e Clean Architecture em camadas (UI → hooks → dados), Supabase com políticas RLS por tenant e Realtime para a agenda, temas por empresa e um agente de IA que conversa e agenda pelo WhatsApp.",
      en: "Next.js App Router with layered Clean Architecture (UI → hooks → data), Supabase with per-tenant RLS policies and Realtime for the calendar, per-business themes and an AI agent that chats and books over WhatsApp.",
    },
    outcome: {
      pt: "No ar em agendai.tec.br, com versões mobile em Flutter em desenvolvimento.",
      en: "Live at agendai.tec.br, with Flutter mobile versions in development.",
    },
    cover: "/projects/agendai/landing.mp4",
    ogImage: "/projects/agendai/01-landing.webp",
    links: [
      { label: { pt: "Visitar site", en: "Visit site" }, url: "https://agendai.tec.br/", icon: "external" },
      { label: { pt: "Post no LinkedIn", en: "LinkedIn post" }, url: "https://www.linkedin.com/feed/update/urn:li:activity:7442199107227656193/", icon: "external" },
    ],
    gallery: [
      { src: "/projects/agendai/landing.mp4", caption: { pt: "Landing pública", en: "Public landing" } },
      { src: "/projects/agendai/02-dashboard.webp", caption: { pt: "Área do cliente - busca e reserva em poucos cliques", en: "Customer area - search and book in a few clicks" } },
      { src: "/projects/agendai/03-booking.webp", caption: { pt: "Fluxo de agendamento com validação por etapa", en: "Booking flow with per-step validation" } },
      { src: "/projects/agendai/04-agenda.webp", caption: { pt: "Agenda do profissional", en: "Professional's calendar" } },
      { src: "/projects/agendai/05-themes.webp", caption: { pt: "White-label - cada empresa escolhe seu tema", en: "White-label - each business picks its theme" } },
      { src: "/projects/agendai/06-mobile.webp", caption: { pt: "Página pública da empresa no celular", en: "Business public page on mobile" }, mobile: true },
    ],
  },
  {
    id: "michelin",
    name: "MyConnectedFleet by Michelin",
    type: { pt: "App enterprise global", en: "Global enterprise app" },
    year: "2025",
    role: { pt: "Engenheiro de Software · Meta", en: "Software Engineer · Meta" },
    tags: ["Flutter", "Tempo real", "Testes"],
    category: "enterprise",
    accent: PROJECT_CATEGORY_ACCENT.enterprise,
    tagline: {
      pt: "App de gestão de frotas da Michelin, com rastreamento veicular em tempo real.",
      en: "Michelin's fleet management app, with real-time vehicle tracking.",
    },
    blurb: {
      pt: "Rastreamento veicular via WebSocket e gRPC, estado com BLoC e cobertura de testes de menos de 5% para mais de 95%.",
      en: "Vehicle tracking over WebSocket and gRPC, BLoC state management and test coverage taken from under 5% to over 95%.",
    },
    stackMain: ["Flutter", "gRPC", "WebSocket", "BLoC"],
    stackFull: ["Flutter", "Dart", "Flutter Modular", "BLoC", "gRPC", "WebSocket", "Platform Channels", "Swift", "Kotlin", "Clean Architecture", "Mockito", "Jira", "Scrum"],
    overview: {
      pt: "Pela Meta, consultoria brasileira de software, entrei no time internacional que mantém o app de gestão de frotas da Michelin - rastreamento de veículos e telemetria para operações no mundo todo.",
      en: "Through Meta, a Brazilian software consultancy, I joined the international team behind Michelin's fleet management app - vehicle tracking and telemetry for operations around the world.",
    },
    challenge: {
      pt: "Base grande, dívida técnica acumulada e quase nenhum teste: qualquer mudança no fluxo de rastreamento era um risco em produção.",
      en: "A large codebase, accumulated tech debt and almost no tests: any change to the tracking flow was a production risk.",
    },
    solution: {
      pt: "Refatorei módulos críticos com Flutter Modular e Clean Architecture, organizei o fluxo de telemetria (WebSocket + gRPC) em BLoCs previsíveis e escrevi a suíte de testes unitários e de widget com Mockito.",
      en: "I refactored critical modules with Flutter Modular and Clean Architecture, organized the telemetry flow (WebSocket + gRPC) into predictable BLoCs and wrote the unit and widget test suite with Mockito.",
    },
    outcome: {
      pt: "Cobertura de testes de menos de 5% para mais de 95%, em squad Scrum internacional com comunicação diária em inglês.",
      en: "Test coverage from under 5% to over 95%, in an international Scrum squad working in English every day.",
    },
    cover: null,
    links: [
      { label: { pt: "App Store", en: "App Store" }, url: "https://apps.apple.com/br/app/myconnectedfleet-by-michelin/id1573543686", icon: "external" },
      { label: { pt: "Solução Michelin", en: "Michelin Solution" }, url: "https://connectedfleet.michelin.com/pt-br/solucoes/localizacao-e-rastreamento-veicular/", icon: "external" },
    ],
    gallery: [],
  },
  {
    id: "arenax",
    name: "ArenaX",
    type: { pt: "Plataforma de competições", en: "Competition platform" },
    year: "2026",
    role: { pt: "Tech Lead · Mentor", en: "Tech Lead · Mentor" },
    tags: ["Esportes", "Mobile", "Mentoria"],
    category: "eximia",
    accent: PROJECT_CATEGORY_ACCENT.eximia,
    tagline: {
      pt: "Torneios de tênis no formato Duplas Rotativas - construído com uma squad de alunos da UCB.",
      en: "Tennis tournaments in the rotating-doubles format - built with a squad of UCB students.",
    },
    blurb: {
      pt: "Chaveamento, pontuação e mata-mata automáticos, app Flutter e web, em parceria com a Universidade Católica de Brasília.",
      en: "Automatic brackets, scoring and knockouts, Flutter app and web, in partnership with Universidade Católica de Brasília.",
    },
    stackMain: ["Flutter", "Next.js", "Firebase", "Docker"],
    stackFull: ["Flutter", "Dart", "BLoC", "Flutter Modular", "Next.js", "Firebase", "Cloud Functions", "Docker", "AWS", "Clean Architecture"],
    overview: {
      pt: "O ArenaX organiza torneios de tênis: inscrição de duplas, sorteio, fase de grupos com Duplas Rotativas, desempate e mata-mata. Nasceu como projeto da Exímia em parceria com a UCB.",
      en: "ArenaX runs tennis tournaments: pair sign-ups, draws, a rotating-doubles group stage, tiebreakers and knockouts. It started as an Exímia project in partnership with UCB.",
    },
    challenge: {
      pt: "Regra de torneio não perdoa: um critério de desempate errado muda quem avança. E o time era formado por alunos que nunca tinham colocado um sistema em produção.",
      en: "Tournament rules are unforgiving: one wrong tiebreaker changes who advances. And the team was made of students who had never shipped a system to production.",
    },
    solution: {
      pt: "Modelei as regras de pontuação e desempate como domínio puro e testável, defini a arquitetura (Clean Architecture + BLoC) e conduzi mentoria semanal com code review, Git flow e boas práticas.",
      en: "I modeled scoring and tiebreak rules as a pure, testable domain, defined the architecture (Clean Architecture + BLoC) and ran weekly mentoring with code review, Git flow and best practices.",
    },
    outcome: {
      pt: "MVP com o formato Duplas Rotativas implementado, desenvolvido junto com a squad da UCB.",
      en: "An MVP with the rotating-doubles format implemented, built together with the UCB squad.",
    },
    cover: null,
    links: [
      { label: { pt: "App Store", en: "App Store" }, url: "https://apps.apple.com/br/app/arenax/id6762231258", icon: "external" },
    ],
    leadershipHighlights: [
      { pt: "Mentoria semanal de squad universitária (UCB)", en: "Weekly mentoring of a university squad (UCB)" },
      { pt: "Arquitetura e code review de todo o projeto", en: "Architecture and code review for the whole project" },
    ],
    gallery: [],
  },
  {
    id: "setteone",
    name: "Setteone CRM",
    type: { pt: "CRM B2B offline-first", en: "Offline-first B2B CRM" },
    year: "2026",
    role: { pt: "Engenheiro de Software · Setteone", en: "Software Engineer · Setteone" },
    tags: ["Mobile", "Offline-first", "B2B"],
    category: "enterprise",
    accent: PROJECT_CATEGORY_ACCENT.enterprise,
    tagline: {
      pt: "CRM e auditoria de campo que funcionam sem internet.",
      en: "CRM and field audits that work without internet.",
    },
    blurb: {
      pt: "Dados locais em SQLite com sincronização no Firestore, áudio processado no aparelho com FFmpeg e login corporativo via SSO Microsoft.",
      en: "Local data in SQLite synced to Firestore, on-device audio processing with FFmpeg and corporate sign-in via Microsoft SSO.",
    },
    stackMain: ["React Native", "Flutter", "SQLite", "Firestore"],
    stackFull: ["React Native", "Expo", "Flutter", "Dart", "BLoC", "Zustand", "React Query", "SQLite", "AsyncStorage", "Firestore", "Cloud Functions", "FFmpeg", "Native Modules (Swift/Kotlin)", "SSO/SAML"],
    overview: {
      pt: "A Setteone atende empresas com CRM e gestão de operações. Trabalhei no app usado por equipes de campo para pedidos, cotações e auditorias.",
      en: "Setteone serves companies with CRM and operations management. I worked on the app field teams use for orders, quotes and audits.",
    },
    challenge: {
      pt: "Auditor de campo não tem sinal confiável. O app precisava registrar tudo - inclusive áudio - offline, e sincronizar depois sem perder nem duplicar nada.",
      en: "Field auditors don't have reliable signal. The app had to record everything - including audio - offline, and sync later without losing or duplicating anything.",
    },
    solution: {
      pt: "Persistência local em SQLite/AsyncStorage com fila de sincronização para o Firestore, FFmpeg no aparelho para comprimir áudio, Native Modules em Swift/Kotlin e ambientes dev/prod separados.",
      en: "Local persistence in SQLite/AsyncStorage with a sync queue to Firestore, on-device FFmpeg to compress audio, Swift/Kotlin Native Modules and separate dev/prod environments.",
    },
    outcome: {
      pt: "Publicado na App Store e no Google Play, em uso por clientes corporativos.",
      en: "Published on the App Store and Google Play, used by corporate clients.",
    },
    cover: null,
    links: [
      { label: { pt: "App Store", en: "App Store" }, url: "https://apps.apple.com/us/app/setteone-crm/id6747451964", icon: "external" },
      { label: { pt: "Site Setteone", en: "Setteone Website" }, url: "https://www.setteone.com.br/", icon: "external" },
    ],
    gallery: [],
  },
  {
    id: "condo-erp",
    name: "ERP Condomínios",
    type: { pt: "Sistema ERP", en: "ERP System" },
    year: "2025",
    role: { pt: "Tech Lead · Exímia Tech", en: "Tech Lead · Exímia Tech" },
    tags: ["ERP", "RBAC", "Segurança"],
    category: "eximia",
    accent: PROJECT_CATEGORY_ACCENT.eximia,
    tagline: { pt: "24+ telas, RBAC granular e isolamento de dados via RLS.", en: "24+ screens, granular RBAC and RLS data isolation." },
    blurb: {
      pt: "Gestão completa de condomínios - financeiro, comunicados, reservas e portal do morador - com permissões por perfil direto no banco.",
      en: "Complete condominium management - finances, announcements, bookings and resident portal - with role permissions enforced in the database.",
    },
    stackMain: ["Flutter", "Supabase", "PostgreSQL", "RLS"],
    stackFull: ["Flutter", "Flutter Web", "Flutter Modular", "BLoC", "Supabase", "PostgreSQL", "Row Level Security", "RBAC", "Clean Architecture"],
    overview: {
      pt: "Um ERP para administradoras de condomínio: fluxo de caixa, comunicados, reserva de áreas comuns, inadimplência e portal do morador, mobile e web.",
      en: "An ERP for condominium managers: cash flow, announcements, common-area bookings, delinquency and a resident portal, on mobile and web.",
    },
    challenge: {
      pt: "Síndico, administradora, morador e funcionário enxergam coisas diferentes - e nenhum pode ver dado de outro condomínio.",
      en: "Managers, administrators, residents and staff each see different things - and none of them can see another building's data.",
    },
    solution: {
      pt: "RBAC em múltiplos níveis e políticas RLS no PostgreSQL via Supabase, app em Flutter com Modular e Clean Architecture, liderando uma equipe de dois desenvolvedores.",
      en: "Multi-level RBAC and PostgreSQL RLS policies via Supabase, a Flutter app with Modular and Clean Architecture, leading a team of two developers.",
    },
    outcome: {
      pt: "Mais de 24 interfaces entregues em mobile e web, com o isolamento garantido pelo próprio banco.",
      en: "Over 24 interfaces shipped on mobile and web, with isolation enforced by the database itself.",
    },
    cover: null,
    nda: true,
    gallery: [],
  },
  {
    id: "eximia",
    name: "Exímia Tech",
    type: { pt: "Site institucional", en: "Company website" },
    year: "2026",
    role: { pt: "Fundador", en: "Founder" },
    tags: ["Web", "Marca", "Estúdio"],
    category: "eximia",
    accent: PROJECT_CATEGORY_ACCENT.eximia,
    tagline: { pt: "O estúdio de produtos digitais que eu fundei.", en: "The digital product studio I founded." },
    blurb: {
      pt: "Presença digital da Exímia Tech: serviços, valores, cases e o time de sócios.",
      en: "Exímia Tech's online presence: services, values, cases and the partner team.",
    },
    stackMain: ["Next.js", "TypeScript", "Tailwind CSS"],
    stackFull: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    overview: {
      pt: "A Exímia Tech é o estúdio que fundei com mais quatro sócios para construir SaaS e apps para clientes no Brasil e fora dele. Agendai, ArenaX, 4 Play Arena e o ERP de condomínios saíram daqui.",
      en: "Exímia Tech is the studio I founded with four partners to build SaaS and apps for clients in Brazil and abroad. Agendai, ArenaX, 4 Play Arena and the condominium ERP came out of it.",
    },
    challenge: {
      pt: "Explicar para um cliente não técnico o que um estúdio de engenharia faz - sem jargão e sem parecer agência genérica.",
      en: "Explaining to a non-technical client what an engineering studio does - without jargon and without looking like a generic agency.",
    },
    solution: {
      pt: "Site em Next.js com seções curtas por serviço, cases reais e a cara do time, otimizado para SEO e mobile.",
      en: "A Next.js site with short service sections, real cases and the team's faces, optimized for SEO and mobile.",
    },
    outcome: {
      pt: "No ar em eximiatech.com.br.",
      en: "Live at eximiatech.com.br.",
    },
    cover: ["/projects/eximia/01-hero.webp", "/projects/eximia/02-servicos.webp"],
    links: [
      { label: { pt: "Visitar site", en: "Visit site" }, url: "https://www.eximiatech.com.br/", icon: "external" },
    ],
    gallery: [
      { src: "/projects/eximia/01-hero.webp" },
      { src: "/projects/eximia/02-servicos.webp" },
      { src: "/projects/eximia/04-valores.webp" },
      { src: "/projects/eximia/05-fundador.webp" },
      { src: "/projects/eximia/03-mobile.webp", mobile: true },
    ],
  },
] satisfies Project[]);

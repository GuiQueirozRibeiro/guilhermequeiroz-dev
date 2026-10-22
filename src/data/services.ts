import type { Lang, Service } from '../types';

export const SERVICES: Record<Lang, Service[]> = {
  pt: [
    {
      num: "01",
      title: "Apps Mobile",
      description: "App iOS e Android do zero à loja, em React Native ou Flutter.",
      features: [
        "Publicação na App Store e Google Play",
        "Atualizações OTA sem esperar a loja",
        "Offline-first quando precisa",
        "Integração com hardware nativo",
      ],
    },
    {
      num: "02",
      title: "SaaS & Sistemas",
      description: "Plataformas multi-tenant, ERPs e painéis sob medida para o seu negócio.",
      features: [
        "Arquitetura pensada para escalar",
        "Isolamento de dados por cliente",
        "Perfis e permissões (RBAC)",
        "Dashboards e relatórios",
      ],
      popular: true,
    },
    {
      num: "03",
      title: "APIs & Integrações",
      description: "Backend tipado e integrações que conversam com o resto da sua operação.",
      features: [
        "Node.js + TypeScript + Prisma",
        "Pagamentos com conciliação automática",
        "E-mail, SMS e WhatsApp",
        "Migração de sistemas legados",
      ],
    },
    {
      num: "04",
      title: "Sites & Landing Pages",
      description: "Sites e landing pages em Next.js, com animações e SEO.",
      features: [
        "Next.js com SEO técnico",
        "Animações fluidas e acessíveis",
        "Checkout integrado",
        "Mobile-first",
      ],
    },
  ],
  en: [
    {
      num: "01",
      title: "Mobile Apps",
      description: "iOS and Android apps from scratch to the stores, in React Native or Flutter.",
      features: [
        "App Store and Google Play publishing",
        "OTA updates without store review",
        "Offline-first when it matters",
        "Native hardware integration",
      ],
    },
    {
      num: "02",
      title: "SaaS & Systems",
      description: "Multi-tenant platforms, ERPs and custom dashboards for your business.",
      features: [
        "Architecture built to scale",
        "Per-client data isolation",
        "Roles and permissions (RBAC)",
        "Dashboards and reports",
      ],
      popular: true,
    },
    {
      num: "03",
      title: "APIs & Integrations",
      description: "Typed backends and integrations that talk to the rest of your operation.",
      features: [
        "Node.js + TypeScript + Prisma",
        "Payments with automatic reconciliation",
        "E-mail, SMS and WhatsApp",
        "Legacy system migration",
      ],
    },
    {
      num: "04",
      title: "Websites & Landing Pages",
      description: "Websites and landing pages in Next.js, with animations and SEO.",
      features: [
        "Next.js with technical SEO",
        "Smooth, accessible animations",
        "Integrated checkout",
        "Mobile-first",
      ],
    },
  ],
};

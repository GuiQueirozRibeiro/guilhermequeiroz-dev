import type { StackGroup } from '../types';

export const STACK: StackGroup[] = [
  {
    group: { pt: "Mobile", en: "Mobile" },
    items: ["reactnative", "expo", "flutter", "dart", "bloc", "swiftkotlin", "sqlite"]
  },
  {
    group: { pt: "Web", en: "Web" },
    items: ["typescript", "nextjs", "react", "tailwind", "framermotion", "mui"]
  },
  {
    group: { pt: "Backend & Dados", en: "Backend & Data" },
    items: ["nodejs", "express", "prisma", "mysql", "postgres", "supabase", "firebase", "grpc", "rest"]
  },
  {
    group: { pt: "Integrações", en: "Integrations" },
    items: ["webhooks", "youtube", "whatsapp", "postmark"]
  },
  {
    group: { pt: "Infra", en: "Infra" },
    items: ["docker", "aws", "githubactions", "git"]
  },
  {
    group: { pt: "Arquitetura", en: "Architecture" },
    items: ["clean", "solid", "offlinefirst", "multitenant", "rls", "rbac"]
  },
];

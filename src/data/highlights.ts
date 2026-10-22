import type { Lang, Highlight } from '../types';

export const HIGHLIGHTS: Record<Lang, Highlight[]> = {
  pt: [
    {
      id: 'test-coverage',
      icon: '🧪',
      color: '#22d3ee',
      badge: 'Michelin · via Meta',
      title: 'De <5% para 95%+ de cobertura',
      description: 'No app global de gestão de frotas da Michelin, escrevi a suíte de testes unitários e de widget que levou a cobertura de menos de 5% para mais de 95%, em squad internacional.',
      projectId: 'michelin',
    },
    {
      id: 'mentorship',
      icon: '🎓',
      color: '#f59e0b',
      badge: 'Mentoria técnica',
      title: 'Mentor de devs desde 2022',
      description: 'Mentoria semanal de uma squad de 7 alunos da Universidade Católica de Brasília (UCB) no ArenaX, e mentoria individual de devs em início de carreira — fundamentos, arquitetura, IA aplicada e code review.',
      projectId: 'arenax',
    },
    {
      id: 'founder',
      icon: '🚀',
      color: '#a3e635',
      badge: 'Fundador',
      title: 'Exímia Tech',
      description: 'Fundei um estúdio de produtos digitais com mais quatro sócios. De lá saíram Agendai, ArenaX, 4 Play Arena e um ERP de condomínios — do primeiro commit às lojas.',
      projectId: 'eximia',
    },
  ],
  en: [
    {
      id: 'test-coverage',
      icon: '🧪',
      color: '#22d3ee',
      badge: 'Michelin · via Meta',
      title: 'From <5% to 95%+ test coverage',
      description: "On Michelin's global fleet management app, I wrote the unit and widget test suite that took coverage from under 5% to over 95%, in an international squad.",
      projectId: 'michelin',
    },
    {
      id: 'mentorship',
      icon: '🎓',
      color: '#f59e0b',
      badge: 'Technical mentorship',
      title: 'Mentoring developers since 2022',
      description: 'Weekly mentoring of a 7-student squad from Universidade Católica de Brasília (UCB) on ArenaX, plus one-on-one mentoring of early-career devs — fundamentals, architecture, applied AI and code review.',
      projectId: 'arenax',
    },
    {
      id: 'founder',
      icon: '🚀',
      color: '#a3e635',
      badge: 'Founder',
      title: 'Exímia Tech',
      description: 'I founded a digital product studio with four partners. Agendai, ArenaX, 4 Play Arena and a condominium ERP came out of it — from first commit to the app stores.',
      projectId: 'eximia',
    },
  ],
};

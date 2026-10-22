import type { Lang, Highlight } from '../types';

export const HIGHLIGHTS: Record<Lang, Highlight[]> = {
  pt: [
    {
      id: 'test-coverage',
      icon: '🧪',
      color: '#22d3ee',
      badge: 'Michelin · via Meta',
      title: 'De <5% para 95%+ de cobertura',
      description: 'No app corporativo MyConnectedFleet by Michelin, construí a suíte de testes unitários e de widget elevando a cobertura de código de menos de 5% para mais de 95%, em squad internacional com comunicação em inglês.',
      projectId: 'michelin',
    },
    {
      id: 'mentorship',
      icon: '🎓',
      color: '#f59e0b',
      badge: 'Mentoria técnica',
      title: 'Mentor de squads desde 2022',
      description: 'Mentoria semanal de squad universitária na Universidade Católica de Brasília (UCB) no projeto ArenaX, e mentoria individual de desenvolvedores em início de carreira com foco em fundamentos, arquitetura limpa e boas práticas.',
      projectId: 'arenax',
    },
    {
      id: 'founder',
      icon: '🚀',
      color: '#a3e635',
      badge: 'Fundador & Tech Lead',
      title: 'Exímia Tech',
      description: 'Co-fundador e líder técnico na Exímia Tech, empresa de tecnologia focada em SaaS e soluções corporativas. Da concepção arquitetural ao deploy nas lojas: Agendai, ArenaX e ERP SGP Condomínios.',
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
      description: "On Michelin's MyConnectedFleet enterprise application, I engineered the unit and widget test suite taking code coverage from under 5% to over 95% in an international Scrum squad.",
      projectId: 'michelin',
    },
    {
      id: 'mentorship',
      icon: '🎓',
      color: '#f59e0b',
      badge: 'Technical mentorship',
      title: 'Squad mentorship since 2022',
      description: 'Weekly mentorship for a university squad at Universidade Católica de Brasília (UCB) on ArenaX, alongside continuous 1-on-1 technical mentoring for early-career software engineers.',
      projectId: 'arenax',
    },
    {
      id: 'founder',
      icon: '🚀',
      color: '#a3e635',
      badge: 'Founder & Tech Lead',
      title: 'Exímia Tech',
      description: 'Co-founder and tech lead at Exímia Tech, a software engineering consultancy delivering SaaS and enterprise systems from initial architecture to app store publication: Agendai, ArenaX, and SGP Condomínios ERP.',
      projectId: 'eximia',
    },
  ],
};

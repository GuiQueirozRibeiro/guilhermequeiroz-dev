'use client';

import { useState } from 'react';
import type { Lang } from '../types';

interface AppPreview {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  context: string;
  stack: string;
  accent: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  webUrl?: string;
  screenType: 'telemetry' | 'brackets' | 'crm' | 'live';
}

const APPS: AppPreview[] = [
  {
    id: 'michelin',
    name: 'MyConnectedFleet by Michelin',
    shortName: 'Michelin',
    badge: 'App Store & Google Play',
    context: 'Meta / Michelin · 2025',
    stack: 'Flutter · Dart · BLoC · gRPC',
    accent: '#38BDF8',
    appStoreUrl: 'https://apps.apple.com/br/app/myconnectedfleet-by-michelin/id1573543686',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=br.com.sascar.myconnectedfleet',
    screenType: 'telemetry',
  },
  {
    id: 'arenax',
    name: 'ArenaX',
    shortName: 'ArenaX',
    badge: 'App Store (iOS Exclusivo)',
    context: 'Exímia Tech / UCB · 2025',
    stack: 'Flutter · Firebase · Cloud Functions',
    accent: '#F59E0B',
    appStoreUrl: 'https://apps.apple.com/br/app/arenax/id6762231258',
    screenType: 'brackets',
  },
  {
    id: 'setteone',
    name: 'Setteone CRM',
    shortName: 'Setteone',
    badge: 'App Store & Enterprise',
    context: 'Setteone · 2025',
    stack: 'Flutter · React Native · SQLite',
    accent: '#10B981',
    appStoreUrl: 'https://apps.apple.com/us/app/setteone-crm/id6747451964',
    webUrl: 'https://www.setteone.com.br/',
    screenType: 'crm',
  },
  {
    id: 'vida360',
    name: 'Movimento Vida 360',
    shortName: 'Vida 360',
    badge: 'Plataforma & Mobile',
    context: 'Sistema Boss · 2026',
    stack: 'React Native · Expo EAS · Node.js',
    accent: '#EC4899',
    webUrl: 'https://movimentovida360.com.br/',
    screenType: 'live',
  },
];

export function DeviceShowcase({ lang }: { lang: Lang }) {
  const [activeApp, setActiveApp] = useState<AppPreview>(APPS[0]);

  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none">
      {/* Abas seletoras superiores - Corrigido: sem branco chapado */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 mb-4 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md">
        {APPS.map((app) => {
          const isActive = activeApp.id === app.id;
          return (
            <button
              key={app.id}
              onClick={() => setActiveApp(app)}
              className={`flex-1 py-1.5 px-2 text-[12px] font-medium rounded-lg transition-all duration-200 text-center ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {app.shortName}
            </button>
          );
        })}
      </div>

      {/* Carcaça do iPhone Moderno */}
      <div className="relative mx-auto w-[295px] h-[590px] rounded-[48px] p-3 bg-gradient-to-b from-[#2A2E38] via-[#161920] to-[#0D1016] shadow-2xl ring-1 ring-white/10 shadow-black/80">
        <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-[#0A0D14] flex flex-col justify-between border border-white/5">
          {/* Barra de Status do iOS */}
          <div className="pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-white/90 z-20">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1 text-[10px]">
              <span className="opacity-80">5G</span>
              <div className="w-4 h-2 border border-white/80 rounded-[2px] p-[1px] flex items-center">
                <div className="w-full h-full bg-white rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Conteúdo Dinâmico da Tela */}
          <div className="flex-1 px-4 pt-3 pb-2 flex flex-col justify-between overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${activeApp.accent}15`,
                    color: activeApp.accent,
                    border: `1px solid ${activeApp.accent}30`,
                  }}
                >
                  {activeApp.badge}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">v2.4.0</span>
              </div>
              <h4 className="text-[15px] font-bold text-white tracking-tight leading-snug">
                {activeApp.name}
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">{activeApp.context}</p>
            </div>

            {/* Simulação Visual da Tela Técnica */}
            <div className="my-auto py-2">
              {activeApp.screenType === 'telemetry' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex justify-between items-center text-[11px] text-zinc-400 mb-1">
                      <span>Telemetria em Tempo Real</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        WebSocket ON
                      </span>
                    </div>
                    <div className="text-[22px] font-bold text-white font-mono">
                      68.4 <span className="text-[12px] text-zinc-400 font-normal">km/h</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1 flex justify-between">
                      <span>Frota Global Sul</span>
                      <span>Latência: 16ms (gRPC)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] space-y-1">
                    <div className="flex justify-between text-zinc-300">
                      <span>Gerenciamento de Estado</span>
                      <span className="text-cyan-400 font-mono">BLoC</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Cobertura de Testes</span>
                      <span className="text-emerald-400 font-semibold font-mono">&gt; 95%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeApp.screenType === 'brackets' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex justify-between items-center text-[11px] text-zinc-400 mb-1">
                      <span>Duplas Rotativas · Rodada 3</span>
                      <span className="text-amber-400 font-mono text-[10px]">Quadra 2</span>
                    </div>
                    <div className="text-[14px] font-semibold text-white mt-1">
                      Torneio Primavera UCB
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-mono mt-1">
                      Sorteio e pontuação automatizados
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] space-y-1">
                    <div className="flex justify-between text-zinc-300">
                      <span>Backend &amp; Nuvem</span>
                      <span className="text-amber-400 font-mono">Firebase</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Squad Mentoring</span>
                      <span className="text-white font-semibold">12 Alunos UCB</span>
                    </div>
                  </div>
                </div>
              )}

              {activeApp.screenType === 'crm' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex justify-between items-center text-[11px] text-zinc-400 mb-1">
                      <span>Auditoria e Campo</span>
                      <span className="text-emerald-400 font-mono text-[10px]">Offline-First</span>
                    </div>
                    <div className="text-[18px] font-bold text-white font-mono">
                      14 <span className="text-[12px] text-zinc-400 font-normal">vistorias em cache</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-1 flex justify-between">
                      <span>SQLite Local</span>
                      <span>Compressão FFmpeg</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] space-y-1">
                    <div className="flex justify-between text-zinc-300">
                      <span>Sincronização</span>
                      <span className="text-emerald-400 font-mono">Background Sync</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Banco Local</span>
                      <span className="text-zinc-300 font-mono">SQLite + AsyncStorage</span>
                    </div>
                  </div>
                </div>
              )}

              {activeApp.screenType === 'live' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="flex justify-between items-center text-[11px] text-zinc-400 mb-1">
                      <span>Transmissão ao Vivo</span>
                      <span className="flex items-center gap-1 text-rose-400 font-mono text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                        AO VIVO
                      </span>
                    </div>
                    <div className="text-[14px] font-semibold text-white mt-1">
                      Saúde Mental &amp; NR-1
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      YouTube Live API + Check-in
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] space-y-1">
                    <div className="flex justify-between text-zinc-300">
                      <span>Releases Rápidas</span>
                      <span className="text-rose-400 font-mono">EAS OTA Updates</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Público Atendido</span>
                      <span className="text-white font-semibold">Servidores Públicos</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé do Mockup com Botões Oficiais da App Store e Google Play */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                {activeApp.appStoreUrl && (
                  <a
                    href={activeApp.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.66 1.37-.56.65-1.06 1.71-.93 2.73 1.03.08 2.06-.5 2.67-1.25z" />
                    </svg>
                    <div className="text-left leading-none">
                      <div className="text-[7.5px] uppercase tracking-wider text-zinc-400">Download on</div>
                      <div className="text-[10px] font-semibold text-white">App Store</div>
                    </div>
                  </a>
                )}

                {activeApp.playStoreUrl && (
                  <a
                    href={activeApp.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a2.213 2.213 0 0 1-.22-.977V2.791c0-.361.082-.695.22-.977zm11.235 11.238l2.25 2.25-11.89 6.843 9.64-9.093zm0-2.104l-9.64-9.093 11.89 6.843-2.25 2.25zm1.488 1.052l3.415 1.964c.947.545.947 1.433 0 1.978l-3.415 1.964-1.996-1.996 1.996-1.91z" />
                    </svg>
                    <div className="text-left leading-none">
                      <div className="text-[7.5px] uppercase tracking-wider text-zinc-400">GET IT ON</div>
                      <div className="text-[10px] font-semibold text-white">Google Play</div>
                    </div>
                  </a>
                )}

                {!activeApp.playStoreUrl && !activeApp.appStoreUrl && activeApp.webUrl && (
                  <a
                    href={activeApp.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-zinc-800 text-white font-semibold text-[11px] flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors"
                  >
                    {lang === 'pt' ? 'Acessar Plataforma ↗' : 'Access Platform ↗'}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="pb-1 flex justify-center">
            <div className="w-24 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

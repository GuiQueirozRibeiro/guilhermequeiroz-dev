'use client';

import { useEffect } from 'react';

export function useScrollingTitle(title: string, delay: number = 150, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    // Aumentei um pouco o espaçamento para a transição ficar mais nítida
    let currentTitle = `${title}    |    `;

    const intervalId = setInterval(() => {
      // ROLAGEM PARA A ESQUERDA: pega a primeira letra e joga para o final
      currentTitle = currentTitle.substring(1) + currentTitle[0];
      document.title = currentTitle;
    }, delay);

    return () => {
      clearInterval(intervalId);
      document.title = title;
    };
  }, [title, delay, enabled]);
}
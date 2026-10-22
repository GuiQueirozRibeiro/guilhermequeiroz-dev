'use client';

import { useState, useCallback, ReactNode, type CSSProperties } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

// This component is mounted a lot — every section's eyebrow label plus the
// hero headline — so it used to mean N framer-motion `useAnimationFrame`
// loops running on every single frame, forever, regardless of whether the
// element was even on screen. The whole effect is just a linearly cycling
// `background-position`, which a plain CSS animation renders identically:
// the compositor drives it instead of the main thread, and the browser can
// throttle/pause it on its own (offscreen, `content-visibility`, etc.) with
// zero JS cost. `pauseOnHover` is now just `animation-play-state`.
export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Duplicate first color at the end for seamless looping.
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle: CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  // direction === 'diagonal' cycles the same axis as 'horizontal' (matching
  // the original behavior) to avoid interference patterns.
  const animationStyle: CSSProperties = {
    animationName: direction === 'vertical' ? 'gradient-text-shift-y' : 'gradient-text-shift-x',
    animationDuration: `${animationSpeed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: yoyo ? 'alternate' : 'normal',
    animationPlayState: isPaused ? 'paused' : 'running'
  };

  return (
    <div
      className={`relative inline-flex max-w-fit flex-row items-center justify-center font-medium transition-shadow duration-500 cursor-pointer align-middle ${showBorder ? 'py-1 px-2 rounded-[1.25rem]' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes gradient-text-shift-x { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
        @keyframes gradient-text-shift-y { from { background-position: 50% 0%; } to { background-position: 50% 100%; } }
        @media (prefers-reduced-motion: reduce) {
          .gradient-text-anim { animation-play-state: paused !important; }
        }
      `}</style>
      {showBorder && (
        <div
          className="gradient-text-anim absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={{ ...gradientStyle, ...animationStyle }}
        >
          <div
            className="absolute bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      )}
      <div
        className="gradient-text-anim inline-block relative z-2 text-transparent bg-clip-text"
        style={{ ...gradientStyle, ...animationStyle, WebkitBackgroundClip: 'text' }}
      >
        {children}
      </div>
    </div>
  );
}

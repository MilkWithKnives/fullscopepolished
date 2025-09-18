'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  className?: string;
  strength?: number; // px offset cap
};

export default function ParallaxImage({ src, alt, className = '', strength = 16 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress =
          (rect.top + rect.height / 2 - window.innerHeight / 2) /
          (window.innerHeight / 2);
        const translate = Math.max(-strength, Math.min(strength, -progress * strength));
        el.style.setProperty('--parallax-y', `${translate}px`);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-xl border border-white/10 ${className}`}
      style={{ willChange: 'transform' }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: 'translate3d(0, var(--parallax-y, 0px), 0)',
          transition: 'transform 120ms linear',
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </div>
      <div className="relative aspect-[16/9]" />
    </div>
  );
}

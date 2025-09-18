'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

type StripItem = {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  text?: string;
  poster?: string;
};

const DEFAULT_STRIPS: StripItem[] = [
  {
  id: 1,
  type: 'image',
  src: '/Towebsite/exterior/Exterior4.jpg',  // ✅ updated to use Exterior4.jpeg
  title: 'Exteriors',
  text: 'Curb appeal that stops the scroll.',
},
  {
    id: 2,
    type: 'image',
    src: '/Towebsite/interior/Interior34.jpg',
    title: 'Interiors',
    text: 'Clean lines, color-true processing.',
  },
  {
    id: 3,
    type: 'video',
    src: '/Towebsite/video/Video3.mp4',
    poster: '/Towebsite/interior/Interior34.jpg',
    title: 'Video Tours',
    text: 'Cinematic motion that sells.',
  },
  {
    id: 4,
    type: 'image',
    src: '/Towebsite/commercial/commercial14.jpg',
    title: 'Commercial',
    text: 'Retail & office spaces—distinct and sharp.',
  },
  {
    id: 5,
    type: 'image',
    src: '/Towebsite/interior/Interior22.jpg',
    title: 'Details',
    text: 'Design highlights that matter.',
  },
];

type Props = {
  items?: StripItem[];
  className?: string;
  heightClass?: string; // e.g. "h-[72vh] md:h-[80vh]"
};

export default function HeroStrips({
  items = DEFAULT_STRIPS,
  className = '',
  heightClass = 'h-[72vh] md:h-[80vh]',
}: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    // finish intro animations after a moment
    const t = setTimeout(() => setIntro(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // mobile toggle
  const onTap = (id: number) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className={clsx(
        'relative w-full overflow-hidden bg-coffee-900/60',
        'border-b border-white/10',
        heightClass,
        className
      )}
    >
      {/* tiny CSS keyframes needed for the intro */}
      <style jsx global>{`
        @keyframes bgRise {
          0% { transform: translateY(6%); opacity: .0; }
          100% { transform: translateY(0%); opacity: 1; }
        }
        @keyframes fadeUp {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="flex h-full w-full gap-[1px] bg-black/20">
        {items.slice(0, 5).map((strip, idx) => {
          const isActive = active === strip.id;
          const someoneActive = active !== null;

          // desktop expand on hover
          const onEnter = () => {
            if (window.innerWidth >= 768) setActive(strip.id);
          };
          const onLeave = () => {
            if (window.innerWidth >= 768) setActive(null);
          };

          return (
            <div
              key={strip.id}
              className={clsx(
                'relative h-full cursor-pointer overflow-hidden',
                'transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,.9,.26,1)]',
                isActive ? 'basis-0 grow-[4]' : someoneActive ? 'basis-0 grow-[0.9]' : 'basis-0 grow',
                'rounded-none'
              )}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onClick={() => onTap(strip.id)}
            >
              {/* media */}
              {strip.type === 'image' ? (
                <img
                  src={strip.src}
                  alt={strip.title}
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    animation: intro ? `bgRise 700ms ${150 * idx}ms ease-out both` : undefined,
                  }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ) : (
                <video
                  src={strip.src}
                  poster={strip.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    animation: intro ? `bgRise 700ms ${150 * idx}ms ease-out both` : undefined,
                  }}
                />
              )}

              {/* gradient to match tiramisu vibe */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />

              {/* caption */}
              <div
                className={clsx(
                  'absolute left-4 right-4 md:left-5 md:right-5 bottom-4 md:bottom-5',
                  'text-mascarpone drop-shadow',
                  'transition-all duration-500',
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 md:opacity-90 md:translate-y-0 md:hover:opacity-100'
                )}
                style={{
                  animation: intro ? `fadeUp 500ms ${300 + 100 * idx}ms ease-out both` : undefined,
                }}
              >
                <h3 className="text-[15px] md:text-base font-bold tracking-wide">{strip.title}</h3>
                {strip.text && (
                  <p className="mt-0.5 text-[12px] md:text-[13px] text-mascarpone/85">
                    {strip.text}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
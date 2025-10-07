'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

// Helper to get Cloudinary URLs
function getMediaUrl(src: string, type: 'image' | 'video'): string {
  // If it's a local path (starts with /), return as-is
  if (src.startsWith('/') || src.startsWith('http')) {
    return src;
  }

  // Otherwise, it's a Cloudinary public ID
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dowghnozl';
  const mediaType = type === 'video' ? 'video' : 'image';
  return `https://res.cloudinary.com/${cloudName}/${mediaType}/upload/${src}`;
}

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
    src: '/Towebsite/exterior/Exterior4.jpg',
    title: 'Exteriors',
    text: '',
  },
  {
    id: 2,
    type: 'image',
    src: '/Towebsite/interior/Interior34.jpg',
    title: 'Interiors',
    text: '',
  },
  {
    id: 3,
    type: 'video',
    src: '1-video-3977_uf64vk',
    title: 'Video Tours',
    text: '',
  },
  {
    id: 4,
    type: 'image',
    src: '/Towebsite/commercial/commercial14.jpg',
    title: 'Commercial',
    text: '',
  },
  {
    id: 5,
    type: 'image',
    src: '/Towebsite/interior/Interior22.jpg',
    title: 'Details',
    text: '',
  }
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
    const t = setTimeout(() => setIntro(false), 800); // faster intro wrap-up
    return () => clearTimeout(t);
  }, []);

  const onTap = (id: number) => {
    setActive((prev) => (prev === id ? null : id));
  };

  // Helper to detect "hover-capable" devices; avoids accidental slowdowns on touch
  const canHover =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  return (
    <section
      className={clsx(
        'relative w-full overflow-hidden bg-coffee-900/60 border-b border-white/10',
        heightClass,
        className
      )}
    >
      {/* CSS keyframes (kept, but toned down) */}
      <style jsx global>{`
        @keyframes bgRise {
          0% { transform: translateY(4%); opacity: 0; }
          100% { transform: translateY(0%); opacity: 1; }
        }
        @keyframes fadeUp {
          0% { transform: translateY(6px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="flex h-full w-full gap-[1px] bg-black/20">
        {items.slice(0, 5).map((strip, idx) => {
          const isActive = active === strip.id;
          const someoneActive = active !== null;

          const onEnter = () => {
            if (canHover) setActive(strip.id);
          };
          const onLeave = () => {
            if (canHover) setActive(null);
          };

          return (
            <div
              key={strip.id}
              className={clsx(
                'relative h-full cursor-pointer overflow-hidden rounded-none',
                // Smooth, balanced transition
                'transition-[flex-grow] duration-500 ease-in-out',
                // Balanced growth ratios for smooth expansion
                isActive
                  ? 'basis-0 grow-[5]'
                  : someoneActive
                  ? 'basis-0 grow-[0.5]'
                  : 'basis-0 grow',
                // rendering hint
                'will-change-[flex-grow]'
              )}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onClick={() => onTap(strip.id)}
            >
              {/* media */}
              {strip.type === 'image' ? (
                <img
                  src={getMediaUrl(strip.src, 'image')}
                  alt={strip.title}
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    // Shorter, lighter intro. Less stagger so it doesn't feel sluggish.
                    animation:
                      intro && idx < 5
                        ? `bgRise 400ms ${Math.max(0, 80 * idx)}ms ease-out both`
                        : undefined,
                  }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ) : (
                <video
                  src={getMediaUrl(strip.src, 'video')}
                  poster={strip.poster ? getMediaUrl(strip.poster, 'image') : undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 object-cover w-full h-full"
                  style={{
                    animation:
                      intro && idx < 5
                        ? `bgRise 400ms ${Math.max(0, 80 * idx)}ms ease-out both`
                        : undefined,
                  }}
                />
              )}

              {/* gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40" />

              {/* caption */}
              <div
                className={clsx(
                  'absolute left-4 right-4 md:left-5 md:right-5 bottom-4 md:bottom-5',
                  'text-mascarpone drop-shadow transition-all duration-300',
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-1 md:opacity-90 md:translate-y-0 md:hover:opacity-100'
                )}
                style={{
                  animation:
                    intro && idx < 5
                      ? `fadeUp 320ms ${180 + 60 * idx}ms ease-out both`
                      : undefined,
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
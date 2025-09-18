'use client';

import Image from 'next/image';

type Strip = {
  /** Path under /public, must start with "/" */
  src: string;
  alt?: string;
  isVideo?: boolean;
  /** Optional image used for a video poster (shown before playback) */
  poster?: string;
};

type StripsPanelProps = {
  items: Strip[];
  className?: string;
  /** Height (Tailwind class) for the panel container */
  heightClass?: string; // e.g. "h-[70vh]"
};

/**
 * StripsPanel
 * - Renders 5 equal vertical strips that fill the container.
 * - No hover/minimize/expand; totally static layout.
 * - If an item is a video, it autoplays muted/looped as a background panel.
 */
export default function StripsPanel({
  items,
  className = '',
  heightClass = 'h-[68vh] lg:h-[78vh]',
}: StripsPanelProps) {
  // Ensure exactly 5 strips (pad or slice)
  const five = (items ?? []).slice(0, 5);
  while (five.length < 5) {
    five.push({
      src: '/logo.svg',
      alt: 'Placeholder',
    });
  }

  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl border border-white/10 bg-black/20',
        'grid grid-cols-5 gap-[1px]', // hairline dividers between strips
        heightClass,
        className,
      ].join(' ')}
    >
      {five.map((s, i) => (
        <div key={i} className="relative col-span-1">
          {!s.isVideo ? (
            <Image
              src={s.src}
              alt={s.alt ?? `Strip ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width:1280px) 18vw, (min-width:768px) 22vw, 100vw"
              className="object-cover"
            />
          ) : (
            <video
              className="absolute inset-0 object-cover w-full h-full"
              src={s.src}
              poster={s.poster}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          {/* subtle gradient to match the tiramisu vibe */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />
        </div>
      ))}
    </div>
  );
}
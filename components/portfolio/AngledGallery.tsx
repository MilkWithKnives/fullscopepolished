// components/portfolio/AngledGallery.tsx
'use client';

import Image from 'next/image';
import { memo } from 'react';

export type GalleryItem = {
  /** Local (/public/...) or remote url (allow host in next.config if remote) */
  src: string;
  alt: string;
  /** Natural dimensions (optional but better if you know them) */
  width?: number;
  height?: number;
  /** Force a specific rotation (deg). If omitted, we alternate by index. */
  rotateDeg?: number;
  /** Optional CSS class */
  className?: string;
};

type Props = {
  items: GalleryItem[];
  /** Tailwind/cls to control grid outside (optional) */
  className?: string;
  /**
   * sizes hint for responsive loading.
   * Default: 1col mobile, 2col tablet, 3col desktop.
   */
  sizes?: string;
  /**
   * Aspect ratio placeholder when width/height not provided.
   * e.g. "4/3", "3/2", "16/9". Default "4/3".
   */
  fallbackAspect?: `${number}/${number}` | '4/3' | '3/2' | '16/9';
};

function AngledGalleryBase({
  items,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fallbackAspect = '4/3',
}: Props) {
  return (
    <div className={className ?? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'}>
      {items.map((it, i) => {
        // Deterministic angle: alternate small angles by index
        const angle =
          typeof it.rotateDeg === 'number'
            ? it.rotateDeg
            : (i % 4 === 0 && -2) || (i % 4 === 1 && 1.5) || (i % 4 === 2 && -1) || 1.25;

        // If width/height are known, prefer them — more stable & a tiny perf win.
        const hasDims = !!(it.width && it.height);

        return (
          <figure
            key={`${it.src}-${i}`}
            className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/[.03] shadow-card ${it.className ?? ''}`}
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div
              className="relative w-full"
              style={!hasDims ? { aspectRatio: fallbackAspect } : {}}
            >
              <Image
                src={it.src}
                alt={it.alt}
                {...(hasDims
                  ? { width: it.width, height: it.height }
                  : { fill: true as const })}
                className="object-cover"
                sizes={sizes}
              />
            </div>
            <figcaption className="sr-only">{it.alt}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

// memo to avoid unnecessary re-renders if parent state changes
const AngledGallery = memo(AngledGalleryBase);
export default AngledGallery;

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Strip = {
  title: string;
  subtitle?: string;
  href?: string;
  /** Full image/video to display when the strip is ACTIVE (expanded). Must start with "/" and live under /public */
  src: string;
  /** Optional image to display whenever strip is MINIMIZED (when another strip is active, or when all are minimized) */
  thumb?: string;
  /** For videos: image used when minimized and as the <video> poster */
  poster?: string;
  alt?: string;
  isVideo?: boolean;
};

const STRIPS: Strip[] = [
  {
    title: 'Architectural Exteriors',
    subtitle: 'Showcase curb appeal and scale.',
    href: '/portfolio/photo',
    src: '/Towebsite/exterior/Exterior5.jpeg',
    thumb: '/Towebsite/exterior/Exterior5.jpeg', // ✅ minimized image
    alt: 'Exterior photo',
  },
  {
    title: 'Signature Interiors',
    subtitle: 'Bright, sharp, and true-to-life.',
    href: '/portfolio/photo',
    src: '/Towebsite/interior/Interior34.jpg',
    thumb: '/Towebsite/interior/Interior22.jpg', // ✅ example: different minimized image
    alt: 'Interior photo',
  },
  {
    title: 'Cinematic Video',
    subtitle: 'Bring listings to life with motion.',
    href: '/portfolio/video',
    src: '/Towebsite/video/Video3.mp4',
    poster: '/Towebsite/interior/Interior34.jpg', // ✅ what to show when minimized + as video poster
    alt: 'Video preview',
    isVideo: true,
  },
  {
    title: 'Commercial Properties',
    subtitle: 'Visuals for retail, office, and more.',
    href: '/portfolio/photo',
    src: '/Towebsite/commercial/commercial14.jpg',
    thumb: '/Towebsite/commercial/commercial14.jpg',
    alt: 'Commercial photo',
  },
  {
    title: 'Interior Details',
    subtitle: 'Capture the character of every room.',
    href: '/portfolio/photo',
    src: '/Towebsite/interior/Interior22.jpg',
    thumb: '/Towebsite/interior/Interior22.jpg',
    alt: 'Interior detail photo',
  },
];

export default function ExpandingStrips() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="container px-3 pt-4 md:px-4 md:pt-6">
      {/* Desktop / Tablet: expanding strips (hero) */}
      <div
        className="
          relative hidden md:flex h-[68vh] lg:h-[78vh]
          overflow-hidden rounded-2xl border border-white/10
          bg-black/20
        "
        onMouseLeave={() => setActive(null)}
        aria-label="Expanding hero gallery"
      >
        {STRIPS.map((s, i) => {
          const isActive = active === i;

          const grow =
            active === null
              ? 'md:flex-[1]' // all equal (minimized)
              : isActive
              ? 'md:flex-[4]' // expanded
              : 'md:flex-[0.65]'; // minimized

          return (
            <article
              key={i}
              className={`group relative flex-1 ${grow} transition-[flex-grow] duration-500 ease-out cursor-pointer`}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(isActive ? null : i)}
            >
              {/* Media: use thumb/poster when minimized; full media when active */}
              {s.isVideo ? (
                isActive ? (
                  <video
                    src={s.src}
                    poster={s.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={s.poster || s.thumb || '/placeholder.jpg'}
                    alt={s.alt ?? s.title}
                    fill
                    sizes="(min-width:1280px) 25vw, (min-width:768px) 40vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                )
              ) : (
                <Image
                  src={isActive ? s.src : s.thumb || s.src}
                  alt={s.alt ?? s.title}
                  fill
                  sizes="(min-width:1280px) 25vw, (min-width:768px) 40vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              )}

              {/* overlay & divider */}
              <div className="absolute inset-0 transition-opacity bg-gradient-to-b from-black/20 via-transparent to-black/40 opacity-80 group-hover:opacity-100" />
              <div className="absolute top-0 right-0 w-px h-full bg-white/20" />

              {/* caption */}
              <div
                className={`absolute inset-x-0 bottom-0 p-6 md:p-8 transition-all duration-300 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
                }`}
              >
                <h3 className="text-2xl font-black tracking-tight text-mascarpone">
                  {s.title}
                </h3>
                {s.subtitle && (
                  <p className="mt-1 text-sm text-mascarpone/80">{s.subtitle}</p>
                )}

                {s.href && (
                  <Link
                    href={s.href}
                    className="
                      mt-4 inline-block rounded-md border border-mascarpone/20 px-3 py-2
                      text-[11px] font-black uppercase tracking-wide text-mascarpone
                      hover:border-wine bg-coffee-800/80 backdrop-blur
                    "
                  >
                    Learn more
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Mobile fallback: single hero image (use first strip thumb/src) */}
      <div className="relative overflow-hidden rounded-xl md:hidden h-[58vh] border border-white/10 mt-3">
        <Image
          src={
            STRIPS[0]?.thumb ||
            STRIPS[0]?.poster ||
            STRIPS[0]?.src ||
            '/placeholder.jpg'
          }
          alt={STRIPS[0]?.alt ?? 'Hero'}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h1 className="text-3xl font-black tracking-tight text-mascarpone">
            Passionate about taking your brand to the next level.
          </h1>
          <p className="mt-2 text-mascarpone/80">
            Real estate media that elevates your listings with striking visuals.
          </p>
          <div className="flex gap-3 mt-4">
            <Link
              href="/portfolio"
              className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden text-xs font-black tracking-wide uppercase border rounded-md border-mascarpone/20 bg-coffee-800 text-mascarpone hover:border-wine"
            >
              <span className="relative z-10">View Portfolio</span>
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-wine px-4 py-2 text-xs font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)]"
            >
              Book Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
// app/portfolio/photo/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { photos as photoData } from '@/lib/portfolio';

export const metadata = {
  title: 'Photo Portfolio | Full Scope Media',
  description:
    'Real estate photography portfolio — interiors, exteriors, and commercial work.',
};

export default function PhotoPortfolioPage() {
  // SAFETY: never .map() undefined
  const photos = Array.isArray(photoData) ? photoData : [];

  return (
    <main className="min-h-screen bg-coffee-900 text-mascarpone">
      <section className="container px-4 py-10 md:py-14">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl font-black tracking-tight md:text-3xl">
            Photography Portfolio
          </h1>
          <p className="mt-2 text-mascarpone/80">
            Interiors, exteriors, and commercial spaces — optimized for speed and clarity.
          </p>
          <p className="mt-1 text-sm text-mascarpone/70">
            <span className="font-semibold">Floor plans included with every interior package.</span>
          </p>
        </header>

        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <GalleryGrid photos={photos} />
        )}

        <div className="mt-10">
          <Link
            href="/book-us"
            className="inline-block rounded-full bg-wine px-4 py-2 text-xs font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)]"
          >
            Book a Shoot
          </Link>
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="p-6 border rounded-lg border-white/12 bg-black/20">
      <p className="text-sm">
        No photos found. Add items to <code className="text-mascarpone/90">lib/portfolio.ts</code>{' '}
        in the exported <code>photos</code> array, and place image files under{' '}
        <code className="text-mascarpone/90">/public/Towebsite/...</code>.
      </p>
      <p className="mt-2 text-xs text-mascarpone/70">
        Example path: <code>/public/Towebsite/interior/Interior34.jpg</code>
      </p>
    </div>
  );
}

type P = {
  photos: { src: string; alt?: string; tag?: string }[];
};

function GalleryGrid({ photos }: P) {
  // A responsive, fast grid. Uses `fill` so we don’t need exact sizes.
  return (
    <div className="grid grid-cols-2 gap-3  sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {photos.map((p, idx) => (
        <figure
          key={`${p.src}-${idx}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-black/20"
        >
          <Image
            src={p.src}
            alt={p.alt ?? 'Portfolio image'}
            fill
            priority={idx < 3}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {p.tag && (
            <figcaption className="absolute left-2 top-2 rounded bg-black/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide">
              {p.tag}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

// app/portfolio/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

import ReelCarousel, { type ReelItem } from "@/components/portfolio/ReelCarousel";
// ⬇️ Make sure this path & case matches your file exactly: components/MasonryGrid.tsx
import MasonryGrid from "@/components/portfolio/MasonryGrid";

import {
  PHOTOS,
  type PhotoItem,
  type PhotoTag,
  getPhotoUrl,
} from "@/lib/portfolio";

// Map URL slugs -> your tags
const SLUG_TO_TAG: Record<string, PhotoTag> = {
  all: "all",
  interiors: "interior",
  exteriors: "exterior",
  commercial: "commercial",
  details: "detail",
};

// Page header text per category
const META: Record<string, { title: string; description?: string }> = {
  all:        { title: "All Work",       description: "Selected shots across interiors, exteriors, and commercial projects." },
  interiors:  { title: "Interiors",      description: "Natural light, true colors, straight verticals." },
  exteriors:  { title: "Exteriors",      description: "Curb appeal that pops. Clean skies, crisp lines." },
  commercial: { title: "Commercial",     description: "Spaces that work hard and look good doing it." },
  details:    { title: "Details",        description: "Tight framings, textures, the small things that sell the story." },
};

function photosFor(tag: PhotoTag): PhotoItem[] {
  if (tag === "all") return PHOTOS;
  return PHOTOS.filter((p) => p.tag === tag);
}

export default async function PortfolioCategoryPage({
  params,
}: {
  // Next 15: params is a Promise — await it.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tag = SLUG_TO_TAG[slug];
  if (!tag) return notFound();

  const meta = META[slug] ?? { title: "Portfolio" };
  const items = photosFor(tag);

  // Build the reel (use optimized URLs; handles Cloudinary + local)
  const reel: ReelItem[] = items.slice(0, 10).map((p) => ({
    type: "image",
    src: getPhotoUrl(p, 1920, 1080),
    alt: p.alt,
  }));

  return (
    <main className="max-w-6xl px-6 py-12 mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-semibold">{meta.title}</h1>
        {meta.description && (
          <p className="mt-2 text-neutral-400">{meta.description}</p>
        )}
      </header>

      {/* Category switcher */}
      <nav className="flex flex-wrap gap-2">
        {[
          { slug: "interiors", label: "Interiors" },
          { slug: "exteriors", label: "Exteriors" },
          { slug: "commercial", label: "Commercial" },
          { slug: "details", label: "Details" },
          { slug: "all", label: "All" },
        ].map((t) => (
          <Link
            key={t.slug}
            href={`/portfolio/${t.slug}`}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              slug === t.slug
                ? "bg-white text-black border-white"
                : "border-white/20 hover:border-white/40"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {/* Reel carousel */}
      <ReelCarousel items={reel} auto speed={2} className="mx-auto" />

      {/* Masonry grid — assumes your component takes `items: PhotoItem[]` */}
      <MasonryGrid items={items} />
      {/* If YOUR MasonryGrid expects strings instead:
          <MasonryGrid images={items.map((p) => getPhotoUrl(p))} />
      */}
    </main>
  );
}
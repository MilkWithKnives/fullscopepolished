import { notFound } from "next/navigation";
import ReelCarousel, { type ReelItem } from "@/components/portfolio/ReelCarousel";
import MasonryGrid from "@/components/portfolio/MasonryGrid"; // your existing grid
import { PHOTOS, type PhotoItem, getPhotoUrl, PHOTO_TAGS, type PhotoTag } from "@/lib/portfolio";
import Link from "next/link";
const SLUG_TO_TAG: Record<string, PhotoTag> = {
  all: "all",
  interiors: "interior",
  exteriors: "exterior",
  commercial: "commercial",
  details: "detail",
};

const META: Record<string, { title: string; description?: string }> = {
  all:        { title: "All Work",       description: "Selected shots across interiors, exteriors, and commercial projects." },
  interiors:  { title: "Interiors",      description: "Natural light, true colors, straight verticals. The money shots." },
  exteriors:  { title: "Exteriors",      description: "Curb appeal that pops. Clean skies, crisp lines." },
  commercial: { title: "Commercial",     description: "Spaces that work hard and look good doing it." },
  details:    { title: "Details",        description: "Tight framings, textures, the small things that sell the story." },
};

function photosFor(tag: PhotoTag): PhotoItem[] {
  if (tag === "all") return PHOTOS;
  return PHOTOS.filter(p => p.tag === tag);
}

export default function PortfolioCategoryPage({ params }: { params: { slug: string } }) {
  const tag = SLUG_TO_TAG[params.slug];
  if (!tag) return notFound();

  const meta = META[params.slug] ?? { title: "Portfolio" };
  const items = photosFor(tag);


const TABS = [
  { slug: "interiors", label: "Interiors" },
  { slug: "exteriors", label: "Exteriors" },
  { slug: "commercial", label: "Commercial" },
  { slug: "details", label: "Details" },
  { slug: "all", label: "All" },
];

<nav className="flex flex-wrap gap-2 mb-6">
  {TABS.map(t => (
    <Link
      key={t.slug}
      href={`/portfolio/${t.slug}`}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        params.slug === t.slug ? "bg-white text-black border-white" : "border-white/20 hover:border-white/40"
      }`}
    >
      {t.label}
    </Link>
  ))}
</nav>
  // Build the reel (top 10 images, Cloudinary/local auto-optimized)
  const reel: ReelItem[] = items.slice(0, 10).map(p => ({
    type: "image",
    src: getPhotoUrl(p, 1920, 1080),
    alt: p.alt,
  }));

  // Transform to match MasonryGrid's expected Item[] format
  const gridItems = items.map(p => ({
    type: "image" as const,
    src: getPhotoUrl(p),
    alt: p.alt,
  }));

  return (
    <main className="max-w-6xl px-6 py-12 mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-semibold">{meta.title}</h1>
        {meta.description && <p className="mt-2 text-neutral-400">{meta.description}</p>}
      </header>

      <ReelCarousel items={reel} auto speed={2} className="mx-auto" />

      <MasonryGrid items={gridItems} />
    </main>
  );
}
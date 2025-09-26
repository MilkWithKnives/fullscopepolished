import Link from "next/link";
import Image from "next/image";
import { PHOTOS, getPhotoUrl } from "@/lib/portfolio";

const CARDS = [
  { slug: "interiors",  cover: PHOTOS.find(p => p.tag === "interior") },
  { slug: "exteriors",  cover: PHOTOS.find(p => p.tag === "exterior") },
  { slug: "commercial", cover: PHOTOS.find(p => p.tag === "commercial") },
  { slug: "details",    cover: PHOTOS.find(p => p.tag === "detail") },
];

export default function PortfolioIndex() {
  return (
    <main className="max-w-6xl px-6 py-12 mx-auto space-y-8">
      <h1 className="text-4xl font-semibold">Portfolio</h1>
      <p className="text-neutral-400">Browse by category.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.filter(c => !!c.cover).map(({ slug, cover }) => (
          <Link key={slug} href={`/portfolio/${slug}`} className="block group">
            <div className="relative h-64 overflow-hidden border rounded-2xl border-white/10">
              <Image
                src={getPhotoUrl(cover! , 1600, 900)}
                alt={cover!.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 flex items-end bg-black/35">
                <div className="p-4 text-xl font-semibold text-white capitalize">{slug}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
// components/portfolio/MasonryGrid.tsx
"use client";

import Image from "next/image";
import { getPhotoUrl, type PhotoItem } from "@/lib/portfolio";

type MasonryGridProps = {
  items: PhotoItem[]; // ✅ plug your PHOTOS slice straight in
  /** width hint for optimization (Cloudinary/local) */
  width?: number;
  /** optional className on the wrapper */
  className?: string;
};

/**
 * Simple responsive masonry using CSS columns.
 * - Feeds next/image with fully-resolved URLs via getPhotoUrl (Cloudinary or /public).
 * - Prevents column breaks with `break-inside-avoid`.
 */
export default function MasonryGrid({
  items,
  width = 1600,
  className = "",
}: MasonryGridProps) {
  const urls = items.map((p) => ({
    src: getPhotoUrl(p, width),
    alt: p.alt ?? "",
    // fallback to provided dimensions to help CLS, else generic 1600x1067
    w: p.w ?? width,
    h: p.h ?? Math.round((width * 2) / 3), // ~3:2 default
  }));

  return (
    <div
      className={[
        "columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]",
        className,
      ].join(" ")}
    >
      {urls.map((u, i) => (
        <div key={i} className="mb-4 break-inside-avoid">
          <Image
            src={u.src}
            alt={u.alt}
            width={u.w}
            height={u.h}
            className="object-cover w-full h-auto border rounded-xl border-white/10"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}
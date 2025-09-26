"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

export type ReelItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; loop?: boolean; muted?: boolean };

function normalizeSrc(src: string, w = 1920, h = 1080) {
  // Already a full URL or local file
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  // Otherwise assume Cloudinary public ID
  return getOptimizedImageUrl(src, { width: w, height: h });
}

export default function ReelCarousel({
  items,
  auto = true,
  speed = 2,
  gap = 16,
  className,
}: {
  items: ReelItem[];
  auto?: boolean;
  speed?: number;
  gap?: number;
  className?: string;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!auto || !scroller.current) return;
    let raf = 0;
    let paused = false;
    const node = scroller.current!;

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);

    const step = () => {
      if (!paused) {
        node.scrollLeft += speed;
        if (node.scrollLeft + node.clientWidth >= node.scrollWidth - 1) {
          node.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [auto, speed]);

  const scrollBy = useCallback((dir: number) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: Math.round(node.clientWidth * 0.8) * dir, behavior: "smooth" });
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        ref={scroller}
        className="flex overflow-x-auto no-scrollbar [scroll-snap-type:x_mandatory]"
        style={{ gap }}
      >
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="relative shrink-0 [scroll-snap-align:center] rounded-2xl overflow-hidden border border-white/10 shadow-lg"
            style={{ width: "84vw", maxWidth: 1000, aspectRatio: "16 / 9" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {it.type === "image" ? (
              <Image
                src={normalizeSrc(it.src)}
                alt={it.alt ?? ""}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 1000px, 84vw"
                priority={i < 2}
              />
            ) : (
              <video
                src={it.src}
                poster={it.poster}
                className="object-cover w-full h-full"
                playsInline
                controls
                loop={it.loop ?? false}
                muted={it.muted ?? true}
              />
            )}
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => scrollBy(-1)}
        className="absolute px-3 py-2 text-white -translate-y-1/2 border rounded-full left-3 top-1/2 bg-black/50 backdrop-blur border-white/10"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={() => scrollBy(1)}
        className="absolute px-3 py-2 text-white -translate-y-1/2 border rounded-full right-3 top-1/2 bg-black/50 backdrop-blur border-white/10"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}
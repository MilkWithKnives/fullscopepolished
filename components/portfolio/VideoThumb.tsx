'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Accept either a string URL or a typed object
type VideoItem = string | {
  src: string;
  title?: string;
  poster?: string;         // optional thumbnail
  preload?: 'none' | 'metadata' | 'auto';
  loop?: boolean;
  muted?: boolean;
};

export default function VideoThumb({ item }: { item: VideoItem }) {
  const src    = typeof item === 'string' ? item : item.src;
  const title  = typeof item === 'string' ? ''   : (item.title ?? '');
  const poster = typeof item === 'string' ? ''   : (item.poster ?? '');
  const preload= typeof item === 'string' ? 'metadata' : (item.preload ?? 'metadata');
  const loop   = typeof item === 'string' ? false : !!item.loop;
  const muted  = typeof item === 'string' ? true  : item.muted ?? true;

  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden border rounded-xl border-neutral-800"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onMouseEnter={() => { setHovered(true); vidRef.current?.play().catch(() => {}) }}
      onMouseLeave={() => { setHovered(false); vidRef.current?.pause() }}
    >
      <video
        ref={vidRef}
        src={src}
        poster={poster || undefined}
        preload={preload}
        playsInline
        muted={muted}
        loop={loop}
        controls={!hovered}
        className="block object-cover w-full h-full"
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-2 text-sm bg-black/40 backdrop-blur-sm">
          {title}
        </div>
      )}
    </motion.div>
  );
}
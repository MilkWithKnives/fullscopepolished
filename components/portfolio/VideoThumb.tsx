'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { VideoItem } from '@/lib/portfolio';

export default function VideoThumb({ item }: { item: VideoItem }) {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <motion.div
      className="relative rounded-lg overflow-hidden border border-white/10 bg-white/[.03]"
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => { const v = vidRef.current; if (v) { v.play().catch(()=>{}); setPlaying(true);} }}
      onMouseLeave={() => { const v = vidRef.current; if (v) { v.pause(); v.currentTime = 0; setPlaying(false);} }}
    >
      <video ref={vidRef} muted playsInline preload="metadata" poster={item.poster} className="w-full h-full object-cover">
        <source src={item.src} type="video/mp4" />
      </video>
      {item.title && (
        <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs font-semibold">
          {item.title}{playing ? ' • playing' : ''}
        </div>
      )}
    </motion.div>
  );
}
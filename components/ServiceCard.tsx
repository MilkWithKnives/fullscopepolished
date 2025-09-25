'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  title: string;
  copy: string;
  img: string;     // Cloudinary/Unsplash or /public path
  href: string;
  delay?: number;  // ✅ make delay optional
  className?: string;
};

export default function ServiceCard({
  title,
  copy,
  img,
  href,
  delay = 0,
  className = '',
}: Props) {
  return (
    <motion.article
      initial={{ y: 8, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}  // ✅ uses delay
      className={`rounded-lg border border-white/15 bg-white/[.03] overflow-hidden ${className}`}
    >
      <Link href={href} className="block no-underline">
        <div className="relative aspect-[16/9]">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={false}
          />
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-lg font-black">{title}</h3>
          <p className="text-sm text-white/80">{copy}</p>
        </div>
      </Link>
    </motion.article>
  );
}
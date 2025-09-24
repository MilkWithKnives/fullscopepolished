import Link from 'next/link';

export const metadata = {
  title: 'Portfolio | Full Scope Media - Real Estate Photography & Video Gallery',
  description: 'Browse our portfolio showcasing professional real estate photography, cinematic videos, and stunning drone footage. Quality visuals that help properties sell faster.'
};

const CARDS = [
  {
    title: 'Photo',
    href: '/portfolio/photo',
    img: 'https://res.cloudinary.com/dowghnozl/image/upload/v1758550494/93-print-RGC04287_Ryan_c6zxqv.jpg',
  },
  {
    title: 'Drone',
    href: '/portfolio/drone',
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1400&q=60',
  },
  {
    title: 'Video',
    href: '/portfolio/video',
    img: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
  },
];

export default function PortfolioHub() {
  return (
    <main className="min-h-screen text-white">
      <section className="container space-y-6 py-14">
        <div className="text-[14vw] md:text-[9rem] leading-none font-black text-mascarpone/10 uppercase">
          Portfolio
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map(c => (
            <Link key={c.href} href={c.href} className="group rounded-lg border border-white/15 bg-white/[.03] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.title} className="object-cover w-full h-56 transition group-hover:opacity-90" />
              <div className="flex items-center justify-between p-4">
                <div className="text-xl font-black uppercase">{c.title}</div>
                <span className="rounded-full bg-wine px-3 py-1 text-xs font-black shadow-[0_6px_18px_rgb(255, 138, 35)] group-hover:bg-wine-700">
                  View
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
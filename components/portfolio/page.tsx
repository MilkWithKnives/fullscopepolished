import Link from 'next/link';

export const metadata = { title: 'Portfolio — PALMA' };

const CARDS = [
  {
    title: 'Photo',
    href: '/portfolio/photo',
    img: 'https://images.unsplash.com/photo-1600585154154-1e47f3dd76cc?auto=format&fit=crop&w=1400&q=60',
  },
  {
    title: 'Drone',
    href: '/portfolio/drone',
    img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1400&q=60',
  },
  {
    title: 'Video',
    href: '/portfolio/video',
    img: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg', // poster-like image
  },
];

export default function PortfolioHub() {
  return (
    <main className="text-mascarpone">
      <section className="container py-14 space-y-6">
        <div className="text-[14vw] md:text-[9rem] leading-none font-black text-mascarpone/10 uppercase">
          Portfolio
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map(c => (
            <Link key={c.href} href={c.href} className="group rounded-lg border border-white/15 bg-white/[.03] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.title} className="w-full h-56 object-cover group-hover:opacity-90 transition" />
              <div className="p-4 flex items-center justify-between">
                <div className="text-xl font-black uppercase">{c.title}</div>
                <span className="rounded-full bg-wine px-3 py-1 text-xs font-black shadow-[0_6px_18px_rgba(143,36,50,.25)] group-hover:bg-wine-700">
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
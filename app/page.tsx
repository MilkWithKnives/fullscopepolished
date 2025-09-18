import HeroStrips from '@/components/HeroStrips';
import Link from 'next/link';

export const metadata = {
  title: 'Full Scope Media | Real Estate Photo • Video • Drone',
  description:
    'Premium real estate media: photography, video, aerial drone, 3D tours, virtual staging, and CubiCasa floor plans.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-coffee-900 text-mascarpone">
      {/* Moving strips hero */}
      <HeroStrips />

      {/* Band under hero (keep this minimal so hero breathes) */}
      <section className="container px-4 py-10 md:py-12">
        <div className="grid items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="text-[clamp(24px,4.2vw,40px)] font-black leading-tight tracking-tight">
              Passionate about taking your brand to the next level.
            </h1>
            <p className="mt-3 text-[15px] text-mascarpone/85">
              Interiors, exteriors, aerials, cinematic video, 3D tours, virtual staging, and CubiCasa
              floor plans. Clean, fast, on-brand every time.
            </p>
            <p className="mt-2 text-[14px] text-mascarpone/80">
              <span className="font-semibold">Floor plans included with every interior package.</span>
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/portfolio"
                className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-mascarpone/20 bg-coffee-800 px-4 text-[11px] font-black uppercase tracking-wide text-mascarpone hover:border-wine"
              >
                <span className="relative z-10">View Portfolio</span>
              </Link>
              <Link
                href="/book-us"
                className="rounded-full bg-wine px-4 py-2 text-xs font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)]"
              >
                Book Us
              </Link>
            </div>
          </div>
          <div className="md:col-span-4" />
        </div>
      </section>
    </main>
  );
}

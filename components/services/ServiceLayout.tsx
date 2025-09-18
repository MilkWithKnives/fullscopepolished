// components/services/ServiceLayout.tsx
import Reveal from '@/components/motion/Reveal';

type Img = { src: string; alt?: string };
type Feature = { title: string; desc: string };

export default function ServiceLayout({
  title,
  subtitle,
  heroImage,
  features,
  gallery = [],
  children,
  ctaHref = '/book-us',
  ctaLabel = 'Book Us',
  badge,
}: {
  title: string;
  subtitle?: string;
  heroImage: Img;
  features: Feature[];
  gallery?: Img[];
  children?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  badge?: React.ReactNode;
}) {
  return (
    <main className="text-mascarpone">
      {/* Hero */}
      <section className="container py-14 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-[12vw] md:text-[7rem] leading-none font-black text-mascarpone/10 uppercase">
              {title}
            </div>
            {subtitle && <p className="prose-muted max-w-prose">{subtitle}</p>}
          </div>
          {badge}
        </div>

        <div className="relative overflow-hidden rounded-lg border border-white/15">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage.src} alt={heroImage.alt ?? ''} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Features */}
      <section className="container grid md:grid-cols-3 gap-6 pb-6">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <div className="rounded-md border border-white/15 bg-white/[.03] p-5 h-full">
              <div className="text-lg font-black">{f.title}</div>
              <p className="prose-muted mt-1 text-sm">{f.desc}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Custom content (pricing/faq/etc) */}
      {children && (
        <section className="container py-8">
          <Reveal>{children}</Reveal>
        </section>
      )}

      {/* Gallery strip */}
      {gallery.length > 0 && (
        <section className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((g, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div className="relative overflow-hidden rounded-md border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt ?? ''} className="w-full h-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-coffee-800 border-y border-white/15">
        <div className="container py-10 text-center">
          <div className="text-3xl font-black tracking-wide">WORK WITH US</div>
          <p className="prose-muted mt-1">Tell us about your listing — we’ll craft the right package.</p>
          <a
            href={ctaHref}
            className="mt-4 inline-block rounded-full bg-wine px-6 py-3 font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)] hover:bg-wine-700"
          >
            {ctaLabel}
          </a>
        </div>
      </section>
    </main>
  );
}
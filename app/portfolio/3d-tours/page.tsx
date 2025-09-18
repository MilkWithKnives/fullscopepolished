// app/portfolio/3d-tours/page.tsx
import MatterportEmbed from '@/components/embeds/MatterportEmbed';
import Link from 'next/link';

export const metadata = {
  title: '3D Tours | Full Scope Media',
  description:
    'Zillow 3D Home, Matterport tours, and immersive walkthroughs for real estate marketing.',
};

type Tour = {
  title: string;
  /** Put your Matterport model SID here (recommended) */
  modelId?: string;
  /** Or paste a full iframe src if that’s what you have */
  src?: string;
  note?: string;
};

const TOURS: Tour[] = [
  // EXAMPLES — replace these with your real model IDs or src URLs
  // You can grab the SID from a share link like: https://my.matterport.com/show/?m=abcdef123456
  { title: 'Sample Tour A', modelId: 'abcdef123456' },
  { title: 'Sample Tour B', modelId: 'ghijk7891011' },
  // Or if you only have a full iframe src string:
  // { title: 'Legacy Tour', src: 'https://my.matterport.com/show/?m=YOURID&play=1&brand=0' },
];

export default function ThreeDToursPage() {
  return (
    <main className="min-h-screen bg-coffee-900 text-mascarpone">
      <section className="container px-4 py-12 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl font-black tracking-tight md:text-3xl">
            3D Tours &amp; Immersive Walkthroughs
          </h1>
          <p className="mt-2 text-mascarpone/80">
            Matterport &amp; Zillow 3D Home — fast, interactive, and mobile-friendly.
          </p>
          <p className="mt-2 text-sm text-mascarpone/70">
            <span className="font-semibold">Floor plans included with every interior package.</span>
          </p>
        </header>

        {TOURS.length === 0 ? (
          <div className="p-6 border rounded-lg border-white/10 bg-black/20">
            <p className="text-sm">
              No tours added yet. Edit <code>app/portfolio/3d-tours/page.tsx</code> and populate the{' '}
              <code>TOURS</code> array with your Matterport <code>modelId</code> values.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {TOURS.map((t, idx) => (
              <article key={`${t.title}-${idx}`} className="space-y-3">
                <MatterportEmbed
                  modelId={t.modelId}
                  src={t.src}
                  title={t.title}
                  autoplay
                  brandless
                />
                <div>
                  <h2 className="text-base font-bold md:text-lg">{t.title}</h2>
                  {t.note && (
                    <p className="text-sm text-mascarpone/75">{t.note}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-wine px-4 py-2 text-xs font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)]"
          >
            Book a 3D Tour
          </Link>
        </div>
      </section>
    </main>
  );
}
// app/portfolio/3d-tours/page.tsx
import Link from 'next/link';
import Zillow3DEmbed from '@/components/embed/Zillow3DEmbed';
import MatterportEmbed from '@/components/embed/MatterportEmbed';

export const metadata = {
  title: '3D Tours | Full Scope Media',
  description: 'Zillow 3D Home and Matterport tours—fast, interactive, mobile-friendly.',
};

// Discriminated union so TypeScript knows which props belong to which tour type
type Tour =
  | { type: 'zillow'; title: string; url?: string; embedHtml?: string; note?: string }
  | { type: 'matterport'; title: string; modelId?: string; src?: string; note?: string; autoplay?: boolean; brandless?: boolean };

const TOURS: Tour[] = [
  // === Zillow examples ===
  //{ type: 'zillow', title: 'Sample Zillow Tour A', url: 'https://www.zillow.com/view-3d-home/REPLACE_ME_A' },
  { type: 'zillow', title: 'Stirrup St, East Lansing', embedHtml: '<iframe src="https://www.zillow.com/view-imx/181967f1-ed10-4605-9743-568c036a4eff?setAttribution=mls&wl=true&initialViewType=pano&utm_source=dashboard" width="100%" height="480" allowfullscreen></iframe>' },

  // === Matterport examples ===
  //{ type: 'matterport', title: 'onendaga', modelId: 'abcdef123456', autoplay: true, brandless: true },
  { type: 'matterport', title: 'Hopcraft Rd', src: 'https://my.matterport.com/show/?m=gYPNu51xVbD&brand=0&mls=1&', autoplay: true, brandless: true },
];

export default function ThreeDToursPage() {
  return (
    <main className="min-h-screen bg-coffee-900 text-mascarpone">
      <section className="container px-4 py-12 md:py-16">
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl font-black tracking-tight md:text-3xl">3D Tours &amp; Immersive Walkthroughs</h1>
          <p className="mt-2 text-mascarpone/80">Zillow 3D Home &amp; Matterport—whichever fits the property and budget.</p>
          <p className="mt-2 text-sm text-mascarpone/70">
            <span className="font-semibold">Floor plans included with every interior package.</span>
          </p>
        </header>

        {TOURS.length === 0 ? (
          <div className="p-6 border rounded-lg border-white/10 bg-black/20">
            <p className="text-sm">
              No tours added yet. Edit <code>app/portfolio/3d-tours/page.tsx</code> and populate the{' '}
              <code>TOURS</code> array with Zillow URLs/embeds or Matterport model IDs/URLs.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {TOURS.map((t, idx) => (
              <article key={`${t.type}-${t.title}-${idx}`} className="space-y-3">
                {t.type === 'zillow' ? (
                  'embedHtml' in t && t.embedHtml ? (
                    <Zillow3DEmbed embedHtml={t.embedHtml} />
                  ) : (
                    <Zillow3DEmbed url={t.url!} />
                  )
                ) : (
                  // matterport
                  ('modelId' in t && t.modelId) ? (
                    <MatterportEmbed modelId={t.modelId} autoplay={t.autoplay} brandless={t.brandless} />
                  ) : (
                    <MatterportEmbed src={t.src!} autoplay={t.autoplay} brandless={t.brandless} />
                  )
                )}

                <div>
                  <h2 className="text-base font-bold md:text-lg">{t.title}</h2>
                  {'note' in t && t.note && <p className="text-sm text-mascarpone/75">{t.note}</p>}
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
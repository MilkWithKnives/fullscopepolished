import Reveal from '@/components/motion/Reveal';

export const metadata = {
  title: 'Pricing | Full Scope Media - Photography & Video Packages',
  description: 'Transparent pricing for real estate photography, videography, drone, 3D tours, virtual staging, corporate headshots, and graduation photography services.'
};

export default function PricingPage() {
  return (
    <main className="text-mascarpone">
      {/* Hero */}
      <section className="container py-14 space-y-6">
        <div className="text-[14vw] md:text-[9rem] leading-none font-black text-mascarpone/10 uppercase">
          Pricing
        </div>

        <p className="prose-muted max-w-prose text-lg">
          Transparent packages built to fit square footage and marketing needs.
          <br />
          <span className="font-black text-wine">
            Floor plans included with every interior package.
          </span>
        </p>
      </section>

      {/* Packages */}
      <section className="container space-y-12 pb-14">
        {[
          { sqft: '1,000 – 1,999', photo: 280, video: 180, floor: 0, matte: 150 },
          { sqft: '2,000 – 2,999', photo: 320, video: 220, floor: 0, matte: 180 },
          { sqft: '3,000 – 3,999', photo: 380, video: 260, floor: 0, matte: 200 },
          { sqft: '4,000 – 4,999', photo: 520, video: 380, floor: 0, matte: 300 },
        ].map((pkg, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="rounded-lg border border-white/15 bg-white/[.03] p-6">
              <div className="text-xl font-black mb-3">{pkg.sqft} SQFT</div>
              <div className="grid sm:grid-cols-4 gap-4">
                <div>
                  <div className="font-black">Photos</div>
                  <div>${pkg.photo}</div>
                  <div className="text-xs text-wine mt-1">Includes 2D Floor Plan</div>
                </div>
                <div>
                  <div className="font-black">Videos</div>
                  <div>${pkg.video}</div>
                </div>
                <div>
                  <div className="font-black">Floor Plan</div>
                  <div className="line-through opacity-70">+${pkg.floor}</div>
                  <div className="text-xs text-wine">Included</div>
                </div>
                <div>
                  <div className="font-black">Matterport</div>
                  <div>${pkg.matte}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* FAQ */}
      <section className="container py-12 space-y-6">
        <div className="text-[12vw] md:text-[6rem] leading-none font-black text-mascarpone/10 uppercase">
          FAQ
        </div>
        <div className="space-y-4">
          {[
            { q: 'When do we get the photos back?', a: 'Most photo sets are delivered in 24–48 hours.' },
            { q: 'What if I need to reschedule?', a: 'No problem — please provide 24h notice if possible.' },
            { q: 'What payment do you accept?', a: 'Credit card, ACH, or check upon delivery.' },
            { q: 'What if the weather isn’t good?', a: 'We’ll reschedule at no extra charge.' },
          ].map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="rounded-md border border-white/15 bg-white/[.03] p-4">
                <summary className="font-black cursor-pointer">{faq.q}</summary>
                <p className="prose-muted mt-2 text-sm">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work With Us */}
      <section className="bg-coffee-800 border-y border-white/15">
        <div className="container py-10 text-center">
          <Reveal>
            <div className="text-3xl font-black tracking-wide">WORK WITH US</div>
            <p className="prose-muted mt-1">Tell us about your listing — we’ll craft the right package.</p>
            <a
              href="/book-us"
              className="mt-4 inline-block rounded-full bg-wine px-6 py-3 font-black text-mascarpone shadow-[0_6px_18px_rgba(143,36,50,.25)] hover:bg-wine-700"
            >
              INQUIRE
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
import Reveal from '@/components/motion/Reveal';
import ParallaxImage from '@/components/motion/ParallaxImage';
import ServiceCard from '@/components/ServiceCard';

export const metadata = {
  title: 'Services | Full Scope Media - Real Estate Photography, Corporate Headshots & More',
  description: 'Premium media services: real estate photography & video, drone footage, 3D tours, virtual staging, floor plans, corporate headshots, personal portraits, and graduation photography.'
};

export default function ServicesPage() {
  return (
    <main className="text-mascarpone">
      {/* ===== HERO ===== */}
      <section className="container pb-10 space-y-6 pt-14 md:pb-14">
        <div className="ghost-title text-[14vw] md:text-[9rem]">Services</div>

        <div className="grid md:grid-cols-[1.15fr_.85fr] gap-8 items-start">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=60"
            alt="Luxury modern home exterior with swimming pool and professional landscaping"
          />
          <div>
            <div className="mb-2 eyebrow">What we do</div>
            <p className="text-lg prose-muted">
              Premium photo, video, aerial, and digital add-ons crafted to elevate every listing.
              <br />
              <span className="font-black text-wine">
                Floor plans included with every interior package.
              </span>
            </p>
          </div>
        </div>
      </section>

      <div className="container hairline" />

      {/* ===== PRIMARY SERVICES (3-up like your ref) ===== */}
      <section className="container py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {/* PHOTO */}
          <Reveal>
            <div className="space-y-3">
              <div className="p-3 tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=1200&q=60"
                  alt="Professional real estate interior photography showing modern living room with natural lighting"
                  className="object-cover w-full rounded-md h-52"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tightest">Photo</h3>
                <p className="mt-1 prose-muted">
                  Editorial interiors/exteriors with natural light and clean geometry.
                </p>
                <a href="/services/photography" className="mt-3 link-pill">Learn more</a>
              </div>
            </div>
          </Reveal>

          {/* VIDEO */}
          <Reveal delay={0.05}>
            <div className="space-y-3">
              <div className="p-3 tile">
                <img
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=60"
                  alt="Cinematic real estate videography equipment setup for property tour filming"
                  className="object-cover w-full rounded-md h-52"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tightest">Video</h3>
                <p className="mt-1 prose-muted">Cinematic property tours with steady motion and tasteful pacing.</p>
                <a href="/services/videography" className="mt-3 link-pill">Learn more</a>
              </div>
            </div>
          </Reveal>

          {/* AERIAL */}
          <Reveal delay={0.1}>
            <div className="space-y-3">
              <div className="p-3 tile">
                <img
                  src="https://images.unsplash.com/photo-1495195129352-aeb325a55b65?auto=format&fit=crop&w=1200&q=60"
                  alt="Professional drone aerial photography capturing luxury home and surrounding neighborhood"
                  className="object-cover w-full rounded-md h-52"
                />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tightest">Aerial Drone</h3>
                <p className="mt-1 prose-muted">FAA-compliant aerial stills and clips that sell location + lifestyle.</p>
                <a href="/services/aerial-drone" className="mt-3 link-pill">Learn more</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container hairline" />

      {/* ===== MORE SERVICES (cards) ===== */}
      <section className="container grid gap-6 py-10 md:py-12 md:grid-cols-2">
        <ServiceCard
          delay={0.05}
          title="Virtual Staging"
          copy="Digitally furnish and style vacant spaces to help buyers imagine the lifestyle."
          img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=60"
          href="/services/virtual-staging"
        />
        <ServiceCard
          delay={0.08}
          title="3D Tours"
          copy="Immersive 3D tours powered by Zillow3D and Matterport. Explore every angle online."
          img="https://images.unsplash.com/photo-1622015663314-ec1597ad8d31?auto=format&fit=crop&w=900&q=60"
          href="/services/3d-tours"
        />
        <ServiceCard
          delay={0.11}
          title="AI Video Walkthroughs"
          copy="Fast, AI-generated walkthrough videos — perfect for social and quick market updates."
          img="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=60"
          href="/services/ai-video"
        />
        <ServiceCard
          delay={0.14}
          title="Floor Plans (2D/3D)"
          copy="CubiCasa-powered 2D & 3D plans, branded and MLS-ready. 2D included with interiors."
          img="https://images.unsplash.com/photo-1554995208-5196c2dcbf19?auto=format&fit=crop&w=900&q=60"
          href="/services/floor-plans"
        />
      </section>

      {/* ===== ABOUT BAND ===== */}
      <section className="container grid md:grid-cols-[1fr_420px] items-center gap-8 py-12">
        <Reveal>
          <div className="tile">
            <img
              src="https://images.unsplash.com/photo-1554995208-5196c2dcbf19?auto=format&fit=crop&w=1400&q=60"
              alt="Full Scope Media photographer working on professional real estate photography session"
              className="object-cover w-full h-full"
            />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div>
            <div className="ghost-title text-[10vw] md:text-[7rem]">About</div>
            <div className="text-xl font-black uppercase">About Full Scope Media</div>
            <p className="mt-2 prose-muted">
              Quality-driven real estate media. From single-family homes to luxury estates, we deliver premium visuals
              that move listings faster.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="bg-coffee-800 border-y border-white/15">
        <div className="container py-10 text-center">
          <Reveal>
            <div className="text-3xl font-black tracking-wide">WORK WITH US</div>
            <p className="mt-1 prose-muted">Tell us about your listing — we’ll craft the right package.</p>
            <a href="/book-us" className="mt-4 link-pill">INQUIRE</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
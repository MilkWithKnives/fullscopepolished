import ServiceLayout from '@/components/services/ServiceLayout';

export const metadata = { title: 'AI Video Walkthroughs — PALMA' };

export default function AIVideoService() {
  return (
    <ServiceLayout
      title="AI Walkthroughs"
      subtitle="Quick-turn, budget-friendly walkthrough videos generated with AI — perfect for socials and entry-level listings."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=60',
        alt: 'AI video edit on a phone',
      }}
      features={[
        { title: 'Fast Turnaround', desc: 'Often same/next-day delivery for social media posting.' },
        { title: 'Branding', desc: 'Your logo, colors, lower-thirds, and captions applied consistently.' },
        { title: 'Formats', desc: 'Portrait (9:16) for reels + landscape (16:9) master — web-ready H.264.' },
      ]}
      gallery={[
        { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60' },
        { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60' },
        { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60' },
        { src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=60' },
      ]}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-md border border-white/15 bg-white/[.03] p-5">
          <div className="font-black uppercase">What you provide</div>
          <p className="prose-muted mt-1 text-sm">
            A folder of listing photos or short clips. We handle the pacing, music, captions, and brand polish.
          </p>
        </div>
        <div className="rounded-md border border-white/15 bg-white/[.03] p-5">
          <div className="font-black uppercase">Great for</div>
          <p className="prose-muted mt-1 text-sm">
            Social teasers, price-improvement announcements, rentals, and quick market updates that still look premium.
          </p>
        </div>
      </div>
    </ServiceLayout>
  );
}
import ServiceLayout from '@/components/services/ServiceLayout';

export const metadata = { title: 'Videography — PALMA' };

export default function VideographyService() {
  return (
    <ServiceLayout
      title="Videos"
      subtitle="Cinematic property tours with steady camera work, thoughtful pacing, and music that fits the listing."
      heroImage={{ src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=60', alt: 'Videography' }}
      features={[
        { title: 'Property Tours', desc: '60–120s tours with interior flow and exterior context.' },
        { title: 'Drone Integration', desc: 'Establishing shots + sweeping reveals.' },
        { title: 'Deliverables', desc: '4K master + web/social crops on request.' },
      ]}
      gallery={[
        { src:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60' },
      ]}
    >
      <div className="rounded-md border border-white/15 bg-white/[.03] p-5">
        <div className="font-black uppercase">Options</div>
        <p className="prose-muted mt-1">Agent voiceover, scripted b-roll, social cuts (9:16), captions.</p>
      </div>
    </ServiceLayout>
  );
}
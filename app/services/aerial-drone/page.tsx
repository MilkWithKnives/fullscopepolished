import ServiceLayout from '@/components/services/ServiceLayout';

export const metadata = {
  title: 'Professional Drone Photography | Full Scope Media - FAA Licensed Aerial Services',
  description: 'Professional drone photography and videography for real estate. FAA-compliant pilots providing stunning aerial views, neighborhood context, and luxury property showcases.'
};

export default function AerialDroneService() {
  return (
    <ServiceLayout
      title="Aerial Drone"
      subtitle="FAA-compliant drone footage and photos that contextualize the property — lot lines, proximity, and lifestyle."
      heroImage={{
        src: 'https://images.unsplash.com/photo-1495195129352-aeb325a55b65?auto=format&fit=crop&w=1600&q=60',
        alt: 'Aerial view over modern property',
      }}
      features={[
        { title: 'Neighborhood Context', desc: 'Parks, schools, coastlines and commute from a compelling vantage.' },
        { title: 'Compliance & Safety', desc: 'Licensed pilots with airspace checks, NOTAM review, and weather holds.' },
        { title: 'Delivery', desc: 'High-res stills + 4K establishing clips ready to edit or drop into reels.' },
      ]}
      gallery={[
        { src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1400&q=60' },
        { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=60' },
        { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60' },
        { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=60' },
      ]}
    >
      <div className="rounded-md border border-white/15 bg-white/[.03] p-5">
        <div className="font-black uppercase">Use cases</div>
        <p className="prose-muted mt-1 text-sm">
          Great for acreage, views, waterfront, proximity to amenities, and marketing social cuts. Ask about branded
          map overlays and animated lot lines.
        </p>
      </div>
    </ServiceLayout>
  );
}
import ServiceLayout from '@/components/services/ServiceLayout';
import { Included2DFloorPlanBadge } from '@/components/services/Badges';

export const metadata = {
  title: 'Real Estate Photography | Full Scope Media - Professional Property Photography',
  description: 'Professional real estate photography services. Interior and exterior photography with natural lighting, HDR processing, and twilight shoots. 2D floor plans included with every package.'
};

export default function PhotographyService() {
  return (
    <ServiceLayout
      title="Photos"
      subtitle="Crisp interiors and exteriors with an editorial finish. Balanced lighting, true colors, beautifully composed frames."
      heroImage={{ src: 'https://images.unsplash.com/photo-1531973968078-9bb02785f13d?auto=format&fit=crop&w=1600&q=60', alt: 'Interior photography' }}
      features={[
        { title: 'Interiors', desc: 'Clean, well-lit compositions that sell flow and function.' },
        { title: 'Exteriors', desc: 'Golden-hour exteriors and twilight magic when needed.' },
        { title: 'Delivery', desc: 'Web-optimized JPGs + optional full-res; 24–48h turnaround.' },
      ]}
      gallery={[
        { src:'https://images.unsplash.com/photo-1600585154154-1e47f3dd76cc?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=60' },
      ]}
      badge={<Included2DFloorPlanBadge />}
    >
      <div className="rounded-md border border-white/15 bg-white/[.03] p-5">
        <div className="font-black uppercase">Included with every interior package</div>
        <p className="prose-muted mt-1">
          To meet CubiCasa preferred status requirements, <b>2D Floor Plan is included with every interior photography package</b>.
        </p>
      </div>
    </ServiceLayout>
  );
}
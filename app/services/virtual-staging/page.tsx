import ServiceLayout from '@/components/services/ServiceLayout';

export const metadata = { title: 'Virtual Staging — PALMA' };

export default function VirtualStagingService() {
  return (
    <ServiceLayout
      title="Virtual Staging"
      subtitle="Digitally furnish and style vacant spaces to help buyers imagine the lifestyle, fast and affordable."
      heroImage={{ src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=60', alt: 'Virtual staging' }}
      features={[
        { title: 'Design Libraries', desc: 'Modern, traditional, luxury — pick your vibe.' },
        { title: 'Turnaround', desc: '24–48 hours for most rooms.' },
        { title: 'Disclosure', desc: 'Ethical use and clear labeling for MLS compliance.' },
      ]}
      gallery={[
        { src:'https://images.unsplash.com/photo-1600585154154-1e47f3dd76cc?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=60' },
      ]}
    />
  );
}
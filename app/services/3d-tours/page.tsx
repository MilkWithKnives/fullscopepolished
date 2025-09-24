import ServiceLayout from '@/components/services/ServiceLayout';
import { CubiCasaPreferredBadge } from '@/components/services/Badges';

export const metadata = {
  title: '3D Virtual Tours | Full Scope Media - Matterport & Zillow 3D Home Tours',
  description: 'Professional 3D virtual tours using Matterport and Zillow 3D technology. Immersive dollhouse views and measured spaces for real estate listings and remote buyers.'
};

export default function Tours3DService() {
  return (
    <ServiceLayout
      title="3D Tours"
      subtitle="Immersive 3D experiences powered by Zillow 3D and Matterport — ideal for remote buyers and pre-qualifying interest."
      heroImage={{ src: 'https://images.unsplash.com/photo-1622015663314-ec1597ad8d31?auto=format&fit=crop&w=1600&q=60', alt: '3D tours' }}
      features={[
        { title: 'Zillow 3D Home', desc: 'Boost search visibility on Zillow with native 3D tours.' },
        { title: 'Matterport', desc: 'True 3D capture with dollhouse & measured spaces.' },
        { title: 'Embed Ready', desc: 'Easy embeds for MLS, sites, and socials.' },
      ]}
      gallery={[
        { src:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60' },
        { src:'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?auto=format&fit=crop&w=1200&q=60' },
      ]}
      badge={<CubiCasaPreferredBadge />}
    />
  );
}
import AngledGallery, { GalleryItem } from '@/components/portfolio/AngledGallery';

export const metadata = { title: 'Drone Portfolio — PALMA' };

const DRONE = [
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1400&q=60',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=60',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=60',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=60',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=60',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=60',
];

const DRONE_ITEMS: GalleryItem[] = DRONE.map((src, index) => ({
  src,
  alt: `Drone image ${index + 1}`,
}));

export default function DronePortfolio() {
  return (
    <main className="text-mascarpone">
      <section className="container space-y-6 py-14">
        <div className="text-[12vw] md:text-[7rem] leading-none font-black text-mascarpone/10 uppercase">Drone</div>
        <p className="prose-muted max-w-prose">Aerial context that sells location, lot, and lifestyle. FAA-compliant pilots.</p>
        <AngledGallery items={DRONE_ITEMS} />
      </section>
    </main>
  );
}

import VideoThumb from '@/components/portfolio/VideoThumb';

export const metadata = {
  title: 'Video Portfolio | Full Scope Media - Real Estate Videography Showcase',
  description: 'Professional real estate videography portfolio featuring cinematic property tours, luxury home videos, and stunning visual storytelling for residential and commercial properties.'
};

// Demo sample videos (public domain samples). Replace with yours when ready.
const VIDEOS = [
  {
    title: 'Hillside Modern',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    title: 'Coastal Contemporary',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    title: 'Skylight Loft',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    title: 'Desert Retreat',
    poster: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
];

export default function VideoPortfolio() {
  return (
    <main className="text-mascarpone">
      <section className="container py-14 space-y-6">
        <div className="text-[12vw] md:text-[7rem] leading-none font-black text-mascarpone/10 uppercase">Videos</div>
        <p className="prose-muted max-w-prose">Cinematic tours with smooth motion and pacing. Hover a thumbnail to preview.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map(v => <VideoThumb key={v.src} item={v} />)}
        </div>
      </section>
    </main>
  );
}
import Image from "next/image";

export const metadata = {
  title: "About | Full Scope Media",
  description:
    "About Full Scope Media — real estate media, photography, video, drone, 3D tours, and more.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-coffee-900 text-mascarpone">
      <section className="container px-4 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Photo */}
          <div className="relative w-full h-[300px] sm:h-[420px] md:h-[520px] overflow-hidden rounded-xl border border-white/10">
            <Image
              src="/about-photo.png" // /public/about-photo.png
              alt="About Full Scope Media"
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="mb-6 text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl">
              About Me
            </h1>
            <p className="text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
              Hi, I’m the founder of <span className="font-bold">Full Scope Media</span>.
              I specialize in high-end real estate visuals — photography, cinematic video,
              aerial drone, floor plans, 3D tours, and virtual staging.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
              My goal is simple: make your listings look exceptional, load fast,
              and convert curious views into showings.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

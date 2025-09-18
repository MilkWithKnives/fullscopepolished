'use client';

type Props = {
  src: string; // video in /public or remote allowed host
  poster?: string;
  className?: string;
};

export default function VideoThumb({ src, poster, className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-white/10 ${className}`}>
      <video
        src={src}
        poster={poster}
        className="object-cover w-full h-full"
        muted
        loop
        playsInline
        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
        onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
      />
    </div>
  );
}
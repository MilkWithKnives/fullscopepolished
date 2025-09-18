// components/embeds/MatterportEmbed.tsx
// Server component (no 'use client') — simple, fast, and safe for hydration.

type MatterportEmbedProps = {
  /** EITHER provide a Matterport model SID (preferred)… */
  modelId?: string;
  /** …OR provide a full iframe src you got from Matterport share dialog */
  src?: string;
  title?: string;
  /** Start playing automatically (defaults to true) */
  autoplay?: boolean;
  /** Hide Matterport brand UI where allowed (defaults to true) */
  brandless?: boolean;
  /** Allow VR toggle (defaults to false) */
  vr?: boolean;
  className?: string;
};

export default function MatterportEmbed({
  modelId,
  src,
  title = 'Matterport 3D Tour',
  autoplay = true,
  brandless = true,
  vr = false,
  className = '',
}: MatterportEmbedProps) {
  const params = new URLSearchParams();

  if (autoplay) params.set('play', '1');
  params.set('qs', '1');         // quality/smoothing
  params.set('dh', '1');         // deep link handling / performance hint
  if (brandless) params.set('brand', '0');
  if (vr) params.set('vr', '1');

  const finalSrc =
    src ??
    (modelId
      ? `https://my.matterport.com/show/?m=${encodeURIComponent(modelId)}&${params.toString()}`
      : '');

  if (!finalSrc) {
    return (
      <div className="p-4 border rounded-lg border-white/10 bg-black/20 text-mascarpone">
        <p className="text-sm">No Matterport source provided.</p>
        <p className="text-xs opacity-75">
          Pass a <code>modelId</code> (e.g. <code>abcdef123456</code>) or a full <code>src</code> URL.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 shadow-lg ${className}`}
    >
      <iframe
        src={finalSrc}
        title={title}
        loading="lazy"
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen; vr"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
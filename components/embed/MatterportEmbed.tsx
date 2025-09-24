'use client';

type Props =
  | { modelId: string; title?: string; className?: string; src?: never; autoplay?: boolean; brandless?: boolean }
  | { src: string; title?: string; className?: string; modelId?: never; autoplay?: boolean; brandless?: boolean };

export default function MatterportEmbed(props: Props) {
  const { title = "Matterport 3D Tour", className, autoplay = true, brandless = true } = props;

  const src =
    "modelId" in props
      ? `https://my.matterport.com/show/?m=${props.modelId}${autoplay ? "&play=1" : ""}${brandless ? "&brand=0" : ""}`
      : props.src!;

  return (
    <div className={className ?? "w-full aspect-video rounded-xl overflow-hidden border border-neutral-800"}>
      <iframe
        src={src}
        title={title}
        allow="xr-spatial-tracking; fullscreen; vr"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
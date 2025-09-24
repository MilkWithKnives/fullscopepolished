'use client';

type Props =
  | { url: string; title?: string; className?: string; embedHtml?: never }
  | { embedHtml: string; title?: string; className?: string; url?: never };

export default function Zillow3DEmbed(props: Props) {
  if ("embedHtml" in props && props.embedHtml) {
    return (
      <div
        className={props.className ?? "w-full aspect-video rounded-xl overflow-hidden border border-neutral-800"}
        dangerouslySetInnerHTML={{ __html: props.embedHtml }}
      />
    );
  }

  const { url, title = "Zillow 3D Home Tour", className } = props as Extract<Props, { url: string }>;
  return (
    <div className={className ?? "w-full aspect-video rounded-xl overflow-hidden border border-neutral-800"}>
      <iframe
        src={url}
        title={title}
        allow="fullscreen"
        allowFullScreen
        className="w-full h-full"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
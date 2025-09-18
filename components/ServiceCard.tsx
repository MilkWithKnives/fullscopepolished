type Props = {
  title: string;
  body: string;
  href?: string;
  icon?: React.ReactNode;
};

export default function ServiceCard({ title, body, href, icon }: Props) {
  const content = (
    <div
      className="
        group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03] p-5
        transition-colors duration-300 hover:border-wine
      "
    >
      <div className="flex items-start gap-3">
        {icon && <div className="text-wine/90">{icon}</div>}
        <div>
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-mascarpone/80">{body}</p>
        </div>
      </div>
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-br from-wine/10 to-transparent" />
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block will-change-transform transition-transform hover:scale-[1.01]">
        {content}
      </a>
    );
  }
  return content;
}

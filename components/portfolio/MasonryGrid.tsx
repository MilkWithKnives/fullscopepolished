type Item = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
};

type MasonryGridProps = {
  items: Item[];
  columns?: { base: number; md?: number; lg?: number };
};

export default function MasonryGrid({ items, columns = { base: 1, md: 2, lg: 3 } }: MasonryGridProps) {
  return (
    <div
      className="
        [column-fill:_balance]
        gap-4
        columns-1
        md:columns-2
        lg:columns-3
      "
      style={{
        columnGap: '1rem',
      }}
    >
      {items.map((it, i) => (
        <div key={i} className="mb-4 break-inside-avoid reveal-init">
          {it.type === 'image' ? (
            <img
              src={it.src}
              alt={it.alt || ''}
              className="w-full h-auto border rounded-lg border-white/10"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <video
              src={it.src}
              poster={it.poster}
              controls
              className="w-full h-auto border rounded-lg border-white/10"
            />
          )}
        </div>
      ))}
    </div>
  );
}

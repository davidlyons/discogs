import type { ReleaseJSONType } from '@/lib/types'

export const AlbumGrid = ({ releases }: { releases: ReleaseJSONType[] }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    {releases.map(({ url, title, artist, year, format, thumb }, index) => (
      <a
        href={url}
        className="flex gap-4 p-3 hover:bg-foreground/8 rounded-sm overflow-hidden"
        key={`${title}-${index}`}
      >
        <img
          src={thumb || 'https://placehold.co/96?text=404'}
          alt={title}
          className="size-24 object-cover"
        />
        <div className="grow">
          <h2 className="font-bold truncate max-w-40">{title}</h2>
          <p className="mb-2 truncate max-w-40">{artist}</p>
          <p className="text-sm">{year}</p>
          <p className="text-sm opacity-50 truncate max-w-40">{format}</p>
        </div>
      </a>
    ))}
  </div>
)

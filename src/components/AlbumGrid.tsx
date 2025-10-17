import type { ReleaseJSONType } from '@/lib/types'
import { Disc3 } from 'lucide-react'

export const AlbumGrid = ({ releases }: { releases: ReleaseJSONType[] }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    {releases.map(({ url, title, artist, year, format, thumb }, index) => (
      <a
        href={url}
        className="hover:bg-foreground/8 flex gap-4 overflow-hidden rounded-sm p-3"
        key={`${title}-${index}`}
      >
        {thumb ? (
          <img src={thumb} alt={title} className="size-24 object-cover" />
        ) : (
          <div className="bg-card flex size-24 items-center justify-center">
            <Disc3 size={64} className="opacity-15" />
          </div>
        )}
        <div className="grow">
          <h2 className="max-w-40 truncate font-bold">{title}</h2>
          <p className="mb-2 max-w-40 truncate">{artist}</p>
          <p className="text-sm">{year}</p>
          <p className="max-w-40 truncate text-sm opacity-50">{format}</p>
        </div>
      </a>
    ))}
  </div>
)

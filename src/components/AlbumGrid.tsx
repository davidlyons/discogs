import type { ReleaseJSONType } from '@/lib/types'
import { Disc3 } from 'lucide-react'

export const AlbumGrid = ({ releases }: { releases: ReleaseJSONType[] }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    {releases.map(({ url, title, artists, year, format, thumb }, index) => (
      <div
        className="hover:bg-foreground/8 flex gap-4 overflow-hidden rounded-sm p-3
          transition-colors"
        key={`${title}-${index}`}
      >
        <a href={url} className="size-24">
          {thumb ? (
            <img src={thumb} alt={title} className="size-full object-cover" />
          ) : (
            <div className="bg-card flex size-full items-center justify-center">
              <Disc3 size={64} className="opacity-15" />
            </div>
          )}
        </a>
        <div className="grow">
          <h2 className="max-w-40 truncate font-bold">
            <a className="underline-offset-4 hover:underline" href={url}>
              {title}
            </a>
          </h2>
          <p className="mb-2 max-w-40 truncate">
            {artists.map((artist) => (
              <a
                className="underline-offset-4 hover:underline"
                href={`https://www.discogs.com/artist/${artist.id}`}
              >
                {artist.name}
              </a>
            ))}
          </p>
          <p className="text-sm">{year}</p>
          <p className="max-w-40 truncate text-sm opacity-50">{format}</p>
        </div>
      </div>
    ))}
  </div>
)

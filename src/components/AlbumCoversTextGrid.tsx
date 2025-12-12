import type { ReleaseFormatted } from '@/lib/types'
import { Disc3, CirclePlay } from 'lucide-react'
import { getListenUrl } from '@/lib/getListenUrl'

type AlbumCoversTextGridProps = {
  releases: ReleaseFormatted[]
  onAlbumClick: (id: number) => void
}

export const AlbumCoversTextGrid = ({ releases, onAlbumClick }: AlbumCoversTextGridProps) => {
  const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.stopPropagation()
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {releases.map(({ id, url, title, artists, year, format, thumb }, index) => (
        <div
          className="hover:bg-foreground/8 flex gap-4 overflow-hidden rounded-sm border p-3
            transition-colors"
          key={`${title}-${index}`}
          onClick={() => onAlbumClick(id)}
        >
          <a
            href={getListenUrl(artists, title)}
            onClick={onLinkClick}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative size-24 shrink-0 overflow-hidden rounded-xs"
          >
            {thumb ? (
              <img src={thumb} alt={title} className="size-full object-cover" />
            ) : (
              <div className="bg-card flex size-full items-center justify-center">
                <Disc3 size={64} className="opacity-15" />
              </div>
            )}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0
                transition-opacity group-hover:opacity-100"
            >
              <CirclePlay size={64} strokeWidth={1} className="text-white" />
            </div>
          </a>
          <div className="grow">
            <h2 className="max-w-40 truncate font-bold">
              <a className="underline-offset-4 hover:underline" href={url} onClick={onLinkClick}>
                {title}
              </a>
            </h2>
            <p className="mb-2 max-w-40 truncate">
              {artists.map((artist) => (
                <a
                  className="underline-offset-4 hover:underline"
                  href={`https://www.discogs.com/artist/${artist.id}`}
                  onClick={onLinkClick}
                  key={artist.id}
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
}

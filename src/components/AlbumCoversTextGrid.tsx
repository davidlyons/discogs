import type { Release } from '@/lib/types-collection'
import { Disc3 } from 'lucide-react'
import { cn } from '@/lib/utils'

type AlbumCoversTextGridProps = {
  releases: Release[]
  onAlbumClick: (id: number) => void
  activeAlbum?: number
}

export const AlbumCoversTextGrid = ({
  releases,
  onAlbumClick,
  activeAlbum,
}: AlbumCoversTextGridProps) => (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    {releases.map(({ basic_information: { id, title, artists, year, formats, thumb } }, index) => (
      <button
        className={cn(
          `hover:bg-foreground/8 group flex cursor-pointer gap-4 overflow-hidden rounded-sm border
          p-3 text-start outline-2 outline-offset-2 outline-transparent transition-colors`,
          id === activeAlbum && 'outline-ring'
        )}
        key={`${title}-${index}`}
        onClick={() => onAlbumClick(id)}
      >
        <div className="size-24 shrink-0 overflow-hidden rounded-xs">
          {thumb ? (
            <img src={thumb} alt={title} className="size-full object-cover" />
          ) : (
            <div className="bg-card flex size-full items-center justify-center">
              <Disc3 size={64} className="opacity-15" />
            </div>
          )}
        </div>
        <div className="grow">
          <h2 className="max-w-40 truncate font-bold md:max-w-24 xl:max-w-36">
            <span className="underline-offset-4 group-hover:underline">{title}</span>
          </h2>
          <p className="mb-2 max-w-40 truncate md:max-w-24 xl:max-w-36">
            {artists.map((artist) => artist.name).join(', ')}
          </p>
          <p className="text-sm">{year}</p>
          <p className="max-w-40 truncate text-sm opacity-50 md:max-w-24 xl:max-w-36">
            {formats.map((format) => format.name).join(', ')}
          </p>
        </div>
      </button>
    ))}
  </div>
)

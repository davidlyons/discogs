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
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-9">
    {releases.map(({ basic_information: { id, title, artists, year, formats, thumb } }, index) => (
      <button
        className={cn(
          `hover:bg-foreground/10 group focus-visible:bg-foreground/10 cursor-pointer
          overflow-hidden rounded-sm p-3 text-start outline-1 outline-transparent transition-colors`,
          id === activeAlbum && 'outline-ring'
        )}
        key={`${title}-${index}`}
        onClick={() => onAlbumClick(id)}
      >
        <div className="mb-3 aspect-square overflow-hidden rounded-sm">
          {thumb ? (
            <img src={thumb} alt={title} className="size-full object-cover" />
          ) : (
            <div className="bg-card flex size-full items-center justify-center">
              <Disc3 size={64} className="opacity-15" />
            </div>
          )}
        </div>
        <div className="grow">
          <h2 className="max-w-40 truncate md:max-w-24 xl:max-w-36">
            <span className="underline-offset-4 group-hover:underline">{title}</span>
          </h2>
          <p className="mb-2 max-w-40 truncate opacity-70 md:max-w-24 xl:max-w-36">
            {artists.map((artist) => artist.name).join(', ')}
          </p>
          <p className="max-w-40 truncate text-sm opacity-50 md:max-w-24 xl:max-w-36">
            {year} •{' '}
            {formats
              .filter((format) => format.name !== 'All Media')
              .map((format) => format.name)
              .join(', ')}
          </p>
        </div>
      </button>
    ))}
  </div>
)

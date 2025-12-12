import type { Release } from '@/lib/types-collection'
import { Disc3 } from 'lucide-react'

type AlbumCoversTextGridProps = {
  releases: Release[]
  onAlbumClick: (id: number) => void
}

export const AlbumCoversTextGrid = ({ releases, onAlbumClick }: AlbumCoversTextGridProps) => (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
    {releases.map(({ basic_information: { id, title, artists, year, formats, thumb } }, index) => (
      <button
        className="hover:bg-foreground/8 group flex cursor-pointer gap-4 overflow-hidden rounded-sm
          border p-3 text-start transition-colors"
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
          <h2 className="max-w-40 truncate font-bold">
            <span className="underline-offset-4 group-hover:underline">{title}</span>
          </h2>
          <p className="mb-2 max-w-40 truncate">
            {artists.map((artist) => artist.name).join(', ')}
          </p>
          <p className="text-sm">{year}</p>
          <p className="max-w-40 truncate text-sm opacity-50">
            {formats.map((format) => format.name).join(', ')}
          </p>
        </div>
      </button>
    ))}
  </div>
)

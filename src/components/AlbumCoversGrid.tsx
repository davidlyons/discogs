import type { ReleaseFormatted } from '@/lib/types'
import { Disc3, CirclePlay } from 'lucide-react'
import { getListenUrl } from '@/lib/getListenUrl'

export const AlbumCoversGrid = ({ releases }: { releases: ReleaseFormatted[] }) => (
  <div
    className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10"
  >
    {releases.map(({ title, artists, thumb }, index) => (
      <a
        href={getListenUrl(artists, title)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative aspect-square"
        key={`${title}-${index}`}
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
    ))}
  </div>
)

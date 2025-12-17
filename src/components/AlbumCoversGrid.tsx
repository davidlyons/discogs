import type { Release } from '@/lib/types-collection'
import { Disc3 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type AlbumCoversGridProps = {
  releases: Release[]
  onAlbumClick: (id: number) => void
  activeAlbum?: number
}

export const AlbumCoversGrid = ({ releases, onAlbumClick, activeAlbum }: AlbumCoversGridProps) => (
  <div
    className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10"
  >
    {releases.map(({ basic_information: { id, title, artists, thumb, year } }, index) => (
      <Tooltip key={`${title}-${index}`}>
        <TooltipTrigger asChild>
          <button
            onClick={() => onAlbumClick(id)}
            className={cn(
              `hover:outline-ring aspect-square cursor-pointer overflow-hidden rounded-sm outline-2
              outline-offset-2 outline-transparent transition-colors`,
              id === activeAlbum && 'outline-foreground!'
            )}
          >
            {thumb ? (
              <img src={thumb} alt={title} className="size-full object-cover" />
            ) : (
              <div className="bg-card flex size-full items-center justify-center">
                <Disc3 size={64} className="opacity-15" />
              </div>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xl">
          <p>{`${artists.map((artist) => artist.name).join(', ')} – ${title} (${year})`}</p>
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
)

import type { Release } from '@/lib/types-collection'
import { CirclePlay, ListMusic } from 'lucide-react'
import { getListenUrl } from '@/lib/getListenUrl'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type AlbumTextListProps = {
  releases: Release[]
  onAlbumClick: (id: number) => void
  activeAlbum?: number
}

export const AlbumTextList = ({ releases, onAlbumClick, activeAlbum }: AlbumTextListProps) => (
  <Table className="table-fixed">
    <TableHeader>
      <TableRow>
        <TableHead className="w-14"></TableHead>
        <TableHead className="w-1/3">Title</TableHead>
        <TableHead>Artist</TableHead>
        <TableHead>Year</TableHead>
        <TableHead>Genres</TableHead>
        <TableHead>Format</TableHead>
        <TableHead className="w-16 text-center">Details</TableHead>
        <TableHead className="w-16 text-center">Listen</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {releases.map(
        ({ basic_information: { id, thumb, title, artists, year, genres, formats } }, index) => (
          <TableRow
            className={cn('group', id === activeAlbum && 'bg-muted/70')}
            key={`${title}-${index}`}
          >
            <TableCell className="flex justify-center">
              <img src={thumb} alt={title} className="inline size-5 scale-150 rounded-xs" />
            </TableCell>
            <TableCell>
              <a
                className="font-bold underline-offset-4 hover:underline"
                href={`https://www.discogs.com/release/${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </TableCell>

            <TableCell>
              {artists.map((artist) => (
                <a
                  className="underline-offset-4 hover:underline"
                  href={`https://www.discogs.com/artist/${artist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={artist.id}
                >
                  {artist.name}
                </a>
              ))}
            </TableCell>

            <TableCell>
              <span className="opacity-60">{year}</span>
            </TableCell>

            <TableCell>
              <span className="opacity-60">{genres.join(', ')}</span>
            </TableCell>

            <TableCell>
              <span className="opacity-60">{formats.map((format) => format.name).join(', ')}</span>
            </TableCell>

            {/* details button */}
            <TableCell className="text-center">
              <button
                className="cursor-pointer opacity-30 transition-opacity group-hover:opacity-50
                  hover:opacity-100"
                onClick={() => onAlbumClick(id)}
              >
                <ListMusic size={20} />
                <span className="sr-only">Details</span>
              </button>
            </TableCell>

            {/* listen link */}
            <TableCell className="text-center">
              <a
                href={getListenUrl(artists, title)}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-30 transition-opacity group-hover:opacity-50 hover:opacity-100"
              >
                <CirclePlay size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
)

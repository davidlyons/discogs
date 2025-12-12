import type { ReleaseFormatted } from '@/lib/types'
import { CirclePlay } from 'lucide-react'
import { getListenUrl } from '@/lib/getListenUrl'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

export const AlbumTextList = ({ releases }: { releases: ReleaseFormatted[] }) => (
  <Table className="table-fixed">
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/3">Title</TableHead>
        <TableHead>Artist</TableHead>
        <TableHead>Year</TableHead>
        <TableHead>Format</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {releases.map(({ url, title, artists, year, format }, index) => (
        <TableRow className="group" key={`${title}-${index}`}>
          <TableCell>
            <a className="font-bold underline-offset-4 hover:underline" href={url}>
              {title}
            </a>
          </TableCell>

          <TableCell>
            {artists.map((artist) => (
              <a
                className="underline-offset-4 hover:underline"
                href={`https://www.discogs.com/artist/${artist.id}`}
                key={artist.id}
              >
                {artist.name}
              </a>
            ))}
          </TableCell>

          <TableCell>
            <span className="opacity-50">{year}</span>
          </TableCell>

          <TableCell>
            <span className="opacity-50">{format}</span>
          </TableCell>

          <TableCell className="text-right">
            <a
              href={getListenUrl(artists, title)}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-30 transition-opacity group-hover:opacity-50 hover:opacity-100"
            >
              <CirclePlay size={20} />
            </a>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

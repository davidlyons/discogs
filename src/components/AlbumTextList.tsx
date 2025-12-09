import type { ReleaseFormatted } from '@/lib/types'
import { CirclePlay } from 'lucide-react'
import { getListenUrl } from '@/lib/getListenUrl'

export const AlbumTextList = ({ releases }: { releases: ReleaseFormatted[] }) => (
  <div>
    {releases.map(({ url, title, artists, year, format }, index) => (
      <div className="group mb-1 flex gap-2" key={`${title}-${index}`}>
        <a className="font-bold underline-offset-4 hover:underline" href={url}>
          {title}
        </a>
        {`–`}
        {artists.map((artist) => (
          <a
            className="underline-offset-4 hover:underline"
            href={`https://www.discogs.com/artist/${artist.id}`}
            key={artist.id}
          >
            {artist.name}
          </a>
        ))}
        <span className="opacity-50">{year}</span>
        <span className="opacity-25">{format}</span>
        <a
          href={getListenUrl(artists, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden opacity-50 transition-opacity group-hover:inline hover:opacity-100"
        >
          <CirclePlay size={20} />
        </a>
      </div>
    ))}
  </div>
)

import { useState } from 'react'
import { XIcon, CirclePlay, Disc3 } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Release } from '@/lib/types-release'
import { getListenUrl } from '@/lib/getListenUrl'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useCarouselCurrent } from '@/lib/useCarouselCurrent'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

type AlbumDetailsProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAnimationEnd?: () => void
  isLoading: boolean
  release?: Release
}

export const AlbumDetails = ({
  open,
  onOpenChange,
  onAnimationEnd,
  isLoading,
  release,
}: AlbumDetailsProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const { current, count } = useCarouselCurrent(api)

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        onAnimationEnd={onAnimationEnd}
        // don't close when clicking outside
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <div className="overflow-y-auto">
          {/* close button */}
          <div className="flex justify-end">
            <SheetClose asChild>
              <button className="cursor-pointer p-5 opacity-50 transition-opacity hover:opacity-100">
                <XIcon size={32} />
                <span className="sr-only">Close</span>
              </button>
            </SheetClose>
          </div>

          {!isLoading && release ? (
            <>
              <SheetHeader>
                <SheetTitle className="text-balance">
                  {release.artists.map((artist) => (
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
                  {` – `}
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`https://www.discogs.com/release/${release.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {release.title}
                  </a>
                </SheetTitle>
                <SheetDescription className="flex flex-wrap gap-x-2.5 gap-y-1.5">
                  {release.year} •{' '}
                  {release.formats
                    .filter((format) => format.name !== 'All Media')
                    .map(({ qty, name }) => (parseInt(qty) > 1 ? `${qty} x ${name}` : name))
                    .join(', ')}{' '}
                  {/* text = vinyl color */}
                  {release.formats
                    .filter((format) => format.name !== 'All Media')
                    .map(
                      ({ text }) =>
                        text && (
                          <Badge variant="secondary" className="bg-chart-1">
                            {text}
                          </Badge>
                        )
                    )}
                </SheetDescription>
                <SheetDescription>
                  {`${release.genres.join(', ')}${release.styles.length ? ' / ' : ''}${release.styles.join(', ')}`}
                </SheetDescription>
              </SheetHeader>

              <div className="px-5 pb-5">
                {/* links */}
                <div className="mb-5 flex gap-3">
                  <Button size="sm" asChild>
                    <a
                      href={getListenUrl(release.artists, release.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CirclePlay size={20} /> YouTube
                    </a>
                  </Button>

                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://www.discogs.com/release/${release.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Disc3 size={20} /> Discogs
                    </a>
                  </Button>
                </div>

                {/* images carousel */}
                <div className="mb-5">
                  <Carousel opts={{ loop: true }} setApi={setApi} className="mb-2">
                    <CarouselContent>
                      {release.images.map((image) => (
                        <CarouselItem key={image.uri}>
                          <img
                            src={image.uri}
                            alt={release.title}
                            className="aspect-square w-full rounded-md object-contain"
                            loading="lazy"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {count > 1 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                  {count > 1 && (
                    <div className="text-muted-foreground text-center text-sm">
                      {`${current} / ${count}`}
                    </div>
                  )}
                </div>

                {/* tracklist */}
                <Table className="table-fixed">
                  <TableBody>
                    {release.tracklist.map(({ position, title, duration, type_ }, index) => (
                      <TableRow key={`${release.title}-${position}-${index}`}>
                        <TableCell>{position}</TableCell>
                        <TableCell className="w-2/3 truncate overflow-hidden">
                          {type_ === 'heading' ? <h3 className="font-bold">{title}</h3> : title}
                        </TableCell>
                        <TableCell>{duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <div className="p-5">
              <SheetTitle />
              <SheetDescription />
              <div className="flex items-center gap-4">
                <Spinner /> Loading...
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { X, CirclePlay, Disc3 } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import type { Release } from '@/lib/types-release'
import { getListenUrl } from '@/lib/getListenUrl'

import { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useCarouselCurrent } from '@/lib/useCarouselCurrent'

type AlbumDetailsDrawerProps = {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  release?: Release
}

export const AlbumDetailsDrawer = ({
  open,
  onOpenChange,
  isLoading,
  release,
}: AlbumDetailsDrawerProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const { current, count } = useCarouselCurrent(api)

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="outline-none">
        <div className="overflow-y-auto">
          {/* close button */}
          <div className="flex justify-end">
            <DrawerClose asChild>
              <button className="cursor-pointer p-5 opacity-50 transition-opacity hover:opacity-100">
                <X size={32} />
              </button>
            </DrawerClose>
          </div>

          {!isLoading && release ? (
            <>
              <DrawerHeader>
                <DrawerTitle className="text-balance">
                  {release.artists.map((artist) => artist.name).join(' ')} – {release.title}
                </DrawerTitle>
                <DrawerDescription>{release.year}</DrawerDescription>
                <DrawerDescription>
                  {release.genres} / {release.styles.join(', ')}
                </DrawerDescription>
              </DrawerHeader>

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

                {/* iamges carousel */}
                <Carousel opts={{ loop: true }} setApi={setApi} className="mb-2">
                  <CarouselContent>
                    {release.images.map((image) => (
                      <CarouselItem>
                        <img
                          src={image.uri}
                          alt={release.title}
                          className="aspect-square rounded-md object-contain"
                          loading="lazy"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="text-muted-foreground mb-5 text-center text-sm">
                  {`${current} / ${count}`}
                </div>

                {/* tracklist */}
                <Table className="table-fixed">
                  <TableBody>
                    {release.tracklist.map(({ position, title, duration, type_ }) => (
                      <TableRow key={`${release.title}-${position}`}>
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
              <DrawerTitle />
              <DrawerDescription />
              <div className="flex items-center gap-4">
                <Spinner /> Loading...
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

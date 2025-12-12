'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserCollection } from '@/lib/getUserCollection'
import { getRelease } from '@/lib/getRelease'
import { Spinner } from '@/components/ui/spinner'
import { AlbumCoversTextGrid } from '@/components/AlbumCoversTextGrid'
import { AlbumCoversGrid } from '@/components/AlbumCoversGrid'
import { AlbumTextList } from '@/components/AlbumTextList'
import { PaginationRow } from '@/components/PaginationRow'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { X } from 'lucide-react'

type VinylBrowserProps = {
  user: string
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export type View = 'covers' | 'covers-text' | 'text'

export function VinylBrowser({ user, page, setPage }: VinylBrowserProps) {
  const [perPage, setPerPage] = useState(25)
  const [view, setView] = useState<View>('covers-text')

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [focusedAlbum, setFocusedAlbum] = useState<number | undefined>()

  const handleReleaseClick = (id: number) => {
    setFocusedAlbum(id)
    setIsDrawerOpen(true)
  }

  const { isLoading, data } = useQuery({
    queryKey: ['collection', user, page, perPage],
    queryFn: () => getUserCollection({ user, page, perPage }),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  })

  const { isLoading: isLoadingRelease, data: releaseData } = useQuery({
    queryKey: ['release', focusedAlbum],
    queryFn: () => getRelease(focusedAlbum),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    enabled: !!focusedAlbum,
  })

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Spinner /> Loading...
      </div>
    )
  }

  if (data) {
    return (
      <>
        <PaginationRow
          pagination={data.pagination}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          view={view}
          setView={setView}
        />

        {view === 'covers-text' ? (
          <AlbumCoversTextGrid releases={data.releases} handleReleaseClick={handleReleaseClick} />
        ) : view === 'covers' ? (
          <AlbumCoversGrid releases={data.releases} />
        ) : (
          view === 'text' && <AlbumTextList releases={data.releases} />
        )}

        {/* album details in right side panel */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
          <DrawerContent className="outline-none">
            <div className="overflow-y-auto">
              {/* close button */}
              <div className="flex justify-end">
                <DrawerClose asChild>
                  <button
                    className="cursor-pointer p-4 opacity-50 transition-opacity hover:opacity-100"
                  >
                    <X size={32} />
                  </button>
                </DrawerClose>
              </div>

              {!isLoadingRelease && releaseData ? (
                <>
                  <DrawerHeader>
                    <DrawerTitle>
                      {releaseData?.artists.map((artist) => artist.name).join(' ')} –{' '}
                      {releaseData?.title}
                    </DrawerTitle>
                    <DrawerDescription>{releaseData?.year}</DrawerDescription>
                    <DrawerDescription>
                      {releaseData?.genres} / {releaseData?.styles.join(', ')}
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">
                    <img
                      src={releaseData.images[0].uri}
                      alt={releaseData.title}
                      className="mb-5 aspect-square rounded-md object-cover"
                    />
                    <Table className="table-fixed">
                      <TableBody>
                        {releaseData.tracklist.map(({ position, title, duration, type_ }) => (
                          <TableRow key={`${releaseData.title}-${position}`}>
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
                <div className="p-4">
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
      </>
    )
  }
}

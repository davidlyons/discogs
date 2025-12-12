'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserCollection } from '@/lib/getUserCollection'
import { getRelease } from '@/lib/getRelease'
import { Spinner } from '@/components/ui/spinner'
import { PaginationRow } from '@/components/PaginationRow'
import { AlbumCoversTextGrid } from '@/components/AlbumCoversTextGrid'
import { AlbumCoversGrid } from '@/components/AlbumCoversGrid'
import { AlbumTextList } from '@/components/AlbumTextList'
import { AlbumDetailsDrawer } from '@/components/AlbumDetailsDrawer'

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

  const handleAlbumClick = (id: number) => {
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
          <AlbumCoversTextGrid releases={data.releases} onAlbumClick={handleAlbumClick} />
        ) : view === 'covers' ? (
          <AlbumCoversGrid releases={data.releases} />
        ) : (
          view === 'text' && <AlbumTextList releases={data.releases} />
        )}

        <AlbumDetailsDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          isLoading={isLoadingRelease}
          release={releaseData}
        />
      </>
    )
  }
}

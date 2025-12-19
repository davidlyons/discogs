import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserCollection } from '@/lib/getUserCollection'
import { getRelease } from '@/lib/getRelease'
import { sortOptions } from '@/lib/sort'
import { Spinner } from '@/components/ui/spinner'
import { PaginationRow } from '@/components/PaginationRow'
import { AlbumCoversTextGrid } from '@/components/AlbumCoversTextGrid'
import { AlbumCoversGrid } from '@/components/AlbumCoversGrid'
import { AlbumTextList } from '@/components/AlbumTextList'
import { AlbumDetails } from '@/components/AlbumDetails'

type VinylBrowserProps = {
  user: string
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export type View = 'covers' | 'covers-text' | 'text'

export function VinylBrowser({ user, page, setPage }: VinylBrowserProps) {
  const [perPage, setPerPage] = useState(25)
  const [sort, setSort] = useState(sortOptions[0])
  const [view, setView] = useState<View>('covers-text')

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [focusedAlbum, setFocusedAlbum] = useState<number | undefined>()
  const activeAlbum = isSheetOpen ? focusedAlbum : undefined

  const handleAlbumClick = (id: number) => {
    setFocusedAlbum(id)
    setIsSheetOpen(true)
  }

  const onSheetAnimEnd = () => {
    if (!isSheetOpen) {
      setFocusedAlbum(undefined)
    }
  }

  const { isLoading: isLoadingCollection, data: collectionData } = useQuery({
    queryKey: ['collection', user, page, perPage, sort.name, sort.order],
    queryFn: () =>
      getUserCollection({ user, page, perPage, sort: sort.name, sortOrder: sort.order }),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  })

  const { isLoading: isLoadingRelease, data: releaseData } = useQuery({
    queryKey: ['release', focusedAlbum],
    queryFn: () => getRelease(focusedAlbum),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    enabled: !!focusedAlbum,
  })

  if (isLoadingCollection) {
    return (
      <div className="flex items-center gap-4">
        <Spinner /> Loading...
      </div>
    )
  }

  if (collectionData) {
    return (
      <>
        <PaginationRow
          pagination={collectionData.pagination}
          setPage={setPage}
          perPage={perPage}
          setPerPage={setPerPage}
          view={view}
          setView={setView}
          sort={sort}
          setSort={setSort}
        />

        {view === 'covers-text' ? (
          <AlbumCoversTextGrid
            releases={collectionData.releases}
            onAlbumClick={handleAlbumClick}
            activeAlbum={activeAlbum}
          />
        ) : view === 'covers' ? (
          <AlbumCoversGrid
            releases={collectionData.releases}
            onAlbumClick={handleAlbumClick}
            activeAlbum={activeAlbum}
          />
        ) : view === 'text' ? (
          <AlbumTextList
            releases={collectionData.releases}
            onAlbumClick={handleAlbumClick}
            activeAlbum={activeAlbum}
          />
        ) : null}

        <AlbumDetails
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          onAnimationEnd={onSheetAnimEnd}
          isLoading={isLoadingRelease}
          release={releaseData}
        />
      </>
    )
  }
}

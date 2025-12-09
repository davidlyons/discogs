'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchVinyls } from '@/lib/fetch'
import { Spinner } from '@/components/ui/spinner'
import { AlbumCoversTextGrid } from '@/components/AlbumCoversTextGrid'
import { AlbumCoversGrid } from '@/components/AlbumCoversGrid'
import { AlbumTextList } from '@/components/AlbumTextList'
import { PaginationRow } from '@/components/PaginationRow'

type VinylBrowserProps = {
  user: string
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export type View = 'covers' | 'covers-text' | 'text'

export function VinylBrowser({ user, page, setPage }: VinylBrowserProps) {
  const [perPage, setPerPage] = useState(25)
  const [view, setView] = useState<View>('covers-text')

  const { isLoading, data } = useQuery({
    queryKey: ['vinyl', user, page, perPage],
    queryFn: () => fetchVinyls({ user, page, perPage }),
    staleTime: 24 * 60 * 60 * 1000, // 1 day
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

        {view === 'covers' ? (
          <AlbumCoversGrid releases={data.releases} />
        ) : view === 'covers-text' ? (
          <AlbumCoversTextGrid releases={data.releases} />
        ) : (
          view === 'text' && <AlbumTextList releases={data.releases} />
        )}
      </>
    )
  }
}

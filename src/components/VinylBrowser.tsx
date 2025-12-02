'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchVinyls } from '@/lib/fetch'
import { Spinner } from '@/components/ui/spinner'
import { AlbumGrid } from '@/components/AlbumGrid'
import { PaginationRow } from '@/components/PaginationRow'

export function VinylBrowser({ user }: { user: string }) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)

  const { isLoading, data } = useQuery({
    queryKey: ['vinyl', page, perPage],
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
        />

        <AlbumGrid releases={data.releases} />
      </>
    )
  }
}

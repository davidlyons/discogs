'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchVinyls } from '@/lib/fetch'
import { AlbumGrid } from '@/components/AlbumGrid'
import { PaginationRow } from '@/components/PaginationRow'
import type { ReleaseJSONType, Pagination } from '@/lib/types'

type DataType = { releases: ReleaseJSONType[]; pagination: Pagination }

export function VinylBrowser({ user }: { user: string }) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)
  const [data, setData] = useState<DataType | null>(null)

  // Cache for page data (keyed by page and perPage)
  const cache = useRef<Record<string, DataType>>({})

  useEffect(() => {
    const cacheKey = `${page}-${perPage}`
    if (cache.current[cacheKey]) {
      setData(cache.current[cacheKey])
      return
    }

    fetchVinyls({ user, page, perPage }).then((result) => {
      cache.current[cacheKey] = result
      setData(result)
    })
  }, [user, page, perPage])

  // Clear cache and reset page when perPage changes
  useEffect(() => {
    cache.current = {}
    setPage(1)
  }, [perPage])

  if (!data) return <div>Loading...</div>

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

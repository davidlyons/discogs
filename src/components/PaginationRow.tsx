import type { Pagination as PaginationType } from '@/lib/types-collection'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type PaginationRowProps = {
  pagination: PaginationType
  perPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setPerPage: React.Dispatch<React.SetStateAction<number>>
}

type PaginationItemsType = (number | 'start-ellipsis' | 'end-ellipsis')[]

const getPaginationItems = (current: number, total: number, neighbors = 1): PaginationItemsType => {
  // total visible items including neighbors, first/last, current and 2 ellipses
  const visible = 2 * neighbors + 5

  if (total <= visible) return Array.from({ length: total }, (_, i) => i + 1)

  const items: PaginationItemsType = []

  // compute start/end blocks so that the total returned length is V
  const startBlockRight = visible - 2 // pages shown from 1..startBlockRight when near start
  const endBlockLeft = total - (visible - 3) // pages shown from endBlockLeft..total when near end

  // start block when current is near start
  if (current <= startBlockRight - neighbors) {
    for (let p = 1; p <= startBlockRight; p++) items.push(p)
    items.push('end-ellipsis', total)
    return items
  }

  // end block when current is near the end
  if (current >= endBlockLeft + neighbors) {
    items.push(1, 'start-ellipsis')
    for (let p = endBlockLeft; p <= total; p++) items.push(p)
    return items
  }

  // middle: center current with 'neighbors' on each side, total length will be 'visible'
  items.push(1, 'start-ellipsis')
  const left = Math.max(2, current - neighbors)
  const right = Math.min(total - 1, current + neighbors)
  for (let p = left; p <= right; p++) items.push(p)
  items.push('end-ellipsis', total)
  return items
}

export const PaginationRow = ({ pagination, setPage, perPage, setPerPage }: PaginationRowProps) => {
  return (
    <div
      className="relative mb-4 flex flex-col flex-wrap items-center justify-between gap-4 text-sm
        sm:flex-row"
    >
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={pagination.page === 1}
                onClick={(e) => {
                  e.preventDefault()
                  if (pagination.page > 1) setPage(pagination.page - 1)
                }}
              />
            </PaginationItem>

            {getPaginationItems(pagination.page, pagination.pages).map((item, index) => {
              if (item === 'start-ellipsis' || item === 'end-ellipsis') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              const pageNum = item

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === pagination.page}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(pageNum)
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                disabled={pagination.page === pagination.pages}
                onClick={(e) => {
                  e.preventDefault()
                  if (pagination.page < pagination.pages) setPage(pagination.page + 1)
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="absolute top-1/2 left-1/2 hidden -translate-1/2 lg:block">
        Showing{' '}
        <span className="mx-1 font-bold">
          {pagination.per_page * (pagination.page - 1) + 1} –{' '}
          {Math.min(
            pagination.per_page * (pagination.page - 1) + pagination.per_page,
            pagination.items
          )}
        </span>{' '}
        of <span className="mx-1 font-bold">{pagination.items}</span> albums
      </div>

      <div className="flex flex-wrap gap-7">
        {/* per page select */}
        <div className="flex items-center">
          Show
          <Select
            value={perPage.toString()}
            onValueChange={(value) => {
              setPerPage(parseInt(value))
              setPage(1) // reset page to 1 when perPage changes
            }}
          >
            <SelectTrigger className="mx-3">
              <SelectValue placeholder="per page" />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50, 100].map((value) => (
                <SelectItem value={value.toString()} key={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          albums
        </div>
      </div>
    </div>
  )
}

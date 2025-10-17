'use client'

import type { Pagination as PaginationType } from '@/lib/types'

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

// import { Button } from '@/components/ui/button'
// import { LayoutGrid, LayoutList, AlignJustify } from 'lucide-react'

export const PaginationRow = ({
  pagination,
  setPage,
  perPage,
  setPerPage,
}: {
  pagination: PaginationType
  perPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setPerPage: React.Dispatch<React.SetStateAction<number>>
}) => {
  console.log(pagination)

  return (
    <div className="flex justify-between items-center mb-4">
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
            {Array.from({ length: pagination.pages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  isActive={i + 1 === pagination.page}
                  onClick={(e) => {
                    e.preventDefault()
                    setPage(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
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

      <div>
        {/* Albums: {pagination.items} */}
        {pagination.per_page * (pagination.page - 1) + 1}&ndash;
        {Math.min(
          pagination.per_page * (pagination.page - 1) + pagination.per_page,
          pagination.items
        )}{' '}
        of {pagination.items}
      </div>

      {/* per page select */}
      <div className="flex items-center">
        Show
        <Select value={perPage.toString()} onValueChange={(value) => setPerPage(parseInt(value))}>
          <SelectTrigger className="ms-3">
            <SelectValue placeholder="per page" />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50, 100].map((value, i) => (
              <SelectItem value={value.toString()} key={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Layout control */}
        {/* <div className="space-x-2">
          <Button size="icon" variant="outline">
            <LayoutGrid />
          </Button>
          <Button size="icon" variant="outline">
            <LayoutList />
          </Button>
          <Button size="icon" variant="outline">
            <AlignJustify />
          </Button>
        </div> */}
      </div>
    </div>
  )
}

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

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LayoutGrid, LayoutList, AlignJustify } from 'lucide-react'
import type { View } from '@/components/VinylBrowser'

import { type SortingOption, sortOptions } from '@/lib/sort'

type PaginationRowProps = {
  pagination: PaginationType
  perPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setPerPage: React.Dispatch<React.SetStateAction<number>>
  view: View
  setView: React.Dispatch<React.SetStateAction<View>>
  sort: SortingOption
  setSort: React.Dispatch<React.SetStateAction<SortingOption>>
}

type PaginationItemsType = (number | 'start-ellipsis' | 'end-ellipsis')[]

const getPaginationItems = (current: number, total: number) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items: PaginationItemsType = []

  if (current <= 4) {
    // beginning: 1..5, ellipsis, last
    items.push(1, 2, 3, 4, 5, 'end-ellipsis', total)
    return items
  }

  if (current >= total - 3) {
    // ending: first, ellipsis, last-4..last
    items.push(1, 'start-ellipsis')
    for (let p = total - 4; p <= total; p++) items.push(p)
    return items
  }

  // middle: first, ellipsis, current-1, current, current+1, ellipsis, last
  items.push(1, 'start-ellipsis', current - 1, current, current + 1, 'end-ellipsis', total)
  return items
}

export const PaginationRow = ({
  pagination,
  setPage,
  perPage,
  setPerPage,
  view,
  setView,
  sort,
  setSort,
}: PaginationRowProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm">
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

      <div>
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

        {/* layout / view control */}
        <ToggleGroup
          type="single"
          spacing={2}
          variant="outline"
          value={view}
          onValueChange={(value: View) => {
            if (value) setView(value)
          }}
        >
          <ToggleGroupItem value="covers-text" title="Covers and text">
            <LayoutList />
          </ToggleGroupItem>
          <ToggleGroupItem value="covers" title="Covers only">
            <LayoutGrid />
          </ToggleGroupItem>
          <ToggleGroupItem value="text" title="Text only">
            <AlignJustify />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* sort select */}
        <div className="flex items-center">
          Sort
          <Select
            value={sort ? JSON.stringify(sort) : ''}
            onValueChange={(value) => {
              setSort(JSON.parse(value))
              setPage(1) // reset page to 1 when sort changes
            }}
          >
            <SelectTrigger className="ms-3 w-40">
              <SelectValue placeholder="sort" />
            </SelectTrigger>
            <SelectContent position="popper" align="end">
              {sortOptions.map((option) => (
                <SelectItem value={JSON.stringify(option)} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

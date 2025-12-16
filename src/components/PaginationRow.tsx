import type { Pagination as PaginationType } from '@/lib/types-collection'

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
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

import { type SortingOption, sortOptions } from '@/lib/getUserCollection'

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
            setPerPage(value === 'covers' ? 50 : 25)
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

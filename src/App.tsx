import { useContext, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ExternalLink, LayoutGrid, LayoutList, AlignJustify, ChevronDown } from 'lucide-react'
import { VinylBrowser, type View } from '@/components/VinylBrowser'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sortOptions, type SortingOption } from '@/lib/sort'
import { UserContext } from '@/contexts'

export const App = () => {
  const [user, setUser] = useContext(UserContext)

  const [page, setPage] = useState(1)
  const [view, setView] = useState<View>('covers-text')
  const [sort, setSort] = useState<SortingOption>(sortOptions[0])

  return (
    <div className="overflow-hidden pt-14 pb-8 min-[1680px]:pb-14">
      <div className="container">
        <div className="mb-5 flex flex-wrap justify-center gap-4 text-sm md:justify-between">
          {/* username input */}
          <div className="flex items-center gap-2">
            <span className="font-bold">Discogs user</span>
            <Input
              className="w-auto"
              name="user"
              placeholder="Discogs username"
              value={user}
              onChange={(e) => {
                setUser(e.target.value)
                setPage(1) // reset page to 1 when user changes
              }}
            />
            <Button variant="outline" size="icon" aria-label="Open Discogs profile" asChild>
              <a
                href={`https://www.discogs.com/user/${user}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* layout dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {view === 'covers-text' && <LayoutList />}
                  {view === 'covers' && <LayoutGrid />}
                  {view === 'text' && <AlignJustify />}
                  <ChevronDown className="text-muted-foreground opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuRadioGroup
                  value={view}
                  onValueChange={(value) => {
                    if (value) setView(value as View)
                  }}
                >
                  <DropdownMenuRadioItem value="covers-text">
                    <LayoutList /> Covers and text
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="covers">
                    <LayoutGrid /> Covers only
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="text">
                    <AlignJustify /> Text only
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

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

        <VinylBrowser page={page} setPage={setPage} view={view} sort={sort} />
      </div>

      {/* github repo link */}
      <div className="bottom-4 left-4 text-center max-[1680px]:mt-8 min-[1680px]:fixed">
        <a
          href="https://github.com/davidlyons/discogs"
          aria-label="GitHub Repo"
          className="inline-block p-4 opacity-50 transition-opacity hover:opacity-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon className="size-6" />
        </a>
      </div>
    </div>
  )
}

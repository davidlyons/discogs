import type { Collection } from '@/lib/types-collection'

// https://www.discogs.com/developers
// https://www.discogs.com/developers#page:user-collection,header:user-collection-collection-items-by-folder
// https://pixelswap.fr/entry/displaying-my-vinyl-collection-from-the-discogs-api/
// https://dev.to/mannuelf/fun-with-remix-react-and-the-discogs-api-1e0i

export type CollectionParams = {
  user: string
  page?: number
  perPage?: number
  sort?: 'label' | 'artist' | 'title' | 'catno' | 'format' | 'rating' | 'added' | 'year'
  sortOrder?: 'asc' | 'desc'
}

// get user's vinyl collection
export const getUserCollection = async ({
  user,
  page = 1,
  perPage = 25,
  sort = 'added',
  sortOrder = 'desc',
}: CollectionParams) => {
  const response = await fetch(
    // 0 is the folder ID for the main collection
    // per_page default is 50, can be up to 100
    `https://api.discogs.com/users/${user}/collection/folders/0/releases?page=${page}&per_page=${perPage}&sort=${sort}&sort_order=${sortOrder}`,
    {
      headers: {
        Authorization: `Discogs token=${import.meta.env.DISCOGS_TOKEN}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Collection = await response.json()

  return data
}

// ------------------------------------------------------------------------------

export type SortingOption = {
  value: string
  name: CollectionParams['sort']
  order: CollectionParams['sortOrder']
  label: string
}

export const sortOptions: SortingOption[] = [
  { value: 'added-desc', name: 'added', order: 'desc', label: 'Newest Addition' },
  { value: 'added-asc', name: 'added', order: 'asc', label: 'Oldest Addition' },
  { value: 'title-asc', name: 'title', order: 'asc', label: 'Title (A-Z)' },
  { value: 'title-desc', name: 'title', order: 'desc', label: 'Title (Z-A)' },
  { value: 'artist-asc', name: 'artist', order: 'asc', label: 'Artist (A-Z)' },
  { value: 'artist-desc', name: 'artist', order: 'desc', label: 'Artist (Z-A)' },
  { value: 'year-asc', name: 'year', order: 'asc', label: 'Year (0-9)' },
  { value: 'year-desc', name: 'year', order: 'desc', label: 'Year (9-0)' },
  { value: 'format-asc', name: 'format', order: 'asc', label: 'Format (A-Z)' },
  { value: 'format-desc', name: 'format', order: 'desc', label: 'Format (Z-A)' },
]

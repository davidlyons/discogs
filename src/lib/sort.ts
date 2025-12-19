import type { CollectionParams } from './getUserCollection'

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

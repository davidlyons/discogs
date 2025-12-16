// https://www.discogs.com/developers#page:user-collection,header:user-collection-collection-items-by-folder
// https://app.quicktype.io/?l=ts

export type Collection = {
  pagination: Pagination
  releases: Release[]
}

export type Pagination = {
  per_page: number
  pages: number
  page: number
  items: number
  urls: Urls
}

export type Urls = {
  next: string
  last: string
}

export type Release = {
  id: number
  instance_id: number
  folder_id: number
  rating: number
  basic_information: BasicInformation
  notes: Note[]
}

export type BasicInformation = {
  id: number
  title: string
  year: number
  resource_url: string
  thumb: string
  cover_image: string
  formats: Format[]
  labels: Label[]
  artists: Artist[]
  genres: string[]
  styles: string[]
}

export type Artist = {
  id: number
  name: string
  join: string
  resource_url: string
  anv: string
  tracks: string
  role: string
}

export type Format = {
  qty: string
  name: string
  descriptions: string[]
  text?: string
}

export type Label = {
  resource_url: string
  entity_type: string
  catno: string
  id: number
  name: string
}

export type Note = {
  field_id: number
  value: string
}

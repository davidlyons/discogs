// https://www.discogs.com/developers#page:database,header:database-release
// https://app.quicktype.io/?l=ts

export type Release = {
  id: number
  status: string
  year: number
  resource_url: string
  uri: string
  artists: Artist[]
  artists_sort: string
  labels: Label[]
  series: any[]
  companies: any[]
  formats: Format[]
  data_quality: string
  community: Community
  format_quantity: number
  date_added: Date
  date_changed: Date
  num_for_sale: number
  lowest_price: null
  master_id: number
  master_url: string
  title: string
  country: string
  released: Date
  notes: string
  released_formatted: string
  identifiers: any[]
  videos: any[]
  genres: string[]
  styles: string[]
  tracklist: Tracklist[]
  images: Image[]
  thumb: string
  estimated_weight: number
  blocked_from_sale: boolean
  is_offensive: boolean
}

export type Artist = {
  name: string
  anv: string
  join: string
  role: string
  tracks: string
  id: number
  resource_url: string
  thumbnail_url: string
}

export type Tracklist = {
  position: string
  type_: 'track' | 'heading'
  title: string
  duration: string
}

export type Image = {
  type: string
  uri: string
  resource_url: string
  uri150: string
  width: number
  height: number
}

export type Community = {
  have: number
  want: number
  rating: Rating
  submitter: Submitter
  contributors: Submitter[]
  data_quality: string
  status: string
}

export type Submitter = {
  username: string
  resource_url: string
}

export type Rating = {
  count: number
  average: number
}

export type Format = {
  name: string
  qty: string
  descriptions: string[]
  text: string
}

export type Label = {
  name: string
  catno: string
  entity_type: string
  entity_type_name: string
  id: number
  resource_url: string
  thumbnail_url: string
}

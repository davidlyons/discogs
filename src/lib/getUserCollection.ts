import type { Collection, Release, ReleaseFormatted } from '@/lib/types'

// https://www.discogs.com/developers
// https://www.discogs.com/developers#page:user-collection,header:user-collection-collection-items-by-folder
// https://pixelswap.fr/entry/displaying-my-vinyl-collection-from-the-discogs-api/
// https://dev.to/mannuelf/fun-with-remix-react-and-the-discogs-api-1e0i

type getUserCollectionProps = {
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
}: getUserCollectionProps) => {
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

  return {
    pagination: data.pagination,
    releases: transformReleases(data.releases),
  }
}

const transformReleases = (releases: Release[]): ReleaseFormatted[] => {
  return releases.map((release) => ({
    id: release.id,
    title: release.basic_information.title,
    artists: release.basic_information.artists,
    label: release.basic_information.labels.map((label) => label.name).join(', '),
    year: release.basic_information.year,
    thumb: release.basic_information.thumb,
    image: release.basic_information.cover_image,
    format: release.basic_information.formats.map((format) => format.name).join(', '),
    url: `https://www.discogs.com/release/${release.basic_information.id}`,
  }))
}

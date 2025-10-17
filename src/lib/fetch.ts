import type { Data, Release, ReleaseJSONType } from '@/lib/types'

// https://www.discogs.com/developers
// https://www.discogs.com/developers#page:user-collection,header:user-collection-collection-items-by-folder
// https://pixelswap.fr/entry/displaying-my-vinyl-collection-from-the-discogs-api/
// https://dev.to/mannuelf/fun-with-remix-react-and-the-discogs-api-1e0i

type fetchVinylsProps = { user: string; page?: number; perPage?: number }

export const fetchVinyls = async ({ user, page = 1, perPage = 25 }: fetchVinylsProps) => {
  // try {

  const response = await fetch(
    // 0 is the folder ID for the main collection
    // per_page default is 50, can be up to 100
    `https://api.discogs.com/users/${user}/collection/folders/0/releases?page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Discogs token=${import.meta.env.DISCOGS_TOKEN}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Data = await response.json()

  return {
    pagination: data.pagination,
    releases: transformToJSON(data.releases),
  }

  // } catch (error) {
  //   console.error('Error fetching data from Discogs:', error)
  //   return []
  // }
}

export const transformToJSON = (releases: Release[]): ReleaseJSONType[] => {
  return releases.map((release) => ({
    title: release.basic_information.title,
    artist: release.basic_information.artists.map((artist) => artist.name).join(', '),
    label: release.basic_information.labels.map((label) => label.name).join(', '),
    year: release.basic_information.year,
    thumb: release.basic_information.thumb,
    image: release.basic_information.cover_image,
    format: release.basic_information.formats.map((format) => format.name).join(', '),
    url: `https://www.discogs.com/release/${release.basic_information.id}`,
  }))
}

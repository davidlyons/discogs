import type { Release } from '@/lib/types-release'

// https://www.discogs.com/developers#page:database,header:database-release

export const getRelease = async (id: number | undefined) => {
  const response = await fetch(
    `https://api.discogs.com/releases/${id}`
    // {
    //   headers: {
    //     Authorization: `Discogs token=${import.meta.env.DISCOGS_TOKEN}`,
    //   },
    // }
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }

  const data: Release = await response.json()

  return data
}

import type { Artist } from '@/lib/types'

export function getListenUrl(artists: Artist[], title: string) {
  const artistString = artists.map((artist) => artist.name).join(' ')
  return `https://music.youtube.com/search?q=${encodeURIComponent(title)} ${encodeURIComponent(artistString)}`
}

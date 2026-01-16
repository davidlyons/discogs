import { getUserCollection } from './getUserCollection.ts'
import type { Release } from './types-collection'
import fs from 'node:fs'
import { SingleBar, Preset } from '@leomotors/cli-progress'

const main = async () => {
  const user = process.argv[2] || 'davidlyons'
  let nextPage: number | undefined = 1
  let releases: Release[] = []

  const bar = new SingleBar(
    {
      hideCursor: true,
      stopOnComplete: true,
      gracefulExit: true,
      format: 'Fetched page {value} / {total} | {bar}',
    },
    Preset.shadesClassic
  )

  while (nextPage) {
    const pageData = await getUserCollection({ user, perPage: 100, page: nextPage })
    releases = [...releases, ...pageData.releases]

    if (nextPage === 1) bar.start(pageData.pagination.pages, 0)
    bar.increment()

    nextPage = nextPage < pageData.pagination.pages ? nextPage + 1 : undefined
  }

  const vinyls = {
    collectionInfo: {
      user: user,
      items: releases.length,
    },
    releases,
  }

  const file = `src/lib/vinyls.json`
  const data = JSON.stringify(vinyls, null, 2)

  fs.writeFileSync(file, data)
  console.log(`Vinyl collection data written to ${file}`)
}

main()

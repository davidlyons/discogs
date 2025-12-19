import { getUserCollection } from './getUserCollection.ts'
import fs from 'node:fs'

const main = async () => {
  const vinyls = await getUserCollection({ user: 'davidlyons', perPage: 100 })
  fs.writeFileSync('src/lib/vinyls.json', JSON.stringify(vinyls, null, 4))
  console.log('Vinyls data written to vinyls.json')
}

main()

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { VinylBrowser } from '@/components/VinylBrowser'

function App() {
  const [user, setUser] = useState('davidlyons')
  const [page, setPage] = useState(1)

  return (
    <div className="overflow-hidden py-14">
      <div className="container">
        <div className="mb-5 flex items-center gap-2 text-sm">
          <span className="font-bold">Discogs user</span>
          <Input
            className="w-auto"
            placeholder="Discogs username"
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              setPage(1) // reset page to 1 when user changes
            }}
          />
          <Button variant="outline" size="icon" aria-label="Open Discogs profile" asChild>
            <a href={`https://www.discogs.com/user/${user}`} target="_blank">
              <ExternalLink />
            </a>
          </Button>
        </div>

        <VinylBrowser user={user} page={page} setPage={setPage} />
      </div>
    </div>
  )
}

export default App

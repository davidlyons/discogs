import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { VinylBrowser } from '@/components/VinylBrowser'

function App() {
  const [user, setUser] = useState('davidlyons')

  return (
    <>
      <div className="overflow-hidden py-14">
        <div className="container">
          <div className="mb-5 flex items-center gap-2">
            User
            <Input
              className="w-auto"
              placeholder="Discogs username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <Button variant="outline" size="icon" aria-label="Open Discogs profile" asChild>
              <a href={`https://www.discogs.com/user/${user}`} target="_blank">
                <ExternalLink />
              </a>
            </Button>
          </div>

          <VinylBrowser user={user} />
        </div>
      </div>
    </>
  )
}

export default App

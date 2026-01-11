import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { VinylBrowser } from '@/components/VinylBrowser'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { UserContext } from '@/contexts'

export const App = () => {
  const userHook = useState('davidlyons')

  const [user, setUser] = userHook
  const [page, setPage] = useState(1)

  return (
    <UserContext value={userHook}>
      <div className="overflow-hidden pt-14 pb-8 min-[1680px]:pb-14">
        <div className="container">
          <div className="mb-5 flex items-center gap-2 text-sm">
            <span className="font-bold">Discogs user</span>
            <Input
              className="w-auto"
              name="user"
              placeholder="Discogs username"
              value={user}
              onChange={(e) => {
                setUser(e.target.value)
                setPage(1) // reset page to 1 when user changes
              }}
            />
            <Button variant="outline" size="icon" aria-label="Open Discogs profile" asChild>
              <a
                href={`https://www.discogs.com/user/${user}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink />
              </a>
            </Button>
          </div>

          <VinylBrowser page={page} setPage={setPage} />
        </div>

        <div className="bottom-4 left-4 text-center max-[1680px]:mt-8 min-[1680px]:fixed">
          <a
            href="https://github.com/davidlyons/discogs"
            aria-label="GitHub Repo"
            className="inline-block p-4 opacity-50 transition-opacity hover:opacity-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon className="size-6" />
          </a>
        </div>
      </div>
    </UserContext>
  )
}

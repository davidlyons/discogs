import { VinylBrowser } from '@/components/VinylBrowser'

function App() {
  const user = 'davidlyons'

  return (
    <>
      <div className="overflow-hidden py-14">
        <div className="container">
          <div className="mb-5">
            User:{' '}
            <a
              className="text-blue-300 underline-offset-4 hover:underline"
              href={`https://www.discogs.com/user/${user}`}
            >
              {user}
            </a>
          </div>
          <VinylBrowser user={user} />
        </div>
      </div>
    </>
  )
}

export default App

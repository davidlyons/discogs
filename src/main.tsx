import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App.tsx'
import { UserContext } from '@/contexts'
import '@fontsource-variable/inter'
import '@/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const Root = () => {
  const userHook = useState('davidlyons')

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserContext value={userHook}>
          <App />
        </UserContext>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)

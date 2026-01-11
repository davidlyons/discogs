import { createContext } from 'react'

type UserContextType = [string, React.Dispatch<React.SetStateAction<string>>]

export const UserContext = createContext<UserContextType>(['', () => {}])

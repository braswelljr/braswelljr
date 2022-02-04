import { createContext } from 'react'
import { StoreProps } from '@/types/store'

const StoreContext = createContext({})

const Store = ({ children }: StoreProps) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>
}

export default Store

import zustand, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  name: string
  repositories: any[]
  setRepositories: (params: any[]) => void
}

const useStore = zustand<State>(
  devtools((set: SetState<State>) => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: any[]) => set({ repositories: params })
  }))
)

export default useStore

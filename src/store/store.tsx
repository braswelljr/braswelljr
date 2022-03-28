import zustand, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  name: string
  repositories: any[]
  setRepositories: (params: any[]) => void
  languages: any[]
  setLanguages: (params: any[]) => void
}

const useStore = zustand<State>(
  devtools((set: SetState<State>) => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: any[]) => set({ repositories: params }),
    languages: [],
    setLanguages: (params: any[]) => set({ languages: params })
  }))
)

export default useStore

import zustand, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  name: string
  repositories: any[]
  setRepositories: (params: any[]) => void
  languages: any[]
  setLanguages: (params: any[]) => void
}

const useStore = zustand(
  devtools(<T extends State>(set: SetState<T>) => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: any[]) =>
      set(state => ({ ...state, repositories: params })),
    languages: [],
    setLanguages: (params: any[]) =>
      set(state => ({ ...state, languages: params }))
  }))
)

export default useStore

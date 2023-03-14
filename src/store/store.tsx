/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  name: string
  repositories: any[]
  setRepositories: (params: any[]) => void
  languages: any[]
  setLanguages: (params: any[]) => void
}

const useStore = create<State>()(
  devtools(set => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: any[]) => set(state => ({ ...state, repositories: params })),
    languages: [],
    setLanguages: (params: any[]) => set(state => ({ ...state, languages: params }))
  }))
)

export default useStore

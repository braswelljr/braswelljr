import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { State, repo } from '~/store/types'

const useStore = create<State>()(
  devtools(set => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: repo[]) => set(state => ({ ...state, repositories: params }))
  }))
)

export default useStore

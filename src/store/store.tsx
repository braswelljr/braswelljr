import { repo, State } from '~/store/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useStore = create<State>()(
  devtools(set => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: repo[]) => set(state => ({ ...state, repositories: params }))
  }))
)

export default useStore

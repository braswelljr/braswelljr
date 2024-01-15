import { Repo, State } from '~/store/types'
import { devtools } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

export const useStore = createWithEqualityFn<State>()(
  devtools(set => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: Repo[]) => set(state => ({ ...state, repositories: params })),
    blogpagemenutoogle: false,
    setBlogpagemenutoogle: (params: boolean) => set(state => ({ ...state, blogpagemenutoogle: params }))
  }))
)

import { repo, State } from '~/store/types'
import { devtools } from 'zustand/middleware'
// import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

const useStore = createWithEqualityFn<State>()(
  devtools(set => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: repo[]) => set(state => ({ ...state, repositories: params })),
    blogpagemenutoogle: false,
    setBlogpagemenutoogle: (params: boolean) => set(state => ({ ...state, blogpagemenutoogle: params }))
  }))
)

export default useStore

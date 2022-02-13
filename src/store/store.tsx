import zustand, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  name: string
}

const useStore = zustand<State>(
  devtools((set: SetState<State>) => ({
    name: 'braswelljr'
  }))
)

export default useStore

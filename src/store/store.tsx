import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Repo, State } from '~/store/types';

export const useStore = create<State>()(
  devtools(set => ({
    name: 'braswelljr',
    repositories: [],
    setRepositories: (params: Repo[]) => set({ repositories: params }),
    toggle: false,
    onToggle: (params: boolean) => set({ toggle: params })
  }))
);

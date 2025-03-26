import { create } from 'zustand'

export type ViewType = 'masonry' | 'folders' | 'graph'

interface ViewState {
  currentView: ViewType
  setView: (view: ViewType) => void
}

export const useViewStore = create<ViewState>((set) => ({
  currentView: 'masonry',
  setView: (view) => set({ currentView: view }),
})) 
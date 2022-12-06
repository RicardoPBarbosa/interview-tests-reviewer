import create from 'zustand'
import { persist } from 'zustand/middleware'

import { State } from './types'
import { addItem, editItem, removeItem } from './functions'

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      reviews: [],
      groups: [],
      metrics: [],
      addItem: (type, payload) => addItem({ get, set }, type, payload),
      editItem: (type, payload) => editItem({ get, set }, type, payload),
      removeItem: (type, payload) => removeItem({ get, set }, type, payload),
    }),
    {
      name: 'interview-tests-review-storage',
      version: 1.0,
    }
  )
)
import { Group, ItemTypes, Metric, Review } from "@types"

export interface State {
  reviews: Review[]
  groups: Group[]
  metrics: Metric[]

  addItem: (type: ItemTypes, payload: Review | Group | Metric) => void
  editItem: (type: ItemTypes, payload: Review | Group | Metric) => void
  removeItem: (type: ItemTypes, itemId: string) => void

  uploadState: (state: object) => void
}

export interface StateActions {
  set: <A extends string | {
    type: unknown;
  }>(partial: State | Partial<State> | ((state: State) => State | Partial<State>), replace?: boolean | undefined, action?: A | undefined) => void
  get: () => State
}

import { Group, ItemTypes, Metric, Review } from "@types";
import { StateActions } from "./types";

function addItem({ set }: StateActions, type: ItemTypes, payload: Review | Group | Metric) {
  switch (type) {
    case ItemTypes.GROUP:
      return set((state) => ({ ...state, groups: [...state.groups, (payload as Group)] }));
    case ItemTypes.METRIC:
      return set((state) => ({ ...state, metrics: [...state.metrics, (payload as Metric)] }));
    case ItemTypes.REVIEW:
      return set((state) => ({ ...state, reviews: [...state.reviews, (payload as Review)] }));
    default:
      return;
  }
}

function editItem({ get, set }: StateActions, type: ItemTypes, payload: Review | Group | Metric) {
  switch (type) {
    case ItemTypes.GROUP:
      const groups = get().groups
      const editedGroups = groups.map((g) => {
        if (g.id === (payload as Group).id) {
          return { ...g, ...payload }
        }
        return g
      })
      return set((state) => ({ ...state, groups: editedGroups }))
    case ItemTypes.METRIC:
      const metrics = get().metrics
      const editedMetrics = metrics.map((m) => {
        if (m.id === (payload as Metric).id) {
          return { ...m, ...payload }
        }
        return m
      })
      return set((state) => ({ ...state, metrics: editedMetrics }))
    case ItemTypes.REVIEW:
      const reviews = get().reviews
      const editedReviews = reviews.map((r) => {
        if (r.candidateId === (payload as Review).candidateId) {
          return { ...r, ...payload }
        }
        return r
      })
      return set((state) => ({ ...state, reviews: editedReviews }))
    default:
      return;
  }
}

function removeItem({ get, set }: StateActions, type: ItemTypes, itemId: string) {
  switch (type) {
    case ItemTypes.GROUP:
      const groups = get().groups.filter((g) => g.id !== itemId)
      return set((state) => ({ ...state, groups }))
    case ItemTypes.METRIC:
      const metrics = get().metrics.filter((g) => g.id !== itemId)
      return set((state) => ({ ...state, metrics }))
    case ItemTypes.REVIEW:
      const reviews = get().reviews.filter((g) => g.candidateId !== itemId)
      return set((state) => ({ ...state, reviews }))
    default:
      return;
  }
}

export {
  addItem,
  editItem,
  removeItem
}
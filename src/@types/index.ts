export interface Group {
  id: string
  name: string
}

export interface Metric {
  id: string
  name: string
  value?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  groupId?: string
}

export interface Review {
  candidateId: string
  metrics: Metric[]
  notes?: string
  // ---
  createdAt: Date
  updatedAt: Date
}

export enum ItemTypes {
  GROUP,
  METRIC,
  REVIEW
}

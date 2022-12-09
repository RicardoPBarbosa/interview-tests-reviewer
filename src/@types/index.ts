export interface Group {
  id: string
  name: string
}

export interface Metric {
  id: string
  name: string
  groupId?: string
}

export interface ReviewMetric extends Metric {
  value?: number
}

export interface Review {
  id: string
  candidateName: string
  metrics: ReviewMetric[]
  finalScore: number
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

export interface MetricsByGroup { groupName: string; metrics: Metric[] }

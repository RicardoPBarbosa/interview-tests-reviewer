import uuid from "react-uuid";

import { useStore } from "store";
import { Metric, ItemTypes } from "@types";

export default function useMetrics() {
  const { metrics, addItem, editItem, removeItem } = useStore(
    ({ metrics, addItem, editItem, removeItem }) => ({
      metrics,
      addItem,
      editItem,
      removeItem,
    })
  );

  function insertMetric(name: string, groupId?: string) {
    const payload: Metric = {
      id: uuid(),
      name,
      ...(groupId && { groupId }),
    };
    addItem(ItemTypes.METRIC, payload);

    return payload.id;
  }

  function editMetric(metric: Metric) {
    editItem(ItemTypes.METRIC, metric);
  }

  function removeMetric(metricId: string) {
    removeItem(ItemTypes.METRIC, metricId);
  }

  return { metrics, insertMetric, editMetric, removeMetric };
}

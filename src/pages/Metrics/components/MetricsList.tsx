import { useMemo, useState } from "react";

import { sortMetricsByGroup } from "utils";
import { confirm } from "components/Confirm";
import { useGroups, useMetrics } from "hooks";
import { Metric, MetricsByGroup } from "@types";
import CrudActionButtons from "components/CrudActionButtons";

const NO_GROUP_ID = "no-group";

function MetricsGroup({ groupedMetrics }: { groupedMetrics: MetricsByGroup }) {
  const { groups } = useGroups();
  const { editMetric, removeMetric } = useMetrics();
  const [editingMetric, setEditingMetric] = useState<Metric>();

  function MetricItem({ metric }: { metric: Metric }) {
    const isEditing = editingMetric?.id === metric.id;

    async function onDeleteRequest(metric: string) {
      if (await confirm("Are you sure you want to delete this metric?")) {
        removeMetric(metric);
      }
    }

    function onGroupChangeRequest(groupId: string) {
      if (groupId === NO_GROUP_ID) {
        return editMetric({
          ...metric,
          groupId: undefined,
        });
      }
      editMetric({
        ...metric,
        groupId,
      });
    }

    const itemContent = isEditing ? (
      <input
        type="text"
        placeholder="Group name"
        value={editingMetric.name}
        onChange={({ target: { value } }) =>
          setEditingMetric((m) => m && { ...m, name: value })
        }
        autoFocus
      />
    ) : (
      <span className="flex-1 px-3">{metric.name}</span>
    );

    return (
      <div className="flex gap-2 items-center justify-between">
        {itemContent}
        <div className="flex items-center gap-2 py-2 pr-2">
          {!isEditing && (
            <select
              className="rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 outline-none text-sm"
              defaultValue=""
              onChange={({ target: { value } }) => onGroupChangeRequest(value)}
            >
              <option value="" disabled>
                swap group
              </option>
              {groups
                .filter((g) => g.id !== metric.groupId)
                .map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              {!!metric.groupId && (
                <option value={NO_GROUP_ID}>No group</option>
              )}
            </select>
          )}
          <CrudActionButtons
            isEditing={isEditing}
            onSubmitEdit={() => {
              if (isEditing) {
                editMetric(editingMetric);
                setEditingMetric(undefined);
              }
            }}
            onCancelEdit={() => setEditingMetric(undefined)}
            onSetEditing={() => setEditingMetric(metric)}
            onRequestDelete={() => onDeleteRequest(metric.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 max-w-4xl w-full mx-auto">
      <h2 className="font-medium bg-slate-200 py-1 px-3 rounded-md">
        {groupedMetrics.groupName}
      </h2>
      <div className="flex flex-col gap-1 divide-y">
        {groupedMetrics.metrics.map((metric) => (
          <MetricItem key={metric.id} metric={metric} />
        ))}
        {!groupedMetrics.metrics.length && (
          <p className="flex-1 p-3 text-slate-500">No metrics for this group</p>
        )}
      </div>
    </div>
  );
}

export default function MetricsList() {
  const { groups } = useGroups();
  const { metrics } = useMetrics();
  const metricsByGroup = useMemo(() => {
    return sortMetricsByGroup(groups, metrics);
  }, [groups, metrics]);

  return (
    <div className="flex flex-col gap-2 pb-4">
      {metricsByGroup.map((groupedMetrics) => (
        <MetricsGroup
          key={groupedMetrics.groupName}
          groupedMetrics={groupedMetrics}
        />
      ))}
    </div>
  );
}

import { CircleWavyQuestion } from "phosphor-react";
import { ChangeEvent, FormEvent, lazy, Suspense, useState } from "react";

import { useMetrics } from "hooks";
import Switch from "components/Switch";
import Loading from "components/Loading";
import TextInput from "components/TextInput";
const Groups = lazy(() => import("./components/Groups"));
const MetricsList = lazy(() => import("./components/MetricsList"));

export default function Metrics() {
  const [groupId, setGroupId] = useState<string>();
  const [newMetricName, setNewMetricName] = useState("");
  const [belongsToGroup, setBelongsToGroup] = useState(false);
  const { insertMetric } = useMetrics();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newMetricName.trim().length) {
      insertMetric(newMetricName, groupId);

      // cleanup
      setGroupId(undefined);
      setBelongsToGroup(false);
      setNewMetricName("");
    }
  }

  function handleAssignGroupToggle(e: ChangeEvent<HTMLInputElement>) {
    setBelongsToGroup(e.target.checked);
    if (!e.target.checked) {
      setGroupId(undefined);
    }
  }

  return (
    <>
      <div className="bg-white mb-4 p-4 max-w-2xl w-full mx-auto rounded-md shadow-slate-200 shadow-md">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <TextInput
            name="metricName"
            value={newMetricName}
            placeholder="New metric name"
            setValue={setNewMetricName}
            startIcon={
              <CircleWavyQuestion
                size={28}
                weight="regular"
                className="text-slate-300 group-focus-within:text-slate-800"
              />
            }
            showSubmitByEnterKey={!!newMetricName.trim().length}
          />
          <div className="flex items-center justify-between">
            <Switch checked={belongsToGroup} onChange={handleAssignGroupToggle}>
              <span className="font-medium text-sm">Assign to a group</span>
            </Switch>
            <button className="main-button" disabled={!newMetricName.length}>
              Add metric
            </button>
          </div>
        </form>
        {belongsToGroup && (
          <Suspense fallback={<Loading />}>
            <Groups
              onSelect={(groupId) => setGroupId(groupId)}
              selectedGroupId={groupId}
            />
          </Suspense>
        )}
      </div>
      <Suspense fallback={<Loading />}>
        <MetricsList />
      </Suspense>
    </>
  );
}

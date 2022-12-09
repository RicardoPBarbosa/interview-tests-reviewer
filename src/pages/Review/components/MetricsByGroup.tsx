import { Dispatch, lazy, SetStateAction, Suspense, useMemo } from "react";

import Loading from "components/Loading";
import { sortMetricsByGroup } from "utils";
import { Metric, ReviewMetric } from "@types";
import { useGroups, useMetrics } from "hooks";
const MetricItem = lazy(() => import("./MetricItem"));
const FinalScore = lazy(() => import("./FinalScore"));

const ERASED_METRICS_GROUP = "Erased metrics";

type Props = {
  candidateMetrics: ReviewMetric[];
  setCandidateMetrics: Dispatch<SetStateAction<ReviewMetric[]>>;
  finalScore: number;
  setFinalScore: Dispatch<SetStateAction<number>>;
};

export default function MetricsByGroup({
  finalScore,
  setFinalScore,
  candidateMetrics,
  setCandidateMetrics,
}: Props) {
  const { groups } = useGroups();
  const { metrics } = useMetrics();
  const metricsByGroup = useMemo(() => {
    return sortMetricsByGroup(groups, metrics);
  }, [groups, metrics]);
  const deletedMetrics = candidateMetrics.filter(
    (cm) => !metrics.find((m) => m.id === cm.id)
  );
  const averageScore = !!candidateMetrics.length
    ? candidateMetrics.reduce((prev, curr) => prev + (curr.value || 0), 0) /
      candidateMetrics.length
    : 0;

  function handleMetricChange(metric: Metric, value: number) {
    const update = candidateMetrics.find((m) => m.id === metric.id);
    if (update) {
      setCandidateMetrics((prev) =>
        prev.map((cm) => {
          if (cm.id === metric.id) {
            return { ...cm, value };
          }
          return cm;
        })
      );
    } else {
      setCandidateMetrics((prev) => [...prev, { ...metric, value }]);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {[
        ...metricsByGroup,
        { groupName: ERASED_METRICS_GROUP, metrics: deletedMetrics },
      ].map(
        (item) =>
          !!item.metrics.length && (
            <div key={item.groupName} className="flex flex-col gap-2">
              <h2
                className={`font-medium bg-slate-200 py-2 px-3 rounded-md${
                  item.groupName === ERASED_METRICS_GROUP ? " bg-red-100" : ""
                }`}
              >
                {item.groupName}
              </h2>
              <div className="flex flex-col gap-4 px-3 pt-2">
                {item.metrics.map((metric) => (
                  <Suspense key={metric.id} fallback={<Loading />}>
                    <MetricItem
                      metric={metric}
                      onChange={handleMetricChange}
                      value={
                        candidateMetrics.find((cm) => cm.id === metric.id)
                          ?.value
                      }
                    />
                  </Suspense>
                ))}
              </div>
            </div>
          )
      )}
      <FinalScore
        average={Math.round(averageScore)}
        finalScore={finalScore}
        setFinalScore={setFinalScore}
      />
    </div>
  );
}

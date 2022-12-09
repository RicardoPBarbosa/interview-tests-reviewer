import { Metric } from "@types";
import { getRatingColors } from "utils";

export const RATING_COUNT = 10;

type RatingNumberProps = {
  number: number;
  selected: boolean;
  onClick: () => void;
};

export function RatingNumber({ number, selected, onClick }: RatingNumberProps) {
  const selectedStyles = selected ? getRatingColors(number) : {};

  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative w-10 h-10 rounded-full border-2 border-slate-300 bg-slate-200 flex justify-center items-center hover:border-slate-500 text-slate-400 hover:text-slate-600 transition-all${selectedStyles}`}
      style={selectedStyles}
    >
      <span className="font-medium text-sm">{number}</span>
    </button>
  );
}

type MetricItemProps = {
  metric: Metric;
  value?: number;
  onChange: (metric: Metric, value: number) => void;
};

export default function MetricItem({
  metric,
  value,
  onChange,
}: MetricItemProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="w-1/3">{metric.name}</h3>
      <div className="flex-1 flex justify-around">
        {Array.from(Array(RATING_COUNT)).map((_, i) => (
          <RatingNumber
            key={`${metric.id}-${i}`}
            number={i + 1}
            selected={value === i + 1}
            onClick={() => onChange(metric, i + 1)}
          />
        ))}
      </div>
    </div>
  );
}

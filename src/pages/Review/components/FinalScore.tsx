import { Dispatch, SetStateAction } from "react";

import { RatingNumber, RATING_COUNT } from "./MetricItem";

type Props = {
  average: number;
  finalScore: number;
  setFinalScore: Dispatch<SetStateAction<number>>;
};

export default function FinalScore({
  average,
  finalScore,
  setFinalScore,
}: Props) {

  return (
    <div
      className={`bg-slate-800  print:pb-2 px-3 rounded-md flex items-center justify-between ${
        average ? "pt-2 pb-6" : "py-2"
      }`}
    >
      <h3
        className="w-1/3 text-slate-100 font-medium text-2xl print:text-xl"
        style={{ fontStretch: "condensed" }}
      >
        Final score
      </h3>
      <div className="flex-1 flex justify-around">
        {Array.from(Array(RATING_COUNT)).map((_, i) => {
          const isAverage = average === i + 1;

          return (
            <div key={`final-score-${i}`} className="relative w-fit h-fit">
              {isAverage && (
                <>
                  <div className="absolute z-0 w-[calc(100%+6px)] h-[calc(100%+6px)] rounded-full -top-[3px] -left-[3px] border-2 border-yellow-400 opacity-60 print:hidden"></div>
                  <span
                    className="absolute text-yellow-400 font-medium text-xs z-0 -bottom-5 left-1/2 mx-auto -translate-x-1/2 opacity-80 print:hidden"
                    style={{ fontStretch: "expanded" }}
                  >
                    Average
                  </span>
                </>
              )}
              <RatingNumber
                number={i + 1}
                selected={finalScore === i + 1}
                onClick={() => setFinalScore(i + 1)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

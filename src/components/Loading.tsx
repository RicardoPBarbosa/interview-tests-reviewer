import { CircleNotch } from "phosphor-react";

export default function Loading() {
  return (
    <div className="p-4 w-full flex justify-center items-center">
      <CircleNotch
        size={30}
        className="text-slate-300 animate-spin"
        weight="regular"
      />
    </div>
  );
}

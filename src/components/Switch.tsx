import { ChangeEvent, ReactElement } from "react";

type Props = {
  children?: ReactElement;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Switch({ children, onChange }: Props) {
  return (
    <div>
      <label className="flex group items-center gap-2">
        {children}
        <div className="relative w-14 h-8">
          <input
            type="checkbox"
            className="peer opacity-0 w-0 h-0"
            onChange={onChange}
          />
          <span
            className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-md duration-200 before:content-[''] before:absolute before:w-6 before:h-6 before:bottom-1 before:left-1
                before:bg-white before:rounded-sm before:duration-200 peer-checked:before:translate-x-6 peer-checked:bg-slate-700 group-focus-within:ring-2 group-focus-within:ring-slate-600 group-focus-within:ring-offset-1"
          />
        </div>
      </label>
    </div>
  );
}

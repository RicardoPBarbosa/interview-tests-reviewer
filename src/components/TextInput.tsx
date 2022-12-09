import { KeyReturn } from "phosphor-react";
import { ReactElement } from "react";

type Props = {
  name: string;
  startIcon?: ReactElement;
  placeholder?: string;
  value: string;
  setValue: (v: string) => void;
  showSubmitByEnterKey?: boolean;
  onFocusAction?: () => void;
};

export default function TextInput({
  name,
  startIcon,
  placeholder = "",
  value,
  setValue,
  showSubmitByEnterKey,
  onFocusAction,
}: Props) {
  return (
    <label htmlFor={name} className="relative group" onFocus={onFocusAction}>
      <div className="absolute top-2.5 left-2">{startIcon}</div>
      <input
        type="text"
        id={name}
        name={name}
        className={startIcon ? "pl-11" : ""}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      {showSubmitByEnterKey && (
        <div className="absolute right-2 top-2.5 text-slate-500">
          <KeyReturn weight="duotone" size={30} />
        </div>
      )}
    </label>
  );
}

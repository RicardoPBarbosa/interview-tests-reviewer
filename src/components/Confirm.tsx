import {
  confirmable,
  createConfirmation,
  ReactConfirmProps,
} from "react-confirm";

type Props = ReactConfirmProps & {
  proceed: (bool: boolean) => void;
  cancelLabel: string;
  proceedLabel: string;
};

const ConfirmDialog = ({
  confirmation,
  show,
  proceed,
  cancelLabel,
  proceedLabel,
}: Props) =>
  show ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        className="absolute -z-10 bg-opacity-30 bg-black w-full h-full"
        onClick={() => proceed(false)}
      />
      <div className="max-w-md bg-white rounded-lg py-3 px-4 flex flex-col items-center gap-3">
        <span className="text-6xl">💣</span>
        <h1 className="text-lg font-bold" style={{ fontStretch: "expanded" }}>
          Confirm the action
        </h1>
        <div className="text-slate-600">{confirmation}</div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => proceed(false)}
            className="py-2 px-4 rounded-md hover:bg-slate-200 font-medium tracking-wide text-slate-700 transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => proceed(true)}
            className="bg-slate-900 text-white py-2 px-4 rounded-md font-medium tracking-wide transition hover:bg-slate-700 focus:ring-2 focus:ring-slate-700 outline-none ring-offset-2"
            autoFocus
          >
            {proceedLabel}
          </button>
        </div>
      </div>
    </div>
  ) : null;

export function confirm(
  confirmation: string,
  proceedLabel = "Confirm",
  cancelLabel = "Cancel",
  options = {}
) {
  return createConfirmation(confirmable(ConfirmDialog))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options,
  });
}

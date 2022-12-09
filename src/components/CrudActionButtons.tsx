import { CheckCircle, PenNib, Trash, XCircle } from "phosphor-react";

type Props = {
  isEditing: boolean;
  onSubmitEdit: () => void
  onCancelEdit: () => void
  onSetEditing: () => void
  onRequestDelete: () => void
};

export default function CrudActionButtons({ isEditing, onSubmitEdit, onCancelEdit, onSetEditing, onRequestDelete }: Props) {
  return isEditing ? (
      <>
        <button
          className="p-2 hover:bg-white rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-800 outline-none"
          onClick={onSubmitEdit}
        >
          <CheckCircle
            weight="fill"
            size={22}
            className="text-emerald-500"
          />
        </button>
        <button
          className="p-2 hover:bg-white rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-800 outline-none"
          onClick={onCancelEdit}
        >
          <XCircle weight="fill" size={22} className="text-rose-600" />
        </button>
      </>
    ) : (
      <>
        <button
          className="p-2 hover:bg-white rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-800 outline-none"
          onClick={onSetEditing}
        >
          <PenNib weight="bold" size={22} className="text-slate-500" />
        </button>
        <button
          className="p-2 hover:bg-white rounded-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-slate-800 outline-none group"
          onClick={onRequestDelete}
        >
          <Trash
            weight="bold"
            size={22}
            className="text-slate-500 group-disabled:text-slate-300"
          />
        </button>
      </>
    )
}
import { FormEvent, useState } from "react";
import { FolderNotchPlus } from "phosphor-react";

import { Group } from "@types";
import { useGroups } from "hooks";
import { confirm } from "components/Confirm";
import TextInput from "components/TextInput";
import CrudActionButtons from "components/CrudActionButtons";

type Props = {
  selectedGroupId: string | undefined;
  onSelect: (groupId: string) => void;
};

export default function Groups({ onSelect, selectedGroupId }: Props) {
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroup, setEditingGroup] = useState<Group>();
  const { groups, insertGroup, editGroup, removeGroup } = useGroups();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newGroupName.trim().length) {
      const newGroupId = insertGroup(newGroupName);
      // cleanup
      setNewGroupName("");
      onSelect(newGroupId);
    }
  }

  async function onDeleteRequest(groupId: string) {
    if (await confirm("Are you sure you want to delete this group?")) {
      removeGroup(groupId);
    }
  }

  function GroupItem({ group }: { group: Group }) {
    const selected = selectedGroupId === group.id;
    const isEditing = editingGroup?.id === group.id;

    const itemContent = isEditing ? (
      <input
        type="text"
        placeholder="Group name"
        value={editingGroup.name}
        onChange={({ target: { value } }) =>
          setEditingGroup((g) => g && { ...g, name: value })
        }
        autoFocus
      />
    ) : (
      <button
        className="flex flex-1 items-center gap-2 py-3 pl-2"
        onClick={() => {
          setEditingGroup(undefined);
          onSelect(group.id);
        }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 border-slate-400${
            selected ? " bg-slate-700" : ""
          }`}
        />
        <span className="flex-1 text-left">{group.name}</span>
      </button>
    );

    return (
      <div
        className={`bg-slate-200 rounded-md border-2 font-medium transition text-slate-700 flex gap-2 items-center${
          selected ? " border-slate-700" : ""
        }`}
      >
        {itemContent}
        <div className="flex items-center gap-2 py-2 pr-2">
          <CrudActionButtons
            isEditing={isEditing}
            onSubmitEdit={() => {
              if (isEditing) {
                editGroup(editingGroup);
                setEditingGroup(undefined);
              }
            }}
            onCancelEdit={() => setEditingGroup(undefined)}
            onSetEditing={() => setEditingGroup(group)}
            onRequestDelete={() => onDeleteRequest(group.id)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 mt-2">
      <h3
        className="font-semibold text-slate-700"
        style={{ fontStretch: "semi-condensed" }}
      >
        Group
      </h3>
      <div className="grid gap-3">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <TextInput
            name="groupName"
            value={newGroupName}
            placeholder="New group name"
            setValue={setNewGroupName}
            startIcon={
              <FolderNotchPlus
                size={28}
                className="text-slate-300 group-focus-within:text-slate-800"
              />
            }
            showSubmitByEnterKey={!!newGroupName.trim().length}
            onFocusAction={() => setEditingGroup(undefined)}
          />
        </form>
        <div className="flex flex-col gap-2">
          {groups.map((group) => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      </div>
    </div>
  );
}

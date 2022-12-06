import uuid from "react-uuid";

import { useStore } from "store";
import { Group, ItemTypes } from "@types";

export default function useGroups() {
  const { groups, addItem, editItem, removeItem } = useStore(
    ({ groups, addItem, editItem, removeItem }) => ({
      groups,
      addItem,
      editItem,
      removeItem,
    })
  );

  function insertGroup(name: string) {
    const id = uuid();
    addItem(ItemTypes.GROUP, { id, name });

    return id;
  }

  function editGroup(group: Group) {
    editItem(ItemTypes.GROUP, group);
  }

  function removeGroup(groupId: string) {
    removeItem(ItemTypes.GROUP, groupId);
  }

  return { groups, insertGroup, editGroup, removeGroup };
}

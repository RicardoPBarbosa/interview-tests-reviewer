import uuid from "react-uuid";

import { useStore } from "store";
import { Group, ItemTypes } from "@types";

export default function useGroups() {
  const { groups, metrics, addItem, editItem, removeItem } = useStore(
    ({ groups, metrics, addItem, editItem, removeItem }) => ({
      groups,
      metrics,
      addItem,
      editItem,
      removeItem,
    })
  );

  function insertGroup(name: string) {
    const payload: Group = {
      id: uuid(),
      name,
    };
    addItem(ItemTypes.GROUP, payload);

    return payload.id;
  }

  function editGroup(group: Group) {
    editItem(ItemTypes.GROUP, group);
  }

  function removeGroup(groupId: string) {
    // detach existing metrics from this group
    metrics
      .filter((metric) => metric.groupId === groupId)
      .forEach((metric) =>
        editItem(ItemTypes.METRIC, { ...metric, groupId: undefined })
      );

    removeItem(ItemTypes.GROUP, groupId);
  }

  return { groups, insertGroup, editGroup, removeGroup };
}

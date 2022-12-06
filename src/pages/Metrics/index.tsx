import uuid from "react-uuid";
import {
  ChangeEvent,
  FormEvent,
  lazy,
  Suspense,
  useRef,
  useState,
} from "react";

import { Metric } from "@types";
import Loading from "components/Loading";
import Switch from "components/Switch";
const Groups = lazy(() => import("./components/Groups"));

export default function Metrics() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [belongsToGroup, setBelongsToGroup] = useState(false);
  const [groupId, setGroupId] = useState<string>();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputRef.current?.value?.trim().length) {
      const id = uuid();
      const payload: Metric = {
        id,
        name: inputRef.current.value,
        ...(groupId && { groupId }),
      };
      console.log({ payload });

      // cleanup
      setGroupId(undefined);
      inputRef.current.value = "";
    }
  }

  function handleAssignGroupToggle(e: ChangeEvent<HTMLInputElement>) {
    setBelongsToGroup(e.target.checked);
  }

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          ref={inputRef}
          type="text"
          name="metricName"
          placeholder="Metric name"
        />
        <Switch onChange={handleAssignGroupToggle}>
          <span className="font-medium text-sm">Assign to a group</span>
        </Switch>
      </form>
      {belongsToGroup && (
        <Suspense fallback={<Loading />}>
          <Groups
            onSelect={(groupId) => setGroupId(groupId)}
            selectedGroupId={groupId}
          />
        </Suspense>
      )}
    </>
  );
}

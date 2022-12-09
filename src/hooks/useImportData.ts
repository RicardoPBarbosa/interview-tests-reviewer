import { toast } from "react-toastify";
import type { ChangeEvent } from "react";

import { useStore } from "store"

export default function useImportData() {
  const uploadState = useStore(({ uploadState }) => uploadState);

  function importData(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      if (file.type !== "application/json") {
        toast.error("Wrong file type");
      }

      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onloadend = () => {
        try {
          const json = JSON.parse(fileReader.result as string);
          uploadState(json);
          toast.success("Data imported successfully");
        } catch (error) {
          toast.error("File contains invalid JSON");
        }
      };
    }
  }

  return importData
}
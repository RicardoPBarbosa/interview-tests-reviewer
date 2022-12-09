import { FileArrowDown, FileArrowUp } from "phosphor-react";

import useExportData from "hooks/useExportData";
import useImportData from "hooks/useImportData";

export default function HandleData() {
  const importData = useImportData();
  const exportData = useExportData();

  return (
    <div className="flex gap-3 pt-3">
      <button
        onClick={exportData}
        className="main-button bg-slate-200 text-slate-700 flex gap-2 items-center text-sm font-semibold hover:bg-slate-300"
      >
        <FileArrowDown size={26} weight="regular" className="text-slate-500" />
        <span>export data</span>
      </button>
      <label htmlFor="import-data" className="relative">
        <input
          type="file"
          name="import-data"
          id="import-data"
          accept="application/json"
          onChange={importData}
          className="w-0 h-0 absolute top-0 peer"
        />
        <span className="cursor-pointer main-button bg-slate-200 text-slate-700 flex gap-2 items-center text-sm font-semibold hover:bg-slate-300">
          <FileArrowUp size={26} weight="regular" className="text-slate-500" />
          <div className="flex flex-col items-start">
            <span>import data</span>
            <small className="font-medium text-red-500">
              This will replace existing local data
            </small>
          </div>
        </span>
      </label>
    </div>
  );
}

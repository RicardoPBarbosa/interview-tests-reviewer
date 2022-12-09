import { useStore } from "store"
import { buildBlob } from "utils"

export default function useExportData() {
  const data = useStore(({ groups, metrics, reviews }) => ({ groups, metrics, reviews }));

  function exportData() {
    const objectUrl = buildBlob(data)

    const saveFile = async () => {
      const a = document.createElement('a');
      a.download = 'interview-tests-reviews-export.json';
      a.href = objectUrl;
      a.addEventListener('click', () => {
        setTimeout(() => URL.revokeObjectURL(a.href), 500);
      });
      a.click();
    };

    saveFile()
  }

  return exportData
}
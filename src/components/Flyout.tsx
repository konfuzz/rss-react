import { useSelectedStore } from "../store/useSelectedStore";
import { generateCSV } from "../utils/generateCSV";

export function Flyout() {

  const { selectedRecipes, unselectAll } = useSelectedStore();
  const handleDownload = () => {
    const csv = generateCSV(Array.from(selectedRecipes.values()));
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedRecipes.size}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flyout">
      <div className="selected">{selectedRecipes.size} selected</div>
      <button className="unselect" onClick={unselectAll}>
        Unselect All
      </button>
      <button className="download-btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  )
}
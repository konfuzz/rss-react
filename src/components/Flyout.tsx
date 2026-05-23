import { useSelectedStore } from "../store/useSelectedStore";

export function Flyout() {

  const { selectedIds, unselectAll } = useSelectedStore();

  return (
    <div className="flyout">
      <div className="selected">{selectedIds.size} selected</div>
      <button className="unselect" onClick={unselectAll}>
        Unselect All
      </button>
      <a href="#" className="download-btn" download>
        Download
      </a>
    </div>
  )
}
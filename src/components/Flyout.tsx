'use client'

import { useSelectedStore } from "../store/useSelectedStore";

export function Flyout() {

  const { selectedRecipes, unselectAll } = useSelectedStore();

  if (selectedRecipes.length === 0) return null;
  
  const handleDownload = async () => {
    const ids = selectedRecipes;
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedRecipes.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flyout">
      <div className="selected">{selectedRecipes.length} selected</div>
      <button className="unselect" onClick={unselectAll}>
        Unselect All
      </button>
      <button className="download-btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  )
}
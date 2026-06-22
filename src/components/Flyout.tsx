'use client'

import { useSelectedStore } from "../store/useSelectedStore";
import { useTranslations } from 'next-intl'

export function Flyout() {
  const t = useTranslations('Flyout')
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
      <div className="selected">{selectedRecipes.length} {t('selected')}</div>
      <button className="unselect" onClick={unselectAll}>
        {t('unselectAll')}
      </button>
      <button className="download-btn" onClick={handleDownload}>
        {t('download')}
      </button>
    </div>
  )
}
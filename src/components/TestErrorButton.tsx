'use client'

import { useState } from "react";
import { useTranslations } from 'next-intl'

export function TestErrorButton() {
  const t = useTranslations('TestErrorButton')
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  }

  if (throwError) {
    throw new Error(t('error'));
  }

  return (
    <button className="test-error-btn" onClick={handleClick}>
      🧪 {t('label')}
    </button>
  );
}
'use client'
import { useTranslations } from 'next-intl'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  const t = useTranslations('Error')
  return (
    <div className="error-boundary-fallback">
      <h2>{t('title')}</h2>
      <p>{error.message}</p>
      <button onClick={() => unstable_retry()} className="button">{t('reload')}</button>
    </div>
  )
}
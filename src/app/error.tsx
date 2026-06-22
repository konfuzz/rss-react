'use client'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {

  return (
    <div className="error-boundary-fallback">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => unstable_retry()} className="button">Reload</button>
    </div>
  )
}
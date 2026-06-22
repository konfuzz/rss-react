import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="button">Back to Home</Link>
    </section>
  )
}
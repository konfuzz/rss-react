import { Link } from "@/i18n/navigation"
import { getTranslations } from 'next-intl/server'

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound')
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>{t('message')}</p>
      <p>{t('description')}</p>
      <Link href="/" className="button">{t('backToHome')}</Link>
    </section>
  )
}
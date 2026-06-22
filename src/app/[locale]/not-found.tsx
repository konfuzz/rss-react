import { Link } from "@/i18n/navigation"
import { getTranslations } from 'next-intl/server'
import styles from './NotFoundPage.module.css'

export default async function NotFoundPage() {
  const t = await getTranslations('NotFound')
  return (
    <section className={styles['not-found']}>
      <h1>404</h1>
      <p>{t('message')}</p>
      <p>{t('description')}</p>
      <Link href="/" className={styles.button}>{t('backToHome')}</Link>
    </section>
  )
}
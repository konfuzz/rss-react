'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher')
  const locale = useLocale()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const switchLang = (newLocale: string) => {
    const queryString = searchParams.toString()
    const href = queryString ? `${pathname}?${queryString}` : pathname
    router.replace(href, { locale: newLocale })
  }

  return (
    <div className={styles['language-switcher']}>
      <select value={locale} onChange={(e) => switchLang(e.target.value)}>
        <option value="en">{t('en')}</option>
        <option value="ru">{t('ru')}</option>
      </select>
    </div>
  )
}
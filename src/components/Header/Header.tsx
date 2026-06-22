'use client'

import { Link } from "@/i18n/navigation"
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import styles from './Header.module.css'

export function Header() {
  const t = useTranslations('Header')
  const { isDark, toggleTheme } = useContext(AppContext);
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  }

  return (
    <header className={styles.header}>
      <h1>{t('title')}</h1>
      <nav>
        <Link href="/">{t('home')}</Link>
        <Link href="/about">{t('about')}</Link>
      </nav>
      <div className={styles['menu-buttons']}>
        <button className="refresh-btn" onClick={handleRefresh} title="Refresh data">
          ↻
        </button>
        <LanguageSwitcher />
        <button onClick={toggleTheme}>
          {isDark ? t('lightMode') : t('darkMode')}
        </button>
      </div>
    </header>
  );
}
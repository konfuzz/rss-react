import { search } from "../../actions/search";
import { getTranslations } from 'next-intl/server'
import styles from './SearchSection.module.css'

export async function SearchSection({ query }: { query: string }) {
  const t = await getTranslations('SearchSection')
  return (
    <section className={styles.search}>
      <form className={styles.search__inner} action={search}>
        <input
          name="query"
          type="text"
          placeholder={t('placeholder')}
          defaultValue={query}
        />
        <button type="submit">{t('button')}</button>
      </form>
    </section>
  );
}

import Card from "../Card/Card";
import type { Recipe } from "../../types";
import { getTranslations } from 'next-intl/server'
import styles from './ResultSection.module.css'

interface Props {
  items: Recipe[];
  page: string | undefined;
  query: string;
}

export async function ResultSection({items, page, query}: Props) {
  const t = await getTranslations('ResultSection')

  if (items.length === 0) return (
    <p className="no-results">{t('noResults')}</p>
  )

  return (    
    <section className={styles.results}>
      {items.map((item: Recipe) => <Card key={item.id} data={item} page={page} query={query} />)}
    </section>
  );
}

import { SearchSection } from '../../components/SearchSection/SearchSection'
import { Flyout } from '../../components/Flyout/Flyout'
import { RecipeDetail } from '../../components/RecipeDetail/RecipeDetail'
import { TestErrorButton } from '../../components/TestErrorButton/TestErrorButton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import RecipeResults from '@/components/RecipeResults/RecipeResults'
import pageStyles from './Page.module.css'
import cardStyles from '../../components/Card/Card.module.css'
import resultStyles from '../../components/ResultSection/ResultSection.module.css'
import detailStyles from '../../components/RecipeDetail/RecipeDetail.module.css'

export default async function HomePage({ searchParams }: { searchParams: Promise<{ query?: string, page?: string, details?: string }> }) {
  const { query, page, details } = await searchParams;
  const cookieStore = await cookies()
  
  if (!query) {
    const lastQuery = cookieStore.get('lastQuery')?.value
    if (lastQuery) redirect(`/?query=${encodeURIComponent(lastQuery)}&page=1`)
  }

  return (
    <>
      <div className={pageStyles.container}>
        <div className={pageStyles['left-panel']}>
          <SearchSection query={query ?? ""} />
          <Suspense fallback={(
            <section className={resultStyles.results}>
              {Array(10).fill(0).map((_, i) => (<div className={cardStyles.sceleton} key={i}></div>))}
            </section>
            )}>
            <RecipeResults query={query ?? ""} page={page} />
          </Suspense>
        </div>
        {details && (
          <div className={pageStyles['right-panel']}>
            <Suspense fallback={(
              <div className={detailStyles['detail-panel']}>
                <div className={detailStyles['detail-loading']} />
                <div className={detailStyles['detail-loading']} style={{ height: 200 }} />
                <div className={detailStyles['detail-loading']} />
              </div>
            )}>
              <RecipeDetail detailsId={details} page={page}/>
            </Suspense>
          </div>
        )}
      </div>
      <Flyout />
      <TestErrorButton />
    </>
  )
}
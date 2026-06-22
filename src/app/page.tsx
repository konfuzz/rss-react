import { SearchSection } from '../components/SearchSection'
import { Flyout } from '../components/Flyout'
import { RecipeDetail } from '../components/RecipeDetail'
import { TestErrorButton } from '../components/TestErrorButton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import RecipeResults from '@/components/RecipeResults'

export default async function HomePage({ searchParams }: { searchParams: Promise<{ query?: string, page?: string, details?: string }> }) {
  const { query, page, details } = await searchParams;
  const cookieStore = await cookies()
  
  if (!query) {
    const lastQuery = cookieStore.get('lastQuery')?.value
    if (lastQuery) redirect(`/?query=${encodeURIComponent(lastQuery)}&page=1`)
  }

  return (
    <>
      <div className='container'>
        <div className="left-panel">
          <SearchSection query={query ?? ""} />
          <Suspense fallback={(
            <section className="results">
              {Array(10).fill(0).map((_, i) => (<div className="sceleton" key={i}></div>))}
            </section>
            )}>
            <RecipeResults query={query ?? ""} page={page} />
          </Suspense>
        </div>
        {details && (
          <div className="right-panel">
            <Suspense fallback={(
              <div className="detail-panel">
                <div className="detail-loading" />
                <div className="detail-loading" style={{ height: 200 }} />
                <div className="detail-loading" />
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
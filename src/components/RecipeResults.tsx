import { fetchRecipes } from '../api/recipes'
import { ResultSection } from './ResultSection'
import { Pagination } from './Pagination'

const ITEMS_PER_PAGE = Number(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE) || 10

export default async function RecipeResults({ query, page }: { query: string, page: string | undefined }) {

  const data = await fetchRecipes({ query: query ?? "", page: page ? Number(page) : 1, limit: ITEMS_PER_PAGE })
  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0

  return (
    <>
      <ResultSection
        items={data?.recipes ?? []}
        page={page}
      />
      {totalPages > 1 && (
        <Pagination currentPage={page ? Number(page) : 1} totalPages={totalPages} />
      )}
    </>
  )
}
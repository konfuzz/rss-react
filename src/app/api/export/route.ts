import { NextRequest, NextResponse } from 'next/server'
import { fetchRecipeById } from '@/api/recipes'
import type { Recipe } from '@/types'

export async function POST(request: NextRequest) {
  const { ids } = await request.json() as { ids: number[] }

  const recipes: Recipe[] = []
  for (const id of ids) {
    const recipe = await fetchRecipeById(String(id))
    recipes.push(recipe)
  }

  const header = 'Name,Ingredients,URL,Cuisine,Difficulty,Time\n'
  const rows = recipes.map(r => {
    const ingredients = r.ingredients.join('; ')
    const url = `${request.nextUrl.origin}/?details=${r.id}`
    return `"${r.name}","${ingredients}","${url}","${r.cuisine}","${r.difficulty}","${r.prepTimeMinutes + r.cookTimeMinutes}"`
  })
  const csv = header + rows.join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${recipes.length}_items.csv"`,
    },
  })
}
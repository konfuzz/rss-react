import { generateCSV } from '../generateCSV'
import { mockRecipe } from '../../test-utils/mocks'

it('produces header row', () => {
  const csv = generateCSV([mockRecipe])
  expect(csv).toContain('Name,Ingredients,URL,Cuisine,Difficulty,Time')
})

it('contains recipe name, ingredients, URL, cuisine, difficulty, time', () => {
  const csv = generateCSV([mockRecipe])
  expect(csv).toContain(mockRecipe.name)
  expect(csv).toContain(mockRecipe.ingredients.join('; '))
  expect(csv).toContain(`/?details=${mockRecipe.id}`)
  expect(csv).toContain(mockRecipe.cuisine)
  expect(csv).toContain(mockRecipe.difficulty)
  expect(csv).toContain(mockRecipe.prepTimeMinutes + mockRecipe.cookTimeMinutes)
})

it('handles multiple recipes — one row per recipe', () => {
  const csv = generateCSV([mockRecipe, mockRecipe])
  const rows = csv.split('\n').filter((row) => !!row)
  expect(rows.length).toBe(3)
})
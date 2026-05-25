import { useSelectedStore } from '../useSelectedStore'
import { mockRecipe } from '../../test-utils/mocks'

beforeEach(() => {
  useSelectedStore.setState({ selectedRecipes: new Set() })
})

it('starts empty', () => {
  const { selectedRecipes } = useSelectedStore.getState()
  expect(selectedRecipes.size).toBe(0)
})

it('adds a recipe via toggleIds', () => {
  const recipe = mockRecipe
  useSelectedStore.getState().toggleIds(recipe)
  const { selectedRecipes } = useSelectedStore.getState()
  expect(selectedRecipes.size).toBe(1)
})

it('removes a recipe on second toggleIds', () => {
  const recipe = mockRecipe
  useSelectedStore.getState().toggleIds(recipe)
  useSelectedStore.getState().toggleIds(recipe)
  const { selectedRecipes } = useSelectedStore.getState()
  expect(selectedRecipes.size).toBe(0)
})

it('unselectAll clears everything', () => {
  const recipe = mockRecipe
  useSelectedStore.getState().toggleIds(recipe)
  useSelectedStore.getState().unselectAll()
  const { selectedRecipes } = useSelectedStore.getState()
  expect(selectedRecipes.size).toBe(0)
})

it('can select multiple recipes', () => {
  const recipe1 = mockRecipe
  const recipe2 = { ...mockRecipe, id: 2 }
  useSelectedStore.getState().toggleIds(recipe1)
  useSelectedStore.getState().toggleIds(recipe2)
  const { selectedRecipes } = useSelectedStore.getState()
  expect(selectedRecipes.size).toBe(2)
})
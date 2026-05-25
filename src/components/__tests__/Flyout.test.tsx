import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useSelectedStore } from '../../store/useSelectedStore'
import { Flyout } from '../Flyout'
import { mockRecipe } from '../../test-utils/mocks.ts'

beforeEach(() => {
  useSelectedStore.setState({ selectedRecipes: new Set() })
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url')
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { })
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('displays correct count when recipes are selected', () => {
  useSelectedStore.setState({ selectedRecipes: new Set([mockRecipe, {...mockRecipe}, {...mockRecipe}]) })
  render(<Flyout />)
  expect(screen.getByText('3 selected')).toBeInTheDocument()
})

it('"Unselect All" clears the store', async () => {
  const user = userEvent.setup()
  useSelectedStore.setState({ selectedRecipes: new Set([mockRecipe]) })
  render(<Flyout />)
  await user.click(screen.getByText('Unselect All'))
  expect(useSelectedStore.getState().selectedRecipes.size).toBe(0)
})

it('"Download" calls URL.createObjectURL with a Blob', async () => {
  useSelectedStore.setState({ selectedRecipes: new Set([mockRecipe]) })
  render(<Flyout />)
  await userEvent.click(screen.getByText('Download'))
  expect(globalThis.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
  expect(globalThis.URL.revokeObjectURL).toHaveBeenCalledWith('blob:url')
})
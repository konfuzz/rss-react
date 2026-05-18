import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import { mockRecipe } from '../../test-utils/mocks'

it('renders all recipe information', () => {
  render(<Card data={mockRecipe} onSelect={vi.fn()} />)

  expect(screen.getByText(mockRecipe.name)).toBeInTheDocument()
  expect(screen.getByText(mockRecipe.difficulty)).toBeInTheDocument()
  expect(screen.getByText(new RegExp(`${mockRecipe.servings} servings`))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(`${mockRecipe.prepTimeMinutes + mockRecipe.cookTimeMinutes} min`))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(`${mockRecipe.caloriesPerServing} kcal`))).toBeInTheDocument()
  mockRecipe.tags.forEach((tag) => {
    expect(screen.getByText(tag)).toBeInTheDocument()
  })
  expect(screen.getByText(new RegExp(`${mockRecipe.rating}`))).toBeInTheDocument()
  expect(screen.getByText(new RegExp(`${mockRecipe.reviewCount} reviews`))).toBeInTheDocument()
  expect(screen.getByRole('img')).toHaveAttribute('src', mockRecipe.image)
  expect(screen.getByRole('img')).toHaveAttribute('alt', mockRecipe.name)
})
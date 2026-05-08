import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import type { Recipe } from '../../types'

const mockRecipe: Recipe = {
  "id": 1,
  "name": "Classic Margherita Pizza",
  "ingredients": [
    "Pizza dough",
    "Tomato sauce",
    "Fresh mozzarella cheese",
    "Fresh basil leaves",
    "Olive oil",
    "Salt and pepper to taste"
  ],
  "instructions": [
    "Preheat the oven to 475°F (245°C).",
    "Roll out the pizza dough and spread tomato sauce evenly.",
    "Top with slices of fresh mozzarella and fresh basil leaves.",
    "Drizzle with olive oil and season with salt and pepper.",
    "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
    "Slice and serve hot."
  ],
  "prepTimeMinutes": 20,
  "cookTimeMinutes": 15,
  "servings": 4,
  "difficulty": "Easy",
  "cuisine": "Italian",
  "caloriesPerServing": 300,
  "tags": [
    "Pizza",
    "Italian"
  ],
  "userId": 45,
  "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
  "rating": 4.6,
  "reviewCount": 3,
  "mealType": [
    "Dinner"
  ]
}

it('renders all recipe information', () => {
  render(<Card data={mockRecipe} />)

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
import { render, screen } from '@testing-library/react'
import { ResultSection } from '../ResultSection'
import { mockRecipe } from '../../test-utils/mocks'

describe('Result section', () => {
  it('renders list of cards when items are provided', () => {
    render(<ResultSection items={[mockRecipe]} loading={false} error={null} onSelect={vi.fn()} />)
    expect(screen.getByText(mockRecipe.name)).toBeInTheDocument()
  })

  it('renders loading skeletons when loading is true', () => {
    const { container } = render(<ResultSection items={[mockRecipe]} loading={true} error={null} onSelect={vi.fn()} />)
    const skeletons = container.querySelectorAll('.sceleton');
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('renders error message when error is provided', () => {
    const { container } = render(<ResultSection items={[mockRecipe]} loading={false} error="Something went wrong" onSelect={vi.fn()} />)
    expect(container.querySelector('.error-message')).toBeInTheDocument()
  })

  it ('renders no results message when items is empty', () => {
    const { container } = render(<ResultSection items={[]} loading={false} error={null} onSelect={vi.fn()} />)
    expect(container.querySelector('.no-results')).toBeInTheDocument()
  })

  it('renders error message when loading is true', () => {
    const { container } = render(<ResultSection items={[]} loading={true} error="Something went wrong" onSelect={vi.fn()} />)
    expect(container.querySelector('.error-message')).toBeInTheDocument()
  })
})
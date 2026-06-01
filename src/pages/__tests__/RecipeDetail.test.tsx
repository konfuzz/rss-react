import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import RecipeDetail from '../RecipeDetail'
import { mockRecipe } from '../../test-utils/mocks'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
}


const createMockFetch = (ok: boolean, data?: unknown) =>
  vi.fn().mockResolvedValue({
    ok,
    json: async () => data,
  } as Response)

let mockOnClose: ReturnType<typeof vi.fn>

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useOutletContext: () => ({ onClose: mockOnClose }),
  }
})

beforeEach(() => {
  mockOnClose = vi.fn()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

const renderAt = (url: string) =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter initialEntries={[url]}>
        <RecipeDetail />
      </MemoryRouter>
    </QueryClientProvider>
  )

describe('RecipeDetail', () => {
  it('shows loading skeleton initially', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, mockRecipe)
    )
    const { container } = renderAt('/?details=1')

    expect(container.querySelector('.detail-loading')).toBeInTheDocument()
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('renders recipe details after successful fetch', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, mockRecipe)
    )
    renderAt('/?details=1')

    expect(await screen.findByText(mockRecipe.name)).toBeInTheDocument()
    expect(screen.getByText(mockRecipe.difficulty)).toBeInTheDocument()

    const totalMinutes =
      mockRecipe.prepTimeMinutes + mockRecipe.cookTimeMinutes
    expect(
      screen.getByText(new RegExp(`${totalMinutes} min`))
    ).toBeInTheDocument()

    mockRecipe.ingredients.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })

    mockRecipe.instructions.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument()
    })

    mockRecipe.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })

    expect(screen.getByText(mockRecipe.cuisine)).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`${mockRecipe.rating}`))
    ).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', mockRecipe.image)
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('shows error message on API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(createMockFetch(false))
    renderAt('/?details=1')

    expect(
      await screen.findByText(/Failed to load recipe details/)
    ).toBeInTheDocument()
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('shows "Recipe not found" when recipe is null', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, null)
    )
    renderAt('/?details=1')

    expect(await screen.findByText('Recipe not found.')).toBeInTheDocument()
    expect(screen.getByText('✕')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked after load', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, mockRecipe)
    )
    renderAt('/?details=1')
    await screen.findByText(mockRecipe.name)

    await userEvent.click(screen.getByText('✕'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked during loading', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, mockRecipe)
    )
    renderAt('/?details=1')

    await userEvent.click(screen.getByText('✕'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when close button is clicked in error state', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(createMockFetch(false))
    renderAt('/?details=1')
    await screen.findByText(/Failed to load recipe details/)

    await userEvent.click(screen.getByText('✕'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('aborts fetch on unmount', () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort')
    const { unmount } = renderAt('/?details=1')

    unmount()
    expect(abortSpy).toHaveBeenCalled()
  })
})

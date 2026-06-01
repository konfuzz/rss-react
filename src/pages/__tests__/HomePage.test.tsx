import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../HomePage.tsx'
import userEvent from '@testing-library/user-event'
import { mockRecipe, mockRecipesResponse } from '../../test-utils/mocks.ts'
import { MemoryRouter, Routes, Route, useOutletContext } from 'react-router'
import type { FC } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
}

const TestCloseButton: FC = () => {
  const { onClose } = useOutletContext<{ onClose: () => void }>()
  return <button onClick={onClose}>Close Detail</button>
}

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    length: 0,
    key: vi.fn(() => null),
  }
})()

const createMockFetch = (ok: boolean, data?: unknown) =>
  vi.fn().mockResolvedValue({
    ok,
    json: async () => data,
  } as Response)

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => { })
  vi.spyOn(globalThis, 'fetch').mockImplementation(
    createMockFetch(true, mockRecipesResponse)
  )
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('HomePage', () => {
  it('renders the search and results section', () => {
    const { container } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(screen.getByPlaceholderText('Search recipes...')).toBeInTheDocument()
    expect(container.querySelector('.results')).toBeInTheDocument()
  })

  it('displays recipes after successful fetch', async () => {
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>

    )
    expect(await screen.findByText(mockRecipesResponse.recipes[0].name)).toBeInTheDocument()
  })

  it('shows error message on API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(false)
    )
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(await screen.findByText(/Failed to load recipes/)).toBeInTheDocument()
  })

  it('saves search query to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.type(input, 'Pizza')
    await user.keyboard('{Enter}')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('lastQuery', '"Pizza"')
  })

  it('reads lastQuery from localStorage on mount', async () => {
    window.localStorage.setItem('lastQuery', '"pasta"')
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(window.localStorage.getItem).toHaveBeenCalledWith('lastQuery')
    expect(window.localStorage.getItem('lastQuery')).toBe('"pasta"')
  })

  it('handles empty search query', async () => {
    const user = userEvent.setup()
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.clear(input)
    await user.keyboard('{Enter}')
    expect(window.localStorage.getItem('lastQuery')).toBe('""')
  })

  it('handles query change on input', async () => {
    window.localStorage.setItem('lastQuery', 'chicken')
    const user = userEvent.setup()
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.clear(input)
    await user.type(input, 'pasta')
    await user.keyboard('{Enter}')
    expect(window.localStorage.getItem('lastQuery')).toBe('"pasta"')
  })

  it('trims search query before saving to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.type(input, '  Salad  ')
    await user.keyboard('{Enter}')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('lastQuery', '"Salad"')
    expect(window.localStorage.getItem('lastQuery')).toBe('"Salad"')
  })

  it('shows pagination when total items exceed page size', async () => {
    const manyRecipes = {
      recipes: Array.from({ length: 12 }, (_, i) => ({
        ...mockRecipe,
        id: i + 1,
        name: `Recipe ${i + 1}`,
      })),
      total: 12,
      skip: 0,
      limit: 10,
    }
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, manyRecipes)
    )
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(await screen.findByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('changes page via pagination', async () => {
    const manyRecipes = {
      recipes: Array.from({ length: 12 }, (_, i) => ({
        ...mockRecipe,
        id: i + 1,
        name: `Recipe ${i + 1}`,
      })),
      total: 12,
      skip: 0,
      limit: 10,
    }
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, manyRecipes)
    )
    fetchSpy.mockClear()
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(await screen.findByText('1')).toBeInTheDocument()
    fetchSpy.mockClear()
    await user.click(screen.getByText('2'))
    await waitFor(() => {
      const lastCall = fetchSpy.mock.calls[fetchSpy.mock.calls.length - 1]?.[0]
      if (typeof lastCall === 'string') {
        expect(lastCall).toContain('skip=10')
      } else if (lastCall instanceof URL) {
        expect(lastCall.searchParams.get('skip')).toBe('10')
      } else if (lastCall instanceof Request) {
        expect(lastCall.url).toContain('skip=10')
      }
    })
  })

  it('opens recipe detail panel when clicking a card', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    expect(await screen.findByText(mockRecipe.name)).toBeInTheDocument()
    const card = container.querySelector('.card') as HTMLElement
    await user.click(card)
    expect(container.querySelector('.container--split')).toBeInTheDocument()
    expect(container.querySelector('.right-panel')).toBeInTheDocument()
  })

  it('renders split layout when details param is set', () => {
    const { container } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    )
    expect(container.querySelector('.container--split')).toBeInTheDocument()
    expect(container.querySelector('.right-panel')).toBeInTheDocument()
  })

  it('closes detail panel via outlet context', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter initialEntries={['/?details=1']}>
          <Routes>
            <Route element={<HomePage />}>
              <Route
                path="/"
                element={<TestCloseButton />}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
    expect(container.querySelector('.container--split')).toBeInTheDocument()
    expect(container.querySelector('.right-panel')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Close/ }))
    expect(container.querySelector('.container--split')).not.toBeInTheDocument()
    expect(container.querySelector('.right-panel')).not.toBeInTheDocument()
  })

  it('calls search API on form submit', async () => {
    const user = userEvent.setup()
    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </QueryClientProvider>
    )
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.clear(input)
    await user.type(input, 'chicken')
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(true, mockRecipesResponse)
    )
    await user.click(screen.getByRole('button', { name: /Search/i }))
    const calledUrl = fetchSpy.mock.calls[fetchSpy.mock.calls.length - 1][0]
    expect(calledUrl.toString()).toContain('/search?q=chicken');
  })

  it('caches recipe list between page navigations', async () => {
    const manyRecipes = {
      recipes: Array.from({ length: 20 }, (_, i) => ({
        ...mockRecipe,
        id: i + 1,
        name: `Recipe ${i + 1}`,
      })),
      total: 20,
      skip: 0,
      limit: 10,
    }

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, staleTime: 5 * 60 * 1000 },
      },
    })

    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(createMockFetch(true, manyRecipes))

    const user = userEvent.setup()

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(await screen.findByText('Recipe 1')).toBeInTheDocument()
    const page1Calls = fetchSpy.mock.calls.length
    expect(page1Calls).toBeGreaterThan(0)

    await user.click(screen.getByText('2'))
    expect(await screen.findByText('Recipe 11')).toBeInTheDocument()
    const page2Calls = fetchSpy.mock.calls.length
    expect(page2Calls).toBeGreaterThan(page1Calls)

    fetchSpy.mockClear()
    await user.click(screen.getByText('1'))
    expect(await screen.findByText('Recipe 1')).toBeInTheDocument()
    expect(fetchSpy.mock.calls.length).toBe(0)
  })

})
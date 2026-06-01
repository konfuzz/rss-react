import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'
import userEvent from '@testing-library/user-event'
import { mockRecipesResponse } from './test-utils/mocks'
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

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(globalThis, 'fetch').mockImplementation(
    createMockFetch(true, mockRecipesResponse)
  )
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

const renderAt = (path: string) =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  )

describe('App routing', () => {
  it('renders home page at /', () => {
    renderAt('/')
    expect(screen.getByPlaceholderText('Search recipes...')).toBeInTheDocument()
    expect(screen.getByText('Recipe Search')).toBeInTheDocument()
  })

  it('renders about page at /about', () => {
    renderAt('/about')
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByText(/konfuzz/)).toBeInTheDocument()
  })

  it('renders 404 page for unknown routes', () => {
    renderAt('/some-random-page')
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(/Page not found/)).toBeInTheDocument()
  })

  it('navigates to about page via header link', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
  })

  it('navigates back to home via header link', async () => {
    const user = userEvent.setup()
    renderAt('/about')
    await user.click(screen.getByText('Home'))
    expect(screen.getByPlaceholderText('Search recipes...')).toBeInTheDocument()
  })

  it('shows 404 page then navigates back home', async () => {
    const user = userEvent.setup()
    renderAt('/nonexistent')
    expect(screen.getByText('404')).toBeInTheDocument()

    await user.click(screen.getByText('Home'))
    expect(screen.getByPlaceholderText('Search recipes...')).toBeInTheDocument()
  })
})

describe('App theme', () => {
  it('sets data-theme="light" by default', () => {
    renderAt('/')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
  it('changes data-theme to "dark" when button is clicked', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: /Mode/ }))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
  it('toggles theme back to "light" on second click', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const btn = screen.getByRole('button', { name: /Mode/ })
    await user.click(btn)
    expect(document.documentElement.dataset.theme).toBe('dark')
    await user.click(btn)
    expect(document.documentElement.dataset.theme).toBe('light')
  })
  it('persists theme when navigating between pages', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: /Mode/ }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    await user.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
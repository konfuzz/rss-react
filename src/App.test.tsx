import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'
import userEvent from '@testing-library/user-event'
import { mockRecipesResponse } from './test-utils/mocks'

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
})

afterEach(() => {
  vi.restoreAllMocks()
})

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
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

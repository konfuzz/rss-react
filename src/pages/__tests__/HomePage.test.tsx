import { render, screen } from '@testing-library/react'
import HomePage from '../HomePage.tsx'
import userEvent from '@testing-library/user-event'
import { mockRecipesResponse } from '../../test-utils/mocks.ts'

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
    const { container } = render(<HomePage />)
    expect(screen.getByPlaceholderText('Search recipes...')).toBeInTheDocument()
    expect(container.querySelector('.results')).toBeInTheDocument()
  })

  it('displays recipes after successful fetch', async () => {
    render(<HomePage />)
    expect(await screen.findByText(mockRecipesResponse.recipes[0].name)).toBeInTheDocument()
  })

  it('shows error message on API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      createMockFetch(false)
    )
    render(<HomePage />)
    expect(await screen.findByText(/Failed to load recipes/)).toBeInTheDocument()
  })

  it('saves search query to localStorage', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.type(input, 'Pizza')
    await user.keyboard('{Enter}')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('lastQuery', 'Pizza')
  })

  it('reads lastQuery from localStorage on mount', async () => {
    window.localStorage.setItem('lastQuery', 'pasta')
    render(<HomePage />)
    expect(window.localStorage.getItem).toHaveBeenCalledWith('lastQuery')
    expect(window.localStorage.getItem('lastQuery')).toBe('pasta')
  })

  it('handles empty search query', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.clear(input)
    await user.keyboard('{Enter}')
    expect(window.localStorage.getItem('lastQuery')).toBe('')
  })

  it('handles query change on input', async () => {
    window.localStorage.setItem('lastQuery', 'chicken')
    const user = userEvent.setup()
    render(<HomePage />)
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.clear(input)
    await user.type(input, 'pasta')
    await user.keyboard('{Enter}')
    expect(window.localStorage.getItem('lastQuery')).toBe('pasta')
  })

  it('trims search query before saving to localStorage', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.type(input, '  Salad  ')
    await user.keyboard('{Enter}')
    expect(window.localStorage.setItem).toHaveBeenCalledWith('lastQuery', 'Salad')
    expect(window.localStorage.getItem('lastQuery')).toBe('Salad')
  })

  it('calls search API on form submit', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
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

})
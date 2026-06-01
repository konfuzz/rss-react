import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Header } from '../Header'
import { AppContext } from '../../context/AppContext'
import { MemoryRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
}

it('renders the header', () => {
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </QueryClientProvider>
  )
  expect(screen.getByText('Recipe Search')).toBeInTheDocument()
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
  expect(screen.getByText('Dark Mode')).toBeInTheDocument()
  expect(screen.getByText('↻')).toBeInTheDocument()
})

it('toggles theme via context', async () => {
  const user = userEvent.setup()
  const toggleTheme = vi.fn()

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <MemoryRouter>
        <AppContext.Provider value={{ isDark: false, toggleTheme }}>
          <Header />
        </AppContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>
  )

  await user.click(screen.getByText('Dark Mode'))
  expect(toggleTheme).toHaveBeenCalledTimes(1)
})

it('refreshes data via button', async () => {
  const user = userEvent.setup()
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const { unmount } = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </QueryClientProvider>
  )

  await user.click(screen.getByText('↻'))
  expect(queryClient.getQueryCache().findAll().length).toBe(0)
  unmount()
})
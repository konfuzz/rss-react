import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Header } from '../Header'
import { AppContext } from '../../context/AppContext'
import { MemoryRouter } from 'react-router'

it('renders the header', () => {
  render(<MemoryRouter><Header /></MemoryRouter>)
  expect(screen.getByText('Recipe Search')).toBeInTheDocument()
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('About')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
})

it('toggles theme via context', async () => {
  const user = userEvent.setup()
  const toggleTheme = vi.fn()

  render(
    <MemoryRouter>
    <AppContext.Provider value={{ isDark: false, toggleTheme }}>
      <Header />
    </AppContext.Provider>
    </MemoryRouter>
  )

  await user.click(screen.getByRole('button'))
  expect(toggleTheme).toHaveBeenCalledTimes(1)
})
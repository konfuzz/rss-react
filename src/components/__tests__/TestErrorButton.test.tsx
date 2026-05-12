import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestErrorButton } from '../TestErrorButton'
import { ErrorBoundary } from '../ErrorBoundary'

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => { })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('TestErrorButton', () => {
  it('renders the button', () => {
    render(<TestErrorButton />)
    expect(screen.getByRole('button', { name: /Simulate Error/i })).toBeInTheDocument()
  })

  it('throws error on click when wrapped in ErrorBoundary', async () => {
    const user = userEvent.setup()
    render(
      <ErrorBoundary>
        <TestErrorButton />
      </ErrorBoundary>
    )
    await user.click(screen.getByRole('button', { name: /Simulate Error/i }))
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/Test error from button/i)).toBeInTheDocument()
  })
})
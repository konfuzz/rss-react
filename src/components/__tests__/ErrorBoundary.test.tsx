import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'
import userEvent from '@testing-library/user-event'

function ThrowError({ message }: { message: string }): React.ReactNode {
  throw new Error(message)
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => { })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(<ErrorBoundary><div>Hello world</div></ErrorBoundary>)
    expect(screen.getByText('Hello world')).toBeInTheDocument() 
  })

  it('catches error and shows fallback UI', () => {
    render(<ErrorBoundary><ThrowError message="Test error" /></ErrorBoundary>)
    expect(screen.getByText('Test error')).toBeInTheDocument() 
    expect(screen.getByText('Reload')).toBeInTheDocument() 
  })

  it('reloads page on Reload button click', async () => {
    const user = userEvent.setup()
    const reloadSpy = vi.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadSpy },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ThrowError message="Click error" />
      </ErrorBoundary>
    )

    await user.click(screen.getByRole('button', { name: /Reload/i }))
    expect(reloadSpy).toHaveBeenCalledTimes(1)
  })
})
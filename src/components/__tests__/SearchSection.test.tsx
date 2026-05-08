import { render, screen } from '@testing-library/react'
import { SearchSection } from '../SearchSection'
import userEvent from '@testing-library/user-event'

describe('SearchSection', () => {
  it('renders input with default value from query prop', () => {
    render(<SearchSection searchHandler={vi.fn()} query="pasta" />)
    expect(screen.getByDisplayValue('pasta')).toBeInTheDocument()
  })
  it('renders empty input with placeholder when query is empty', () => {
    render(<SearchSection searchHandler={vi.fn()} query="" />)
    const input = screen.getByPlaceholderText('Search recipes...')
    expect(input).toHaveValue('')
  })
  it('calls searchHandler on form submit', async () => {
    const user = userEvent.setup()
    const mockSearchHandler = vi.fn()
    render(<SearchSection searchHandler={mockSearchHandler} query="" />)
    const input = screen.getByPlaceholderText('Search recipes...')
    await user.type(input, 'pasta')
    await user.click(screen.getByRole('button', { name: 'Search' }))
    expect(mockSearchHandler).toHaveBeenCalledTimes(1)
  })
})
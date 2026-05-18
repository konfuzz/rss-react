import { render, screen } from '@testing-library/react'
import { Pagination } from '../Pagination'
import userEvent from '@testing-library/user-event'

describe('Pagination', () => {
  it('renders page buttons for each page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />)

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument()
    }
  })

  it('hides previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />)

    expect(screen.queryByText('<')).not.toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('hides next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />)

    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.queryByText('>')).not.toBeInTheDocument()
  })

  it('shows both previous and next on middle page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />)

    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
  })

  it('adds active class to current page button', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />)

    const btn = screen.getByText('3')
    expect(btn.className).toContain('active')
  })

  it('shows only current page button when totalPages is 1', () => {
    render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByText('<')).not.toBeInTheDocument()
    expect(screen.queryByText('>')).not.toBeInTheDocument()
  })

  it('shows no prev/next when totalPages is 0', () => {
    render(
      <Pagination currentPage={1} totalPages={0} onPageChange={vi.fn()} />
    )

    expect(screen.queryByText('<')).not.toBeInTheDocument()
    expect(screen.queryByText('>')).not.toBeInTheDocument()
  })

  it('calls onPageChange with correct page on click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    )

    await user.click(screen.getByText('3'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with previous page on < click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    )

    await user.click(screen.getByText('<'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange with next page on > click', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    )

    await user.click(screen.getByText('>'))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})

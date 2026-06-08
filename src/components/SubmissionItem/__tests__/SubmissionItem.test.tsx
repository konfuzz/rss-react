import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmissionItem from '../SubmissionItem';

const baseProps = {
  id: '1',
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  gender: 'Female',
  terms: true,
  image: 'https://example.com/photo.jpg',
  password: 'secret',
  confirm: 'secret',
  country: 'USA',
};

describe('SubmissionItem', () => {
  it('renders name', () => {
    render(<SubmissionItem {...baseProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders age', () => {
    render(<SubmissionItem {...baseProps} />);
    expect(screen.getByText(/Age: 25/)).toBeInTheDocument();
  });

  it('renders email', () => {
    render(<SubmissionItem {...baseProps} />);
    expect(screen.getByText(/alice@example.com/)).toBeInTheDocument();
  });

  it('renders country', () => {
    render(<SubmissionItem {...baseProps} />);
    expect(screen.getByText(/USA/)).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<SubmissionItem {...baseProps} />);
    const img = screen.getByAltText('Alice');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('does not render image when absent', () => {
    render(<SubmissionItem {...baseProps} image="" />);
    expect(screen.queryByAltText('Alice')).not.toBeInTheDocument();
  });
});

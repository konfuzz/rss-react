import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../Modal';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal onClose={() => {}}>
        <div>Modal content</div>
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <Modal onClose={() => {}}>
        <div>Content</div>
      </Modal>
    );
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal onClose={onClose}>
        <div>Content</div>
      </Modal>
    );
    await userEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders via portal', () => {
    const { baseElement } = render(
      <Modal onClose={() => {}}>
        <div>Content</div>
      </Modal>
    );
    expect(baseElement.querySelector('dialog')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledForm from '../UncontrolledForm';
import { useFormStore } from '../../../store/useFormStore';

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
});

describe('UncontrolledForm', () => {
  it('renders all basic fields', () => {
    render(<UncontrolledForm onClose={() => {}} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms and Conditions')).toBeInTheDocument();
  });

  it('renders advanced fields', () => {
    render(<UncontrolledForm onClose={() => {}} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Image')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('shows validation errors on submit with empty fields', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onClose={() => {}} />);
    await user.click(screen.getByText('Submit'));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('submits valid data and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<UncontrolledForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.selectOptions(screen.getByLabelText('Gender'), 'Male');
    await user.type(screen.getByLabelText('Country'), 'USA');
    await user.type(screen.getByLabelText('Password'), 'Pass123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Pass123!');
    await user.click(screen.getByLabelText('Terms and Conditions'));

    await user.click(screen.getByText('Submit'));

    const { submissions } = useFormStore.getState();
    expect(submissions.length).toBeGreaterThan(0);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not submit when validation fails', async () => {
    const user = userEvent.setup();

    render(<UncontrolledForm onClose={() => {}} />);
    await user.click(screen.getByText('Submit'));

    const { submissions } = useFormStore.getState();
    expect(submissions).toHaveLength(0);
  });
});

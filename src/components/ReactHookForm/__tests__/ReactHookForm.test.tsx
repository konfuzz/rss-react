import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactHookForm from '../ReactHookForm';
import { useFormStore } from '../../../store/useFormStore';

beforeEach(() => {
  useFormStore.setState({ submissions: [] });
});

describe('ReactHookForm', () => {
  it('renders all basic fields', () => {
    render(<ReactHookForm onClose={() => {}} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms and Conditions')).toBeInTheDocument();
  });

  it('renders advanced fields', () => {
    render(<ReactHookForm onClose={() => {}} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Image')).toBeInTheDocument();
  });

  it('submit button is disabled when form has errors', () => {
    render(<ReactHookForm onClose={() => {}} />);
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  it('submits valid data and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ReactHookForm onClose={onClose} />);

    await user.type(screen.getByLabelText('Name'), 'Alice');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'alice@example.com');
    await user.selectOptions(screen.getByLabelText('Gender'), 'Female');
    await user.type(screen.getByLabelText('Country'), 'USA');
    await user.type(screen.getByLabelText('Password'), 'Pass123!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Pass123!');
    await user.click(screen.getByLabelText('Terms and Conditions'));

    await user.click(screen.getByText('Submit'));

    const { submissions } = useFormStore.getState();
    expect(submissions.length).toBeGreaterThan(0);
    expect(onClose).toHaveBeenCalled();
  });
});

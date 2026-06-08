import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from '../useFormStore';

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({ submissions: [] });
  });

  it('starts with empty submissions', () => {
    const { submissions } = useFormStore.getState();
    expect(submissions).toEqual([]);
  });

  it('has a list of countries', () => {
    const { countries } = useFormStore.getState();
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
    expect(countries).toContain('USA');
  });

  it('adds a submission', () => {
    const submission = {
      id: '1',
      name: 'John',
      age: 25,
      email: 'john@example.com',
      gender: 'Male',
      terms: true,
      image: '',
      password: '123',
      confirm: '123',
      country: 'USA',
    };

    useFormStore.getState().addSubmission(submission);
    const { submissions } = useFormStore.getState();
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toEqual(submission);
  });

  it('adds multiple submissions', () => {
    const sub1 = { id: '1', name: 'Alice', age: 25, email: 'a@b.c', gender: 'Female', terms: true, image: '', password: '1', confirm: '1', country: 'USA' };
    const sub2 = { id: '2', name: 'Bob', age: 30, email: 'b@c.d', gender: 'Male', terms: true, image: '', password: '2', confirm: '2', country: 'Canada' };

    useFormStore.getState().addSubmission(sub1);
    useFormStore.getState().addSubmission(sub2);
    const { submissions } = useFormStore.getState();
    expect(submissions).toHaveLength(2);
  });
});

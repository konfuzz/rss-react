import { describe, it, expect } from 'vitest';
import { formSchema } from '../validation';

describe('formSchema', () => {
  const validData = {
    name: 'John',
    age: '25',
    email: 'john@example.com',
    gender: 'Male',
    terms: 'on',
    password: 'Pass123!',
    confirm: 'Pass123!',
    country: 'USA',
  };

  it('passes with valid data', () => {
    const result = formSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe('name', () => {
    it('fails when too short', () => {
      const result = formSchema.safeParse({ ...validData, name: 'Jo' });
      expect(result.success).toBe(false);
    });

    it('fails when first letter is not uppercase', () => {
      const result = formSchema.safeParse({ ...validData, name: 'john' });
      expect(result.success).toBe(false);
    });
  });

  describe('age', () => {
    it('fails with negative value', () => {
      const result = formSchema.safeParse({ ...validData, age: '-1' });
      expect(result.success).toBe(false);
    });

    it('passes with zero', () => {
      const result = formSchema.safeParse({ ...validData, age: '0' });
      expect(result.success).toBe(true);
    });
  });

  describe('email', () => {
    it('fails without @', () => {
      const result = formSchema.safeParse({ ...validData, email: 'notanemail' });
      expect(result.success).toBe(false);
    });

    it('fails with empty local part', () => {
      const result = formSchema.safeParse({ ...validData, email: '@example.com' });
      expect(result.success).toBe(false);
    });

    it('fails with domain without dot', () => {
      const result = formSchema.safeParse({ ...validData, email: 'a@b' });
      expect(result.success).toBe(false);
    });
  });

  describe('terms', () => {
    it('fails when not accepted', () => {
      const result = formSchema.safeParse({ ...validData, terms: false });
      expect(result.success).toBe(false);
    });

    it('passes with boolean true', () => {
      const result = formSchema.safeParse({ ...validData, terms: true });
      expect(result.success).toBe(true);
    });
  });

  describe('password match', () => {
    it('fails when passwords do not match', () => {
      const result = formSchema.safeParse({ ...validData, confirm: 'Different!' });
      expect(result.success).toBe(false);
    });
  });

  describe('country', () => {
    it('fails with invalid country', () => {
      const result = formSchema.safeParse({ ...validData, country: 'Atlantis' });
      expect(result.success).toBe(false);
    });
  });
});

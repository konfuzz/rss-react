import { z } from 'zod';
import countries from './countries';

export const formSchema = z.object({
  name: z.string().min(3, 'Name is required').refine(
    (val) => val[0] === val[0]?.toUpperCase(),
    'First letter must be uppercase'
  ),
  age: z.coerce.number().nonnegative('Age must be non-negative'),
  email: z.string().refine((val) => {
    const parts = val.split('@');
    return parts.length === 2
      && parts[0].length > 0
      && parts[1].includes('.');
  }, 'Invalid email'),
  gender: z.string().refine((val) => val, 'Select gender'),
  terms: z.union([z.boolean(), z.literal('on'), z.undefined()]).transform((val) => val === true || val === 'on').refine(
    (val) => val,
    'You must accept terms'
  ),
  image: z.file().max(1_000_000, 'Filesize should be less than 1Mb').mime(["image/png", "image/jpeg"], "Invalid file type").optional(),
  password: z.string().min(1, 'Password is required'),
  confirm: z.string().min(1, 'Confirm password'),
  country: z.string().refine((val) => countries.includes(val), 'Invalid country'),
}).refine((data) => data.password === data.confirm, {
  message: 'Passwords must match',
  path: ['confirm'],
});
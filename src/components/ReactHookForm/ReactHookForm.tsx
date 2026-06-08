import { useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { useForm } from 'react-hook-form';
import { handleImageChange, handlePasswordStrength } from '../../utils/utils';
import { formSchema } from '../../utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './ReactHookForm.css';

export default function ReactHookForm({ onClose }: { onClose: () => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState<string | null>(null);

  const { addSubmission, countries } = useFormStore();

  const { register, handleSubmit, setValue, reset, trigger, formState: { errors, isValid } } = useForm({resolver: zodResolver(formSchema), mode: 'onChange'});

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addSubmission({...data, id: crypto.randomUUID(), image: image ?? ''});
    onClose();
    reset();
    setImage(null);
    setStrength(null);
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>React Hook Form</h2>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input {...register("name")} type="text" id="name" name="name" />
        {errors.name?.message && <span className="error">{errors.name.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="age">Age</label>
        <input {...register("age")} type="number" id="age" name="age" />
        {errors.age?.message && <span className="error">{errors.age.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" id="email" name="email" />
        {errors.email?.message && <span className="error">{errors.email.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="gender">Gender</label>
        <select {...register("gender")} id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender?.message && <span className="error">{errors.gender.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="country">Country</label>
        <input {...register("country")} type="text" id="country" name="country" list="сountries" />
        <datalist id="сountries">
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </datalist>
        {errors.country?.message && <span className="error">{errors.country.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={(e) => {
          const file = e.target.files?.[0];
          setValue('image', file ?? undefined, { shouldValidate: true });
          handleImageChange(e, setImage);
        }} />
        {errors.image?.message && <span className="error">{errors.image.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input {...register("password", {
          onChange: (e) => {
            trigger('confirm');
            handlePasswordStrength(e, setStrength);
          }
        })} type="password" id="password" name="password" />
        {errors.password?.message && <span className="error">{errors.password.message}</span>}
        <div className="strength">{strength}</div>
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input {...register("confirm", { deps: ['password'] })} type="password" id="confirm" name="confirm" />
        {errors.confirm?.message && <span className="error">{errors.confirm.message}</span>}
      </div>
      <div className="field">
        <label htmlFor="terms">Terms and Conditions</label>
        <input {...register("terms")} type="checkbox" id="terms" name="terms" />
        {errors.terms?.message && <span className="error">{errors.terms.message}</span>}
      </div>
      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  )
}
import { useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { useForm } from 'react-hook-form';
import { handleImageChange, handlePasswordStrength } from '../../utils/utils';
import type { FormSubmission } from '../../types/types';

export default function ReactHookForm({ onClose }: { onClose: () => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState<string | null>(null);

  const { addSubmission, countries } = useFormStore();

  const { register, handleSubmit, reset } = useForm<FormSubmission>();

  const onSubmit = (data: FormSubmission) => {
    addSubmission({...data, id: crypto.randomUUID(), image: image ?? ''});
    onClose();
    reset();
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>React Hook Form</h2>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input {...register("name")} type="text" id="name" name="name" />
      </div>
      <div className="field">
        <label htmlFor="age">Age</label>
        <input {...register("age")} type="number" id="age" name="age" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" id="email" name="email" />
      </div>
      <div className="field">
        <label htmlFor="gender">Gender</label>
        <select {...register("gender")} id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="country">Country</label>
        <input {...register("country")} type="text" id="country" name="country" list="сountries" />
        <datalist id="сountries">
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </datalist>
      </div>
      <div className="field">
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={(e) => handleImageChange(e, setImage)} />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" id="password" name="password" onChange={(e) => handlePasswordStrength(e, setStrength)} />
        <div className="strength">{strength}</div>
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input {...register("confirm")} type="password" id="confirm" name="confirm" />
      </div>
      <div className="field">
        <label htmlFor="terms">Terms and Conditions</label>
        <input {...register("terms")} type="checkbox" id="terms" name="terms" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
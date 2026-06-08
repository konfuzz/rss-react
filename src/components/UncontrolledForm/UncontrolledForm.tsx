import { useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { handleImageChange, handlePasswordStrength } from '../../utils/utils';
import { formSchema } from '../../utils/validation';
import './UncontrolledForm.css';

export default function UncontrolledForm({ onClose }: { onClose: () => void }) {
  const { addSubmission, countries } = useFormStore();
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));

    if (!data.success) {
      const fieldErrors: Record<string, string> = {};
      data.error.issues.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    addSubmission({
      id: crypto.randomUUID(),
      name: data.data.name,
      age: data.data.age,
      email: data.data.email,
      gender: data.data.gender,
      terms: data.data.terms,
      image: image ?? '',
      password: data.data.password,
      confirm: data.data.confirm,
      country: data.data.country,
    })

    onClose();
    e.currentTarget.reset();
    setImage(null);
    setStrength(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled form</h2>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="field">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}
      </div>
      <div className="field">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" name="country" list="сountries" />
        <datalist id="сountries">
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </datalist>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>
      <div className="field">
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={(e) => handleImageChange(e, setImage)} />
        {errors.image && <span className="error">{errors.image}</span>}
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e) => handlePasswordStrength(e, setStrength)} />
        <div className="strength">{strength}</div>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" id="confirm" name="confirm" />
        {errors.confirm && <span className="error">{errors.confirm}</span>}
      </div>
      <div className="field">
        <label htmlFor="terms">Terms and Conditions</label>
        <input type="checkbox" id="terms" name="terms" />
        {errors.terms && <span className="error">{errors.terms}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
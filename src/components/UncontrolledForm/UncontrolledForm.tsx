import { useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { handleImageChange, handlePasswordStrength } from '../../utils/utils';

export default function UncontrolledForm({ onClose }: { onClose: () => void }) {
  const { addSubmission, countries } = useFormStore();
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState<string | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    addSubmission({
      id: crypto.randomUUID(),
      name: data.name as string,
      age: Number(data.age),
      email: data.email as string,
      gender: data.gender as string,
      terms: 'terms' in data,
      image: image ?? '',
      password: data.password as string,
      confirm: data.confirm as string,
      country: data.country as string,
    })

    onClose();
    e.currentTarget.reset();
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled form</h2>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="field">
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="field">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" name="country" list="сountries" />
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
        <input type="password" id="password" name="password" onChange={(e) => handlePasswordStrength(e, setStrength)} />
        <div className="strength">{strength}</div>
      </div>
      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" id="confirm" name="confirm" />
      </div>
      <div className="field">
        <label htmlFor="terms">Terms and Conditions</label>
        <input type="checkbox" id="terms" name="terms" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
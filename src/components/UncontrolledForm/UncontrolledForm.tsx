import { useState } from 'react';
import { useFormStore } from '../../store/useFormStore';

export default function UncontrolledForm({ onClose }: { onClose: () => void }) {
  const { addSubmission, countries } = useFormStore();
  const [image, setImage] = useState<string | null>(null);
  const [strength, setStrength] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result as string);
    };
  };

  const handlePasswordStrength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    const checks = {
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;

    switch (score) {
      case 0:
      case 1:
        setStrength('weak');
        break;
      case 2:
        setStrength('simple');
        break;
      case 3:
        setStrength('medium');
        break;
      default:
        setStrength('strong');
        break;
    }

  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    addSubmission({
      id: crypto.randomUUID(),
      name: data.name as string,
      age: Number(data.age),
      email: data.email as string,
      gender: data.gender as string,
      terms: 'terms' in data ? data.terms === "On" : false,
      image: image ?? 'https://placehold.co/200x200/png',
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
        <input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={handleImageChange} />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handlePasswordStrength} />
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
import { useFormStore } from '../../store/useFormStore';

export default function UncontrolledForm({ onClose }: { onClose: () => void }) {
  const { addSubmission } = useFormStore();

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
      image: 'https://placehold.co/200x200/png',
      password: '123456',
      country: 'USA',
    })

    onClose();
    e.currentTarget.reset();
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
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="terms">Terms and Conditions</label>
        <input type="checkbox" id="terms" name="terms" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
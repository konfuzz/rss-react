import { useFormStore } from '../../store/useFormStore';
import { useForm } from 'react-hook-form';
import type { FormSubmission } from '../../types/types';

export default function ReactHookForm({ onClose }: { onClose: () => void }) {
  const { addSubmission } = useFormStore();

  const { register, handleSubmit } = useForm<FormSubmission>();

  const onSubmit = (data: FormSubmission) => {
    addSubmission({...data, id: crypto.randomUUID()});
    onClose();
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
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="terms">Terms and Conditions</label>
        <input {...register("terms")} type="checkbox" id="terms" name="terms" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
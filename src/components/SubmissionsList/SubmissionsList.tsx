import { useFormStore } from '../../store/useFormStore';
import SubmissionItem from '../SubmissionItem/SubmissionItem';

export default function SubmissionsList() {
  const { submissions, addSubmission } = useFormStore();

  const handleAddSubmission = () => {
    addSubmission({
      id: Math.random().toString(),
      name: 'John Doe',
      age: 30,
      email: 'john@example.com',
      gender: 'Male',
      terms: true,
      image: 'https://placehold.co/200x200/png',
      password: '123456',
      country: 'USA',
    });
  };

  return (    
    <div className="submissions-list">
      <button onClick={handleAddSubmission}>Add</button>
      {submissions.map((submission) => (
        <SubmissionItem key={submission.id} {...submission} />
      ))}
    </div>
  );
}
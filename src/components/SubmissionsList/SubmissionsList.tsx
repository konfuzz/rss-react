import { useFormStore } from '../../store/useFormStore';
import SubmissionItem from '../SubmissionItem/SubmissionItem';
import './SubmissionsList.css';

export default function SubmissionsList() {
  const { submissions } = useFormStore();

  return (
    <div className="submissions-list">
      {submissions.map((submission) => (
        <SubmissionItem key={submission.id} {...submission} />
      ))}
    </div>
  );
}
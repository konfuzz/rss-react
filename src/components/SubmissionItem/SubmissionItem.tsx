import type { FormSubmission } from '../../types/types';
import './SubmissionItem.css';

export default function SubmissionItem({name, age, email, gender, image, country}: FormSubmission) {
  return (
    <div className="submission-item">
      {image && <img src={image} alt={name} />}
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Gender: {gender}</p>
      <p>Country: {country}</p>
    </div>
  )
}
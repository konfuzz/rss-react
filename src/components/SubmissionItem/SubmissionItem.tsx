import type { FormSubmission } from '../../types/types';
export default function SubmissionItem({name, age, email, gender, terms, image, password, country}: FormSubmission) {
  return (
    <div className="submission-item">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Gender: {gender}</p>
      <p>Terms: {terms ? 'Yes' : 'No'}</p>
      <p>Password: {password}</p>
      <p>Country: {country}</p>
    </div>
  )
}
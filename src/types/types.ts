export interface FormSubmission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  image: string;
  password: string;
  confirm: string;
  country: string;
}

export interface FormStore {
  submissions: FormSubmission[];
  countries: string[];
  addSubmission: (submission: FormSubmission) => void;
}
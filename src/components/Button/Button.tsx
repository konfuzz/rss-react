import './Button.css';

export default function Button({ onClick, formType, children }: { onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void, formType?: string, children?: React.ReactNode }) {
  return <button onClick={onClick} data-form-type={formType}>{children}</button>
}
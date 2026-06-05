export default function Button({ onClick }: { onClick?: () => void }) {
  return <button onClick={onClick}>Open modal</button>
}
import { ReactNode } from 'react'
import '../index.css'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
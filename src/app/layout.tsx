import type { Metadata } from 'next'
import '../index.css'
import { Header } from '../components/Header'
import ThemeProvider from './theme-provider'


export const metadata: Metadata = {
  title: 'Recipe Search',
  description: 'Search and discover recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <ThemeProvider>
            <Header />
          </ThemeProvider>
            {children}
        </div>
      </body>
    </html>
  )
}
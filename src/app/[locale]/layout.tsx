import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Header } from '../../components/Header'
import ThemeProvider from '../theme-provider'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
              <Header />
            </ThemeProvider>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  )
}
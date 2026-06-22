import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('About')
  return (
    <section className="about">
      <h1>{t('title')}</h1>
      <p>{t('author')} <a href="https://github.com/konfuzz">konfuzz</a></p>
      <a href="https://rs.school" target="_blank" rel="noopener noreferrer">
        RS School React Course
      </a>
    </section>
  )
}
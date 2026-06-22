'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function search(formData: FormData) {
  const query = formData.get('query') as string
  const cookieStore = await cookies()
  cookieStore.set('lastQuery', query, { maxAge: 60 * 60 * 24 * 30 })
  redirect(`/?query=${encodeURIComponent(query)}&page=1`)
}
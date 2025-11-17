import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

  const query = getQuery(event)
  const locale = query.locale || 'uk'

  const queryString = stringify(
    {
      locale,
      depth: 1,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await $fetch(`${payloadUrl}/api/globals/vacancies-main${queryString}`)
    return res || null
  } catch (error) {
    console.error('Error in /api/vacancies/main:', error)

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to fetch vacancies-main',
      data: error?.data || null,
    })
  }
})

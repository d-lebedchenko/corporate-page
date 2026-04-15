import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  if (process.env.IS_NUXT_MOCK === 'true') {
    const query = getQuery(event)
    const locale = query.locale || 'uk'
    return readMockFile(`globals/vacancies-main-${locale}`)
  }
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

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
    
    if (!res || res._status === 'draft') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Vacancies main page is not published',
      })
    }

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

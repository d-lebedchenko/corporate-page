import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.payloadUrl

  const query = getQuery(event);
  const locale = query.locale || 'uk'

  const queryString = stringify(
    {
      locale,
      depth: 1,
      limit: 100,
      sort: '-publishedAt',
      select: {
        slug: true,
        title: true,
        department: true,
        locations: true,
        applyLink: true,
      },
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await $fetch(`${payloadUrl}/api/vacancy-pages${queryString}`)
    return res
  } catch (error) {
    console.error('Error in /api/vacancies/all:', error)

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to fetch vacancy pages',
      data: error?.data || null,
    })
  }
})

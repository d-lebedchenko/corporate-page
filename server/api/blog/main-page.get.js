import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
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
    const res = await $fetch(`${payloadUrl}/api/globals/blog-main-page${queryString}`)
    return res || null
  } catch (error) {
    console.error('Error in /api/blog/main-page:', error)

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to fetch blog-main-page',
      data: error?.data || null,
    })
  }
})

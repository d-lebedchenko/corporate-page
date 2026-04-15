import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  if (process.env.IS_NUXT_MOCK === 'true') {
    const query = getQuery(event)
    const locale = query.locale || 'uk'
    const page = Math.max(parseInt(query.page || '1', 10) || 1, 1)
    return readMockFile(`blog-posts/list-${page}-${locale}`)
  }
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  const query = getQuery(event)
  const locale = query.locale || 'uk'
  const page = Math.max(parseInt(query.page || '1', 10) || 1, 1)

  const queryString = stringify(
    {
      locale,
      depth: 1,
      page,
      limit: 6,
      sort: '-publishedAt',
      select: {
        slug: true,
        title: true,
        description: true,
        image: true,
        categories: true,
        publishedAt: true,
      },
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await $fetch(`${payloadUrl}/api/blog-posts${queryString}`)
    return res
  } catch (error) {
    console.error('Error in /api/blog/posts:', error)

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to fetch blog posts',
      data: error?.data || null,
    })
  }
})

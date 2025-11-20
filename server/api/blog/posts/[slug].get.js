import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  const { slug } = event.context.params || {}
  const query = getQuery(event)
  const locale = query.locale || 'uk'

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error in /api/blog/posts/[slug]: Missing slug parameter',
    })
  }

  const queryString = stringify(
    {
      locale,
      depth: 2,
      limit: 1,
      where: { slug: { equals: slug } },
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await $fetch(`${payloadUrl}/api/blog-posts${queryString}`)
    const doc = res?.docs?.[0]

    if (!doc) {
      throw createError({
        statusCode: 404,
        statusMessage: `Post with slug "${slug}" not found`,
      })
    }

    return doc
  } catch (error) {
    console.error(`Error in /api/blog/posts/${slug}:`, error)

    if (error?.statusCode === 404) {
      throw error
    }

    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || 'Failed to fetch blog post',
      data: error?.data || null,
    })
  }
})

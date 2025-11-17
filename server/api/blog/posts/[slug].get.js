import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

  const { slug } = event.context.params || {}
  const query = getQuery(event)
  const locale = query.locale || 'uk'

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing slug parameter',
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
    const post = res?.docs?.[0]

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: `Post with slug "${slug}" not found`,
      })
    }

    return post
  } catch (error) {
    console.error('Error in /api/blog/posts/[slug]:', error)

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

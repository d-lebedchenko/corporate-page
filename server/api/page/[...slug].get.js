import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  let slugParts = event.context.params.slug

  if (!slugParts) {
    slugParts = []
  } else if (typeof slugParts === 'string') {
    slugParts = [slugParts]
  }
  let fullSlug = slugParts.join('/')

  if (!fullSlug) {
    fullSlug = 'home' 
  }

  const query = getQuery(event)
  const locale = query.locale || 'uk'
  
  let page = null
  let collectionSlug = null
  
  const commonParams = {
    locale,
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: fullSlug,
      },
    },
  }

  const queryString = stringify(commonParams, { addQueryPrefix: true })

  if (fullSlug.startsWith('career')) {
    collectionSlug = 'career-pages'
    const apiPath = `${payloadUrl}/api/${collectionSlug}${queryString}`

    try {
      const res = await $fetch(apiPath)
      page = res?.docs?.[0]
    } catch (error) {
      console.error(`Error fetching ${collectionSlug} for slug "${fullSlug}":`, error)
      if (error?.statusCode && error.statusCode !== 404) {
        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.statusMessage || 'Failed to fetch career page',
          data: error.data || null,
        })
      }
    }
  }

  if (!page) {
    collectionSlug = 'pages'
    const apiPath = `${payloadUrl}/api/${collectionSlug}${queryString}`

    try {
      const res = await $fetch(apiPath)
      page = res?.docs?.[0]
    } catch (error) {
      console.error(`Error fetching ${collectionSlug} for slug "${fullSlug}":`, error)
      if (error?.statusCode && error.statusCode !== 404) {
        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.statusMessage || 'Failed to fetch standard page',
          data: error.data || null,
        })
      }
    }
  }

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: `404 Page with path '${fullSlug}' not found in any collection.`,
    })
  }

  return page
})
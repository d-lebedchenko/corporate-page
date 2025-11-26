import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  const query = getQuery(event)
  const locale = query.locale || 'uk'

  const commonParams = {
    locale,
    depth: 1,
    limit: 1,
    where: {
      slug: {
        equals: 'home',
      },
    },
  }

  const queryString = stringify(commonParams, { addQueryPrefix: true })
  const apiPath = `${payloadUrl}/api/pages${queryString}`

  let page = null

  try {
    const res = await $fetch(apiPath)
    page = res?.docs?.[0]
  } catch (error) {
    console.error(`Error fetching home page (slug 'home'):`, error)

    if (error?.statusCode && error.statusCode !== 404) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || 'Failed to fetch home page',
        data: error.data || null,
      })
    }
  }
  
  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: "404 Home Page (slug 'home') not found.",
    })
  }

  return page
})
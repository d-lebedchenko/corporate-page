import { stringify } from 'qs-esm'

export default defineEventHandler(async (event) => {
  if (process.env.IS_NUXT_MOCK === 'true') {
    const query = getQuery(event)
    const locale = query.locale || 'uk'
    return readMockFile(`globals/footer-${locale}`)
  }
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  const query = getQuery(event)
  const locale = query.locale || 'uk'

  const commonParams = {
    locale,
    depth: 1, 
  }

  const queryString = stringify(commonParams, { addQueryPrefix: true })
  
  const apiPath = `${payloadUrl}/api/globals/footer${queryString}`

  try {
    const res = await $fetch(apiPath)
    
    if (!res) {
       throw createError({
        statusCode: 404,
        statusMessage: "404 Global Footer data not found.",
      })
    }
    
    return res
  } catch (error) {
    console.error(`Error fetching global footer:`, error)

    if (error?.statusCode && error.statusCode !== 404) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || 'Failed to fetch global footer',
        data: error.data || null,
      })
    }
    
    throw createError({
      statusCode: 404,
      statusMessage: "Global Footer data not found or inaccessible.",
    })
  }
})
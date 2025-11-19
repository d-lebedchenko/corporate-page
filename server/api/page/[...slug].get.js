const fetchPayloadPage = async (payloadUrl, collectionSlug, fullSlug, locale) => {
    const apiPath = `${payloadUrl}/api/${collectionSlug}?where[slug][equals]=${fullSlug}&locale=${locale}`

    try {
        const res = await $fetch(apiPath)
        return res?.docs?.length ? res.docs[0] : null
    } catch (e) {
        return null
    }
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

    let slugParts = event.context.params.slug


    if (!slugParts) {
        slugParts = []
    } else if (typeof slugParts === 'string') {
        slugParts = [slugParts]
    }
    const fullSlug = slugParts.join('/')

    if (!fullSlug) {
        throw createError({ statusCode: 404, statusMessage: 'API Slug is empty.' })
    }

    const query = getQuery(event)
    const locale = query.locale || 'uk'

    let page = null;
    
    if (fullSlug.startsWith('career')) {
        page = await fetchPayloadPage(payloadUrl, 'career-pages', fullSlug, locale)
    }

    if (!page) {
        page = await fetchPayloadPage(payloadUrl, 'pages', fullSlug, locale);
    }

    if (!page) {
        throw createError({
            statusCode: 404,
            statusMessage: `404 Page with path '${fullSlug}' not found in any collection.`,
        })
    }

    return page
})

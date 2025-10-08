export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

  const { slug } = event.context.params

  const res = await $fetch(`${payloadUrl}/api/pages?where[slug][equals]=${slug}`)

  if (!res?.docs?.length) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page '${slug}' not found`,
    })
  }

  return res.docs[0]
})

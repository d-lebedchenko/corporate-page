export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  const res = await $fetch(`${payloadUrl}/api/pages?where[slug][equals]=home`)
  return res?.docs?.[0] || null
})

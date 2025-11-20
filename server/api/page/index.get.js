export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.payloadUrl

  const res = await $fetch(`${payloadUrl}/api/pages?where[slug][equals]=home`)
  return res?.docs?.[0] || null
})

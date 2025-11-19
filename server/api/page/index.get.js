export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

  const res = await $fetch(`${payloadUrl}/api/pages?where[slug][equals]=home`)
  return res?.docs?.[0] || null
})

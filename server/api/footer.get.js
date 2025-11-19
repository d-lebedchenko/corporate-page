export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

  // Запит до Payload (global header)
  const res = await $fetch(`${payloadUrl}/api/globals/footer`)
  return res
})

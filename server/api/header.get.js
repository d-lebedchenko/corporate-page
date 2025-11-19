export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

  // Запит до Payload (global header)
  const res = await $fetch(`${payloadUrl}/api/globals/header?depth=1`)
  // console.log('res', res)
  return res
})

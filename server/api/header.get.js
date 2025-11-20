export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const payloadUrl = config.public.payloadUrl

  // Запит до Payload (global header)
  const res = await $fetch(`${payloadUrl}/api/globals/header?depth=1`)
  return res
})

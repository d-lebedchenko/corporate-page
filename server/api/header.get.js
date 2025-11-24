export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const payloadUrl = config.public.payloadUrl

  // Запит до Payload (global header)
  const res = await $fetch(`${payloadUrl}/api/globals/header?depth=1`)
  return res
})

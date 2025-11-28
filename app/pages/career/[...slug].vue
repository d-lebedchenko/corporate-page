<script setup>
const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => {
  const slugArray = route.params.slug || []
  const currentSlug = Array.isArray(slugArray)
    ? slugArray.join('/')
    : slugArray
  return `career/${currentSlug}`
})

const { data: page, error } = await useFetch(() => `/api/page/${slug.value}`, {
  query: { locale: locale.value },
})

watchEffect(() => {
  if (error.value) showError(error.value)
})

usePageSeo(page.value?.meta)
</script>

<template>
  <div class="page">    
    <div v-if="page?.Blocks?.length">
      <RenderBloks :blocks="page.Blocks" />
    </div>
  </div>
</template>

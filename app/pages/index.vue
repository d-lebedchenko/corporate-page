<script setup>
const { locale } = useI18n()

const { data: page, error } = await useFetch('/api/page', {
  query: { locale: locale.value },
})

watchEffect(() => {
  if (error.value) showError(error.value)
})

usePageSeo(page.value?.meta)
</script>

<template>
  <div class="home-page">
    <div v-if="page?.Blocks?.length">
      <RenderBloks :blocks="page.Blocks" />
    </div>
  </div>
</template>

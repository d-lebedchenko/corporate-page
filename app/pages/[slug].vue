<script setup>
const route = useRoute()

const slug = route.params.slug

const { data: page, pending, error } = await useAsyncData(
  `page-${slug}`,
  () => $fetch(`/api/page/${slug}`)
)


const meta = page.value?.meta

const config = useRuntimeConfig()
const fullUrl = computed(() => config.public.baseUrl + route.path)


if (meta) {
  useSeoMeta({
    title: meta.title,
    description: meta.description,

    ogTitle: meta.title,
    ogDescription: meta.description,
    ogUrl: fullUrl.value,
    
    ogImage: meta.image?.url || 'https://placehold.co/1200x630',
    ogImageAlt: meta.image?.alt || meta.title,

    twitterCard: 'summary_large_image',
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterImage: meta.image?.url || 'https://placehold.co/1200x630',
  })
}

if (meta?.title) {
  useHead({
    title: meta.title,
    
    link: [
      { 
        rel: 'canonical', 
        href: fullUrl.value, 
      },
    ]
  })
}

</script>

<template>
  <div class="page">
    <div v-if="pending">Завантаження…</div>
    <div v-else-if="error">Помилка: {{ error.message }}</div>
    <div v-else-if="!page">Сторінку не знайдено</div>
    <div v-else-if="page?.Blocks && page?.Blocks.length">
      <RenderBloks :blocks="page.Blocks" :publishedAt="page.publishedAt" />
    </div>
    <div v-else>Сторінку не знайдено</div>
  </div>
</template>

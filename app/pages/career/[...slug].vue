<script setup>
const route = useRoute()
const { locale } = useI18n()

const slugSegments = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]

const fullSlug = 'career/' + slugSegments.join('/')

const { data: page, pending, error } = await useAsyncData(
  `career-page-${fullSlug}-${locale.value}`,
  
  () => $fetch(`/api/page/${fullSlug}`, {
    query: {
        locale: locale.value, 
    }
  })
)

if (!page.value && !pending.value) {
    throw createError({ statusCode: 404, fatal: true, statusMessage: `Page with path '${fullSlug}' not found.` })
}

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
    
    <div v-else-if="page?.Blocks && page.Blocks.length">
      <RenderBloks :blocks="page.Blocks" />
    </div>
    <div v-else>Сторінку не знайдено</div>
  </div>
</template>

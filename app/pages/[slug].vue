<script setup>
import RenderBloks from '~/components/RenderBloks.vue'

const route = useRoute()

const slug = route.params.slug

const { data: page, pending, error } = await useAsyncData(
  `page-${slug}`,
  () => $fetch(`/api/page/${slug}`)
)
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

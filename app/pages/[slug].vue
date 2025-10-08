<script setup>
import RenderBloks from '~/components/RenderBloks.vue'

// Отримуємо параметр з URL
const route = useRoute()

// slug — це /about, /contacts, /repertoire тощо
const slug = route.params.slug

// Отримуємо дані сторінки через API
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
      <RenderBloks :blocks="page.Blocks" />
    </div>
    <div v-else>Сторінку не знайдено</div>
  </div>
</template>

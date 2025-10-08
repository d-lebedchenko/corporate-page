<script setup>

import RenderBloks from '~/components/RenderBloks.vue'

const { data: page, pending, error } = await useAsyncData('page', () =>
  $fetch('/api/page')
)
</script>

<template>
  <div class="home-page">
    <div v-if="pending">Завантаження…</div>
    <div v-else-if="error">Помилка: {{ error.message }}</div>
    <div v-else-if="page?.Blocks && page?.Blocks.length">
      <RenderBloks :blocks="page.Blocks" />
    </div>
    <div v-else>Сторінку home не знайдено</div>
  </div>
</template>
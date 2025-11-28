<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue'; // Явний імпорт watch

const { locale } = useI18n();

const queryOptions = computed(() => ({
  locale: locale.value
}));

const { data: page, pending, error } = await useAsyncData(
  'home-page',
  () => $fetch('/api/page', {
    query: queryOptions.value,
  }),
  {
    watch: [locale],
    deep: false,
    immediate: true,
  }
);

const meta = computed(() => page.value?.meta);

const route = useRoute()
const config = useRuntimeConfig()
const fullUrl = computed(() => config.public.baseUrl + route.path)


watch(meta, (newMeta) => {
  if (newMeta) {
    useSeoMeta({
      title: newMeta.title,
      description: newMeta.description,

      ogTitle: newMeta.title,
      ogDescription: newMeta.description,
      ogUrl: fullUrl.value,

      ogImage: newMeta.image?.url || 'https://placehold.co/1200x630',
      ogImageAlt: newMeta.image?.alt || newMeta.title,

      twitterCard: 'summary_large_image',
      twitterTitle: newMeta.title,
      twitterDescription: newMeta.description,
      twitterImage: newMeta.image?.url || 'https://placehold.co/1200x630',
    });

    useHead({
      title: newMeta.title,
      link: [
        {
          rel: 'canonical',
          href: fullUrl.value,
        },
      ]
    });
  }
}, { immediate: true });


</script>

<template>
  <div class="home-page">
    <div v-if="page?.Blocks && page?.Blocks.length">
      <RenderBloks :blocks="page.Blocks" />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { computed, watch } from 'vue';

const route = useRoute();
const { locale } = useI18n();

const slugArray = route.params.slug || [];
const currentSlug = computed(() => {
  return Array.isArray(slugArray) ? slugArray.join('/') : slugArray;
});

const asyncKey = computed(() => `page-${currentSlug.value}-${locale.value}`);

const queryOptions = computed(() => ({
  locale: locale.value
}));


const { data: page, pending, error } = await useAsyncData(
  asyncKey.value,
  () => $fetch(`/api/page/${currentSlug.value}`, {
    query: queryOptions.value,
  }),
  {
    watch: [locale],
    immediate: true,
  }
);


const meta = computed(() => page.value?.meta);

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
  <div class="page">
    <div v-if="page?.Blocks && page?.Blocks.length">
      <RenderBloks :blocks="page.Blocks" :publishedAt="page.publishedAt" />
    </div>
  </div>
</template>
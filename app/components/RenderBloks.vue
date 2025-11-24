<script setup>
defineProps({
  blocks: {
    type: Array,
    default: () => [],
  },
  publishedAt: {
    type: String,
    default: '',
  },
})

const FallbackBlock = {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  template: `<div>Unknown block: {{ type }}</div>`,
}

const componentsMap = {
  'main-block': defineAsyncComponent(() => import('./MainBlock.vue')),
  'grid-block': defineAsyncComponent(() => import('./GridBlock.vue')),
  'culture': defineAsyncComponent(() => import('./CultureBlock.vue')),
  'content-image-block': defineAsyncComponent(() => import('./ContentImageBlock.vue')),
  'nolimits-block': defineAsyncComponent(() => import('./NolimitsBlock.vue')),
  'form-block': defineAsyncComponent(() => import('./FormBlock.vue')),
  'mgb': defineAsyncComponent(() => import('./MatricesGridBlock.vue')),
  'breadcrumbs': defineAsyncComponent(() => import('./Breadcrumbs.vue')),
  'matrices-main-block': defineAsyncComponent(() => import('./MatricesMain.vue')),
  'career-main-block': defineAsyncComponent(() => import('./CareerMain.vue')),
  'career-stats': defineAsyncComponent(() => import('./CareerStats.vue')),
  'career-grid': defineAsyncComponent(() => import('./CareerGrid.vue')),
  'career-sticky-slider': defineAsyncComponent(() => import('./CareerStickySlider.vue')),
  'about-main-block': defineAsyncComponent(() => import('./AboutMainBlock.vue')),
  'about-quote-block': defineAsyncComponent(() => import('./AboutQuoteBlock.vue')),
  'about-feature-block': defineAsyncComponent(() => import('./AboutFeatureBlock.vue')),
  'about-tracks-block': defineAsyncComponent(() => import('./AboutTracksBlock.vue')),
  'growth-main-block': defineAsyncComponent(() => import('./GrowthMainBlock.vue')),
  'growth-stories-block': defineAsyncComponent(() => import('./GrowthStoriesBlock.vue')),
  'post-content-block': defineAsyncComponent(() => import('./PostContentBlock.vue')),
  'related-posts-block': defineAsyncComponent(() => import('./RelatedPostsBlock.vue')),
  'framework-main-block': defineAsyncComponent(() => import('./FrameworkMainBlock.vue')),
  'framework-why-block': defineAsyncComponent(() => import('./FrameworkWhyBlock.vue')),
  'framework-content-block': defineAsyncComponent(() => import('./FrameworkContentBlock.vue')),
  'framework-tracks-block': defineAsyncComponent(() => import('./FrameworkTracksBlock.vue')),
  'framework-nav-block': defineAsyncComponent(() => import('./FrameworkNavBlock.vue')),
  'privacy-block': defineAsyncComponent(() => import('./PrivacyBlock.vue')),
}

function getComponent(type) {
  return componentsMap[type] || FallbackBlock
}
</script>

<template>
  <div>
    <component
      v-for="(block, i) in blocks"
      :key="block?.id || `unknown-${i}`"
      :is="getComponent(block.blockType)"
      v-bind="block"
      :publishedAt="publishedAt"
    />
  </div>
</template>

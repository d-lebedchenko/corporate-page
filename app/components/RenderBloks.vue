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
  'main-block': resolveComponent('LazyMainBlock'),
  'grid-block': resolveComponent('LazyGridBlock'),
  'culture': resolveComponent('LazyCultureBlock'),
  'content-image-block': resolveComponent('LazyContentImageBlock'),
  'nolimits-block': resolveComponent('LazyNolimitsBlock'),
  'form-block': resolveComponent('LazyFormBlock'),
  'mgb': resolveComponent('LazyMatricesGridBlock'),
  'breadcrumbs': resolveComponent('LazyBreadcrumbs'),
  'matrices-main-block': resolveComponent('LazyMatricesMain'),
  'career-main-block': resolveComponent('LazyCareerMain'),
  'career-stats': resolveComponent('LazyCareerStats'),
  'career-grid': resolveComponent('LazyCareerGrid'),
  'career-sticky-slider': resolveComponent('LazyCareerStickySlider'),
  'about-main-block': resolveComponent('LazyAboutMainBlock'),
  'about-quote-block': resolveComponent('LazyAboutQuoteBlock'),
  'about-feature-block': resolveComponent('LazyAboutFeatureBlock'),
  'about-tracks-block': resolveComponent('LazyAboutTracksBlock'),
  'growth-main-block': resolveComponent('LazyGrowthMainBlock'),
  'growth-stories-block': resolveComponent('LazyGrowthStoriesBlock'),
  'post-content-block': resolveComponent('LazyPostContentBlock'),
  'related-posts-block': resolveComponent('LazyRelatedPostsBlock'),
  'framework-main-block': resolveComponent('LazyFrameworkMainBlock'),
  'framework-why-block': resolveComponent('LazyFrameworkWhyBlock'),
  'framework-content-block': resolveComponent('LazyFrameworkContentBlock'),
  'framework-tracks-block': resolveComponent('LazyFrameworkTracksBlock'),
  'framework-nav-block': resolveComponent('LazyFrameworkNavBlock'),
  'privacy-block': resolveComponent('LazyPrivacyBlock'),
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

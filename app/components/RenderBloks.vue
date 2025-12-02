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
  'main-block': resolveComponent('MainBlock'),
  'grid-block': resolveComponent('GridBlock'),
  'culture': resolveComponent('CultureBlock'),
  'content-image-block': resolveComponent('ContentImageBlock'),
  'nolimits-block': resolveComponent('NolimitsBlock'),
  'form-block': resolveComponent('FormBlock'),
  'mgb': resolveComponent('MatricesGridBlock'),
  'breadcrumbs': resolveComponent('Breadcrumbs'),
  'matrices-main-block': resolveComponent('MatricesMain'),
  'career-main-block': resolveComponent('CareerMain'),
  'career-stats': resolveComponent('CareerStats'),
  'career-grid': resolveComponent('CareerGrid'),
  'career-sticky-slider': resolveComponent('CareerStickySlider'),
  'about-main-block': resolveComponent('AboutMainBlock'),
  'about-quote-block': resolveComponent('AboutQuoteBlock'),
  'about-feature-block': resolveComponent('AboutFeatureBlock'),
  'about-tracks-block': resolveComponent('AboutTracksBlock'),
  'growth-main-block': resolveComponent('GrowthMainBlock'),
  'growth-stories-block': resolveComponent('GrowthStoriesBlock'),
  'post-content-block': resolveComponent('PostContentBlock'),
  'related-posts-block': resolveComponent('RelatedPostsBlock'),
  'framework-main-block': resolveComponent('FrameworkMainBlock'),
  'framework-why-block': resolveComponent('FrameworkWhyBlock'),
  'framework-content-block': resolveComponent('FrameworkContentBlock'),
  'framework-tracks-block': resolveComponent('FrameworkTracksBlock'),
  'framework-nav-block': resolveComponent('FrameworkNavBlock'),
  'privacy-block': resolveComponent('PrivacyBlock'),
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

<script setup>
import MainBlock from './MainBlock.vue'
import GridBlock from './GridBlock.vue'
import CultureBlock from './CultureBlock.vue'
import ContentImageBlock from './ContentImageBlock.vue'
import NolimitsBlock from './NolimitsBlock.vue'
import FormBlock from './FormBlock.vue'
import MatricesGridBlock from './MatricesGridBlock.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import MatricesMain from './MatricesMain.vue'
import CareerMain from './CareerMain.vue'
import CareerStats from './CareerStats.vue'
import CareerGrid from './CareerGrid.vue'
import CareerStickySlider from './CareerStickySlider.vue'
import AboutMainBlock from './AboutMainBlock.vue'
import AboutQuoteBlock from './AboutQuoteBlock.vue'
import AboutFeatureBlock from './AboutFeatureBlock.vue'
import AboutTracksBlock from './AboutTracksBlock.vue'

import { ClientOnly } from '#components'

defineProps({
  blocks: {
    type: Array,
    default: () => []
  }
})

function getComponent(type) {
  switch (type) {
    case 'main-block':
      return MainBlock
    case 'grid-block':
      return GridBlock
    case 'culture':
      return CultureBlock
    case 'content-image-block':
      return ContentImageBlock
    case 'nolimits-block':
      return NolimitsBlock
    case 'form-block':
      return FormBlock
    case 'mgb':
      return MatricesGridBlock
    case 'breadcrumbs':
      return Breadcrumbs
    case 'matrices-main-block':
      return MatricesMain
    case 'career-main-block':
      return CareerMain
    case 'career-stats':
      return CareerStats
    case 'career-grid':
      return CareerGrid
    case 'career-sticky-slider':
      return CareerStickySlider
    case 'about-main-block':
      return AboutMainBlock
    case 'about-quote-block':
      return AboutQuoteBlock
    case 'about-feature-block':
      return AboutFeatureBlock
    case 'about-tracks-block':
      return AboutTracksBlock
    default:
      return {
        props: ['type'],
        template: `<div>Unknown block: {{ type }}</div>`
      }
  }
}
</script>

<template>
  <div>
    <template v-for="(block, i) in blocks" :key="i">
      <!-- <ClientOnly v-if="block.blockType === 'mgb'">
        <component :is="getComponent(block.blockType)" v-bind="block" />
      </ClientOnly> -->

      <component :is="getComponent(block.blockType)" v-bind="block" />
    </template>
  </div>
</template>
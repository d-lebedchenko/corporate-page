<script setup>
import MainBlock from './MainBlock.vue'
import GridBlock from './GridBlock.vue'
import CultureBlock from './CultureBlock.vue'
import GrowBlock from './GrowBlock.vue'
import NolimitsBlock from './NolimitsBlock.vue'
import FormBlock from './FormBlock.vue'
import MatricesGridBlock from './MatricesGridBlock.vue'
import Breadcrumbs from './Breadcrumbs.vue'
import MatricesMain from './MatricesMain.vue'

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
    case 'grow-block':
      return GrowBlock
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
      
      <ClientOnly v-if="block.blockType === 'mgb'">
        <component :is="getComponent(block.blockType)" v-bind="block" />
        
        <template #fallback>
          <div class="matrices-block-placeholder">Завантаження інтерактивного контенту...</div>
        </template>
      </ClientOnly>

      <component v-else :is="getComponent(block.blockType)" v-bind="block" />
    </template>
  </div>
</template>
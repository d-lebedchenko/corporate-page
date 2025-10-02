<script setup>
import MainBlock from './MainBlock.vue'
import GridBlock from './GridBlock.vue'
import CultureBlock from './CultureBlock.vue'
import GrowBlock from './GrowBlock.vue'
import NolimitsBlock from './NolimitsBlock.vue'
import FormBlock from './FormBlock.vue'

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
    <component v-for="(block, i) in blocks" :is="getComponent(block.blockType)" :key="i" v-bind="block" />
  </div>
</template>

<script setup>
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'



const props = defineProps({
  content: {
    type: Object,
    default: () => null
  }
})

const htmlContent = computed(() => {
  if (!props.content) return ''
  // console.log('data', convertLexicalToHTML({ data: props.content, disableContainer: true }))
  return convertLexicalToHTML({ data: props.content, disableContainer: true })
})
</script>

<template>
  <div class="richtext" v-html="htmlContent"></div>
</template>

<style scoped>
/* .richtext p {
  margin-bottom: 1em;
}
.richtext ul {
  padding-left: 1.2em;
  list-style: disc;
} */
</style>

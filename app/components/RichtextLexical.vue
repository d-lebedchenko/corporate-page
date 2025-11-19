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
  return convertLexicalToHTML({ data: props.content, disableContainer: true })
})
</script>

<template>
  <div class="richtext" v-html="htmlContent"></div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
/* .richtext p {
  margin-bottom: 1em;
}
.richtext ul {
  padding-left: 1.2em;
  list-style: disc;
} */

.richtext {
  :deep(h2) {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 40px;
    line-height: 1.25;
    letter-spacing: 0;
    text-transform: uppercase;
    @include respond("tab") {
      font-size: 24px;
    }
  }

  :deep(h3) {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.25;
    letter-spacing: 0;
    text-transform: uppercase;
    @include respond("tab") {
      font-size: 18px;
    }
  }
}
</style>

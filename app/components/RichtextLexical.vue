<script setup>
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

const props = defineProps({
  content: {
    type: Object,
    default: () => null
  }
})

const htmlContent = computed(() => {
  if (!props.content || !props.content.root || !props.content.root.children.length) {
    return ''
  }

  try {
    const html = convertLexicalToHTML({ data: props.content, disableContainer: true })

    const stripped = html.replace(/<[^>]*>/g, '').trim()
    return stripped.length > 0 || html.includes('<img') || html.includes('<iframe') ? html : ''
  } catch (e) {
    console.error('Lexical conversion error:', e)
    return ''
  }
})
const hasContent = computed(() => htmlContent.value !== '')
</script>

<template>
  <div v-if="hasContent" class="richtext" v-html="htmlContent"></div>
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
  :deep(h1) {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 60px;
    line-height: 125%;
    letter-spacing: 0;
    text-transform: uppercase;

    @include respond("tab") {
      font-size: 32px;
    }
  }

  :deep(h2) {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 40px;
    line-height: 125%;
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
    line-height: 125%;
    letter-spacing: 0;
    text-transform: uppercase;

    @include respond("tab") {
      font-size: 18px;
    }
  }
}
</style>

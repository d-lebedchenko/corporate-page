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
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
    font-size: 40px;
    line-height: 125%;
    letter-spacing: 0;
    text-transform: uppercase;
    @include respond("tab") {
      font-size: 24px;
    }

    &:not(:last-child) {
      margin-bottom: 52px;
      @include respond("tab") {
        margin-bottom: 36px;
      }
    }
  }

  :deep(h3) {
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-size: 24px;
    line-height: 125%;
    letter-spacing: 0;
    text-transform: uppercase;
    @include respond("tab") {
      font-size: 18px;
    }

    &:not(:first-child) {
      margin-top: 40px;
      @include respond("tab") {
        margin-top: 32px;
      }
    }

    &:not(:last-child) {
      margin-bottom: 32px;
      @include respond("tab") {
        margin-bottom: 20px;
      }
    }
  }
}
</style>

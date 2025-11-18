<script setup>
import { useElementVisibility } from '@vueuse/core'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
})

const target = ref(null)
const visible = useElementVisibility(target, { once: true })

const isVisible = ref(false)
watch(visible, (v) => { if (v) isVisible.value = true }, { immediate: true })
</script>

<template>
  <RichtextLexical
    ref="target"
    :class="[
      'vacancy-content-section f-p2',
      { 'is-visible': isVisible }
    ]"
    :content="content"
  />
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.vacancy-content-section {
  transition: transform 0.5s ease-in-out;
  @include respond("tab") {
    font-size: 14px;
  }

  :deep(p),
  :deep(ul),
  :deep(ol),
  :deep(li) {
    margin: 1em 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(li) {
    @include respond("tab") {
      margin: 12px 0;
    }
  }

  &:not(.is-visible) {
    transform: translateY(100px);
  }
}
</style>
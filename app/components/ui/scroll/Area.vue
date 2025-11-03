<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ScrollBarTheme } from "./type"
import { reactiveOmit } from "@vueuse/core"
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "reka-ui"
import UiScrollBar from "./Bar.vue"

type Props = ScrollAreaRootProps & {
  class?: HTMLAttributes["class"]
  theme?: ScrollBarTheme
}

const props = defineProps<Props>()

const delegatedProps = reactiveOmit(props, "class", "theme")
</script>

<template>
  <ScrollAreaRoot
    v-bind="delegatedProps"
    :class="['ui-scroll-area', props.class]"
  >
    <ScrollAreaViewport class="ui-scroll-area__viewport">
      <slot />
    </ScrollAreaViewport>
    <UiScrollBar :theme="theme" orientation="horizontal" />
    <UiScrollBar :theme="theme" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<style lang="scss">
.ui-scroll-area {
  position: relative;
  overflow: hidden;

  &__viewport {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
}
</style>

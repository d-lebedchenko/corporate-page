<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ScrollBarTheme } from "./type"
import { reactiveOmit } from "@vueuse/core"
import { ScrollAreaScrollbar, ScrollAreaThumb } from "reka-ui"

type Props = ScrollAreaScrollbarProps & {
  class?: HTMLAttributes["class"],
  theme?: ScrollBarTheme
}

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
  theme: "default"
})

const delegatedProps = reactiveOmit(props, "class", "theme")
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="[
      'ui-scroll-bar',
      {
        'ui-scroll-bar--v': orientation === 'vertical',
        'ui-scroll-bar--h': orientation === 'horizontal',
      },
      props.class,
    ]"
  >
    <ScrollAreaThumb
      :class="[
        'ui-scroll-bar__thumb',
        theme !== 'default' && `ui-scroll-bar__thumb--${theme}`,
      ]"
    />
  </ScrollAreaScrollbar>
</template>

<style lang="scss">
@use "@/assets/scss/media" as *;

.ui-scroll-bar {
  display: flex;
  touch-action: none;
  user-select: none;
  padding: 4px;

  &--v {
    width: 16px;
    height: 100%;
    @include respond("tab") {
      width: 12px;
    }
  }
  &--h {
    height: 16px;
    flex-direction: column;
    @include respond("tab") {
      height: 12px;
    }
  }

  &__thumb {
    position: relative;
    flex: 1;
    border-radius: 8px;
    background-color: $c-steel-grey;

    &--green {
      background-color: $c-green;
    }
  }
}
</style>

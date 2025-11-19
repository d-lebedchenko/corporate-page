<script setup>
import { useWindowSize, useElementVisibility } from '@vueuse/core'

defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const { width } = useWindowSize()
const isDesktop = computed(() => width.value > 1024)

const lottieRef = ref(null)
const visible = useElementVisibility(lottieRef, { once: true })

const isVisible = ref(false)
watch(visible, (v) => { if (v) isVisible.value = true }, { immediate: true })
</script>

<template>
  <div class="framework-tracks-block">
    <div class="container">
      <h2
        v-if="title"
        class="framework-tracks-block__title f-h2"
      >
        {{ title }}
      </h2>

      <div class="framework-tracks-block__anim">
        <div class="framework-tracks-block__anim-ratio">
          <div class="framework-tracks-block__anim-content">
            <Lottie
              ref="lottieRef"
              :name="`framework-tracks/${isDesktop ? 'desktop' : 'mobile'}`"
              :loop="false"
              :autoplay="isVisible"
            />
          </div>
        </div>
      </div>

      <div
        v-if="items?.length"
        class="framework-tracks-block__list"
      >
        <div
          v-for="item in items"
          class="framework-tracks-block__item dots"
          :key="item.id"
        >
          <div class="psevdo" />
          <div class="framework-tracks-block__item-head dots">
            <div class="psevdo" />
            <h3 class="framework-tracks-block__item-title f-h3">
              {{ item.title }}
            </h3>
          </div>
          <p class="framework-tracks-block__item-descr f-p3 whitespace-pre-line">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.framework-tracks-block {
  background-color: $c-black;
  color: $c-white;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__title {
    margin-bottom: 48px;
    text-transform: uppercase;
    @include respond("tab") {
      margin-bottom: 32px;
    }
  }

  &__anim {
    @include respond("tab") {
      max-width: 345px;
      margin-left: auto;
      margin-right: auto;
    }

    &-ratio {
      position: relative;
      width: 100%;
      padding-bottom: calc(448px / 1440px) * 100%;
      @include respond("tab") {
        padding-bottom: calc(534px / 345px) * 100%;
      }
    }

    &-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__list {
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    @include respond("tab") {
      margin-top: 32px;
      display: block;
    }
  }

  &__item {
    flex: 0 0 50%;
    @include respond("tab") {
      padding: 24px 16px;
    }

    &-head,
    &-descr {
      padding: 24px 32px;
      @include respond("tab") {
        padding: 0;
      }
    }

    &-head {
      @include respond("tab") {
        margin-bottom: 20px;
        outline: none;
        .psevdo,
        &:before,
        &:after {
          display: none;
        }
      }
    }

    &-title {
      text-transform: uppercase;
    }
  }
}
</style>

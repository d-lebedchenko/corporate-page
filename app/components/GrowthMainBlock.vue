<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  },
})

const {
  containerRef,
  isVisible
} = useTextAnimation()

const titleFirst = computed(() => {
  if (!props.title || typeof props.title !== 'string') return ''
  return props.title.trim().split(' ')[0]
})

const titleRest = computed(() => {
  if (!props.title || typeof props.title !== 'string') return ''
  return props.title.trim().split(' ').slice(1).join(' ')
})

const descrLetters = computed(() => {
  if (!props.description || typeof props.description !== 'string') return []
  return props.description.trim().split('').map(char => (char === '\n' ? '\n' : char))
})
</script>

<template>
  <div class="growth-main-block">
    <div class="container">
      <div class="growth-main-block__inner">
        <NuxtPicture
          v-if="image?.url"
          class="growth-main-block__img"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:692px"
        />

        <div class="growth-main-block__text">
          <h1
            v-if="title"
            class="growth-main-block__title f-a2"
          >
            <span class="first">{{ titleFirst }}</span> <span class="rest">{{ titleRest }}</span>
          </h1>

          <p
            v-if="description"
            ref="containerRef"
            :class="[
              'growth-main-block__descr f-p1 whitespace-pre-line',
              { 'is-visible': isVisible }
            ]"
          >
            <span
              v-for="(letter, i) in descrLetters"
              :key="i"
              class="animated-letter"
              :style="{ 'animation-delay': `${i * 0.015}s` }"
            >
              {{ letter }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.growth-main-block {
  background-color: $c-black;
  color: $c-white;
  padding-top: 60px;
  padding-bottom: 70px;
  overflow: hidden;
  @include respond("tab") {
    padding-top: 32px;
    padding-bottom: 40px;
  }

  &__inner {
    display: flex;
    gap: 30px;
    @include respond("tab") {
      display: block;
    }
  }

  &__img {
    display: block;
    flex: 1 1 692px;
    position: relative;
    @include respond("tab") {
      height: 307px;
    }
    @include respond("mob-sm") {
      height: 263px;
    }

    &:deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      @include respond("tab") {
        position: static;
      }
    }
  }

  &__text {
    flex: 1 1 663px;
  }

  &__title {
    text-transform: uppercase;
    position: relative;
    padding-top: 70px;
    color: $c-green;
    @include respond("tab") {
      padding-top: 0;
      margin-top: -48px;
    }
    @include respond("mob") {
      margin-top: -52px;
    }
    @include respond("mob-sm") {
      margin-top: -44px;
      line-height: 110%;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
      @include respond("tab") {
        margin-bottom: 16px;
      }
    }

    .first {
      display: inline-block;
      max-width: 100%;
      position: absolute;
      top: -18px;
      right: 100%;
      color: $c-white;
      @include respond("tab") {
        display: inline;
        position: static;
      }
    }

    .rest {
      @include respond("mob") {
        display: block;
        padding-left: 119px;
        margin-top: -27px;
      }
      @include respond("mob-sm") {
        display: inline;
        padding-left: 0;
        margin-top: 0;
      }
    }
  }

  &__descr {
    font-weight: 600;
    text-transform: uppercase;
    color: $c-grey;

    &.is-visible {
      .animated-letter {
        display: inline;
        animation: colorChange 0.5s linear forwards;
      }
    }
  }
}

@keyframes colorChange {
  100% { color: $c-white; }
}
</style>

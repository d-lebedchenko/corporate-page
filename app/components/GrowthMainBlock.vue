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

const descrLetters = computed(() => {
  if (!props.description || typeof props.description !== 'string') return []
  return props.description.trim().split('').map(char => (char === '\n' ? '\n' : char))
})
</script>

<template>
  <div class="growth-main-block">
    <div class="container">
      <h1
        v-if="title"
        class="growth-main-block__title f-hero-title"
      >
        {{ title }}
      </h1>

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

  &__title {
    color: $c-white;
    text-transform: uppercase;
    margin-bottom: 34px;

    @include respond("tab") {
      margin-bottom: 24px;
    }

    @include respond("mob") {
      margin-bottom: 16px;
    }
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
    height: 376px;
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

  &__descr {
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

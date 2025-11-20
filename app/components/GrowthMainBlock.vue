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

const config = useRuntimeConfig()
const payloadUrl = config.public.payloadUrl

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
        <div class="growth-main-block__img">
          <img
            v-if="image?.url"
            :src="`${payloadUrl}${image.url}`"
            :alt="image?.alt"
            :width="image.width"
            :height="image.height"
          >
        </div>

        <div class="growth-main-block__text">
          <h1
            v-if="title"
            class="growth-main-block__title f-a3"
          >
            <span class="first">{{ titleFirst }}</span>
            {{ titleRest }}
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
              :style="{ 'animation-delay': `${i * 0.03}s` }"
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
    flex: 1 1 692px;
    @include respond("tab") {
      height: 307px;
    }
    @include respond("mob-sm") {
      height: 263px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      font-size: 48px;
      padding-top: 0;
      margin-top: -48px;
    }
    @include respond("mob") {
      margin-top: -20px;
    }
    @include respond("mob-sm") {
      margin-top: -42px;
      line-height: 1.1;
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
      left: -261px;
      color: $c-white;
      @include respond("tab") {
        position: static;
      }
      @include respond("mob") {
        transform: translateY(-32px);
      }
      @include respond("mob-sm") {
        transform: none;
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

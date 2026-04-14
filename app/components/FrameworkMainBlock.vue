<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: Object,
    default: () => ({})
  },
})

const titleFirst = computed(() => {
  if (!props.title || typeof props.title !== 'string') return ''
  return props.title.trim().split(' ').slice(0, 2).join(' ')
})

const titleRest = computed(() => {
  if (!props.title || typeof props.title !== 'string') return ''
  return props.title.trim().split(' ').slice(2).join(' ')
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
  <div class="framework-main-block">
    <div class="container">
      <h1
        v-if="title"
        class="framework-main-block__title f-hero-title"
      >
        {{ titleFirst }}
        <span v-if="titleRest" class="framework-main-block__title-green f-h2 green">{{ titleRest }}</span>
      </h1>

      <div class="framework-main-block__wr">
        <NuxtPicture
          v-if="image?.url"
          class="framework-main-block__left"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:516px"
        />

        <div class="framework-main-block__right">
          <p
            v-if="description"
            ref="containerRef"
            :class="[
              'framework-main-block__descr f-p1 whitespace-pre-line',
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

.framework-main-block {
  background-color: $c-black;
  color: $c-white;
  padding: 60px 0 70px;
  overflow: hidden;

  @include respond("tab") {
    padding: 32px 0 40px;
  }

  &__title {
    text-transform: uppercase;
    margin-bottom: 34px;

    @include respond("tab") {
      margin-bottom: 24px;
    }

    @include respond("mob") {
      margin-bottom: 16px;
    }
  }

  &__title-green {
    display: block;
    color: $c-green;
  }

  &__wr {
    display: flex;
    gap: 25px;

    @include respond("tab") {
      display: block;
    }
  }

  &__left {
    display: block;
    flex: 0 0 50%;

    @include respond("tab") {
      margin-bottom: 20px;
    }

    &:deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;

      @include respond("tab") {
        height: 300px;
      }

      @include respond("mob") {
        height: auto;
        aspect-ratio: 345 / 307;
      }
    }
  }

  &__right {
    flex: 1;

    @include respond("tab") {
      padding-top: 0;
    }
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

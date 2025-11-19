<script setup>
const props = defineProps({
  sectionTitle: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  },
  quote: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
})

const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const {
  containerRef,
  isVisible
} = useTextAnimation()

const quoteLetters = computed(() => {
  if (!props.quote || typeof props.quote !== 'string') return []
  return props.quote.trim().split('').map(char => (char === '\n' ? '\n' : char))
})
</script>

<template>
  <div class="about-quote-block">
    <h2
      v-if="sectionTitle"
      class="about-quote-block__title container f-h1"
    >
      {{ sectionTitle }}
    </h2>

    <div class="container">
      <div class="about-quote-block__inner">
        <div class="about-quote-block__image">
          <img
            v-if="image?.url"
            :src="`${payloadUrl}${image.url}`"
            :alt="image?.alt"
            :width="image.width"
            :height="image.height"
          >
        </div>

        <div class="about-quote-block__text">
          <p
            v-if="quote"
            ref="containerRef"
            :class="[
              'about-quote-block__quote f-p2 whitespace-pre-line',
              { 'is-visible': isVisible }
            ]"
          >
            <span
              v-for="(letter, i) in quoteLetters"
              :key="i"
              class="animated-letter"
              :style="{ 'animation-delay': `${i * 0.03}s` }"
            >
              {{ letter }}
            </span>
          </p>

          <div v-if="name || position" class="about-quote-block__info">
            <p v-if="name" class="about-quote-block__info-name f-h3">
              {{ name }}
            </p>
            <p v-if="position" class="f-p2">
              {{ position }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.about-quote-block {
  background-color: $c-black;
  color: $c-white;
  
  &__title {
    text-transform: uppercase;
    padding-top: 20px;
    margin-bottom: 36px;
    @include respond("tab") {
      padding-top: 16px;
      margin-bottom: 0;
    }
  }

  &__inner {
    display: flex;
    gap: 80px;
    padding: 20px 0;
    border-bottom: 1px solid $c-steel-grey;
    @include respond("tab") {
      gap: 40px;
      padding: 16px 0;
    }
    @include respond("mob") {
      display: block;
    }
  }

  &__image {
    flex: 1 1 612px;
    height: 400px;
    @include respond("tab") {
      flex-basis: 317px;
      height: 354px;
    }
    @include respond("mob") {
      height: 200px;
      margin-bottom: 16px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    flex: 1 1 692px;
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    @include respond("tab") {
      flex-basis: 357px;
      padding: 20px 0;
    }
    @include respond("mob") {
      padding: 0;
    }
  }

  &__quote {
    color: $c-grey;
    max-width: 600px;
    &:not(:last-child) {
      margin-bottom: 32px;
      @include respond("mob") {
        margin-bottom: 16px;
      }
    }

    @include respond("tab") {
      font-size: 14px;
    }

    &.is-visible {
      .animated-letter {
        display: inline;
        animation: colorChange 0.5s linear forwards;
      }
    }
  }

  &__info {
    margin-top: auto;
    @include respond("tab") {
      padding: 16px 0;
    }

    &-name {
      text-transform: uppercase;
      &:not(:last-child) {
        margin-bottom: 12px;
        @include respond("tab") {
          margin-bottom: 8px;
        }
      }
    }
  }
}

@keyframes colorChange {
  100% { color: $c-white; }
}
</style>

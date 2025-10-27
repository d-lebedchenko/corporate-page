<script setup>
import RichtextLexical from './RichtextLexical'

const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  marquee: {
    type: Array,
    default: () => []
  },
  text: {
    type: Object,
    default: () => ({})
  },
  image: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <div class="hero-about-us">
    <div class="container">
      <div class="hero-about-us__inner">
        <div class="hero-about-us__image">
          <img
            v-if="image?.url"
            :src="`${payloadUrl}${image.url}`"
            :alt="image?.alt"
            :width="image.width"
            :height="image.height"
          >
        </div>

        <div class="hero-about-us__text">
          <div class="hero-about-us__text-head">
            <h1 class="hero-about-us__title f-a2">{{ title }}</h1>
            
            <div v-if="marquee?.length" class="hero-about-us__marquee f-sh1">
              <NuxtMarquee autoFill>
                <span v-for="item in marquee" :key="item.id">
                  {{ item.label }}
                </span>
              </NuxtMarquee>
            </div>
          </div>

          <RichtextLexical
            v-if="text"
            :content="text"
            class="hero-about-us__richtext f-p2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.hero-about-us {
  background-color: $c-black;
  color: $c-white;
  padding-top: 28px;
  padding-bottom: 140px;
  @include respond("tab") {
    padding-top: 15px;
    padding-bottom: 80px;
  }

  &__inner {
    display: flex;
    flex-direction: row-reverse;
    gap: 32px;
    @include respond("tab") {
      display: block;
    }
  }

  &__image {
    flex: 1;
    height: 600px;
    @include respond("tab") {
      width: 100%;
      height: 316px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    flex-basis: 662px;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include respond("tab") {
      margin-top: -36px;
    }

    &-head {
      margin-bottom: 12px;
      @include respond("tab") {
        margin-bottom: 32px;
      }
    }
  }

  &__title {
    margin-bottom: 12px;
    text-transform: uppercase;
    @include respond("tab") {
      font-size: 64px;
    }
  }

  &__marquee {
    @include respond("tab") {
      font-size: 20px;
      font-weight: 600;
    }
    span {
      display: block;
      text-transform: uppercase;

      &:after {
        display: inline-block;
        content: "•";
        margin-left: 12px;
        margin-right: 12px;
        color: $c-green;
      }
    }
  }

  &__richtext {
    :deep(p) {
      &:not(:last-child) {
        margin-bottom: 1.3em;
      }
    }
  }
}
</style>
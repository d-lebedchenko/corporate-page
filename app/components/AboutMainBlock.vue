<script setup>
defineProps({
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
  },
})

const { containerRef, isVisible } = useTextAnimation()
</script>

<template>
  <div class="about-main-block">
    <div class="container">
      <div class="about-main-block__inner">
        <NuxtPicture
          v-if="image?.url"
          class="about-main-block__image"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:694px"
        />

        <div class="about-main-block__text">
          <div class="about-main-block__text-head">
            <h1
              v-if="title"
              class="about-main-block__title f-hero-title"
            >
              {{ title }}
            </h1>
            
            <div
              v-if="marquee?.length"
              class="about-main-block__marquee f-h3"
            >
              <NuxtMarquee autoFill>
                <span v-for="item in marquee" :key="item.id">
                  {{ item.label }}
                </span>
              </NuxtMarquee>
            </div>
          </div>

          <RichtextLexical
            v-if="text"
            ref="containerRef"
            :content="text"
            :class="['about-main-block__richtext f-p1', { 'is-visible': isVisible }]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.about-main-block {
  background-color: $c-black;
  color: $c-white;
  padding-top: 28px;
  padding-bottom: 120px;
  @include respond("tab") {
    padding-top: 15px;
    padding-bottom: 64px;
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
    display: block;
    flex-basis: 694px;
    height: 740px;
    @include respond("tab") {
      width: 100%;
      height: 316px;
    }

    &:deep(img) {
      display: block;
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
    position: relative;
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
  }

  &__marquee {
    color: $c-green;
    @include respond("tab") {
      font-size: 20px;
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
    color: $c-grey;
    transition: color 0.6s ease;

    &.is-visible {
      color: $c-white;
    }

    :deep(p) {
      &:not(:last-child) {
        margin-bottom: 1.3em;
      }
    }
  }
}
</style>

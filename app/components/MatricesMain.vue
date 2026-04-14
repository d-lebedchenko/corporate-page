<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  titleGreen: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  },
  imageDesktop: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="matrices-main">
    <div class="container">
      <div class="matrices-main__wr">
        <h1 class="matrices-main__title f-hero-title">
          {{ title }}
          <span v-if="titleGreen" class="matrices-main__title-additional green f-h2">{{ titleGreen }}</span>
        </h1>
        <NuxtPicture
          v-if="imageDesktop?.url"
          class="matrices-main__img hide-mob"
          :src="`/payload${imageDesktop.url}`"
          :alt="imageDesktop.alt || ''"
          :width="imageDesktop.width"
          :height="imageDesktop.height"
          sizes="xs:100vw sm:100vw md:100vw lg:1388px"
        />
        <NuxtPicture
          v-if="image?.url"
          class="matrices-main__img mob-only"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:1388px"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.matrices-main {
  background-color: $c-black;
  color: $c-white;
  padding: 60px 0 4px;
  @include respond("tab") {
    padding: 32px 0 0;
  }

  &__img {
    display: block;
    height: 375px;
    width: 100%;
    &.mob-only {
      display: none;
      @include respond("mob") {
        display: block;
      }
    }
    &.hide-mob {
      @include respond("mob") {
        display: none;
      }
    }
    @include respond("tab") {
      height: 212px;
    }

    &:deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    margin-bottom: 54px;

    &-additional {
      display: block;
    }

    @include respond("tab") {
      margin-bottom: 32px;
    }

    @include respond("mob") {
      margin-bottom: 20px;
    }
  }
}
</style>

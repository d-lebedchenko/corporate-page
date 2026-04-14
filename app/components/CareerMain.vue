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
  subtitle: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <div class="career-main">
    <div class="container">
      <div class="career-main__wr">

        <h1 class="career-main__small-title f-h2">
          {{ title }}
        </h1>

        <div class="career-main__hero-row">
          <span class="career-main__big-title f-hero-title">
            {{ titleGreen }}
          </span>
          <span class="career-main__subtitle f-h2 whitespace-pre-line">
            {{ subtitle }}
          </span>
        </div>

        <NuxtPicture
          v-if="image?.url"
          class="career-main__img"
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

.career-main {
  background-color: $c-black;
  color: $c-white;
  padding: 28px 0 70px;

  @include respond("tab") {
    padding: 20px 0 40px;
  }

  &__small-title {
    text-transform: uppercase;
    margin: 0 0 0 0;
  }

  &__hero-row {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-top: -10px;
    margin-bottom: 24px;

    @include respond("tab-lg") {
      margin-top: 4px;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 0;
      margin-bottom: 16px;
    }

    @include respond("tab") {
      flex-direction: column;
      margin-top: 4px;
      margin-bottom: 16px;
      gap: 4px;
    }
  }

  &__big-title {
    color: $c-white;
    text-transform: uppercase;
    flex-shrink: 0;
    line-height: 1 !important;

    @include respond("laptop") {
      font-size: 104px;
    }

    @include respond("desk-narrow") {
      font-size: 88px;
    }

    @include respond("tab-lg") {
      font-size: 72px;
      width: 100%;
    }

    @include respond("tab") {
      font-size: 64px;
    }

    @include respond("mob-sm") {
      font-size: 48px;
    }
  }

  &__subtitle {
    color: $c-green;
    text-transform: uppercase;

    @include respond("tab-lg") {
      width: 100%;
    }
  }

  &__img {
    display: block;
    height: 360px;
    width: 100%;

    @include respond("tab") {
      height: 200px;
    }

    &:deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

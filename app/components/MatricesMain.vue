<script setup>
defineProps({
  title: {
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
  <div class="matrices-main">
    <div class="container">
      <div class="matrices-main__wr">
        <NuxtPicture
          v-if="image?.url"
          class="matrices-main__img"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:1388px"
        />
        <h1 class="matrices-main__title f-a1">
          {{ title }}
        </h1>
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
    height: 300px;
    width: 100%;
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
    position: relative;
    top: -66px;
    text-transform: uppercase;
    @include respond("tab") {
      top: -40px;
      font-size: 48px;
    }
  }
}
</style>

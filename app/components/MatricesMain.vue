<script setup>
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

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
        <div class="matrices-main__img" v-if="image?.url">
          <img   v-if="image?.url" :src="`${payloadUrl}${image.url}`" :alt="image?.alt">
        </div>
        <h1 class="matrices-main__title f-a2">
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
    height: 300px;
    width: 100%;
    // object-fit: cover;
    @include respond("tab") {
      height: 212px;
    }

    img {
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
    }
  }
}
</style>
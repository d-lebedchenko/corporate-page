<script setup>
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

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
        <h1 class="career-main__title f-h2">
          {{ title }}
        </h1>
        <div class="career-main__title__block d-f ai-c">
          <span class="career-main__title__green green f-a2 shrink-0">
            {{ titleGreen }}
          </span>
          <span class="career-main__subtitle f-h2 whitespace-pre-line">
            {{ subtitle }}
          </span>
        </div>
        <div class="career-main__img" v-if="image?.url">
          <img   v-if="image?.url" :src="`${payloadUrl}${image.url}`" :alt="image?.alt">
        </div>
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
    padding: 15px 0 40px;
  }

  &__img {
    height: 360px;
    width: 100%;
    object-fit: cover;
    @include respond("tab") {
      height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    text-transform: uppercase;
  }
  &__title__block {
    gap: 24px;
    margin-bottom: 24px;
    margin-top: -22px;
    @include respond("tab") {
      margin-top: 0;
      gap: 16px;
    }
    @include respond("mob") {
      flex-direction: column;
      align-items: flex-start;
      gap: 0;
    }
  }
  &__title__green {
    text-transform: uppercase;
    @include respond("tab") {
      font-size: 64px;
    }
  }
  &__subtitle {
    text-transform: uppercase;
  }
}
</style>
<script setup>
// import RichtextLexical from './RichtextLexical'
import Arrow from '~/assets/icons/arrow-up-right.svg'
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  button: {
    type: Object,
    default: () => ({ label: '', url: '' })
  },
  image: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <section class="grow">
    <div class="container">
      <div class="grow__wr">
        <div class="grow__content d-f fd-c jc-e">
          <h2 class="grow__title f-h1">
            {{ title }}
          </h2>
          <div class="grow__text f-p2">
            {{ subtitle }}
          </div>
          <div class="grow__btn dots  d-f ai-c jc-sb dots f-b-p2">
            <span class="psevdo"></span>
            <a :href="button.url">{{ button.label }}</a>
            <Arrow class="icon icon-32" />
          </div>
        </div>
        <div class="grow__image d-f jc-c">
          <img :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.grow {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  &__wr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  &__title {
    margin-bottom: 32px;
    text-transform: uppercase;
  }
  &__text {
    margin-bottom: 40px;
    max-width: 616px;
    width: 100%;
  }
  &__btn {
    text-transform: uppercase;
    padding: 32px;
    max-width: 577px;
    width: 100%;
  }

  &__image {
    img {
      width: 361px;
      height: 361px;
      object-fit: cover;
    }
  }

}
</style>
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
          <a  :href="button.url" class="grow__btn dots hide-tablet d-f ai-c jc-sb dots f-b-p2">
            <span class="psevdo"></span>{{ button.label }}
            <Arrow class="icon icon-32" />
          </a>
          <a  :href="button.url" class="grow__btn dots hide-desctop d-f ai-c jc-sb dots f-b-p1">
            <span class="psevdo"></span>
            {{ button.label }}
            <Arrow class="icon icon-32" />
          </a>
        </div>
        <div class="grow__image d-f jc-c">
          <img :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
.grow {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;
  
  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    @include respond("tab") {
      display: flex;
      flex-direction: column-reverse;
      gap: 24px;
    }
  }
  &__content {

    @include respond("tab") {
      gap: 28px;
    }

  }
  &__title {
    margin-bottom: 32px;
    text-transform: uppercase;
    
    @include respond("tab") {
      margin-bottom: 0;
      padding-top: 28px;
    }
    
  }
  &__text {
    margin-bottom: 40px;
    max-width: 616px;
    width: 100%;
    
    @include respond("tab") {
      margin-bottom: 0;
    }
  }
  &__btn {
    text-transform: uppercase;
    padding: 32px;
    max-width: 577px;
    width: 100%;
    
    @include respond("tab") {
      max-width: 100%;
      padding: 16px;
      &.hide-desctop {
        display: flex;
      }
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__image {
    img {
      width: 361px;
      height: 361px;
      object-fit: cover;
      
      @include respond("tab") {
        max-width: 345px;
        width: 100%;
        height: auto;
      }
    }
  }

}
</style>
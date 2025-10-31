<script setup>
// import RichtextLexical from './RichtextLexical'
import Arrow from '~/assets/icons/arrow-up-right.svg'
import RichtextLexical from './RichtextLexical'
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
  text: {
    type: Object,
    default: () => ({})
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
  <section class="content-image">
    <div class="container">
      <div class="content-image__wr">
        <div class="content-image__content d-f fd-c jc-e">
          <h2 class="content-image__title f-h1">
            {{ title }}
          </h2>
          <!-- <div class="content-image__text f-p2">
            {{ subtitle }}
          </div> -->
          <RichtextLexical :content="text" class="content-image__text f-p2" />
          <a  :href="button.url" class="content-image__btn dots dots-hover hide-tablet d-f ai-c jc-sb dots f-b-p2">
            <span class="psevdo"></span>{{ button.label }}
            <Arrow class="icon icon-32" />
          </a>
          <a  :href="button.url" class="content-image__btn dots hide-desctop d-f ai-c jc-sb dots f-b-p1">
            <span class="psevdo"></span>
            {{ button.label }}
            <Arrow class="icon icon-32" />
          </a>
        </div>
        <div class="content-image__image d-f jc-c">
          <img :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
.content-image {
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
      min-height: 361px;
      width: auto;
      height: 100%;
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
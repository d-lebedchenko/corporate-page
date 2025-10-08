<script setup>
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
  image: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <section class="nolimits">
    <div class="container">
      <div class="nolimits__wr">
        <div class="nolimits__image d-f jc-e">
          <img :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>
        
        <h2 class="nolimits__title f-a2 hide-tablet">
          <span class="first-word">{{ title.split(' ')[0] }}</span>
          {{ title.split(' ').slice(1).join(' ') }}
        </h2>
        <h2 class="nolimits__title f-a1 hide-desctop">
          <span class="first-word">{{ title.split(' ')[0] }}</span>
          {{ title.split(' ').slice(1).join(' ') }}
        </h2>
        <div class="nolimits__content d-f fd-c jc-e">
          <div class="nolimits__text f-p2 hide-tablet">
            {{ subtitle }}
          </div>
          <div class="nolimits__text f-p1 hide-desctop">
            {{ subtitle }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.nolimits {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  &__wr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    @include respond("mob") {
      display: flex;
      flex-direction: column;
    }
  }
  &__image {
    padding-left: 170px;

    @include respond("tab") {
      padding-left: 0;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  &__content {
    padding: 0 39px;
    @include respond("tab") {
      padding: 0 8px;
    }
    
    @include respond("mob") {
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }

  &__text {
    margin-bottom: 152px;
    @include respond("tab") {
      margin-bottom: 77px;
    }
    @include respond("mob") {
      transform: translateY(-70px);
      margin-bottom: -70px;
    }
  }

  &__title {
    position: absolute;
    right: 0;
    bottom: -24px;
    text-transform: uppercase;

    @include respond("tab") {
      bottom: -7px;
    }
    @include respond("mob") {
      position: static;
      transform: translateY(-50%);
    }

    .first-word {
      display: inline-block;
      transform: translateY(-66%);

      @include respond("tab") {
        transform: translateY(0);
      }
    }
  }

}
</style>
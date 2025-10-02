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
        <div class="nolimits__content d-f fd-c jc-e">
          <div class="nolimits__text f-p2">
            {{ subtitle }}
          </div>
        </div>
        <h2 class="nolimits__title f-a2">
          <span class="first-word">{{ title.split(' ')[0] }}</span>
          {{ title.split(' ').slice(1).join(' ') }}
        </h2>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.nolimits {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  &__wr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__content {
    padding: 0 39px;
  }

  &__text {
    margin-bottom: 152px;
  }

  &__title {
    position: absolute;
    right: 0;
    bottom: -24px;
    text-transform: uppercase;
    .first-word {
      display: inline-block;
      transform: translateY(-66%);
    }
  }

}
</style>
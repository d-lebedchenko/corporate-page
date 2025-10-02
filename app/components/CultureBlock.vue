<script setup>
// import RichtextLexical from './RichtextLexical'
// import Arrow from '~/assets/icons/arrow-up-right.svg'
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
  features: {
    type: Array,
    default: () => ([])
  }
})

</script>

<template>
  <section class="culture">
    <div class="container">
      <div class="culture__content">
        <div class="culture__top dots">
          <span class="psevdo"></span>
          <h2 class="culture__title f-h1">
            {{ title }}
          </h2>
          <h3 class="culture__subtitle f-h3">
            {{ subtitle }}
          </h3>
        </div>
        <ul class="culture__list">
          <li class="culture__item dots " v-for="(item, id) in features" :key="id">
            <span class="psevdo"></span>
            <h4 class="culture__item__title f-h3">
              {{ item.title }}
            </h4>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.culture {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  &__top {
    padding: 20px 32px;
    text-transform: uppercase;
  }

  &__title {
    margin-bottom: 16px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  &__item {
    padding: 32px;
    min-height: 360px;
    display: flex;

    &__title {
      margin-top: auto;
      display: inline-block;
    }
  }

}
</style>
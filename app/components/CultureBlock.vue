<script setup>
// import RichtextLexical from './RichtextLexical'
import Arrow from '~/assets/icons/arrow-right.svg'
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const containerRef = ref(null)
const swiper = useSwiper(containerRef, {
  effect: 'creative',
  loop: true,
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 2, // Дефолтно 2 слайди
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
  breakpoints: {
    0: {      // від 0px і до
      slidesPerView: 1, // 1 слайд
    },
    601: {    // від 601px і більше
      slidesPerView: 2,
    },
  },
})

onMounted(() => {
  console.log(swiper.instance)
})

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  features: { type: Array, default: () => [] },
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
        <ul class="culture__list hide-tablet">
          <li class="culture__item dots dots-hover d-f fd-c" v-for="(item, id) in features" :key="id">
            <span class="psevdo"></span>
            <h4 class="culture__item__title f-h3">
              {{ item.title }}
            </h4>
            <p class="culture__item__text f-p3">{{ item.text }}</p>
          </li>
        </ul>
        <div class="culture__slider hide-desctop dots" v-if="features.length">
          <ClientOnly>
            <swiper-container ref="containerRef">
              <swiper-slide class="culture__slider__item d-f fd-c jc-sb" v-for="(slide, idx) in features" :key="idx">

                <h4 class="culture__slider__title f-h2 green">
                  {{ slide.title }}
                </h4>
                <p class="culture__slider__text f-p2">{{ slide.text }}</p>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>
          <div class="culture__slider__controls">
            
            <button class="culture__slider__arrow prev dots dots-hover" @click="swiper.prev()">
              <span class="psevdo"></span>
              <Arrow class="icon green" />
            </button>
            <button class="culture__slider__arrow next  dots dots-hover" @click="swiper.next()">
              <span class="psevdo"></span>
              <Arrow class="icon green" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.culture {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__top {
    padding: 20px 32px;
    text-transform: uppercase;

    @include respond("tab") {
      padding: 20px 16px;
    }
  }

  &__title {
    margin-bottom: 16px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @include respond("tab") {
      display: none;
    }
  }

  &__item {
    padding: 32px;
    min-height: 360px;

    &:hover {
      .culture__item__text {
        max-height: 300px;
        padding-top: 32px;
        opacity: 1;
      }
    }

    &__title {
      margin-top: auto;
      display: inline-block;
    }

    &__text {
      max-height: 0;
      padding-top: 0;
      overflow: hidden;
      transition: opacity 0.5s ease-in-out, padding-top 0.4s ease-in-out, max-height 0.5s ease-in-out;
      opacity: 0;
    }
  }

  &__slider {
    swiper-container {
      width: 100%;
      height: 100%;
    }
    &__item {
      border-left: 1px solid $c-steel-grey;
      padding: 32px 20px;
      min-height: 300px;
      
      @include respond("tab") {
        min-height: 0;
        border-left: 0;
      }
    }
    &__title  {
      margin-bottom: 32px;
    }
    &__controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    &__arrow {
      padding: 16px;

      &.prev {
        .icon {  
          transform: rotate(180deg);
        }
      }

      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }

}
</style>
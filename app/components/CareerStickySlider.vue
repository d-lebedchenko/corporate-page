<script setup>
import { ref } from 'vue';
import { useSwiper } from '#imports';

const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: () => ({})
  },
  slides: {
    type: Array,
    default: () => ([])
  },
  slidesMobile: {
    type: Array,
    default: () => ([])
  }
})

const sliderRef = ref(null);

const swiper = useSwiper(sliderRef, {
  effect: 'slide',
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  spaceBetween: 12,

  on: {
    init: function () {
      this.slides[this.activeIndex].classList.add('is-active-slide');
    },
    slideChangeTransitionStart: function () {
      this.slides.forEach(slide => slide.classList.remove('is-active-slide'));
    },
    slideChangeTransitionEnd: function () {
      this.slides[this.activeIndex].classList.add('is-active-slide');
    },
  }
});
</script>

<template>
  <section class="career-sticky-slider">
    <div class="container">
      <div class="career-sticky-slider__wr d-f ai-fs">
        <div class="career-sticky-slider__content">
          <img class="career-sticky-slider__icon" :src="`${payloadUrl}${icon.url}`" :alt="icon.alt">

          <h2 class="career-sticky-slider__title f-h2">
            {{ title }}
          </h2>
          <div class="career-sticky-slider__text f-p2">
            {{ subTitle }}
          </div>
        </div>

        <div class="career-sticky-slider__slider d-f fd-c ai-c">
          <div v-for="(slide, id) in slides" :key="id" class="career-sticky-slider__slide__img">
            <img :src="`${payloadUrl}${slide.image.url}`" :alt="slide.image.alt">

          </div>
        </div>

        <div class="career-sticky-slider__slider mob">
          <swiper-container v-if="slidesMobile.length > 0" ref="sliderRef">
            <swiper-slide class="career-sticky-slider__item" v-for="(slide, id) in [...slidesMobile, ...slidesMobile]" :key="id">
              <div class="slide-image-wrapper">
                <img :src="`${payloadUrl}${slide.image.url}`" :alt="slide.image.alt">
              </div>
            </swiper-slide>
          </swiper-container>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

$slide-width: 300px;
$side-slide-width: 260px;
$slide-scale: 0.8667;

.career-sticky-slider {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    @include respond("tab") {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }
  }

  &__content {
    padding-top: 76px;
    padding-right: 40px;
    position: sticky;
    top: 0;
    width: 50%;

    @include respond("tab") {
      width: 100%;
      position: static;
      padding-top: 0;
    }
  }

  &__icon {
    width: 176px;
    height: auto;
    margin-bottom: 28px;

    @include respond("tab") {
      width: 172px;
    }

  }

  &__title {
    margin-bottom: 40px;
    text-transform: uppercase;
    max-width: 500px;

    @include respond("tab") {
      margin-bottom: 24px;
    }

  }


  &__slider {
    width: 50%;
    gap: 28px;
    flex-shrink: 0;

    &.mob {
      display: none;
    }

    @include respond("tab") {
      display: none;

      &.mob {
        display: block;
        width: 100%;
        padding: 0;
        box-sizing: border-box;

        swiper-container {
          width: 100%;
          
          box-sizing: border-box;
          
          overflow: visible !important; 
        }
        
      }
    }

    &__img {
      img {
        max-width: 516px;
        width: 100%;
        height: auto;
      }
    }
  }

}

swiper-slide {
  width: $slide-width !important; 
  height: $slide-width !important;
  flex-shrink: 0;
  
}

.slide-image-wrapper {
  width: 100%; 
  height: 100%; 
  overflow: hidden;
  transition: transform 0.3s ease;
  
  transform: scale($slide-scale);
  transform-origin: center center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.swiper-slide-active {
  z-index: 10;
  
  .slide-image-wrapper {
    transform: scale(1);
  }
}
</style>
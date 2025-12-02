<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import ArrowRight from '~/assets/icons/arrow-right.svg'

defineProps({
  stories: {
    type: Array,
    default: () => []
  },
})

const swiperInstance = ref(null)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
};

const onSlideChange = (swiper) => {
  const contents = swiper.el.querySelectorAll('.slide__quote-scroll')
  if (contents?.length) {
    contents.forEach((el) => { el.scrollTop = 0 })
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}
</script>

<template>
  <div class="growth-stories-block">
    <div class="container">
      <div
        v-if="stories?.length"
        class="growth-stories-block__content"
      >
        <Swiper
          class="growth-stories-block__slider"
          :modules="[EffectFade]"
          effect="fade"
          :fade-effect="{ crossFade: true }"
          :slides-per-view="1"
          :space-between="0"
          :rewind="true"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <SwiperSlide
            v-for="(item, index) in stories"
            class="slide"
            :key="item.id"
          >
            <div class="slide__inner dots-border dots-border--hide-bottom">
              <div class="slide__head dots-border">
                <h2 class="slide__title f-h2">{{ item.title }}</h2>

                <div class="slide__count f-sh2 dots-border">
                  {{ index + 1 }}/{{ stories.length }}
                </div>
              </div>

              <div class="slide__body">
                <div class="slide__person dots-border dots-border--hide-bottom">
                  <NuxtPicture
                    v-if="item.image?.url"
                    class="slide__person-img"
                    :src="`/payload${item.image.url}`"
                    :alt="item.image.alt || ''"
                    :width="item.image.width"
                    :height="item.image.height"
                    sizes="xs:100vw sm:100vw md:100vw lg:694px"
                    loading="lazy"
                  />

                  <div class="slide__person-text">
                    <p
                      v-if="item.name"
                      class="slide__person-name f-h3"
                    >
                      {{ item.name }}
                    </p>
                    <p
                      v-if="item.position"
                      class="slide__person-position f-p2"
                    >
                      {{ item.position }}
                    </p>
                  </div>
                </div>

                <div class="slide__quote">
                  <div class="slide__quote-wr">
                    <div class="slide__quote-scroll custom-scrollbar swiper-no-swiping">
                      <img
                        class="slide__quote-icon"
                        src="/img/quote.svg"
                        alt="Quote icon"
                        width="50"
                        height="32"
                        aria-hidden="true"
                        loading="lazy"
                      />
                      <p
                        v-if="item.highlightedText"
                        class="slide__quote-highlight f-h3 whitespace-pre-line"
                      >
                        {{ item.highlightedText }}
                      </p>
                      <p
                        v-if="item.text"
                        class="slide__quote-text f-p3 whitespace-pre-line"
                      >
                        {{ item.text }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="growth-stories-block__controls">
          <button
            type="button"
            class="growth-stories-block__controls-btn dots dots-hover"
            @click="slidePrev"
          >
            <span class="psevdo"></span>
            <ArrowLeft class="green icon-32" />
          </button>
          <button
            type="button"
            class="growth-stories-block__controls-btn dots dots-hover"
            @click="slideNext"
          >
            <span class="psevdo"></span>
            <ArrowRight class="green icon-32" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.growth-stories-block {
  background-color: $c-black;
  color: $c-white;
  padding: 64px 0 70px;
  @include respond("tab") {
    padding: 37px 0 40px;
  }

  &__slider {
    margin-left: -6px;
    margin-right: -6px;
    @include respond("tab") {
      margin-left: -3px;
      margin-right: -3px;
    }

    &:before {
      content: '';
      position: absolute;
      pointer-events: none;
      top: 6px;
      right: 6px;
      left: 6px;
      bottom: 0;
      border: 1px solid $c-steel-grey;
      border-bottom-width: 0;
      @include respond("tab") {
        top: 3px;
        right: 3px;
        left: 3px;
      }
    }
  }

  &__controls {
    display: flex;

    &-btn {
      flex: 1 0 50%;
      cursor: pointer;
      padding: 20px;
      @include respond("tab") {
        padding: 14px 16px;
      }

      svg {
        @include respond("tab") {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

.slide {
  height: auto;
  padding: 6px 6px 0;
  @include respond("tab") {
    padding: 3px 3px 0;
  }

  &__inner {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__head {
    display: flex;
  }

  &__title {
    flex: 1;
    padding: 32px;
    text-transform: uppercase;
    @include respond("tab") {
      padding: 24px 12px;
    }
  }

  &__count {
    min-width: 132px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px 32px;
    @include respond("tab") {
      display: none;
    }
  }

  &__body {
    flex: 1;
    display: flex;
    @include respond("tab") {
      flex-direction: column;
    }
  }

  &__person {
    flex: 1 0 50%;
    min-height: 666px;
    @include respond("tab") {
      min-height: auto;
      flex: 0 1 auto;
    }

    &-img {
      display: block;
      width: 100%;
      height: 529px;
      @include respond("tab") {
        height: 240px;
      }
      
      &:deep(img) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-text {
      padding: 32px;
      @include respond("tab") {
        padding: 16px;
        position: relative;
        &:before,
        &:after {
          content: '';
          position: absolute;
          pointer-events: none;
        }
        &:before {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-bottom: 1px solid $c-steel-grey;
        }
        &:after {
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
          background:
            radial-gradient(circle, $c-steel-grey 3px, transparent 3px) top left,
            radial-gradient(circle, $c-steel-grey 3px, transparent 3px) top right,
            radial-gradient(circle, $c-steel-grey 3px, transparent 3px) bottom left,
            radial-gradient(circle, $c-steel-grey 3px, transparent 3px) bottom right;
          background-size: var(--dot-size) var(--dot-size);
          background-repeat: no-repeat;
        }
      }
    }

    &-name {
      text-transform: uppercase;
      &:not(:last-child) {
        margin-bottom: 12px;
        @include respond("tab") {
          margin-bottom: 8px;
        }
      }
    }
  }

  &__quote {
    position: relative;
    flex: 1 0 50%;
    @include respond("tab") {
      flex: 1;
    }

    &-wr {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 52px 16px 28px;
      @include respond("tab") {
        position: static;
        padding: 0;
      }
    }
    
    &-scroll {
      height: 100%;
      padding: 0 36px;
      overflow: auto;
      @include respond("tab") {
        max-height: 530px;
        padding: 20px 16px;
      }
    }

    &-icon {
      display: block;
      width: 60px;
      height: auto;
      margin-bottom: 20px;
      @include respond("tab") {
        width: 50px;
        margin-bottom: 16px;
      }
    }

    &-highlight {
      font-size: 20px;
      color: $c-green;
      text-transform: uppercase;
      @include respond("tab") {
        font-size: 18px;
      }

      &:not(:last-child) {
        margin-bottom: 32px;
        @include respond("tab") {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>

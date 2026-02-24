<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import ArrowBigRight from '~/assets/icons/arrow-big-right.svg'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import ArrowRight from '~/assets/icons/arrow-right.svg'

defineProps({
  title: {
    type: String,
    default: ''
  },
  tracks: {
    type: Array,
    default: () => []
  },
})

const swiperInstance = ref(null)
const activeIndex = ref(0)

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
  const contents = swiper.el.querySelectorAll('.slide__content')
  if (contents?.length) {
    contents.forEach((el) => { el.scrollTop = 0 })
  }
}

const slideTo = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index)
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
  <div class="about-tracks-block">
    <div class="container">
      <h2 v-if="title" class="about-tracks-block__head f-h2 dots">
        {{ title }}
      </h2>
      <div v-if="tracks?.length" class="about-tracks-block__body dots">
        <div class="psevdo"></div>

        <div class="about-tracks-block__nav dots">
          <div class="psevdo"></div>

          <div
            v-for="(item, index) in tracks"
            :class="[
              'about-tracks-block__nav-item',
              {
                'active': activeIndex === index,
              }
            ]"
            :key="item.id"
          >
            <div class="array">
              <ArrowBigRight aria-hidden="true" />
            </div>
            <button
              class="value f-sh1"
              type="button"
              :aria-current="activeIndex === index"
              @click="slideTo(index)"
            >
              {{ item.title }}
            </button>
          </div>
        </div>

        <div class="about-tracks-block__content">
          <div class="about-tracks-block__content-inner">
            <Swiper
              class="about-tracks-block__content-slider"
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
                v-for="(item, index) in tracks"
                class="slide"
                :key="item.id"
              >
                <div class="slide__head">
                  <h3 class="slide__head-title f-h3">
                    {{ item.title }}
                  </h3>
                  <div class="slide__head-counter f-h3">
                    {{ index + 1 }} / {{ tracks.length }}
                  </div>
                </div>

                <div class="slide__content custom-scrollbar">
                  <div v-if="item.keyTasks?.length" class="slide__group">
                    <h4 class="slide__group-title f-sh1">
                      {{ item.keyTasksTitle || $t('about_tracks_block.title_tasks') }}
                    </h4>
                    <ul class="slide__tasks f-p3">
                      <li
                        v-for="task in item.keyTasks"
                        class="whitespace-pre-line"
                        :key="task.id"
                      >
                        {{ task.text }}
                      </li>
                    </ul>
                  </div>

                  <div v-if="item.techStacks?.length" class="slide__group">
                    <h4 class="slide__group-title f-sh1">
                      {{ item.techStacksTitle || $t('about_tracks_block.title_stacks') }}
                    </h4>
                    <ul class="slide__stacks f-p3">
                      <li
                        v-for="stack in item.techStacks"
                        :key="stack.id"
                      >
                        <p class="slide__stacks-title">
                          {{ stack.title }}
                        </p>
                        <p class="slide__stacks-val whitespace-pre-line">
                          {{ stack.value }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div class="about-tracks-block__controls">
            <button
              type="button"
              class="about-tracks-block__controls-btn dots dots-hover"
              @click="slidePrev"
            >
              <span class="psevdo"></span>
              <ArrowLeft class="green" />
            </button>
            <button
              type="button"
              class="about-tracks-block__controls-btn dots dots-hover"
              @click="slideNext"
            >
              <span class="psevdo"></span>
              <ArrowRight class="green" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.about-tracks-block {
  background-color: $c-black;
  color: $c-white;
  padding-top: 140px;
  padding-bottom: 70px;
  @include respond("tab") {
    padding-top: 80px;
    padding-bottom: 40px;
  }

  &__head {
    padding: 20px 32px;
    text-transform: uppercase;
    @include respond("tab") {
      padding: 20px 16px;
    }
  }

  &__body {
    display: flex;
    @include respond("tab") {
      display: block;
    }
  }

  &__nav {
    flex: 1 1 695px;
    margin-top: 0;
    margin-left: 0;
    @include respond("tab") {
      display: none;
    }

    &-item {
      width: 100%;
      display: flex;

      &:not(:last-child) {
        border-bottom: 1px solid $c-steel-grey;
      }

      .array {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 176px;
        border-right: 1px solid $c-steel-grey;
        svg {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
      }

      .value {
        flex: 1;
        display: block;
        padding: 20px 32px;
        text-align: left;
        text-transform: uppercase;
        min-height: 88.125px;
        transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, font-size 0.3s;
        cursor: pointer;
        &:hover,
        &[aria-current="true"] {
          color: $c-green;
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        &[aria-current="true"] {
          font-size: 35px;
        }
      }

      &.active {
        .array svg {
          opacity: 1;
        }
      }
    }
  }

  &__content {
    position: relative;
    flex: 1 1 693px;
    min-width: 0;

    &-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @include respond("tab") {
        position: static;
        height: auto;
      }
    }

    &-slider {
      height: 100%;

      :deep(.swiper-wrapper) {
        height: 100%;
        overflow: hidden;
      }

      :deep(.swiper-slide) {
        height: 100%;
      }
    }
  }

  &__controls {
    display: none;
    @include respond("tab") {
      display: flex;
    }

    &-btn {
      flex: 1;
      cursor: pointer;
      padding: 16px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  @include respond("tab") {
    display: block;
  }

  &__head {
    display: none;
    @include respond("tab") {
      display: flex;
      gap: 28px;
      justify-content: space-between;
      padding: 32px 20px 28px;
    }

    &-title {
      text-transform: uppercase;
    }

    &-counter {
      opacity: 0.4;
    }
  }


  &__content {
    flex: 1;
    padding: 52px;
    overflow: auto;
    @include respond("tab") {
      padding: 0 20px 32px;
      max-height: 445px;
    }
  }

  &__group {
    &:not(:last-child) {
      margin-bottom: 40px;
      @include respond("tab") {
        margin-bottom: 28px;
      }
    }

    &-title {
      text-transform: uppercase;
      margin-bottom: 16px;
      @include respond("tab") {
        font-family: $font-primary;
        font-size: 16px;
        line-height: 130%;
        margin-bottom: 12px;
      }
    }
  }

  &__tasks {
    color: $c-grey-2;
    @include respond("tab") {
      font-size: 14px;
    }

    li {
      position: relative;
      padding-left: 1.5em;

      &:before {
        content: "";
        width: 0.25em;
        height: 0.25em;
        position: absolute;
        top: 0.5em;
        left: 0.6em;
        background: currentColor;
        border-radius: 50%;
      }
    }
  }

  &__stacks {
      color: $c-grey-2;
    @include respond("tab") {
      font-size: 14px;
    }

    li {
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }

    &-title {
      // color: $c-grey-2;
      margin-bottom: 4px;
    }
  }
}
</style>

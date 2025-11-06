<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'
import { useTextAnimation } from '../../composables/useTextAnimation';
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
    type: String,
    default: ''
  },
  runningText: {
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


const letters = computed(() =>
  props.text.split('').map(char => (char === '\n' ? '\n' : char))
)

const {
  containerRef: textRef,
  isVisible: isTextVisible
} = useTextAnimation();

</script>

<template>
  <section class="main-section">
    <div class="container main-section__wrapper d-f">

      <div class="main-section__left d-f">
        <div class="main-section__marquee">
          
          <NuxtMarquee autoFill :speed="180"  :direction="'down'">
            <div class="main-section__runing f-a1">
              <span class="main-section__runing__text"> {{ runningText }} </span>&nbsp;
            </div>
          </NuxtMarquee>
        </div>
        <div class="main-section__img" v-if="image?.url">
          <img :src="`${payloadUrl}${image?.url}`" :alt="image?.alt">
        </div>
      </div>
      <div class="main-section__right">
        <div class="main-section__top">
          <h1 class="main-section__title f-a2">
            {{ title }}
          </h1>
          <h3 class="main-section__subtitle f-sh1 hide-tablet">
            {{ subtitle }}
          </h3>
          <h3 class="main-section__subtitle f-sh2 hide-desctop">
            {{ subtitle }}
          </h3>
        </div>
        <div class="main-section__bottom">

          <p class="main-section__text f-p1" ref="textRef" :class="{ 'is-visible': isTextVisible }">
            <span v-for="(letter, i) in letters" :key="i" class="animated-letter"
              :style="{ 'animation-delay': `${i * 0.03}s` }">
              {{ letter }}
            </span>
          </p>
          <CmsLink :link="button" class="main-section__btn dots dots-hover f-b-p1 d-f jc-sb ai-c">
            <span class="psevdo"></span>
            {{ button.label }}
            <Arrow class="icon icon-52" />
          </CmsLink>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.main-section {
  background-color: $c-black;
  color: $c-white;
  padding-top: 28px;
  padding-bottom: 82px;
  height: 100vh;

  &__wrapper {
    gap: 16px;
    height: 100%;

    @include respond("tab") {
      gap: 20px;
      flex-direction: column;
    }

  }

  &__left {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding-left: 26px;
    margin-left: -26px;

    @include respond("tab") {
      margin-left: 0;
      padding-left: 0;
      min-height: 360px;
    }
  }

  &__img {
    height: 100%;
    width: 501px;
    margin-left: auto;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    @include respond("tab") {
      height: 100%;
      width: 100%;
      // margin-left: 67px;
    }
  }


  &__marquee {
    width: 180px;
    transform: translateX(calc(100% - 10px));

    :deep() {
      .vfm-marquee-container {
        transform-origin: top left;
      }
    }
    @include respond("tab") {
      width: 64px;
    transform: translateX(100%);
    }
  }

  &__runing {
    rotate: -90deg;
    font-size: 160px;
    text-transform: uppercase;

    @include respond("tab") {
      font-size: 64px;
    }
  }
   

  &__right {
    max-width: 702px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include respond("tab") {
      max-width: 100%;
    }
  }


  &__title {
    text-transform: uppercase;
  }

  &__subtitle {
    text-transform: uppercase;
    text-align: center;

    @include respond("tab") {
      text-align: left;
      margin-bottom: 16px;
    }
  }

  &__text {
    text-transform: uppercase;
    margin-bottom: 36px;
    white-space: pre-wrap;
    color: $c-grey;

    &.is-visible {


      .animated-letter {
        display: inline;
        animation: colorChange 0.5s linear forwards;
      }

      @keyframes colorChange {
        0% {
          color: $c-grey;
        }

        100% {
          color: $c-white;
        }
      }
    }

    @include respond("tab") {
      margin-bottom: 16px;
    }
  }

  &__btn {
    text-transform: uppercase;
    padding: 40px;

    @include respond("tab") {
      padding: 16px;
      gap: 32px;
      width: max-content;

      .icon {
        width: 24px;
        height: 24px;
      }
    }

    @include respond("mob") {
      width: 100%;
    }
  }
}
</style>
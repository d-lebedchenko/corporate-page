<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'

const config = useRuntimeConfig()
const payloadUrl = config.public.payloadUrl
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

const DESKTOP_SPEED = 150;
const MOBILE_SPEED = 100;

const currentSpeed = ref(DESKTOP_SPEED);

const checkScreenSize = () => {
  if (window.innerWidth < 1023) { 
    currentSpeed.value = MOBILE_SPEED;
  } else {
    currentSpeed.value = DESKTOP_SPEED;
  }
};
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <section class="main-section">
    <div class="container main-section__wrapper d-f">

      <div class="main-section__left d-f">
        <div class="main-section__marquee">
          
          <NuxtMarquee autoFill :speed="currentSpeed"  :direction="'down'">
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
              :style="{ 'animation-delay': `${i * 0.015}s` }">
              {{ letter }}
            </span>
          </p>
          <CmsLink :link="button" class="main-section__btn dots dots-hover btn-green f-b-p1 d-f jc-sb ai-c">
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
  padding-bottom: 28px;
  padding-top: 28px;
  height: calc(100vh - 62px);

    @include respond("tab") {
      height: 100%;
    }

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
      padding-left: 15px;
      margin-left: -15px;
      margin-right: -15px;
      padding-right: 15px;
      width: auto;
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
      height: 360px;
      width: 100%;
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
    font-size: 150px;
    text-transform: uppercase;

    @include respond("tab") {
      font-size: 56px;
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

    @include respond("tab") {
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

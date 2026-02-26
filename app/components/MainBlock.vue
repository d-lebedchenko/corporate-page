<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'

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
  },
  imageTablet: {
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
            <div class="main-section__runing f-a2">
              <span class="main-section__runing__text"> {{ runningText }} </span>&nbsp;
            </div>
          </NuxtMarquee>
        </div>
        <NuxtPicture
          v-if="image?.url"
          class="main-section__img"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="2sm:506px md:930px lg:501px"
          :preload="{ fetchPriority: 'high' }"
        />
        <NuxtPicture
          v-if="imageTablet?.url"
          class="main-section__img main-section__img--tab"
          :src="`/payload${imageTablet.url}`"
          :alt="imageTablet.alt || ''"
          :width="imageTablet.width"
          :height="imageTablet.height"
          sizes="md:930px lg:501px"
          :preload="{ fetchPriority: 'high' }"
          densities="1x"
        />
        <NuxtPicture
          v-if="image?.url"
          class="main-section__img main-section__img--mob"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:262px sm:336px"
          :preload="{ fetchPriority: 'high' }"
          densities="1x"
        />
      </div>
      <div class="main-section__right">
        <div class="main-section__top">
          <h1 class="main-section__title f-a1">
            {{ title }}
          </h1>
          <h2 class="main-section__subtitle f-sh1">
            {{ subtitle }}
          </h2>
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
  overflow: hidden;
  
  @include respond("laptop") {
    padding-bottom: 20px;
    padding-top: 20px;
  }
  @include respond("tab") {
    height: calc(100vh - 52px);
  }

  @include respond("tab-sm") {
    height: 100%;
  }

  &__wrapper {
    gap: 20px;
    height: 100%;
    
    @include respond("laptop") {
      gap: 24px;
    }

    @include respond("tab-sm") {
      display: block;
    }

  }

  &__left {
    flex: 0 0 618px;
    overflow: hidden;
    position: relative;
    padding-left: 26px;
    margin-left: -26px;

    @include respond("laptop") {
      flex: 0 0 594px;
    }
    @include respond("tab-lg") {
      flex: 0 0 466px;
    }

    @include respond("tab-sm") {
      min-height: 360px;
      padding: 0 15px;
      margin: 0 -15px 20px;
    }
  }

  &__img {
    display: block;
    height: 100%;
    flex: 1;
    margin-left: auto;

    &:deep(img) {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    @include respond("tab-sm") {
      height: 360px;
      display: none;
    }
    
    &--tab {
      display: none;
      @include respond("tab-sm") {
        display: block;
      }
      @include respond("mob-md") {
        display: none;
      }
    }

    &--mob {
      display: none;
      @include respond("mob-md") {
        display: block;
      }
    }
  }

  &__marquee {
    min-width: 0;
    flex: 0 0 130px;
    transform: translateX(calc(100% - 10px));
    
    @include respond("tab-lg") {
      flex: 0 0 90px;
    }
    @include respond("tab-sm") {
      flex: 0 0 69px;
      transform: translateX(calc(100% - 0px));
    }

    :deep() {
      .vfm-marquee-container {
        transform-origin: top left;
        padding: 10px 0;
        margin: -10px 0;
      }
    }
  }

  &__runing {
    rotate: -90deg;
    // font-size: 150px;
    text-transform: uppercase;
    color: $c-steel-grey;
    
    @include respond("tab-lg") {
      font-size: 80px;
      line-height: 96%;
    }

    @include respond("tab-sm") {
      font-size: 64px;
    }
  }
   

  &__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include respond("tab-sm") {
      display: block;
    }
  }


  &__title {
    text-transform: uppercase;
    @include respond("laptop") {
      line-height: 94%;
    }
    @include respond("tab-lg") {
      font-size: 80px;
      line-height: 96%;
    }
    @include respond("tab-sm") {
      font-size: 48px;
      line-height: 125%;
    }
  }

  &__subtitle {
    text-transform: uppercase;
    padding-left: 11px;
    margin-top: -0.583333em;
    @include respond("laptop") {
      margin-top: 8px;
    }
    @include respond("tab-lg") {
      padding-left: 0;
      font-size: 18px;
      line-height: 125%;
    }

    @include respond("tab-sm") {
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 16px;
    }
  }

  &__text {
    text-transform: uppercase;
    margin-bottom: 36px;
    white-space: pre-wrap;
    color: $c-grey;
    
    @include respond("laptop") {
      font-size: 24px;
    }
    @include respond("tab-lg") {
      font-size: 16px;
    }

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
    
    @include respond("laptop") {
      font-size: 28px;
    }
    @include respond("tab-lg") {
      font-size: 20px;
      padding: 16px;

      .icon {
        width: 24px;
        height: 24px;
      }
    }

    @include respond("tab-sm") {
      gap: 32px;
      // width: max-content;
    }

    // @include respond("tab-sm") {
    //   width: 100%;
    // }
  }
}
</style>

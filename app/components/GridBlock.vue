<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import Arrow from '~/assets/icons/arrow-up-right.svg'
import Anim1 from '~/assets/icons/animation-1-active.svg'
import Anim2 from '~/assets/icons/animation-2-active.svg'
import Anim3 from '~/assets/icons/animation-3-active.svg'

const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

defineProps({
  title: {
    type: String,
    default: ''
  },
  titleGreen: {
    type: String,
    default: ''
  },
  text: {
    type: Object,
    default: () => ({})
  },
  directionTitle: {
    type: String,
    default: ''
  },
  directionSubtitle: {
    type: String,
    default: ''
  },
  schemaTitle: {
    type: String,
    default: ''
  },
  schemaSubtitle: {
    type: String,
    default: ''
  },
  expertsTitle: {
    type: String,
    default: ''
  },
  expertsSubtitle: {
    type: String,
    default: ''
  },
  button: {
    type: Object,
    default: () => ({ label: '', url: '' })
  },
  partners: {
    type: Array,
    default: () => ([])
  }
})

// Animation 1
const iconFirstContainer = ref(null);
const isObserverActive = ref(false);
const isIconFirstVisible = ref(false);
const isIconFirstHovered = ref(false);

useIntersectionObserver(
  iconFirstContainer,
  ([{ isIntersecting }]) => {
    isObserverActive.value = isIntersecting;
    if (isIntersecting) {
      isIconFirstVisible.value = true;
    }
    if (!isIntersecting) {
      isIconFirstVisible.value = false;
      isIconFirstHovered.value = false;
    }
  },
  {
    threshold: 0,
  }
);

function handleIconFirstMouseEnter() {
  isIconFirstVisible.value = false;
  setTimeout(() => {
    isIconFirstHovered.value = true;
  }, 50);
}

function handleIconFirstMouseLeave() {
  isIconFirstHovered.value = false;
  if (isObserverActive.value) {
    isIconFirstVisible.value = true;
  }
}

// Animation 2
const iconSecondContainer = ref(null);
const isObserverActiveSecond = ref(false);
const isIconSecondVisible = ref(false);
const isIconSecondHovered = ref(false);

useIntersectionObserver(
  iconSecondContainer,
  ([{ isIntersecting }]) => {
    isObserverActiveSecond.value = isIntersecting;

    if (isIntersecting) {
      isIconSecondVisible.value = true;
    }
    if (!isIntersecting) {
      isIconSecondVisible.value = false;
      isIconSecondHovered.value = false;
    }
  },
  {
    threshold: 0,
  }
);

function handleIconSecondMouseEnter() {
  isIconSecondVisible.value = false;

  setTimeout(() => {
    isIconSecondHovered.value = true;
  }, 50);
}

function handleIconSecondMouseLeave() {
  isIconSecondHovered.value = false;

  if (isObserverActiveSecond.value) {
    isIconSecondVisible.value = true;
  }
}


// Animation 3
const iconThirdContainer = ref(null);
const isObserverActiveThird = ref(false);
const isIconThirdVisible = ref(false);
const isIconThirdHovered = ref(false);


useIntersectionObserver(iconThirdContainer,
  ([{ isIntersecting }]) => {
    isObserverActiveThird.value = isIntersecting;

    if (isIntersecting) {
      isIconThirdVisible.value = true;
    }
    if (!isIntersecting) {
      isIconThirdVisible.value = false;
      isIconThirdHovered.value = false;
    }
  },
  {
    threshold: 0,
  }
);
function handleIconThirdMouseEnter() {
  isIconThirdVisible.value = false;

  setTimeout(() => {
    isIconThirdHovered.value = true;
  }, 50);
}
function handleIconThirdMouseLeave() {
  isIconThirdHovered.value = false;

  if (isObserverActiveThird.value) {
    isIconThirdVisible.value = true;
  }
}
</script>

<template>
  <section class="grid">
    <div class="container">
      <div class="grid__content">

        <div class="grid__icon dots d-f jc-c ai-c anim1-container" ref="iconFirstContainer" :class="{
          'is-animated': isIconFirstVisible,
          'is-hovered': isIconFirstHovered
        }" @mouseenter="handleIconFirstMouseEnter" @mouseleave="handleIconFirstMouseLeave">
          <span class="psevdo"></span>
          <Anim1 class="icon" />
        </div>
        <div class="grid__item d-f jc-sb fd-c dots">
          <span class="psevdo"></span>
          <div class="grid__item__title f-h2">
            {{ directionTitle }}
          </div>
          <div class="grid__item__text f-sh2">
            {{ directionSubtitle }}
          </div>
        </div>
        <div class="grid__top d-f fd-c jc-c dots">
          <span class="psevdo"></span>
          <h2 class="grid__top__title f-h1">{{ title }} <span class="green">{{ titleGreen }}</span></h2>
          <RichtextLexical :content="text" class="grid__top__text" />
        </div>
        <div class="grid__icon dots d-f jc-c ai-c anim2-container" ref="iconSecondContainer" :class="{
          'is-animated-green': isIconSecondVisible,
          'is-hovered': isIconSecondHovered
        }" @mouseenter="handleIconSecondMouseEnter" @mouseleave="handleIconSecondMouseLeave">
          <span class="psevdo"></span>
          <Anim2 class="icon" />
        </div>
        <div class="grid__item dots d-f jc-sb fd-c">
          <span class="psevdo"></span>
          <div class="grid__item__title f-h2">
            {{ schemaTitle }}
          </div>
          <div class="grid__item__text  f-sh2">
            {{ schemaSubtitle }}
          </div>
        </div>
        <div class="grid__icon dots d-f jc-c ai-c anim3-container" ref="iconThirdContainer"
          :class="{ 'is-animated-slide': isIconThirdVisible, 'is-hovered': isIconThirdHovered }"
          @mouseenter="handleIconThirdMouseEnter" @mouseleave="handleIconThirdMouseLeave">
          <span class="psevdo"></span>
          <Anim3 class="icon" />
        </div>
        <div class="grid__item d-f jc-sb fd-c dots">
          <span class="psevdo"></span>
          <div class="grid__item__title f-h2">
            {{ expertsTitle }}
          </div>
          <div class="grid__item__text f-sh2">
            {{ expertsSubtitle }}
          </div>
        </div>
        <CmsLink :link="button" class="grid__btn d-f ai-c jc-sb dots dots-hover btn-green f-b-p1">
          <span class="psevdo"></span>
          {{ button.label }}
          <Arrow class="icon icon-52" />
        </CmsLink>
      </div>
      <div class="grid__partners" v-if="partners.length">
        
        <NuxtMarquee autoFill :speed="30">
          
          <template v-for="(item, id) in partners" :key="id">
            <CmsLink class="grid__partners__item" :link="item.link">
              <img :src="`${payloadUrl}${item.image.url}`" :alt="item.link.label" />
            </CmsLink>
          </template>
        </NuxtMarquee>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.grid {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__content {
    display: grid;
    grid-template-columns: 177px auto 50%;

    @include respond("tab") {
      grid-template-columns: 64px auto;
    }
  }

  &__top {
    grid-row: span 2;
    padding: 40px;

    @include respond("tab") {
      order: 1;
      grid-column: span 2;
      padding: 24px 20px;
    }

    &__title {
      text-transform: uppercase;
      margin-bottom: 28px;

      @include respond("tab") {
        margin-bottom: 20px;
      }
    }

    &__text {
      font-weight: 400;
      font-size: 20px;
      line-height: 1.3;
      letter-spacing: -0.02em;

      @include respond("tab") {
        font-size: 14px;
      }

      :deep(p) {
        margin-bottom: 20px;

        @include respond("tab") {
          margin-bottom: 16px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &__item {
    min-height: 184px;
    padding: 32px 20px;
    text-transform: uppercase;
    height: 100%;

    @include respond("tab") {
      padding: 16px 12px;
      min-height: 84px;
    }

    &__title {
      @include respond("tab") {
        font-size: 20px;
        font-weight: 600;
      }
    }

    &__text {
      @include respond("tab") {
        font-size: 12px;
      }

    }
  }

  &__icon {
    svg {
      width: 110px;
      height: 110px;

      @include respond("tab") {
        width: 40px;
        height: 40px;
      }
    }

    &.anim1-container {

      &.is-animated {
        :deep() {

          .c-right {
            animation: spread-x-pos 1s ease-out 0s forwards;
          }

          .c-left {
            animation: spread-x-neg 1s ease-out 0.1s forwards;
          }

          .c-bottom {
            animation: spread-y-pos 1s ease-out 0.2s forwards;
          }

          .c-top {
            animation: spread-y-neg 1s ease-out 0.3s forwards;
          }

          .c-bottom-right {
            animation: spread-xy-pos 1s ease-out 0.4s forwards;
          }

          .c-bottom-left {
            animation: spread-x-neg-y-pos 1s ease-out 0.5s forwards;
          }

          .c-top-right {
            animation: spread-x-pos-y-neg 1s ease-out 0.6s forwards;
          }

          .c-top-left {
            animation: spread-xy-neg 1s ease-out 0.7s forwards;
          }
        }
      }

      :deep() {
        .animated-icon circle {
          &:not(:first-child) {
            opacity: 0;
          }
        }
      }

      &.is-hovered {
        :deep() {

          .c-right {
            animation: spread-x-pos 1s ease-out 0s forwards;
          }

          .c-left {
            animation: spread-x-neg 1s ease-out 0.1s forwards;
          }

          .c-bottom {
            animation: spread-y-pos 1s ease-out 0.2s forwards;
          }

          .c-top {
            animation: spread-y-neg 1s ease-out 0.3s forwards;
          }

          .c-bottom-right {
            animation: spread-xy-pos 1s ease-out 0.4s forwards;
          }

          .c-bottom-left {
            animation: spread-x-neg-y-pos 1s ease-out 0.5s forwards;
          }

          .c-top-right {
            animation: spread-x-pos-y-neg 1s ease-out 0.6s forwards;
          }

          .c-top-left {
            animation: spread-xy-neg 1s ease-out 0.7s forwards;
          }
        }
      }

    }


    &.anim2-container {

      :deep(path) {
        transform-origin: center center;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;

        position: absolute;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
      }

      &.is-animated-green {
        :deep(path) {
          animation: scale-green-shape 1s ease-out forwards;
        }
      }

      &.is-hovered {
        :deep(path) {
          animation: scale-green-shape 1s ease-out forwards;
        }
      }

    }

    &.anim3-container {

      :deep(.anim3-static) {
        transform: translateY(0) !important;
        opacity: 1 !important;
      }

      :deep(.anim3-move) {
        transform: translateY(100%);
        opacity: 0;
        animation: none;
      }

      &.is-animated-slide {

        :deep(.anim3-move) {
          animation: slide-from-right 0.8s ease-in-out forwards;
        }

        :deep(.left-white) {
          animation-delay: 0.1s;
        }

        :deep(.left-green) {
          animation-delay: 0.2s;
        }
      }


      &.is-hovered {
        :deep(.anim3-move) {
          animation: slide-from-right 0.8s ease-in-out forwards;
        }

        :deep(.left-white) {
          animation-delay: 0.1s;
        }

        :deep(.left-green) {
          animation-delay: 0.2s;
        }
      }
    }
  }

  &__btn {
    width: 100%;
    height: 100%;
    padding: 40px;
    text-transform: uppercase;

    @include respond("tab") {
      order: 2;
      grid-column: span 2;
      padding: 16px;

      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__partners {
    overflow: hidden;
    width: 100%;
    margin-top: 48px;

    @include respond("tab") {
      margin-top: 40px;
    }

    &__track {
      display: flex;
      gap: 142px;
      --scroll-shift: 100vw;
      animation: scroll 20s linear infinite;

      @include respond("tab") {
        gap: 28px;
        animation: scroll 25s linear infinite;
      }
    }

    &__item {
      width: 112px;
      height: 72px;
      flex-shrink: 0;
      margin-right: 142px;

      @include respond("tab") {
        width: 89.6px;
        height: 57.6px;
        margin-right: 28px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateX(100px);
  }

  50% {
    transform: translateX(calc(var(--scroll-shift) * -1 + 100px) );
  }

  50.01% {
    transform: translateX(100px);
  }

  100% {
    transform: translateX(calc(var(--scroll-shift) * -1 + 100px));
  }
}

$distance: 37px;

@keyframes spread-x-pos {
  0% {
    transform: translateX(-$distance);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes spread-x-neg {
  0% {
    transform: translateX($distance);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes spread-y-pos {
  0% {
    transform: translateY(-$distance);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spread-y-neg {
  0% {
    transform: translateY($distance);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes spread-xy-pos {
  0% {
    transform: translate(-$distance, -$distance);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes spread-x-neg-y-pos {
  0% {
    transform: translate($distance, -$distance);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes spread-x-pos-y-neg {
  0% {
    transform: translate(-$distance, $distance);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes spread-xy-neg {
  0% {
    transform: translate($distance, $distance);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

@keyframes scale-green-shape {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slide-from-right {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

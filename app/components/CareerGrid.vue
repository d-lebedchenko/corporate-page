<script setup>
import Anim1 from '~/assets/icons/career-grid-anim-1.svg';
import Anim2 from '~/assets/icons/career-grid-anim-2.svg';
import Anim3 from '~/assets/icons/career-grid-anim-3.svg';
import Anim4 from '~/assets/icons/career-grid-anim-4.svg';
import Anim5 from '~/assets/icons/career-grid-anim-5.svg';
import Arrow from '~/assets/icons/arrow-right.svg';

const AnimComponents = [Anim1, Anim2, Anim3, Anim4, Anim5];
const NUM_ANIMATIONS = AnimComponents.length;

defineProps({
  title: { type: String, default: '' },
  frameworkTitle: { type: String, default: '' },
  frameworkText: { type: String, default: '' },
  communitiesTitle: { type: String, default: '' },
  communitiesText: { type: String, default: '' },
  systemTitle: { type: String, default: '' },
  systemText: { type: String, default: '' },
  supportTitle: { type: String, default: '' },
  supportText: { type: String, default: '' },
  clubsTitle: { type: String, default: '' },
  clubsText: { type: String, default: '' },
});

const sliderRef = ref(null);
const rootRef = ref(null);
const previousRealIndex = ref(0);

useSwiper(sliderRef, {
 effect: 'creative',
 loop: true,
 autoplay: {
  delay: 5000,
 },
 slidesPerView: 2,
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
  0: {
   slidesPerView: 1,
  },
  601: {
   slidesPerView: 2,
  },
 },
});

const slidePrev = () => sliderRef.value?.swiper?.slidePrev()
const slideNext = () => sliderRef.value?.swiper?.slideNext()


const animations = Array.from({ length: NUM_ANIMATIONS }, () => useIconAnimation());

const refAssigned = ref(Array(NUM_ANIMATIONS).fill(false));


const setIconRef = (el, index) => {
  if (el && !refAssigned.value[index]) {
    animations[index].containerRef.value = el;

    refAssigned.value[index] = true;
  }
};

const handleMouseEnter = (index) => {
  const element = animations[index].containerRef.value;

  if (element) {
    animations[index].isVisible.value = false;
    void element.offsetHeight;
  }

  animations[index].handleMouseEnter();
};

const handleMouseLeave = (index) => {
  animations[index].handleMouseLeave();
};

const triggerSlideAnimation = (index) => {
  if (index < 0 || index >= NUM_ANIMATIONS || !animations[index]) return;

  const animation = animations[index];
  const element = animation.containerRef.value;
  if (!element) return;

  animation.isVisible.value = false;
  animation.isHovered.value = false;

  void element.offsetHeight;

  animation.handleMouseEnter();
};

const resetSlideAnimation = (index) => {
  if (index < 0 || index >= NUM_ANIMATIONS || !animations[index]) return;
  animations[index].isVisible.value = false;
  animations[index].isHovered.value = false;
};

const triggerInitialAnimations = (swiperInstance) => {
  const currentRealIndex = swiperInstance.realIndex;
  const slidesPerView = swiperInstance.params.slidesPerView;

  for (let i = 0; i < slidesPerView; i++) {
    const dataIndex = (currentRealIndex + i) % NUM_ANIMATIONS;
    triggerSlideAnimation(dataIndex);
  }
};

const manageAnimations = (swiperInstance) => {
  const currentRealIndex = swiperInstance.realIndex;
  const slidesPerView = swiperInstance.params.slidesPerView;

  const newVisibleIndices = [];
  for (let i = 0; i < slidesPerView; i++) {
    newVisibleIndices.push((currentRealIndex + i) % NUM_ANIMATIONS);
  }

  let slidesToReset = [];

  const prevRealIndex = previousRealIndex.value;

  if (currentRealIndex !== prevRealIndex) {
    slidesToReset.push(prevRealIndex);

    const isNext = currentRealIndex > prevRealIndex || (currentRealIndex === 0 && prevRealIndex === NUM_ANIMATIONS - 1);

    if (isNext) {
      slidesToReset = [prevRealIndex];
    } else {
      slidesToReset = [(currentRealIndex + slidesPerView) % NUM_ANIMATIONS];
    }

    slidesToReset.forEach(index => {
      if (index >= 0 && index < NUM_ANIMATIONS) {
        resetSlideAnimation(index);
      }
    });

    const indexToAnimate = isNext
      ? (currentRealIndex + slidesPerView - 1) % NUM_ANIMATIONS 
      : currentRealIndex;

    triggerSlideAnimation(indexToAnimate);
  }

  previousRealIndex.value = currentRealIndex;
};


onMounted(() => {
  nextTick(() => {
    const swiperInstance = sliderRef.value?.swiper;

    if (swiperInstance) {

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            triggerInitialAnimations(swiperInstance);

            previousRealIndex.value = swiperInstance.realIndex;

            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.5 }
      );

      if (rootRef.value) {
        observer.observe(rootRef.value);
      }

      swiperInstance.on('slideChangeTransitionEnd', () => manageAnimations(swiperInstance));
    }
  });
});
</script>

<template>
  <section class="career-grid" ref="rootRef">
    <div class="container">
      <div class="career-grid__title-wr dots">
        <div class="psevdo"></div>
        <h2 class="career-grid__title green f-h2">{{ title }}</h2>
      </div>
      <div class="career-grid__wr dots">
        <div class="psevdo"></div>

        <div class="career-grid__content">
          <div v-for="(anim, index) in animations" :key="index" class="career-grid__item">

            <div :class="[`anim${index + 1}-container`, 'career-grid__icon dots d-f jc-c ai-c', {
              'is-animated': anim.isVisible.value,
              'is-hovered': anim.isHovered.value
            }]" :ref="el => setIconRef(el, index)" @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave(index)">
              <span class="psevdo"></span>
              <component :is="AnimComponents[index]" class="icon" />
            </div>

            <div class="career-grid__item__title f-sh1 dots d-f ai-c">
              <span class="psevo"></span>
              <template v-if="index === 0">{{ frameworkTitle }}</template>
              <template v-else-if="index === 1">{{ communitiesTitle }}</template>
              <template v-else-if="index === 2">{{ systemTitle }}</template>
              <template v-else-if="index === 3">{{ supportTitle }}</template>
              <template v-else-if="index === 4">{{ clubsTitle }}</template>
            </div>

            <div class="career-grid__item__text f-p2 dots">
              <span class="psevo"></span>
              <template v-if="index === 0">{{ frameworkText }}</template>
              <template v-else-if="index === 1">{{ communitiesText }}</template>
              <template v-else-if="index === 2">{{ systemText }}</template>
              <template v-else-if="index === 3">{{ supportText }}</template>
              <template v-else-if="index === 4">{{ clubsText }}</template>
            </div>
          </div>
        </div>

        <div class="career-grid__content mob">
          <ClientOnly>
            <swiper-container ref="sliderRef">
              <swiper-slide v-for="(anim, index) in animations" :key="index" class="career-grid__slide">
                <div class="career-grid__item">
                  <div :class="[`anim${index + 1}-container`, 'career-grid__icon d-f jc-c ai-c', {
                    'is-animated': anim.isVisible.value,
                    'is-hovered': anim.isHovered.value
                  }]" :ref="el => setIconRef(el, index)" @mouseenter="handleMouseEnter(index)"
                    @mouseleave="handleMouseLeave(index)">
                    <component :is="AnimComponents[index]" class="icon" />
                  </div>

                  <div class="career-grid__item__title f-sh1 d-f ai-c">
                    <template v-if="index === 0">{{ frameworkTitle }}</template>
                    <template v-else-if="index === 1">{{ communitiesTitle }}</template>
                    <template v-else-if="index === 2">{{ systemTitle }}</template>
                    <template v-else-if="index === 3">{{ supportTitle }}</template>
                    <template v-else-if="index === 4">{{ clubsTitle }}</template>
                  </div>

                  <div class="career-grid__item__text f-p2">
                    <template v-if="index === 0">{{ frameworkText }}</template>
                    <template v-else-if="index === 1">{{ communitiesText }}</template>
                    <template v-else-if="index === 2">{{ systemText }}</template>
                    <template v-else-if="index === 3">{{ supportText }}</template>
                    <template v-else-if="index === 4">{{ clubsText }}</template>
                  </div>

                </div>
              </swiper-slide>
            </swiper-container>
          </ClientOnly>

          <div class="career-grid__controls">
            <button class="career-grid__arrow prev dots dots-hover" @click="slidePrev">
              <span class="psevdo"></span>
              <Arrow class="icon green" />
            </button>
            <button class="career-grid__arrow next dots dots-hover" @click="slideNext">
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

.career-grid {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__title {
    &-wr {
      padding: 32px;

      @include respond("tab") {
        padding: 24px 12px;
      }
    }
  }

  &__content {
    display: grid;

    &.mob {
      display: none;
    }

    @include respond("tab") {
      display: none;

      &.mob {
        display: block;
        position: relative;

        &::before {
          width: 1px;
          height: 100%;
          position: absolute;
          content: '';
          left: 50%;
          background-color: $c-steel-grey;

          @include respond("mob") {
            display: none;
          }
        }
      }
    }
  }

  &__left {
    padding: 40px;
    overflow: hidden;
    position: relative;
  }

  &__img {
    position: absolute;
    width: 537px;
    height: 537px;
    right: 22px;
    bottom: -96px;
  }


  &__item {
    display: grid;
    grid-template-columns: 177px auto 50%;

    @include respond("tab") {
      display: flex;
      flex-direction: column;
      padding: 32px 16px;
    }

    &__title {
      padding: 0 40px;
      text-transform: uppercase;

      @include respond("tab") {
        padding: 0;
        margin-bottom: 16px;
        font-size: 20px;
        font-weight: 600;
      }
    }

    &__text {
      padding: 32px 20px;
      color: $c-grey-2;

      @include respond("tab") {
        padding: 0;
        opacity: 1;
      }

    }
  }

  &__icon {
    @include respond("tab") {
      justify-content: start;
    }

    svg {
      width: 64px;
      height: 64px;

      @include respond("tab") {
        width: 48px;
        height: 48px;
        margin-bottom: 64px;
      }
    }

    &.anim1-container {

      :deep() {
        .square-center {
          opacity: 1;
        }

        .square-move {
          animation: none;
          transform: translate(var(--offset-x), var(--offset-y));
        }

        .s-1 {
          --offset-x: 26.3px;
          --offset-y: 26.5px;
        }

        .s-2 {
          --offset-x: 26.3px;
          --offset-y: 0.9px;
        }

        .s-3 {
          --offset-x: 26.3px;
          --offset-y: -24.7px;
        }

        .s-4 {
          --offset-x: 13.7px;
          --offset-y: 13.7px;
        }

        .s-5 {
          --offset-x: 13.7px;
          --offset-y: -11.9px;
        }

        .s-6 {
          --offset-x: 0.9px;
          --offset-y: 26.5px;
        }

        .s-7 {
          --offset-x: 0.9px;
          --offset-y: -24.7px;
        }

        .s-8 {
          --offset-x: -11.7px;
          --offset-y: 13.7px;
        }

        .s-9 {
          --offset-x: -11.7px;
          --offset-y: -10.9px;
        }

        .s-10 {
          --offset-x: -24.5px;
          --offset-y: 26.5px;
        }

        .s-11 {
          --offset-x: -24.5px;
          --offset-y: 0.9px;
        }

        .s-12 {
          --offset-x: -24.5px;
          --offset-y: -24.7px;
        }

      }

      &.is-animated,
      &.is-hovered {
        :deep() {
          .square-move {
            animation: square-retract 0.5s ease-out forwards;
            transform: none;
          }

        }
      }
    }


    &.anim2-container {

      :deep(.icon) {
        transform-origin: 32px 32px;
      }

      :deep() {

        .figure {
          opacity: 0;
          transform: rotate(0deg);
          transform-origin: 32px 32px;
          animation: none;
        }

        .circle-1,
        .circle-2 {
          opacity: 0;
          animation: none;
        }

        .circle-1 {
          --offset-x: -21.7px;
          --offset-y: -21.7px;
          transform: translate(var(--offset-x), var(--offset-y));
        }

        .circle-2 {
          --offset-x: 21.8px;
          --offset-y: 21.8px;
          transform: translate(var(--offset-x), var(--offset-y));
        }

        .circle-green {
          opacity: 1;
        }
      }

      &.is-animated,
      &.is-hovered {
        :deep() {

          .figure {
            animation: rotate-90-reveal 0.6s ease-out forwards;
            animation-delay: 0.1s;
          }

          .circle-1,
          .circle-2 {
            animation: circle-reveal 0.5s ease-out forwards;
            transform: none;
          }

          .circle-1 {
            animation-delay: 0.3s;
          }

          .circle-2 {
            animation-delay: 0.4s;
          }
        }
      }
    }

    &.anim3-container {

      :deep(.half-ring) {
        transform-origin: 32px 32px;
      }

      :deep() {
        .half-ring {
          transform: rotate(90deg);
          animation: none;
        }

        .green-disk {
          animation: none;
          transform: translate(16px, -16px);
        }
      }

      &.is-animated,
      &.is-hovered {
        :deep() {
          .green-disk {
            animation: slide-in-reveal 0.8s ease-in-out forwards;
          }

          .half-ring {
            animation: slide-rotate-reveal 0.8s ease-in-out forwards;
          }
        }
      }
    }

    &.anim4-container {

      :deep() {

        .triangle-left {
          opacity: 0;
          --offset-x: 16px;
          transform: translate(var(--offset-x), 0);
          animation: none;
        }

        .triangle-right {
          opacity: 0;
          --offset-x: -16px;
          transform: translate(var(--offset-x), 0);
          animation: none;
        }

        .underline {
          opacity: 0;
          width: 0;
          transform: none;
          animation: none;
        }
      }

      &.is-animated,
      &.is-hovered {
        :deep() {

          .triangle-left,
          .triangle-right {
            animation: triangle-split 0.7s ease-out forwards;
            transform: none;
          }

          .triangle-left {
            animation-delay: 0.1s;
          }

          .triangle-right {
            animation-delay: 0.1s;
          }

          .underline {
            animation: line-draw 0.4s ease-out forwards;
            animation-delay: 0.3s;
          }
        }
      }
    }

    &.anim5-container {

      :deep() {

        .circle-left,
        .circle-right,
        .circle-top,
        .circle-bottom {
          animation: none;
        }


        .circle-left {
          --offset-x: 19.5px;
          --offset-y: 0px;
          transform: translate(var(--offset-x), var(--offset-y));
        }

        .circle-right {
          --offset-x: -19.5px;
          --offset-y: 0px;
          transform: translate(var(--offset-x), var(--offset-y));
        }

        .circle-top {
          --offset-x: 0px;
          --offset-y: 19.5px;
          transform: translate(var(--offset-x), var(--offset-y));
        }

        .circle-bottom {
          --offset-x: 0px;
          --offset-y: -19.5px;
          transform: translate(var(--offset-x), var(--offset-y));
        }
      }

      &.is-animated,
      &.is-hovered {
        :deep() {

          .circle-left,
          .circle-right,
          .circle-top,
          .circle-bottom {
            animation: circle-blast 0.7s ease-out forwards;
            transform: none;
          }
        }
      }
    }
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

// Anuimations
@keyframes square-retract {
  0% {
    transform: translate(var(--offset-x), var(--offset-y));
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes rotate-90-reveal {
  0% {
    opacity: 0;
    transform: rotate(-90deg);
  }

  100% {
    opacity: 1;
    transform: rotate(0deg);
  }
}

@keyframes circle-reveal {
  0% {
    opacity: 0;
    transform: translate(var(--offset-x), var(--offset-y)) scale(0.5);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

@keyframes slide-in-reveal {
  0% {
    transform: translate(16px, -16px);
  }

  100% {
    transform: translate(0, 0);
  }
}

@keyframes slide-rotate-reveal {
  0% {
    transform: rotate(90deg);
  }

  100% {
    transform: translateX(0) rotate(0deg);
  }
}

@keyframes triangle-split {
  0% {
    opacity: 0;
    transform: translate(var(--offset-x), 0);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes line-draw {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes circle-blast {
  0% {
    transform: translate(var(--offset-x), var(--offset-y));
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>

<script setup>
import Anim1 from '~/assets/icons/career-anim-1-new.svg'
import Anim2 from '~/assets/icons/career-anim-2.svg'
import Anim3 from '~/assets/icons/career-anim-3-new.svg'

defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: Object,
    default: () => ({})
  },
  growTitle: {
    type: String,
    default: ''
  },
  growSubtitle: {
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
  employeesTitle: {
    type: String,
    default: ''
  },
  employeesSubtitle: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  },
  imageMobile: {
    type: Object,
    default: () => ({})
  }
})

// Animation 1
const {
  containerRef: iconFirstContainer,
  isVisible: isIconFirstVisible,
  isHovered: isIconFirstHovered,
  handleMouseEnter: handleIconFirstMouseEnter,
  handleMouseLeave: handleIconFirstMouseLeave,
} = useIconAnimation();

// Animation 2
const {
  containerRef: iconSecondContainer,
  isVisible: isIconSecondVisible,
  isHovered: isIconSecondHovered,
  handleMouseEnter: handleIconSecondMouseEnter,
  handleMouseLeave: handleIconSecondMouseLeave,
} = useIconAnimation();

// Animation 3
const {
  containerRef: iconThirdContainer,
  isVisible: isIconThirdVisible,
  isHovered: isIconThirdHovered,
  handleMouseEnter: handleIconThirdMouseEnter,
  handleMouseLeave: handleIconThirdMouseLeave,
} = useIconAnimation();
</script>

<template>
  <section class="career-stats">
    <div class="container">
      <div class="career-stats__wr dots">
        <div class="psevdo"></div>
        <div class="career-stats__left  d-f fd-c jc-sb">
          <h2 class="career-stats__title f-h1">{{ title }}</h2>

          <RichtextLexical :content="text" class="career-stats__text f-p2" />
          <NuxtPicture
            v-if="image?.url"
            class="career-stats__img hide-tablet"
            :src="`/payload${image.url}`"
            :alt="image.alt || ''"
            width="537"
            height="441"
            fit="inside"
            sizes="537px"
            loading="lazy"
          />
          <NuxtPicture
            v-if="imageMobile?.url"
            class="career-stats__img hide-desctop"
            :src="`/payload${imageMobile.url}`"
            :alt="imageMobile.alt || ''"
            width="210"
            height="210"
            fit="inside"
            sizes="210px"
            loading="lazy"
          />
        </div>
        <div class="career-stats__content">

          <div class="career-stats__icon dots d-f jc-c ai-c anim1-container" ref="iconFirstContainer" :class="{
            'is-animated': isIconFirstVisible,
            'is-hovered': isIconFirstHovered
          }" @mouseenter="handleIconFirstMouseEnter" @mouseleave="handleIconFirstMouseLeave">
            <span class="psevdo"></span>
            <Anim1 class="icon" />
          </div>
          <div class="career-stats__item d-f jc-sb fd-c dots">
            <span class="psevdo"></span>
            <div class="career-stats__item__title f-h2">
              {{ growTitle }}
            </div>
            <div class="career-stats__item__text f-sh1 o-7">
              {{ growSubtitle }}
            </div>
          </div>
          <div class="career-stats__icon dots d-f jc-c ai-c anim2-container" ref="iconSecondContainer" :class="{
            'is-animated': isIconSecondVisible,
            'is-hovered': isIconSecondHovered
          }" @mouseenter="handleIconSecondMouseEnter" @mouseleave="handleIconSecondMouseLeave">
            <span class="psevdo"></span>
            <Anim2 class="icon" />
          </div>
          <div class="career-stats__item dots d-f jc-sb fd-c">
            <span class="psevdo"></span>
            <div class="career-stats__item__title f-h2">
              {{ expertsTitle }}
            </div>
            <div class="career-stats__item__text  f-sh1 o-7">
              {{ expertsSubtitle }}
            </div>
          </div>
          <div class="career-stats__icon dots d-f jc-c ai-c anim3-container" ref="iconThirdContainer"
            :class="{ 'is-animated': isIconThirdVisible, 'is-hovered': isIconThirdHovered }"
            @mouseenter="handleIconThirdMouseEnter" @mouseleave="handleIconThirdMouseLeave">
            <span class="psevdo"></span>
            <Anim3 class="icon" />
          </div>
          <div class="career-stats__item d-f jc-sb fd-c dots">
            <span class="psevdo"></span>
            <div class="career-stats__item__title f-h2">
              {{ employeesTitle }}
            </div>
            <div class="career-stats__item__text f-sh1  o-7">
              {{ employeesSubtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.career-stats {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    border: 1px solid $c-steel-grey;
    background-color: $c-steel-grey;
    .dots {
      background-color: $c-black;
      box-shadow: none;
      margin: 0;
    }

    
    @include respond("tab") {
      grid-template-columns: 1fr;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 177px auto;
    gap: 1px;
    background-color: $c-steel-grey;

    @include respond("tab") {
      grid-template-columns: 64px auto;
    }
  }

  &__left {
    padding: 40px;
    overflow: hidden;
    position: relative;
    background-color: $c-black;
    @include respond("tab") {
      padding: 24px 12px;
    }
  }
  &__title {
    text-transform: uppercase;
    @include respond("tab") {
      margin-bottom: 40px;
    }
  }

  &__text  {
    color: $c-grey-2;
    @include respond("tab") {
      font-size: 14px;
    }
  }

  &__img {
    position: absolute;
    width: 537px;
    height: 441px;
    right: 22px;
    bottom: 0;
    
    @include respond("tab") {
      width: 210px;
      height: 210px; 
      bottom: 15px;
      right: 56px;
    }
    @include respond("mob") {
      top: 0;
      left: 122px;
    }

    &:deep(img) {
      display: block;
      width: 100%;
      height: 100%;
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

      &.is-animated,
      &.is-hovered {
        svg {
          animation: rotate 0.6s ease-out 0s forwards;
        }
      }
    }

    &.anim2-container {

      :deep() {

        .triangle-br,
        .triangle-tr,
        .triangle-tl {
          opacity: 0;
          transform: translate(-20px, 20px);
          transition: none;
          animation: none;
        }

        .triangle-bl {
          opacity: 1;
          transform: translate(0, 0);
        }
      }


      &.is-animated,
      &.is-hovered {
        :deep() {
          .triangle-br {
            animation: triangle-reveal 0.3s ease-out forwards;
            animation-delay: 0.2s;
          }

          .triangle-tr {
            animation: triangle-reveal 0.4s ease-out forwards;
          }

          .triangle-tl {
            animation: triangle-reveal 0.5s ease-out forwards;
            animation-delay: 0.2s;
          }
        }
      }
    }

    &.anim3-container {
      &.is-animated,
      &.is-hovered {
        svg {
          animation: rotate 0.6s ease-out 0s forwards;
        }
      }
    }
  }
}

// Animations
@keyframes rotate {
  0% {
    transform: rotate(0);
    opacity: 0;
  }

  100% {
    transform: rotate(180deg);
    opacity: 1;
  }
}

@keyframes triangle-reveal {
  0% {
    opacity: 0;
    transform: translate(-20px, 20px);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes circle {
  0% {
    transform: none;
  }

  100% {
    transform: scale(0.5);
  }
}
</style>

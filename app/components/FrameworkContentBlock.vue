<script setup>
import ArrowIcon from '~/assets/icons/arrow-up-right.svg'
import Circles from '~/assets/icons/framework-anim/circles.svg'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  button: {
    type: Object,
    default: () => ({}),
  },
  animation: {
    type: String,
    validator(v) {
      return ['circles'].includes(v)
    },
    default: '',
  },
})

const {
  containerRef,
  isVisible,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
} = useIconAnimation()

const componentsMap = {
  circles: Circles,
}

const Icon = computed(() => {
  if (!props.animation) return null

  const loader = componentsMap[props.animation]
  if (!loader) return null

  return loader
})
</script>

<template>
  <div class="framework-content-block">
    <div class="container">
      <div class="framework-content-block__wr">
        <div class="framework-content-block__anim">
          <component
            v-if="Icon"
            :is="Icon"
            ref="containerRef"
            :class="[
              `icon-${animation}`,
              {
                'is-animated': isVisible,
                'is-hovered': isHovered,
              }
            ]"
            aria-hidden="true"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          />
        </div>

        <div class="framework-content-block__text">
          <h2
            v-if="title"
            class="framework-content-block__title f-h2"
          >
            {{ title }}
          </h2>
          <p
            v-if="description"
            class="framework-content-block__descr f-p2 whitespace-pre-line"
          >
            {{ description }}
          </p>

          <CmsLink
            :link="button"
            class="framework-content-block__btn btn-green dots dots-hover d-if ai-c jc-sb f-b-p2"
          >
            <span class="psevdo"></span>
            {{ button.label }}
            <ArrowIcon class="icon icon-32 shrink-0" />
          </CmsLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.framework-content-block {
  background-color: $c-black;
  color: $c-white;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    display: flex;
    gap: 80px;
    align-items: center;
    flex-direction: row-reverse;
    @include respond("tab") {
      gap: 32px;
    }
    @include respond("mob") {
      display: block;
    }
  }

  &__anim {
    flex: 1 1 692px;
    display: flex;
    align-items: center;
    justify-content: center;
    @include respond("tab") {
      flex-basis: 341px;
    }
    @include respond("mob") {
      margin-bottom: 32px;
    }

    svg {
      width: 400px;
      height: 400px;
      @include respond("tab") {
        width: 260px;
        height: 260px;
      }
    }
  }

  &__text {
    flex: 1 1 616px;
    padding-top: 40px;
    @include respond("tab") {
      flex-basis: 341px;
      padding-top: 0;
    }
  }

  &__title {
    color: $c-green;
    margin-bottom: 32px;
    text-transform: uppercase;
    @include respond("tab") {
      margin-bottom: 24px;
    }
  }

  &__descr {
    margin-bottom: 40px;
    @include respond("tab") {
      margin-bottom: 28px;
    }
  }

  &__btn {
    gap: 24px;
    padding: 32px 40px;
    text-transform: uppercase;
    @include respond("tab") {
      width: 100%;
      gap: 32px;
      padding: 16px;
      font-size: 20px;
    }

    svg {
      @include respond("tab") {
        width: 24px;
        height: 24px;
      }
    }
  }
}

.icon-circles {
  &.is-animated,
  &.is-hovered {
    :deep(path) {
      &:not(.green-circle) {
        transform-origin: center bottom;
        animation: circles 0.6s ease-out 0s forwards;
      }
    }
  }
}

@keyframes circles {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
</style>

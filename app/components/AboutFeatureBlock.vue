<script setup>
const props = defineProps({
  animation: {
    type: String,
    validator(v) {
      return ['cross', 'square', 'petal', 'capsules', 'circles'].includes(v)
    },
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  points: {
    type: Array,
    default: () => []
  },
  highlights: {
    type: Array,
    default: () => []
  },
  person: {
    type: Object,
    default: () => ({})
  },
})

const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const {
  containerRef,
  isVisible,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
} = useIconAnimation()

const componentsMap = {
  cross: () => import('~/assets/icons/about-us-anim/cross.svg'),
  square: () => import('~/assets/icons/about-us-anim/square.svg'),
  petal: () => import('~/assets/icons/about-us-anim/petal.svg'),
  capsules: () => import('~/assets/icons/about-us-anim/capsules.svg'),
  circles: () => import('~/assets/icons/about-us-anim/circles.svg'),
}

const Icon = computed(() => {
  if (!props.animation) return null

  const loader = componentsMap[props.animation]
  if (!loader) return null

  return defineAsyncComponent(() => loader())
})
</script>

<template>
  <div class="about-feature-block">
    <div class="container">
      <div class="about-feature-block__inner">
        <div class="about-feature-block__anim">
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

        <div class="about-feature-block__text">
          <div
            v-if="title || description"
            class="about-feature-block__text-head"
          >
            <h2
              v-if="title"
              class="about-feature-block__title f-h2"
            >
              {{ title }}
            </h2>

            <p
              v-if="description"
              class="about-feature-block__descr f-p2 whitespace-pre-line"
            >
              {{ description }}
            </p>
          </div>

          <ul
            v-if="points?.length"
            class="about-feature-block__points f-p2"
          >
            <li
              v-for="item in points"
              class="whitespace-pre-line"
              :key="item.id"
            >
              {{ item.text }}
            </li>
          </ul>

          <ul
            v-if="highlights?.length"
            class="about-feature-block__highlights f-sh2"
          >
            <li v-for="item in highlights" :key="item.id">
              {{ item.text }}
            </li>
          </ul>

          <div
            v-if="person && (person.avatar?.url || person.name || person.position)"
            class="about-feature-block__person"
          >
            <div
              v-if="person.avatar?.url"
              class="about-feature-block__person-img"
            >
              <img
                :src="`${payloadUrl}${person.avatar?.url}`"
                :alt="person.avatar?.alt"
                width="64"
                height="64"
              >
            </div>

            <div class="about-feature-block__person-info">
              <p
                v-if="person.name"
                class="about-feature-block__person-name f-sh2"
              >
                {{ person.name }}
              </p>
              <p
                v-if="person.position"
                class="about-feature-block__person-position f-p4"
              >
                {{ person.position }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.about-feature-block {
  background-color: $c-black;
  color: $c-white;

  &__inner {
    display: flex;
    gap: 32px;
    padding: 20px 0;
    border-bottom: 1px solid $c-steel-grey;
    @include respond("tab") {
      display: block;
      padding: 16px 0;
    }
  }

  &__anim {
    flex: 1 1 660px;
    padding: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    @include respond("tab") {
      justify-content: flex-start;
      padding-bottom: 0;
      margin-bottom: 36px;
    }

    svg {
      width: 386px;
      height: 386px;
      color: $c-steel-grey;
      @include respond("tab") {
        width: 102px;
        height: 102px;
        color: inherit;
        :deep(path) {
          stroke-width: 1px;
        }
      }
    }
  }

  &__text {
    flex: 1 1 693px;
    padding: 32px 0;
    @include respond("tab") {
      padding: 0;
    }

    &-head {
      &:not(:last-child) {
        margin-bottom: 40px;
        @include respond("tab") {
          margin-bottom: 36px;
        }
      }
    }
  }

  &__title {
    text-transform: uppercase;
    &:not(:last-child) {
      margin-bottom: 12px;
      @include respond("tab") {
        margin-bottom: 8px;
      }
    }
  }

  &__points {
    @include respond("tab") {
      font-size: 14px;
    }

    &:not(:last-child) {
      margin-bottom: 40px;
      @include respond("tab") {
        margin-bottom: 32px;
      }
    }

    li {
      position: relative;
      padding-left: 1.5em;
      margin-bottom: 16px;
      @include respond("tab") {
        margin-bottom: 12px;
      }

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

  &__highlights {
    text-transform: uppercase;
    border-top: 1px solid $c-steel-grey;
    @include respond("tab") {
      border-width: 0;
    }

    &:not(:last-child) {
      margin-bottom: 40px;
      @include respond("tab") {
        margin-bottom: 36px;
      }
    }

    li {
      padding: 16px 0;
      border-bottom: 1px solid $c-steel-grey;
      @include respond("tab") {
        padding: 12px 0;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          padding-bottom: 0;
          border-bottom-width: 0;
        }
      }
    }
  }

  &__person {
    display: flex;
    align-items: center;
    gap: 24px;
    @include respond("tab") {
      padding-bottom: 32px;
    }

    &-img {
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      @include respond("tab") {
        width: 64px;
        height: 64px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &-info {
      flex: 1;
    }

    &-name {
      text-transform: uppercase;
      &:not(:last-child) {
        margin-bottom: 12px;
        @include respond("tab") {
          margin-bottom: 4px;
        }
      }
    }

    &-position {
      @include respond("tab") {
        font-size: 12px;
      }
    }
  }
}

.icon-cross,
.icon-petal {
  &.is-animated,
  &.is-hovered {
    animation: rotate 0.6s ease-out 0s forwards;
  }
}

.icon-square {
  &.is-animated,
  &.is-hovered {
    :deep(path):last-child {
      transform-origin: center;
      animation: scale 0.6s ease-out 0s forwards;
    }
  }
}

.icon-capsules {
  &.is-animated,
  &.is-hovered {
    :deep(path) {
      &:first-child {
        animation: capsule-top 0.6s ease-out 0s forwards;
      }
      &:last-child {
        animation: capsule-bottom 0.6s ease-out 0s forwards;
      }
    }
  }
}

.icon-circles {
  &.is-animated,
  &.is-hovered {
    :deep(path) {
      &:nth-child(1) {
        animation: circle-top-left 0.6s ease-out 0s forwards;
      }
      &:nth-child(2) {
        animation: circle-top-right 0.6s ease-out 0s forwards;
      }
      &:nth-child(3) {
        animation: circle-bottom-right 0.6s ease-out 0s forwards;
      }
      &:nth-child(4) {
        animation: circle-bottom-left 0.6s ease-out 0s forwards;
      }
    }
  }
}

@keyframes rotate {
  100% { transform: rotate(-90deg); }
}

@keyframes scale {
  100% { transform: scale(2.0209); }
}

@keyframes capsule-top {
  100% { transform: translateY(-25%); }
}
@keyframes capsule-bottom {
  100% { transform: translateY(25%); }
}

@keyframes circle-top-left {
  100% { transform: translateX(-35%) translateY(-35%); }
}
@keyframes circle-top-right {
  100% { transform: translateX(35%) translateY(-35%); }
}
@keyframes circle-bottom-right {
  100% { transform: translateX(35%) translateY(35%); }
}
@keyframes circle-bottom-left {
  100% { transform: translateX(-35%) translateY(35%); }
}
</style>

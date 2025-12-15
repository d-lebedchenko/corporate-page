<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: Object,
    default: () => ({})
  },
})

const titleFirst = computed(() => {
  if (!props.title || typeof props.title !== 'string') return ''
  return props.title.trim().split(' ').slice(0, 2).join(' ')
})

const titleRest = computed(() => {
  if (!props.title || typeof props.title !== 'string') return ''
  return props.title.trim().split(' ').slice(2).join(' ')
})
</script>

<template>
  <div class="framework-main-block">
    <div class="container">
      <div class="framework-main-block__wr">
        <NuxtPicture
          v-if="image?.url"
          class="framework-main-block__left"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          :width="image.width"
          :height="image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:516px"
        />

        <div class="framework-main-block__right">
          <h1
            v-if="title"
            class="framework-main-block__title f-a3"
          >
            <span class="first">{{ titleFirst }}</span>
            {{ titleRest }}
          </h1>
          <p
            v-if="description"
            class="framework-main-block__descr f-p2 whitespace-pre-line"
          >
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.framework-main-block {
  background-color: $c-black;
  color: $c-white;
  padding: 60px 0 70px;
  overflow: hidden;
  @include respond("tab") {
    padding: 32px 0 40px;
  }

  &__wr {
    position: relative;
    display: flex;
    gap: 32px;
    @include respond("tab") {
      display: block;
    }
  }

  &__left {
    display: block;
    flex: 0 0 50%;
    min-height: 460px;
    @include respond("tab") {
      min-height: auto;
      margin-bottom: 20px;
    }

    &:deep(img) {
      display: block;
      max-width: 516px;
      margin-left: auto;
      width: 100%;
      height: 100%;
      object-fit: cover;
      @include respond("tab") {
        max-width: none;
        margin-left: 0;
        height: 300px;
      }
      @include respond("mob") {
        height: auto;
        aspect-ratio: 345 / 307;
      }
    }
  }

  &__right {
    flex: 1;
    padding-top: 24px;
    @include respond("tab") {
      padding-top: 0;
    }
  }

  &__title {
    padding-top: 0.95em;
    padding-left: 66px;
    text-transform: uppercase;
    @include respond("tab") {
      padding-top: 0;
      padding-left: 0;
      font-size: 32px;
      line-height: 1.25;
    }

    .first {
      position: absolute;
      top: 24px;
      left: 0;
      white-space: nowrap;
      width: calc(50% + (32px + 66px));
      text-align: right;
      @include respond("tab") {
        position: static;
        white-space: normal;
        width: auto;
        text-align: left;
      }
    }
  }

  &__descr {
    color: $c-grey-2;
    &:not(:first-child) {
      margin-top: 40px;
      @include respond("tab") {
        margin-top: 16px;
        font-weight: 500;
      }
    }
  }
}
</style>

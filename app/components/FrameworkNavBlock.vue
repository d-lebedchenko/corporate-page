<script setup>
import ArrowIcon from '~/assets/icons/arrow-up-right.svg'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="framework-nav-block">
    <div class="container">
      <h2
        v-if="title"
        class="framework-nav-block__title f-h2"
      >
        {{ title }}
      </h2>

      <div
        v-if="items?.length"
        class="framework-nav-block__list"
      >
        <CmsLink
          v-for="item in items"
          class="framework-nav-block__item f-h3"
          :link="item.link"
          :key="item.id"
        >
          {{ item.link.label }}

          <span class="framework-nav-block__item-right">
            <span class="framework-nav-block__item-review f-b-p3">
              {{ $t('framework_nav_block.review') }}
            </span>
            <ArrowIcon class="icon-22" />
          </span>
        </CmsLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
@use "@/assets/scss/functions" as *;

.framework-nav-block {
  background-color: $c-black;
  color: $c-white;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__title {
    text-transform: uppercase;
  }

  &__list {
    margin-top: 64px;
    display: flex;
    gap: 0 24px;
    flex-wrap: wrap;
    @include respond("tab") {
      margin-top: 24px;
    }
    @include respond("mob") {
      display: block;
    }
  }

  &__item {
    flex: 0 0 percent-width-with-gap(2, 24px);
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
    border-bottom: 1px solid $c-white;
    text-transform: uppercase;
    transition: color 0.3s;
    @include respond("tab") {
      font-size: 18px;
      font-weight: 400;
      padding: 18px 16px 18px 0;
    }

    &-right {
      opacity: 0;
      color: $c-green;
      flex-shrink: 0;
      display: flex;
      gap: 16px;
      align-items: center;
      transition: opacity 0.3s;
      @include respond("tab") {
        opacity: 1;
      }
    }

    &-review {
      font-family: 'Manrope', sans-serif;
      @include respond("tab") {
        display: none;
      }
    }

    svg {
      @include respond("tab") {
        width: 20px;
        height: 20px;
      }
    }

    &:hover {
      color: $c-green;
      .framework-nav-block__item-right {
        opacity: 1;
      }
    }
  }
}
</style>

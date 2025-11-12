<script setup>
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
  <div class="framework-why-block">
    <div class="container">
      <div
        v-if="title"
        class="framework-why-block__head dots"
      >
        <div class="psevdo" />
        <h2 class="framework-why-block__title f-h2">
          {{ title }}
        </h2>
      </div>

      <div
        v-if="items?.length"
        class="framework-why-block__list dots"
      >
        <div class="psevdo" />
        <div
          v-for="(item, index) in items"
          class="framework-why-block__list-item dots"
          :key="item.id"
        >
          <div class="psevdo" />
          <div class="framework-why-block__list-item-num dots">
            <div class="psevdo" />
            <p class="f-h3">
              {{ index < 9 ? '0' : '' }}{{ index + 1 }}
            </p>
          </div>
          <p class="framework-why-block__list-item-descr f-p3 whitespace-pre-line">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.framework-why-block {
  background-color: $c-black;
  color: $c-white;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__head {
    padding: 20px 32px;
    @include respond("tab") {
      padding: 24px 12px;
    }
  }

  &__title {
    text-transform: uppercase;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    @include respond("tab") {
      display: block;
    }

    &-item {
      flex: 0 0 50%;
      padding: 32px;
      @include respond("tab") {
        padding: 0;
        display: flex;
      }

      &-num {
        margin-bottom: 36px;
        @include respond-min("tab") {
          outline: none;
          .psevdo,
          &:before,
          &:after {
            display: none;
          }
        }
        @include respond("tab") {
          flex: 0 0 48px;
          padding: 16px 0;
          margin-bottom: 0;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      &-descr {
        @include respond("tab") {
          flex: 1;
          padding: 16px 12px;
          align-self: center;
        }
      }
    }
  }
}
</style>

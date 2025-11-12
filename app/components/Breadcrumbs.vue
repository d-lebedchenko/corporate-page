<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
    default: () => [],
    // Приклад структури елемента: { label: 'Головна', type: 'custom', url: '/' }
  },
})
</script>

<template>
  <div class="breadcrumbs f-p1">
    <div class="container">
      <ul class="breadcrumbs__list">
        <li v-for="(item, index) in list" :key="index" class="breadcrumbs__item">

          <CmsLink v-if="index < list.length - 1" :link="item.link" class="breadcrumbs__link clickable f-p4 o-4">
            {{ item.link.label }}
          </CmsLink>

          <span v-else class="breadcrumbs__text f-p4 o-7">
            {{ item.link.label }}
          </span>

          <span v-if="index < list.length - 1" class="breadcrumbs__separator f-p4 o-4">
            /
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.breadcrumbs {
  background-color: $c-black;
  color: $c-white;
  padding-top: 28px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;

    @include respond("tab") {
      span {
        font-size: 14px;
      }
    }

    &:last-child {
      flex: 1;
      overflow: hidden;
    }
  }

  &__link {
    text-decoration: none;
    color: inherit;
    @include respond("tab") {
      font-size: 14px;
    }
  }

  &__text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__separator {
    margin-left: 12px;
    margin-right: 12px;
    user-select: none;
    opacity: 0.5;
  }
}
</style>
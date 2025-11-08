<script setup>
import RichtextLexical from './RichtextLexical'
import ChevronIcon from '~/assets/icons/chevron-down.svg'

const props = defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
})

const isSidebarOpen = ref(false)

const sidebarItems = computed(() => {
  if (!props?.sections?.length) return []
  return props.sections
    .filter((s) => s.title)
    .map((s) => ({
      id: s.id,
      title: s.title,
    }))
})

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="post-content-block">
    <div class="container">
      <div
        v-if="sections?.length"
        class="post-content-block__wr"
      >
        <div
          v-if="sidebarItems?.length"
          class="post-content-block__left"
        >
          <div class="post-content-block__sidebar">
            <button
              :class="[
                'post-content-block__sidebar-toggle f-sh2',
                { active: isSidebarOpen },
              ]"
              type="button"
              @click="toggleSidebar"
            >
              {{ $t('post_content_block.contents') }}
              <ChevronIcon />
            </button>

            <TransitionExpand>
              <div
                v-show="isSidebarOpen"
                class="post-content-block__sidebar-list"
              >
                <button
                  v-for="(item, index) in sidebarItems"
                  :class="[
                    'post-content-block__sidebar-item f-sh2 dots dots-hover',
                    { active: index === 0 },
                  ]"
                  type="button"
                  :key="item.id"
                >
                  <span class="psevdo"></span>
                  {{ item.title }}
                </button>
              </div>
            </TransitionExpand>
          </div>
        </div>

        <div class="post-content-block__right">
          <div
            v-for="section in sections"
            :class="[
              'post-content-block__section',
              {
                'bigger-mb': section.biggerMarginBottom,
              },
            ]"
            :key="section.id"
          >
            <h2
              v-if="section.title"
              class="post-content-block__title f-h3"
            >
              {{ section.title }}
            </h2>

            <RichtextLexical
              v-if="lexicalHasText(section.text)"
              :content="section.text"
              class="post-content-block__richtext f-p2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.post-content-block {
  background-color: $c-black;
  color: $c-white;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    display: flex;
    gap: 92px;
    @include respond("tab") {
      display: block;
    }
  }

  &__left {
    position: relative;
    flex: 0 0 600px;
    @include respond("tab") {
      margin-bottom: 80px;
    }
    @include respond("mob") {
      margin-bottom: 60px;
    }
  }
  
  &__sidebar {
    position: sticky;
    top: 0;
    @include respond("tab") {
      position: static;
      border: 1px solid $c-steel-grey;
    }

    &-toggle {
      display: none;
      @include respond("tab") {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        text-transform: uppercase;
      }

      svg {
        width: 24px;
        height: 24px;
        transition: transform 0.3s;
      }

      &.active svg {
        transform: rotate(180deg);
      }
    }

    &-list {
      @include respond-min("tab") {
        display: block !important;
      }
    }

    &-item {
      display: block;
      width: 100%;
      padding: 32px;
      text-align: left;
      text-transform: uppercase;
      transition: font-size 0.3s, color 0.3s;
      @include respond("tab") {
        padding: 16px 12px;
        border-top: 1px solid $c-steel-grey;
      }

      &.dots {
        @include respond("tab") {
          outline: none;
          .psevdo,
          &:before,
          &:after {
            display: none;
          }
        }
      }

      &.active {
        @include respond-min("tab") {
          font-size: 35px;
          color: $c-green;
        }
      }
    }
  }

  &__right {
    flex: 1;
  }

  &__section {
    &:not(:last-child) {
      margin-bottom: 52px;
      @include respond("tab") {
        margin-bottom: 32px;
      }
    }

    &.bigger-mb {
      &:not(:last-child) {
        margin-bottom: 80px;
        @include respond("tab") {
          margin-bottom: 48px;
        }
      }
    }
  }

  &__title {
    text-transform: uppercase;
    &:not(:last-child) {
      margin-bottom: 32px;
      @include respond("tab") {
        margin-bottom: 20px;
      }
    }
  }

  &__richtext {
    @include respond("tab") {
      font-size: 14px;
    }

    :deep(ul),
    :deep(ol) {
      margin: 1em 0;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

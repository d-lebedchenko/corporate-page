<script setup>
import { slugify } from 'transliteration'
import RichtextLexical from './RichtextLexical'
import ChevronIcon from '~/assets/icons/chevron-down.svg'

const props = defineProps({
  sections: {
    type: Array,
    default: () => [],
  },
})

const HEADER_OFFSET = 64

const isSidebarOpen = ref(false)
const activeId = ref(getInitialActiveId(props.sections))

const sectionEls = shallowRef([])

function getInitialActiveId(sections) {
  if (!Array.isArray(sections) || !sections.length) return ''
  const first = sections.find(s => s?.title)
  return first ? getSectionId(first) : ''
}

function getSectionId(section) {
  if (section?.title) return slugify(`section-${section.title}`)
  if (section?.id) return String(`section-${section.id}`)
  return ''
}

const sidebarItems = computed(() => {
  if (!Array.isArray(props.sections) || !props.sections.length) return []
  return props.sections
    .filter(s => s?.title)
    .map(s => ({ id: getSectionId(s), title: s.title }))
})

function collectSectionEls() {
  if (typeof document === 'undefined') return
  sectionEls.value = Array.from(
    document.querySelectorAll('.post-content-block__section[id]')
  )
}

function updateActiveSection() {
  if (!sectionEls.value.length) return

  const y = window.scrollY
  let current = sectionEls.value[0]

  for (const el of sectionEls.value) {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    if (top <= y + 1) current = el
    else break
  }

  if (current && current.id && activeId.value !== current.id) {
    activeId.value = current.id
  }
}

function scrollToSection(id) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

let ticking = false
function onScrollOrResize() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateActiveSection()
    ticking = false
  })
}

onMounted(() => {
  collectSectionEls()
  updateActiveSection()

  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize)
  window.removeEventListener('resize', onScrollOrResize)
})

watch(
  () => props.sections,
  () => {
    activeId.value = getInitialActiveId(props.sections)
    nextTick(() => {
      collectSectionEls()
      updateActiveSection()
    })
  },
  { deep: true }
)
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
                <a
                  v-for="item in sidebarItems"
                  :key="item.id"
                  :href="`#${item.id}`"
                  :class="[
                    'post-content-block__sidebar-item f-sh2 dots dots-hover',
                    { active: activeId === item.id },
                  ]"
                  @click.prevent="scrollToSection(item.id)"
                >
                  <span class="psevdo"></span>
                  {{ item.title }}
                </a>
              </div>
            </TransitionExpand>
          </div>
        </div>

        <div class="post-content-block__right">
          <div
            v-for="section in sections"
            :key="section.id"
            :id="section.title ? getSectionId(section) : undefined"
            :class="[
              'post-content-block__section',
              { 'bigger-mb': section.biggerMarginBottom },
            ]"
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
    top: 64px;
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
      transition:
        font-size 0.3s,
        color 0.3s,
        background-color 0.3s ease-in-out,
        outline 0.3s ease-in-out;
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

      &.dots-hover {
        @include respond("tab") {
          &:hover {
            background-color: transparent;
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

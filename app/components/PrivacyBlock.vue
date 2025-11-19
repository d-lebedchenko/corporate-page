<script setup>
import { slugify } from 'transliteration'
import ChevronIcon from '~/assets/icons/chevron-down.svg'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: String,
    default: ''
  },
  sections: {
    type: Array,
    default: () => []
  },
  publishedAt: {
    type: String,
    default: ''
  },
  footnote: {
    type: String,
    default: ''
  }
})
const HEADER_OFFSET = 100
const formatIsoDate = (dateString) => {
  if (!dateString) {
    return ''
  }
  
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      console.error('Недійсний рядок дати:', dateString)
      return dateString
    }
    
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  } catch (e) {
    console.error('Помилка форматування дати:', e)
    return dateString
  }
}
const formattedPublishedAt = computed(() => {
    const dateToFormat = props.publishedAt;
    
    if (!dateToFormat) {
        return '';
    }
    
    return formatIsoDate(dateToFormat);
})


const isSidebarOpen = ref(true)
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
    document.querySelectorAll('.privacy__section[id]')
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
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
    isSidebarOpen.value = false;
  }
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
  <div class="privacy">
    <div class="container">
      <h1 class="privacy__title f-a3">{{ title }}</h1>
      <p class="privacy__last-updated f-h3">{{ lastUpdated + ' ' + formattedPublishedAt }}</p>
      <div v-if="sections?.length" class="privacy__wr">
        <div v-if="sidebarItems?.length" class="privacy__left">
          <div class="privacy__sidebar">
            <button :class="[
              'privacy__sidebar-toggle f-h3',
              { active: isSidebarOpen },
            ]" type="button" @click="toggleSidebar">
              {{ $t('post_content_block.contents') }}
              <ChevronIcon />
            </button>

            <TransitionExpand>
              <div v-show="isSidebarOpen" class="privacy__sidebar-list">
                <a v-for="item in sidebarItems" :key="item.id" :href="`#${item.id}`" :class="[
                  'privacy__sidebar-item f-p2',
                  { active: activeId === item.id },
                ]" @click.prevent="scrollToSection(item.id)">
                  <span class="psevdo"></span>
                  {{ item.title }}
                </a>
              </div>
            </TransitionExpand>
          </div>
        </div>

        <div class="privacy__right">
          <div v-for="section in sections" :key="section.id" :id="section.title ? getSectionId(section) : undefined"
            :class="[
              'privacy__section',
              { 'bigger-mb': section.biggerMarginBottom },
            ]">
            <h2 v-if="section.title" class="privacy__right__title f-h2">
              {{ section.titleContent || section.title }}
            </h2>

            <RichtextLexical v-if="lexicalHasText(section.text)" :content="section.text"
              class="privacy__richtext f-p2" />
          </div>
          
            <p v-if="footnote" class="privacy__footnote f-h2 green">{{ footnote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.privacy {
  background-color: $c-black;
  color: $c-white;
  padding: 28px 0 140px;

  @include respond("tab") {
    padding: 16px 0 40px;
  }

  &__title {
    text-transform: uppercase;
    margin-bottom: 16px;
    @include respond("tab") {
      font-size: 48px;
      margin-bottom: 4px;
    }
  }
  &__last-updated {
    color: #989898;
    margin-bottom: 140px;
    text-transform: uppercase;

    @include respond("tab") {
      margin-bottom: 80px;
    }
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
    top: 80px;

    @include respond("tab") {
      position: static;
    }

    &-toggle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 18px 32px;
      text-align: left;
      text-transform: uppercase;
      outline: 1px solid $c-steel-grey;
      
      @include respond("tab") {
        padding: 12px;
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

    &-item {
      display: block;
      width: 100%;
      padding: 18px 32px;
      text-align: left;

      outline: 1px solid $c-steel-grey;
      transition: 0.3s color ease-in-out;

      @include respond("tab") {
        padding: 12px;
        border-top: 1px solid $c-steel-grey;
        font-weight: 500;
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
          font-weight: 700;
          color: $c-green;
        }
      }
    }
  }

  &__right {
    flex: 1;


    &__title {
      text-transform: uppercase;

      &:not(:last-child) {
        margin-bottom: 32px;

        @include respond("tab") {
          margin-bottom: 20px;
        }
      }
    }

  }

  &__section {
    &:not(:last-child) {
      margin-bottom: 80px;

      @include respond("tab") {
        margin-bottom: 48px;
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

    :deep(h3) {
      text-transform: uppercase;
      font-family: 'Oswald', sans-serif;
      font-weight: 400;
      font-size: 24px;
      line-height: 125%;
      letter-spacing: 0;
      margin-top: 52px;
      margin-bottom: 20px;

      @include respond("tab") {
        font-size: 18px;
        margin-top: 32px;
        margin-bottom: 12px;
      }
    }
  }
}
</style>

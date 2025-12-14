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

// === State Management ===
const isSidebarOpen = ref(true)
const activeId = ref(getInitialActiveId(props.sections))

// === Helper Functions ===

function formatIsoDate(dateString) {
  if (!dateString) return ''
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

// === Computed Properties ===

const formattedPublishedAt = computed(() => {
  return formatIsoDate(props.publishedAt)
})

const sidebarItems = computed(() => {
  if (!Array.isArray(props.sections) || !props.sections.length) return []
  return props.sections
    .filter(s => s?.title)
    .map(s => ({ id: getSectionId(s), title: s.title }))
})

/**
 * NEW: Обчислює активну секцію на основі activeId.
 * Це використовується для відображення вмісту в блоці privacy__right.
 */
const activeSection = computed(() => {
  if (!activeId.value) return null
  return props.sections.find(s => getSectionId(s) === activeId.value)
})

// === User Actions ===

/**
 * NEW: Оновлює ID активної секції при кліку.
 * Scroll logic is removed.
 */
function selectSection(id) {

  activeId.value = id
  if (typeof document !== 'undefined') {
    // Шукаємо контейнер, який відображає вміст
    const contentEl = document.querySelector('.privacy__right')
    if (contentEl) {
      // Обчислюємо позицію скролу з урахуванням фіксованого заголовка
      const top = contentEl.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: top, behavior: 'smooth' })
    }
  }
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

// === Lifecycle Hooks ===

onMounted(() => {
  // Закриваємо бічну панель на мобільних за замовчуванням
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
    isSidebarOpen.value = false
  }
  // No scroll listeners needed anymore
})

// Спостерігаємо за зміною секцій та встановлюємо початковий активний ID, якщо дані оновлюються
watch(
  () => props.sections,
  () => {
    activeId.value = getInitialActiveId(props.sections)
  },
  { deep: true }
)
</script>

<template>
  <div class="privacy">
    <div class="container">
      <h1 class="privacy__title f-a2">{{ title }}</h1>
      <p class="privacy__last-updated f-h3">{{ lastUpdated + ' ' + formattedPublishedAt }}</p>
      <div v-if="sections?.length" class="privacy__wr dots">
        <span class="psevdo"></span>
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
              <div v-show="isSidebarOpen" class="privacy__sidebar-list dots">
                <span class="psevdo"></span>
                <a v-for="item in sidebarItems" :key="item.id" :href="`#${item.id}`" :class="[
                  'privacy__sidebar-item f-sh1',
                  { active: activeId === item.id },
                ]" @click.prevent="selectSection(item.id)">
                  <span class="psevdo"></span>
                  {{ item.title }}
                </a>
              </div>
            </TransitionExpand>
          </div>
        </div>

        <div class="privacy__right dots">
          <spn class="psevdo"></spn>
          <!-- <div v-for="section in sections" :key="section.id" :id="section.title ? getSectionId(section) : undefined"
            :class="[
              'privacy__section',
              { 'bigger-mb': section.biggerMarginBottom },
            ]">
            <h2 v-if="section.title" class="privacy__right__title f-h2">
              {{ section.titleContent || section.title }}
            </h2>

            <RichtextLexical v-if="lexicalHasText(section.text)" :content="section.text"
              class="privacy__richtext f-p2" />
          </div> -->

          <div v-if="activeSection" 
               :key="activeSection.id" 
               :id="getSectionId(activeSection)"
               :class="[
                 'privacy__section',
                 { 'bigger-mb': activeSection.biggerMarginBottom },
               ]">
            
            <h2 v-if="activeSection.title" class="privacy__right__title f-h2">
              {{ activeSection.titleContent || activeSection.title }}
            </h2>

            <!-- Припускаємо, що RichtextLexical і lexicalHasText доступні -->
            <RichtextLexical v-if="lexicalHasText(activeSection.text)" :content="activeSection.text"
              class="privacy__richtext f-p2" />
          </div>

        </div>
      </div>
      
          <p  v-if="footnote" class="privacy__footnote f-h2 green">{{ footnote }}</p>
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
    // gap: 92px;

    @include respond("tab") {
      display: block;
    }
  }

  &__left {
    position: relative;
    flex: 0 0 600px;

    @include respond("tab") {
      // margin-bottom: 80px;
    }

    @include respond("mob") {
      // margin-bottom: 60px;
    }
  }

  &__sidebar {
    // position: sticky;
    // top: 80px;

    @include respond("tab") {
      position: static;
    }

    &-toggle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 26px 32px;
      text-align: left;
      text-transform: uppercase;
      outline: 1px solid $c-steel-grey;

      @include respond("tab") {
        padding: 15.5px 20px;
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
      padding: 29px 32px;
      text-align: left;

      outline: 1px solid $c-steel-grey;
      transition: 0.3s color ease-in-out;
      text-transform: uppercase;

      @include respond("tab") {
        padding: 16.5px 20px;
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
        color: $c-green;
        @include respond-min("tab") {
          font-weight: 700;
        }
      }
    }
  }

  &__right {
    flex: 1;
    padding: 52px 40px 52px 52px;


    @include respond("tab") {
      padding: 32px 20px;
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
    color: $c-grey-2;
    @include respond("tab") {
      font-size: 14px;
    }

    :deep(h1) {
      margin: 2em 0 0.8em;
    }

    :deep(h2) {
      margin: 80px 0 32px;
      @include respond("tab") {
        margin: 48px 0 20px;
      }
    }

    :deep(h3) {
      margin: 52px 0 20px;
      @include respond("tab") {
        margin: 32px 0 12px;
      }
    }

    :deep(p),
    :deep(ul),
    :deep(ol) {
      margin: 1em 0;
    }

    :deep(ul) {
      &:has(li :is(strong, em)) li {
        margin: 1em 0;
        @include respond("tab") {
          margin: 12px 0;
        }
      }
    }

    :deep(*) {
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__footnote {
    margin-top: 32px;
  }
}
</style>

<script setup>
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue'
import RichtextLexical from './RichtextLexical'
import Arrow from '~/assets/icons/chevron-down.svg'
import Check from '~/assets/icons/check.svg'
import ArrowLeft from '~/assets/icons/arrow-left.svg'
import ArrowRight from '~/assets/icons/arrow-right.svg'


const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL
const containerRef = ref(null)

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const selectedCat = ref(null)
const selectedSubcat = ref(null)
const currentSlide = ref(0)

const isCatDropdownOpen = ref(false)
const isSubcatDropdownOpen = ref(false)

const toggleCatDropdown = () => {
  isCatDropdownOpen.value = !isCatDropdownOpen.value
  isSubcatDropdownOpen.value = false
}
const toggleSubcatDropdown = () => {
  isSubcatDropdownOpen.value = !isSubcatDropdownOpen.value
  isCatDropdownOpen.value = false
}

const selectCategory = (catId) => {
  selectedCat.value = catId
  isCatDropdownOpen.value = false
}
const selectSubcategory = (subId) => {
  selectedSubcat.value = subId
  isSubcatDropdownOpen.value = false
}


watch(() => props.categories, (newCategories) => {
  if (newCategories && newCategories.length > 0) {
    const firstCategory = newCategories[0]
    selectedCat.value = firstCategory.id
    const firstSubcategory = firstCategory.subcategories[0]
    if (firstSubcategory) selectedSubcat.value = firstSubcategory.id
  }
}, { immediate: true })

const currentCategory = computed(() =>
  props.categories.find(cat => cat.id === selectedCat.value)
)

const subcategoriesList = computed(() =>
  currentCategory.value?.subcategories || []
)

const currentSubcategory = computed(() =>
  subcategoriesList.value.find(sub => sub.id === selectedSubcat.value)
)

const sliderListItems = computed(() =>
  currentSubcategory.value?.list || []
)

watch(currentCategory, (newCat) => {
  if (newCat?.subcategories?.length > 0) {
    selectedSubcat.value = newCat.subcategories[0].id
  } else {
    selectedSubcat.value = null
  }
})

watch(selectedSubcat, () => {
  nextTick(() => {
    if (containerRef.value?.swiper) {
      const swiper = containerRef.value.swiper
      swiper.update()
      swiper.slideTo(0)
      currentSlide.value = 0
    }
  })
})

const slidePrev = () => containerRef.value?.swiper.slidePrev()
const slideNext = () => containerRef.value?.swiper.slideNext()

onMounted(() => {
  nextTick(() => {
    if (containerRef.value?.swiper) {
      const swiper = containerRef.value.swiper
      swiper.on('slideChange', () => {
        currentSlide.value = swiper.realIndex
      })
    }
  })
  import('swiper/element/bundle').then(({ register }) => {
    register();

    nextTick(() => {
      if (containerRef.value?.swiper) {
        const swiper = containerRef.value.swiper
        swiper.on('slideChange', () => {
          currentSlide.value = swiper.realIndex
        })
      }
    })
  });
})

onBeforeUnmount(() => {
  if (containerRef.value?.swiper) {
    containerRef.value.swiper.off('slideChange')
  }
})
</script>
<template>
  <section class="matrices">
    <div class="container">
      <div class="matrices__selectors" v-if="props.categories.length > 0">

        <div class="matrices__select__wrapper" :class="{ 'open': isCatDropdownOpen }" @click="toggleCatDropdown"
          v-click-outside="() => isCatDropdownOpen = false">

          <div class="matrices__select f-p1 clickable">
            {{ currentCategory ? currentCategory.title : 'Виберіть категорію' }}
          </div>
          <Arrow class="icon icon-32" :class="{ 'rotated': isCatDropdownOpen }" />

          <ul class="matrices__dropdown">
            <li class="matrices__option f-p2 clickable" v-for="cat in props.categories" :key="cat.id"
              @click.stop="selectCategory(cat.id)" :class="{ 'active': cat.id === selectedCat }">
              {{ cat.title }}
              <Check class="icon-active icon icon-24 green" v-if="cat.id === selectedCat" />
            </li>
          </ul>
        </div>

        <div class="matrices__select__wrapper" :class="{ 'open': isSubcatDropdownOpen }" @click="toggleSubcatDropdown"
          v-click-outside="() => isSubcatDropdownOpen = false">

          <div class="matrices__select f-p1 clickable" :class="{ 'disabled': subcategoriesList.length === 0 }">
            {{ currentSubcategory ? currentSubcategory.title : 'Немає підкатегорій' }}
          </div>
          <Arrow class="icon icon-32" :class="{ 'rotated': isSubcatDropdownOpen }" />

          <ul class="matrices__dropdown" v-if="subcategoriesList.length > 0">
            <li class="matrices__option f-p2 clickable" v-for="sub in subcategoriesList" :key="sub.id"
              @click.stop="selectSubcategory(sub.id)" :class="{ 'active': sub.id === selectedSubcat }">
              {{ sub.title }}

              <Check class="icon-active icon icon-24 green" v-if="sub.id === selectedSubcat" />
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div class="matrices__slider">
      <div class="matrices__slider__controls__wr">

        <div class="matrices__slider__controls dots" v-if="sliderListItems.length > 0">
          <span class="slider-counter f-sh2">
            <span class="psevdo"></span>{{ currentSlide + 1 }} / {{ sliderListItems.length }}</span>
          <button @click="slidePrev" class="slider-btn dots">
            <span class="psevdo"></span>
            <ArrowLeft class="icon green icon-22" />
          </button>
          <button @click="slideNext" class="slider-btn dots">
            <span class="psevdo"></span>
            <ArrowRight class="icon green icon-22" />
          </button>
        </div>
      </div>
      <!-- <ClientOnly> -->
        <swiper-container v-if="sliderListItems.length > 0" ref="containerRef" class="matrices__slider"
          :slides-per-view="1" :space-between="0" effect="fade" fade-effect-cross-fade="true" auto-height="true">

          <swiper-slide class="matrices__slider__item" v-for="(item, idx) in sliderListItems" :key="item.id || idx">
            <div class="matrices__slider__item__inner">

              <div class="matrices__slider__item__title f-h2 dots">
                <span class="psevdo"></span>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="matrices__slider__item__content dots">
                <span class="psevdo"></span>
                <div class="matrices__slider__item__col matrices__slider__item__col--left">
                  <RichtextLexical :content="item.textL" class="f-p3" />
                </div>
                <div class="matrices__slider__item__col matrices__slider__item__col--right">
                  <RichtextLexical :content="item.textR" class="f-p3" />
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>

      <!-- </ClientOnly> -->
      <div class="container">

        <div class="matrices__slider__controls-mob dots" v-if="sliderListItems.length > 0">
          <button @click="slidePrev" class="slider-btn dots">
            <span class="psevdo"></span>
            <ArrowLeft class="icon green icon-22" />
          </button>
          <button @click="slideNext" class="slider-btn dots">
            <span class="psevdo"></span>
            <ArrowRight class="icon green icon-22" />
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.matrices {
  padding: 70px 0;
  background-color: $c-black;
  color: $c-white;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__selectors {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    margin-bottom: 36px;

    @include respond("tab") {
      margin-bottom: 25px;
      gap: 24px;
    }

    @include respond("mob") {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }

  &__select {
    width: 100%;
    background-color: transparent;
    color: $c-white;
    padding: 24px 42px 24px 0;
    text-transform: uppercase;
    border: none;
    border-bottom: 1px solid $c-steel-grey;
    position: relative;
    @include respond("tab") {
      padding: 16px 30px 16px 0;
    }

    &__wrapper {
      position: relative;
      user-select: none;


      &.open {
        .matrices__dropdown {
          max-height: 1000px;
          border: 1px solid $c-steel-grey;
        }
      }

      .icon {
        position: absolute;
        top: 26px;
        right: 0;
        transition: 0.3s all ease;

        @include respond("tab") {
          width: 20px;
          height: 20px;
        }

        &.rotated {
          transform: rotate(180deg);
        }
      }
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $c-black;
    border: 1px solid transparent;
    margin-top: 8px;
    z-index: 10;
    max-height: 0;
    overflow-y: hidden;
    transition: 0.3s all ease;
  }

  &__option {
    background-color: $c-black;
    color: $c-white;
    padding: 16px 24px;
    cursor: none;
    position: relative;
    border-bottom: 1px solid $c-steel-grey;

    &.active {
      color: $c-green;
    }

    .icon-active {
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
    }
  }

  &__slider {
    position: relative;

    &__controls {
      position: absolute;
      right: 26px;
      top: 26px;
      display: flex;
      z-index: 1;

      @include respond("tab") {
        outline: none;
        right: 31px;
        top: 41px;

        &:before,
        &:after {
          display: none;
        }
      }
      &-mob {
        display: none;
        @include respond("tab") {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .slider-btn {
          min-height: 52px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .icon {
          width: 20px;
          height: 20px;
        }
      }

      &__wr {
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
        position: relative;
      }

      .slider-counter,
      .slider-btn {
        min-height: 98px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px;

        @include respond("tab") {
          // display: none;
          border: none;

          .psevdo {
            display: none;
          }
        }
      }

      .slider-counter {
        min-width: 132px;
        @include respond("tab") {
          min-width: 0;
          right: 16px;
          padding: 0;
          min-height: 0;
        }
      }

      .slider-btn {
        min-width: 120px;

        @include respond("tab") {
          display: none;
        }
      }
    }

    &__item {
      width: 100%;

      &__inner {

        max-width: 1440px;
        padding: 26px;
        margin: 0 auto;

        @include respond("tab") {
          padding: 15px;
          padding-bottom: 0;
        }
      }

      &__title {
        padding: 24px 32px;
        color: $c-green;

        @include respond("tab") {
          outline: none;
          border: 1px solid $c-steel-grey;
          border-bottom: none;

          .psevdo {
            display: none;
          }

          padding: 24px 16px 20px 16px;
        }
      }

      &__content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 64px;
        padding: 40px 32px;

        @include respond("tab") {
          outline: none;
          border: 1px solid $c-steel-grey;
          border-top: none;
          padding: 0 16px 24px 16px;
          grid-template-columns: 1fr;
          gap: 24px;
          .psevdo {
            display: none;
          }

          &:before,
          &:after {
            display: none;
          }
        }
      }
    }
  }
}




// .slider-controls {
//   justify-content: center;

//   .slider-btn {
//     padding: 10px 20px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     transition: background-color 0.3s;

//     &:hover {
//       background-color: #0056b3;
//     }
//   }
// }
</style>
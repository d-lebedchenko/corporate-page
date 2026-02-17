<script setup>
import { useElementVisibility } from '@vueuse/core'
import ArrowIcon from '~/assets/icons/arrow-up-right.svg'

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const target = ref(null)
const visible = useElementVisibility(target, { once: true })

const isVisible = ref(false)
watch(visible, (v) => { if (v) isVisible.value = true }, { immediate: true })

function getVacancyLink(slug) {
  return {
    type: 'reference',
    reference: {
      relationTo: 'vacancy-pages',
      value: { slug },
    },
  }
}
</script>

<template>
  <div
    ref="target"
    :class="[
      'vacancies-group',
      { 'is-visible': isVisible },
    ]"
  >
    <h2 class="vacancies-group__head f-sh1 dots">
      {{ data.department?.label || $t('vacancies.other_department') }}
    </h2>

    <div class="vacancies-group__body">
      <div
        v-for="item in data.vacancies"
        :key="item.id"
        class="vacancies-group__item"
      >
        <div class="vacancies-group__item-info dots">
          <div class="psevdo" />
          <h3 class="vacancies-group__item-info-title f-h3">
            {{ item.title }}
          </h3>
          <p
            v-if="item.locations?.length"
            class="vacancies-group__item-info-loc f-p3"
          >
            <img class="icon-24 shrink-0" src="/img/map-pin.svg" width="24" height="24" alt="" loading="lazy">
            {{ formatLocationLabels(item.locations) }}
          </p>
        </div>

        <!-- <CmsLink
          class="vacancies-group__item-more f-b-p2 shrink-0 dots dots-hover"
          :link="getVacancyLink(item.slug)"
        >
          <span class="psevdo" />
          {{ $t('vacancies.more_details') }}
        </CmsLink> -->

        <a
          class="vacancies-group__item-apply f-b-p2 shrink-0 dots dots-hover"
          :href="item.applyLink"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span class="psevdo" />
          {{ $t('vacancies.apply') }}
          <ArrowIcon class="icon-32 shrink-0" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.vacancies-group {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  &:not(:last-child) {
    margin-bottom: 60px;
    @include respond("tab") {
      margin-bottom: 48px;
    }
  }
  
  .dots:first-child {
    margin-top: -1px;
    margin-left: -1px;
  }

  &__head {
    padding: 24px 32px;
    // margin-bottom: 1px;
    text-transform: uppercase;
    color: $c-green;
    @include respond("tab") {
      padding: 0;
      margin-bottom: 12px;
      &.dots {
        outline: none;
        .psevdo,
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }

  &__item {
    display: flex;
    @include respond("tab") {
      flex-wrap: wrap;
    }

    &:not(:last-child) {
      @include respond("tab") {
        margin-bottom: 24px;
      }
    }

    &-info {
      padding: 24px 32px;
      flex: 1;
      @include respond("tab") {
        padding: 32px 16px;
        margin-bottom: 1px;
        flex: 1 0 100%;
        text-align: center;
      }

      &-title {
        text-transform: uppercase;
      }

      &-loc {
        color: $c-grey-2;
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        @include respond("tab") {
          margin-top: 16px;
          justify-content: center;
        }

        img {
          @include respond("tab") {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &-more,
    &-apply {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      padding: 24px 40px;
      text-align: center;
      text-transform: uppercase;
      @include respond("tab") {
        flex: 1 0 50%;
        gap: 10px;
        padding: 16px;
        font-size: 16px;
        line-height: 1.1;
        font-weight: 400;
      }
      @include respond("mob") {
        flex-basis: 100%;
      }

      svg {
        @include respond("tab") {
          width: 20px;
          height: 20px;
        }
      }
    }

    &-apply {
      color: $c-green;
      svg {
        transition: transform 0.3s;
      }

      &:hover {
        svg {
          transform: rotate(45deg);
        }
      }
    }
  }

  &:not(.is-visible) {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>

<script setup>
import ArrowIcon from '~/assets/icons/arrow-up-right.svg'

const route = useRoute()
const { locale, t } = useI18n()

const slug = computed(() => route.params.slug)

const { data: page, error } = await useFetch(() => `/api/vacancies/${slug.value}`, {
  query: { locale: locale.value },
})

watchEffect(() => {
  if (error.value) showError(error.value)
})

const breadcrumbsList = [
  {
    id: '1',
    link: {
      type: 'custom',
      url: '/vacancies',
      label: t('breadcrumb.vacancies'),
    },
  },
  {
    id: '2',
    link: {
      type: 'reference',
      reference: {
        relationTo: 'vacancy-pages',
        value: {
          slug: slug.value,
        },
      },
      label: page.value.title,
    },
  },
]
</script>

<template>
  <div class="vacancy-page">
    <Breadcrumbs
      :list="breadcrumbsList"
    />

    <div class="vacancy-page__content">
      <div class="container">
        <div class="vacancy-page__content-wr">
          <div class="vacancy-page__head">
            <div class="vacancy-page__sidebar dots">
              <div class="psevdo" />

              <div class="vacancy-page__sidebar-info">
                <h1 class="vacancy-page__title f-h1">
                  {{ page.title }}
                </h1>

                <div class="vacancy-page__details">
                  <p v-if="page.locations?.length" class="f-p3">
                    <img class="icon-24 shrink-0" src="/img/map-pin.svg" width="24" height="24" alt="" >
                    {{ formatLocationLabels(page.locations) }}
                  </p>
                  <p v-if="page.employmentType" class="f-p3">
                    <img class="icon-24 shrink-0" src="/img/building.svg" width="24" height="24" alt="" >
                    {{ $t(`vacancies.employment.${page.employmentType}`) }}
                  </p>
                  <p v-if="page.department?.label" class="f-p3">
                    <img class="icon-24 shrink-0" src="/img/briefcase.svg" width="24" height="24" alt="" >
                    {{ page.department.label }}
                  </p>
                </div>
              </div>

              <a
                class="vacancy-page__apply f-b-p2 shrink-0 dots dots-hover"
                :href="page.applyLink"
                rel="noopener noreferrer"
                target="_blank"
                :aria-label="$t('vacancies.apply_job')"
              >
                <span class="psevdo" />
                <span class="hide-tablet" aria-hidden="true">
                  {{ $t('vacancies.apply_job') }}
                </span>
                <span class="hide-desctop" aria-hidden="true">
                  {{ $t('vacancies.apply') }}
                </span>
                <ArrowIcon class="icon-32 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div class="vacancy-page__body">
            <div
              v-if="page.contentSections?.length"
              class="vacancy-page__sections"
            >
              <RichtextLexical
                v-for="section in page.contentSections"
                class="vacancy-page__richtext f-p2"
                :key="section.id"
                :content="section.content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.vacancy-page {
  background-color: $c-black;
  color: $c-white;

  &__content {
    padding-top: 60px;
    padding-bottom: 140px;
    @include respond("tab") {
      padding-top: 32px;
      padding-bottom: 40px;
    }
    @include respond("mob") {
      padding-bottom: 20px;
    }

    &-wr {
      display: flex;
      gap: 92px;
      @include respond("tab") {
        display: block;
      }
    }
  }

  &__head {
    position: relative;
    flex: 0 0 43.22767%;
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
    }

    &-info {
      padding: 52px;
      @include respond("tab") {
        padding: 32px 20px;
      }
    }
  }

  &__title {
    text-transform: uppercase;
  }

  &__details {
    margin-top: 64px;
    @include respond("tab") {
      margin-top: 56px;
    }

    p {
      display: flex;
      align-items: center;
      gap: 12px;
      @include respond("tab") {
        gap: 16px;
        font-size: 16px;
      }

      &:not(:last-child) {
        margin-bottom: 24px;
        @include respond("tab") {
          margin-bottom: 12px;
        }
      }
    }
  }

  &__apply {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 32px 40px;
    font-weight: 500;
    text-align: left;
    text-transform: uppercase;
    color: $c-green;
    background-color: $c-black;
    @include respond("tab") {
      position: fixed;
      left: 8px;
      right: 8px;
      bottom: 20px;
      font-size: 20px;
      padding: 16px;
      gap: 10px;
      z-index: 10;
    }
    @include respond("mob") {
      bottom: 12px;
    }

    svg {
      @include respond("tab") {
        width: 24px;
        height: 24px;
      }
    }

    &:hover {
      background-color: #1a1a1a;
    }
  }

  &__body {
    flex: 1;
  }

  &__richtext {
    @include respond("tab") {
      font-size: 14px;
    }

    &:not(:last-child) {
      margin-bottom: 80px;
      @include respond("tab") {
        margin-bottom: 48px;
      }
    }

    :deep(p),
    :deep(ul),
    :deep(ol),
    :deep(li) {
      margin: 1em 0;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(li) {
      @include respond("tab") {
        margin: 12px 0;
      }
    }
  }
}
</style>

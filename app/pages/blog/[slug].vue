<script setup>
const route = useRoute()
const { locale, t } = useI18n()

const { formatDate } = useDateFormat()

const slug = computed(() => route.params.slug)

const { data: page, error } = await useFetch(() => `/api/blog/posts/${slug.value}`, {
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
      url: '/blog',
      label: t('breadcrumb.blog'),
    },
  },
  {
    id: '2',
    link: {
      type: 'reference',
      reference: {
        relationTo: 'blog-posts',
        value: {
          slug: slug.value,
        },
      },
      label: page.value.title,
    },
  },
]

usePageSeo(page.value?.meta)
</script>

<template>
  <div class="post-page">
    <Breadcrumbs
      :list="breadcrumbsList"
    />

    <div class="post-page__head">
      <div class="container">
        <div class="post-page__head-wr">
          <div class="post-page__head-left">
            <div class="post-page__head-info">
              <p
                v-if="page.publishedAt"
                class="post-page__head-date f-p1">
                {{ formatDate(page.publishedAt) }}
              </p>
              <h1
                v-if="page.title"
                class="post-page__head-title f-h2"
              >
                {{ page.title }}
              </h1>
            </div>

            <div
              v-if="page.categories?.length"
              class="post-page__head-tags"
            >
              <div
                v-for="item in page.categories"
                class="post-page__head-tags-item f-p2"
                :key="item.id"
              >
                {{ item.label }}
              </div>
            </div>
          </div>

          <NuxtPicture
            v-if="page.image?.url"
            class="post-page__head-right"
            :src="`/payload${page.image.url}`"
            :alt="page.image.alt || ''"
            :width="page.image.width"
            :height="page.image.height"
            sizes="xs:100vw sm:100vw md:100vw lg:692px"
          />
        </div>
      </div>
    </div>

    <div
      v-if="page?.Blocks?.length"
      class="post-page__body"
    >
      <RenderBloks :blocks="page.Blocks" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.post-page {
  background-color: $c-black;
  color: $c-white;

  &__head {
    padding: 60px 0 70px;
    @include respond("tab") {
      padding: 32px 0 40px;
    }
    
    &-wr {
      display: flex;
      gap: 52px;
      @include respond("tab") {
        display: block;
      }
    }
    
    &-left {
      flex: 0 1 644px;
      display: flex;
      flex-direction: column;
      @include respond("tab") {
        display: block;
        margin-bottom: 20px;
      }
    }

    // &-info {}

    &-date {
      text-transform: uppercase;
      margin-bottom: 20px;
      @include respond("tab") {
        text-transform: none;
        margin-bottom: 24px;
      }
    }

    &-title {
      text-transform: uppercase;
    }

    &-tags {
      margin-top: auto;
      padding-top: 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      @include respond("tab") {
        margin-top: 24px;
        padding-top: 0;
      }

      &-item {
        padding: 12px 24px;
        text-align: center;
        background-color: $c-steel-grey;
        color: $c-white;
        @include respond("tab") {
          padding: 8px 12px;
        }
      }
    }

    &-right {
      display: block;
      flex: 0 1 692px;
      min-height: 360px;
      @include respond("tab") {
        min-height: auto;
        height: 200px;
      }

      &:deep(img) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>

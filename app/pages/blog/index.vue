<script setup>
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

function getInitialPage() {
  const p = Number(route.query.page || 1)
  return Number.isFinite(p) && p > 0 ? p : 1
}

const currentPage = ref(getInitialPage())

const { data: pageData, error: pageError } = await useFetch('/api/blog/main-page', {
  query: { locale: locale.value },
})

const { data: postsData, error: postsError } = await useFetch('/api/blog/posts', {
  query: { locale: locale.value, page: currentPage },
})

watchEffect(() => {
  if (pageError.value) showError(pageError.value)
  if (postsError.value) showError(postsError.value)
})

function goToPage(n) {
  const target = Math.max(1, n)
  currentPage.value = target
  router.push({
    query: {
      ...route.query,
      page: target !== 1 ? target : undefined
    }
  })
  window.scrollTo({ top: 0 })
}

const pagesList = computed(() => {
  const total = postsData.value?.totalPages || 0
  return Array.from({ length: total }, (_, i) => i + 1)
})

usePageSeo(pageData.value?.meta)
</script>

<template>
  <div class="blog-page">
    <div class="container">
      <div class="blog-page__head">
        <h1
          v-if="pageData?.title"
          class="blog-page__head-title f-h2"
        >
          {{ pageData.title }}
        </h1>
        <h2
          v-if="pageData?.subtitle"
          class="blog-page__head-subtitle f-a4"
        >
          {{ pageData.subtitle }}
        </h2>
        <NuxtPicture
          v-if="pageData?.image?.url"
          class="blog-page__head-img"
          :src="`/payload${pageData.image.url}`"
          :alt="pageData.image.alt || ''"
          :width="pageData.image.width"
          :height="pageData.image.height"
          sizes="xs:100vw sm:100vw md:100vw lg:1388px"
        />
      </div>

      <div class="blog-page__body">
        <div v-if="postsData?.docs?.length" class="blog-page__posts">
          <BlogPostCard
            v-for="post in postsData.docs"
            :key="post.id"
            :slug="post.slug"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :categories="post.categories"
            :publishedAt="post.publishedAt"
          />
        </div>

        <div class="blog-page__pagination">
          <NuxtLinkLocale
            v-for="item in pagesList"
            :class="[
              'blog-page__pagination-item',
              { active: item === currentPage },
            ]"
            :key="item"
            :to="`/blog${item !== 1 ? `?page=${item}` : ''}`"
            :prefetch="false"
            @click.prevent="goToPage(item)"
          >
            {{ item }}
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.blog-page {
  background-color: $c-black;
  color: $c-white;

  &__head {
    padding: 28px 0 70px;
    @include respond("tab") {
      padding: 15px 0 40px;
    }

    &-title {
      text-transform: uppercase;

      &:not(:last-child) {
        margin-bottom: 12px;
        @include respond("tab") {
          margin-bottom: 4px;
        }
      }
    }

    &-subtitle {
      color: $c-green;
      text-transform: uppercase;
      @include respond("tab") {
        font-size: 32px;
        line-height: 125%;
      }
    }

    &-img {
      display: block;
      width: 100%;
      height: 360px;
      @include respond("tab") {
        height: 200px;
      }

      &:not(:first-child) {
        margin-top: 52px;
        @include respond("tab") {
          margin-top: 20px;
        }
      }
      
      &:deep(img) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__body {
    padding: 70px 0 68px;
    @include respond("tab") {
      padding: 40px 0;
    }
  }

  &__pagination {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @include respond("tab") {
      margin-top: 32px;
    }

    &-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 63px;
      height: 63px;
      padding: 20px 0;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.3;
      letter-spacing: -0.02em;
      transition: color 0.3s;
      @include respond("tab") {
        width: 57px;
        height: 57px;
      }
      @include respond("mob-sm") {
        width: 49px;
      }

      &:before {
        content: '';
        position: absolute;
        top: -0.5px;
        right: -0.5px;
        bottom: -0.5px;
        left: -0.5px;
        pointer-events: none;
        border: 1px solid $c-steel-grey;
      }
      
      &.active,
      &:hover {
        color: $c-green;
      }
    }
  }
}
</style>

<script setup>
import { useElementVisibility } from '@vueuse/core'
import ArrowBigRight from '~/assets/icons/arrow-big-right.svg'

const props = defineProps({
  slug: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: Object,
    default: () => ({}),
  },
  categories: {
    type: Array,
    default: () => [],
  },
  publishedAt: {
    type: String,
    default: '',
  },
})

const target = ref(null)
const visible = useElementVisibility(target, { once: true })

const isVisible = ref(false)
watch(visible, (v) => { if (v) isVisible.value = true }, { immediate: true })

const { formatDate } = useDateFormat()

const link = {
  type: 'reference',
  reference: {
    relationTo: 'blog-posts',
    value: { slug: props.slug },
  },
}
</script>

<template>
  <div
    ref="target"
    :class="[
      'blog-post-card',
      { 'is-visible': isVisible },
    ]"
  >
    <CmsLink class="blog-post-card__wr" :link="link">
      <NuxtPicture
        v-if="image?.url"
        class="blog-post-card__head"
        :src="`/payload${image.url}`"
        :alt="image.alt || ''"
        :width="image?.width"
        :height="image?.height"
        sizes="xs:100vw sm:100vw md:300px lg:532px"
        loading="lazy"
      />

      <div class="blog-post-card__body">
        <div class="blog-post-card__info">
          <div
            v-if="publishedAt"
            class="blog-post-card__info-date f-p2 text-grey-2 clickable"
          >
            {{ formatDate(publishedAt) }}
          </div>
          <div
            v-if="title"
            class="blog-post-card__info-title f-h3 clickable"
          >
            {{ title }}
          </div>
          <div
            v-if="description"
            class="blog-post-card__info-descr f-p3 whitespace-pre-line clickable"
          >
            {{ description }}
          </div>
        </div>

        <div
          v-if="categories?.length"
          class="blog-post-card__tags"
        >
          <div
            v-for="item in categories"
            class="blog-post-card__tags-item f-p3 clickable"
            :key="item.id"
          >
            {{ item.label }}
          </div>
        </div>
      </div>

      <ArrowBigRight class="blog-post-card__arr" />
    </CmsLink>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.blog-post-card {
  position: relative;
  padding-top: 32px;
  border-top: 1px solid $c-steel-grey;
  transition: transform 0.5s ease-in-out;
  @include respond("tab") {
    padding-top: 0;
    border: 1px solid $c-steel-grey;
  }

  &:not(:last-child) {
    margin-bottom: 64px;
    @include respond("tab") {
      margin-bottom: 32px;
    }
  }

  &__wr {
    display: flex;
    gap: 32px;
    @include respond("tab") {
      gap: 0;
    }

    @include respond("mob") {
      display: block;
    }

    &:hover {
      .blog-post-card__arr {
        color: $c-green;
        transform: translateX(16px);
      }
    }
  }

  &__head {
    display: block;
    flex: 0 1 532px;
    min-height: 360px;
    @include respond("tab") {
      flex-basis: 300px;
      min-height: 286px;
    }
    @include respond("mob") {
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

  &__body {
    flex: 1 1 824px;
    // flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 78px;
    @include respond("tab") {
      flex-basis: 412px;
      padding: 20px 24px;
    }
    @include respond("mob") {
      padding: 20px;
    }
  }

  &__info {
    max-width: 600px;
    @include respond("tab") {
      max-width: none;
    }

    &-date {
      margin-bottom: 32px;
      @include respond("tab") {
        margin-bottom: 20px;
      }
      @include respond("mob") {
        margin-bottom: 24px;
      }
    }

    &-title {
      text-transform: uppercase;
    }

    &-descr {
      margin-top: 20px;
      max-height: (18px * 1.3 * 4);
      line-clamp: 4;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      color: $c-grey-2;
      @include respond("tab") {
        margin-top: 12px;
        max-height: (14px * 1.3 * 3);
        line-clamp: 3;
        -webkit-line-clamp: 3;
      }
      @include respond("mob") {
        max-height: (14px * 1.3 * 6);
        line-clamp: 6;
        -webkit-line-clamp: 6;
      }
    }
  }
  
  &__tags {
    margin-top: auto;
    padding-top: 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    @include respond("tab") {
      padding-top: 20px;
    }
    @include respond("mob") {
      margin-top: 40px;
      padding-top: 0;
    }

    &-item {
      padding: 8px 12px;
      text-align: center;
      background-color: $c-steel-grey;
      color: $c-grey-2;
    }
  }

  &__arr {
    width: 46px;
    height: 46px;
    color: inherit;
    position: absolute;
    top: 32px;
    right: 16px;
    transition: color 0.3s, transform 0.3s;
    @include respond("tab") {
      display: none;
    }
  }

  &:not(.is-visible) {
    transform: translateY(100px);
  }
}
</style>

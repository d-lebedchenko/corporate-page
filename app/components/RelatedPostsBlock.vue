<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  posts: {
    type: Array,
    default: () => [],
  },
})
const validPosts = computed(() => {
  return props.posts.filter(post => 
    typeof post === 'object' && post !== null && !Array.isArray(post)
  )
})
</script>

<template>
  <div  v-if="validPosts.length" class="related-posts-block">
    <div class="container">
      <h2 class="related-posts-block__title f-h1">
        {{ title ? title : $t('related_posts_block.title_fallback') }}
      </h2>

      <div>
        <BlogPostCard
          v-for="post in validPosts"
          :key="post.id"
          :slug="post.slug"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :categories="post.categories"
          :publishedAt="post.publishedAt"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.related-posts-block {
  background-color: $c-black;
  color: $c-white;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }
  @include respond("mob") {
    padding-bottom: 20px;
  }

  &__title {
    text-transform: uppercase;
    margin-bottom: 52px;
    @include respond("tab") {
      margin-bottom: 32px;
    }
  }
}
</style>

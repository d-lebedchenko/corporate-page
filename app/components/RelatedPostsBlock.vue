<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  posts: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="related-posts-block">
    <div class="container">
      <h2 class="related-posts-block__title f-h1">
        {{ title ? title : $t('related_posts_block.title_fallback') }}
      </h2>

      <div v-if="posts?.length">
        <BlogPostCard
          v-for="post in posts"
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

<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'

defineProps({
  title: {
    type: String,
    default: ''
  },
  isTitleBig: {
    type: Boolean,
    default: false
  },
  isTitleGreen: {
    type: Boolean,
    default: false
  },
  subtitle: {
    type: String,
    default: ''
  },
  text: {
    type: Object,
    default: () => ({})
  },
  isButtonHide: {
    type: Boolean,
    default: false
  },
  button: {
    type: Object,
    default: () => ({ label: '', url: '' })
  },
  image: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <section :class="['content-image', { 'content-image--big-title': isTitleBig }]">
    <div class="container">
      <div class="content-image__wr">
        <div class="content-image__content">
          <h2 class="content-image__title" :class="[isTitleBig ? 'f-h1' : 'f-h2', { 'green': isTitleGreen }]">
            {{ title }}
          </h2>
          <RichtextLexical :content="text" class="content-image__text f-p2" />
          <CmsLink v-if="!isButtonHide" :link="button" class="content-image__btn btn-green dots dots-hover d-if ai-c jc-sb f-b-p2">
            <span class="psevdo"></span>
            {{ button.label }}
            <Arrow class="icon icon-32 shrink-0" />
          </CmsLink>
        </div>
        <NuxtPicture
          v-if="image?.url"
          class="content-image__image d-f jc-c"
          :src="`/payload${image.url}`"
          :alt="image.alt || ''"
          width="488"
          height="488"
          sizes="xs:100vw sm:345px lg:488px"
          fit="cover"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
.content-image {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;
  
  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    @include respond("tab") {
      gap: 32px;
    }
    
    @include respond("mob") {
      display: flex;
      flex-direction: column-reverse;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__title {
    max-width: 640px;
    margin-bottom: 32px;
    padding-top: 40px;
    text-transform: uppercase;
    
    @include respond("tab") {
      margin-bottom: 28px;
      padding-top: 28px;
    }

    &.f-h2 {
      padding-top: 0;
      @include respond("tab") {
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
  &__text {
    margin-bottom: 40px;
    max-width: 616px;
    width: 100%;
    color: $c-grey-2;
    
    @include respond("tab") {
      margin-bottom: 28px;
      max-width: 100%;
    }
  }
  &__btn {
    text-transform: uppercase;
    padding: 32px 40px;
    gap: 24px;
    
    @include respond("tab") {
      width: 100%;
      padding: 16px;
      gap: 32px;
      font-size: 20px;
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__image {
    padding-left: 32px;
    @include respond("tab") {
      padding-left: 0;
    }

    &:deep(img) {
      display: block;
      max-width: 488px;
      width: auto;
      height: 100%;
      object-fit: contain;
      aspect-ratio: 1 / 1;
      
      @include respond("tab") {
        max-width: 258px;
        min-width: 241px;
        width: auto;
        height: 100%;
      }
      @include respond("mob") {
        max-width: 345px;
        width: 100%;
        height: auto;
      }
    }
  }

  &--big-title {
    .content-image__wr {
      @include respond("tab") {
        gap: 24px;
      }
    }
  }
}
</style>

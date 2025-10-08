<script setup>
import RichtextLexical from './RichtextLexical'
import Arrow from '~/assets/icons/arrow-up-right.svg'
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  titleGreen: {
    type: String,
    default: ''
  },
  text: {
    type: Object,
    default: () => ({})
  },
  directionTitle: {
    type: String,
    default: ''
  },
  directionSubtitle: {
    type: String,
    default: ''
  },
  schemaTitle: {
    type: String,
    default: ''
  },
  schemaSubtitle: {
    type: String,
    default: ''
  },
  expertsTitle: {
    type: String,
    default: ''
  },
  expertsSubtitle: {
    type: String,
    default: ''
  },
  button: {
    type: Object,
    default: () => ({ label: '', url: '' })
  },
  partners: {
    type: Array,
    default: () => ([])
  }
})

</script>

<template>
  <section class="grid">
    <div class="container">
      <div class="grid__content">
        <div class="grid__icon dots">
          <span class="psevdo"></span>

        </div>
        <div class="grid__item d-f jc-sb fd-c dots">
          <span class="psevdo"></span>
          <div class="grid__item__title f-h2">
            {{ directionTitle }}
          </div>
          <div class="grid__item__text f-sh2">
            {{ directionSubtitle }}
          </div>
        </div>
        <div class="grid__top d-f fd-c jc-c dots">
          <span class="psevdo"></span>
          <h2 class="grid__top__title f-h1">{{ title }} <span class="green">{{ titleGreen }}</span></h2>
          <RichtextLexical :content="text" class="grid__top__text" />
        </div>
        <div class="grid__icon  dots">
          <span class="psevdo"></span>

        </div>
        <div class="grid__item dots d-f jc-sb fd-c">
          <span class="psevdo"></span>
          <div class="grid__item__title f-h2">
            {{ schemaTitle }}
          </div>
          <div class="grid__item__text  f-sh2">
            {{ schemaSubtitle }}
          </div>
        </div>
        <div class="grid__icon dots">
          <span class="psevdo"></span>

        </div>
        <div class="grid__item d-f jc-sb fd-c dots">
          <span class="psevdo"></span>
          <div class="grid__item__title f-h2">
            {{ expertsTitle }}
          </div>
          <div class="grid__item__text  f-sh2">
            {{ expertsSubtitle }}
          </div>
        </div>
        <a  :href="button.url" class="grid__btn d-f ai-c jc-sb dots dots-hover f-b-p1">
          <span class="psevdo"></span>
          {{ button.label }}
          <Arrow class="icon icon-52" />
        </a>
      </div>

      <div class="grid__partners" v-if="partners.length">
        <div class="grid__partners__track">

          <a class="grid__partners__item" v-for="(item, id) in [...partners, ...partners, ...partners, ...partners]"
            :href="item.link.url">
            <img :src="`${payloadUrl}${item.image.url}`" :alt="item.link.label" />
          </a>
        </div>
      </div>
      <!-- <RichtextLexical :content="subtitle" /> -->
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
.grid {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;
  
  @include respond("tab") {
    padding: 40px 0;
  }

  &__content {
    display: grid;
    grid-template-columns: 177px auto 50%;
    
    @include respond("tab") {
      grid-template-columns: 64px auto;
    }
  }

  &__top {
    grid-row: span 2;
    padding: 40px;
    
    @include respond("tab") {
      order: 1;
      grid-column: span 2;
      padding: 24px 20px;
    }

    &__title {
      text-transform: uppercase;
      margin-bottom: 28px;
      
      @include respond("tab") {
        margin-bottom: 20px;
      }

    }

    &__text {
      font-weight: 400;
      font-size: 20px;
      line-height: 130%;
      letter-spacing: -0.02em;
      
      @include respond("tab") {
        font-size: 14px;
      }

      :deep(p) {
        margin-bottom: 20px;

        @include respond("tab") {
          margin-bottom: 16px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  &__item {
    min-height: 184px;
    padding: 32px 20px;
    text-transform: uppercase;
    height: 100%;
    
    @include respond("tab") {
      padding: 16px 12px;
      min-height: 84px;
    }
    &__title {
      @include respond("tab") {
        font-size: 20px;
        font-weight: 600;
      }
    }
    &__text  {
      @include respond("tab") {
        font-size: 12px;
      }

    }
  }

  &__btn {
    width: 100%;
    height: 100%;
    padding: 40px;
    text-transform: uppercase;
    
    @include respond("tab") {
      order: 2;
      grid-column: span 2;
      padding: 16px;
      
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__partners {
    overflow: hidden;
    width: 100%;
    margin-top: 48px;
    
    @include respond("tab") {
      margin-top: 40px;
    }

    &__track {
      display: flex;
      gap: 142px;
      animation: scroll 15s linear infinite;
      @include respond("tab") {
        gap: 28px;
      }
    }

    &__item {
      width: 112px;
      height: 72px;
      flex-shrink: 0;
      
      @include respond("tab") {
        width: 89.6px;
        height: 57.6px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
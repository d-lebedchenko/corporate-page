<script setup>
// import RichtextLexical from './RichtextLexical'
import Arrow from '~/assets/icons/arrow-up-right.svg'
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const props = defineProps({
  runingTitle: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  file: {
    type: String,
    default: ''
  },
  runingTitle: {
    type: String,
    default: ''
  },
  fileHint: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <section class="form">
    <h2 class="form__runing f-a3 hide-tablet">
      <div class="marquee-wrapper">
        <div class="marquee">
          <span>{{ runingTitle }}</span>
          <span>{{ runingTitle }}</span>
        </div>
      </div>
    </h2>
    <h2 class="form__runing f-a1 hide-desctop">
      <div class="marquee-wrapper">
        <div class="marquee">
          <span>{{ runingTitle }}</span>
          <span>{{ runingTitle }}</span>
        </div>
      </div>
    </h2>
    <div class="container">
      <div class="form__wr">
        <div class="form__image d-f jc-c">
          <img :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>
        <div class="form__content d-f fd-c">
          <input class="form__input f-p1" type="text" :placeholder="name">
          <input class="form__input f-p1" type="text" :placeholder="email">
          <input class="form__input f-p1" type="text" :placeholder="file">
          <div class="form__hint f-p3">
            {{ fileHint }}
          </div>
          <button class="form__btn dots dots-hover hide-tablet f-p2 d-f ai-c jc-sb">
            <span class="psevdo"></span>
            {{ btnText }}
            <Arrow class="icon icon-32" />
          </button>
          <button class="form__btn dots dots-hover hide-desctop f-p1 d-f ai-c jc-sb">
            <span class="psevdo"></span>
            {{ btnText }}
            <Arrow class="icon icon-32" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
.form {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;
  @include respond("tab") {
    padding: 40px 0;
  }

  &__runing {
    color: $c-steel-grey;
    text-transform: uppercase;
    margin-bottom: 32px;
    overflow: hidden;

    .marquee-wrapper {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .marquee {
      display: flex;
      white-space: nowrap;
      animation: marquee 10s linear infinite;

      span {
        display: inline-block;
        padding-right: 10px;
      }
    }
  }

  &__wr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    @include respond("tab") {
      display: flex;
      flex-direction: column-reverse;
      gap: 32px;
    }
  }

  &__image {
    @include respond("tab") {
      height: 175px;
      overflow: hidden;
      align-items: flex-start;
    }

    img {
      width: auto;
      height: 100%;
      object-fit: cover;
      animation: rolling 10s linear infinite;
      
      @include respond("tab") {
        // max-width: 345px;
        width: 345px;
        height: auto;
        // animation: rolling 10s linear infinite;
      }
    }
  }

  &__input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $c-steel-grey;
    padding: 24px;
    margin-bottom: 12px;
    color: $c-white;
    
    @include respond("tab") {
      padding: 16px 0;
    }
  }

  &__hint {
    margin-top: -4px;
    margin-bottom: 32px;
  }

  &__btn {
    text-transform: uppercase;
    padding: 32px;
    width: max-content;
    gap: 24px;
    
    @include respond("tab") {
      &.hide-desctop {
        display: flex;
        width: 100%;
        padding: 16px;
      }
      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes rolling {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  runningText: {
    type: String,
    default: ''
  },
  button: {
    type: Object,
    default: () => ({ label: '', url: '' })
  }
})


const letters = computed(() =>
  props.text.split('').map(char => (char === '\n' ? '\n' : char))
)
</script>

<template>
  <section class="main-section">
    <div class="container main-section__wrapper d-f">

      <div class="main-section__left d-f">
        <div class="main-section__runing f-a1"> {{ runningText + ' ' + runningText }}</div>
        <div class="main-section__img"></div>
      </div>
      <div class="main-section__right">
        <div class="main-section__top">
          <h1 class="main-section__title f-a2">
            {{ title }}
          </h1>
          <h3 class="main-section__subtitle f-sh1 hide-tablet">
            {{ subtitle }}
          </h3>
          <h3 class="main-section__subtitle f-sh2 hide-desctop">
            {{ subtitle }}
          </h3>
        </div>
        <div class="main-section__bottom">

          <p class="main-section__text f-p1">
            <span
              v-for="(letter, i) in letters"
              :key="i"
              class="animated-letter"
              :style="{ 'animation-delay': `${i * 0.03}s` }"
            >
              {{ letter }}
            </span>
          </p>
          <a :href="button.url" class="main-section__btn dots dots-hover f-b-p1 d-f jc-sb ai-c">
            <span class="psevdo"></span>
            {{ button.label }}
            <Arrow class="icon icon-52"/>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.main-section {
  background-color: $c-black;
  color: $c-white;
  padding-top: 28px;
  padding-bottom: 82px;
  height: 100vh;

  &__wrapper {
    gap: 16px;
    height: 100%;
    
    @include respond("tab") {
      gap:20px;
      flex-direction: column;
    }

  }

  &__left {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding-left: 26px;
    margin-left: -26px;
    
    @include respond("tab") {
      margin-left: 0;
      padding-left: 0;
      min-height: 360px;
    }
  }

  &__img {
    // height: calc(100vh - 48px);
    height: 100%;
    width: 501px;
    background-color: $c-green;
    margin-left: auto;
    
    @include respond("tab") {
      height: 100%;
      width: 100%;
      margin-left: 67px;
    }
  }

  &__runing {
    position: absolute;
    left: 0;
    bottom: 0;
    transform-origin: bottom left;
    text-transform: uppercase;
    transform: rotate(-90deg) translateY(180px) translateX(0);
    line-height: 100%;
    animation: runing 5s linear infinite;
    white-space: nowrap;
    
    @keyframes runing {
      0% {
        transform: rotate(-90deg) translateY(180px)  translateX(0);
      }

      100% {
        transform: rotate(-90deg) translateY(180px) translateX(-2950px);
      }
    }
    @keyframes runingmobile {
      0% {
        transform: rotate(-90deg) translateY(56px)  translateX(0);
      }

      100% {
        transform: rotate(-90deg) translateY(56px) translateX(-2950px);
      }
    }

    @include respond("tab") {
      transform: rotate(-90deg) translateY(56px) translateX(0);
      animation: runingmobile 7s linear infinite;
    }
  }

  &__right {
    max-width: 702px;
    width: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @include respond("tab") {
      max-width: 100%;
    }
  }


  &__title {
    text-transform: uppercase;
  }

  &__subtitle {
    text-transform: uppercase;
    text-align: center;
    
    @include respond("tab") {
      text-align: left;
      margin-bottom: 16px;
    }
  }

  &__text {
    text-transform: uppercase;
    margin-bottom: 36px;
    white-space: pre-wrap;
    color: $c-grey;

    .animated-letter {
      display: inline;
      animation: colorChange 0.5s linear forwards;
    }

    @keyframes colorChange {
      0% {
        color: $c-grey;
      }

      100% {
        color: $c-white;
      }
    }
    
    @include respond("tab") {
      margin-bottom: 16px;
    }
  }

  &__btn {
    text-transform: uppercase;
    padding: 40px;
    
    @include respond("tab") {
      padding: 16px;
      gap: 32px;
      width: max-content;
       
      .icon {
        width: 24px;
        height: 24px;
      }
    }
    @include respond("mob") {
      width: 100%;
    }
  }
}
</style>
<script setup>
import { useI18n } from 'vue-i18n';
import IconX from '~/assets/icons/x.svg'

const { data } = await useFetch('/api/header')
const scrollProgress = ref(0)
const isOpen = ref(false)
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

const { locale } = useI18n();

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const updateScroll = () => {
  const scrollTop = window.scrollY || window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
  updateScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <div v-if="data && data?.links.length" class="header__wr" :class="{ 'header-open': isOpen }">
    <header class="header">
      <div class="header__inner d-f ai-c">
        <a href="/" class="header__logo">
          <img v-if="data.logo?.url" :src="`${payloadUrl}${data.logo.url}`" :alt="data.logo.label" />
        </a>
        <div class="header__linebar__wr">

          <div class="header__linebar">
            <div class="header__linebar-progress" :style="{ width: scrollProgress + '%' }"></div>
          </div>
        </div>
          
        <a
          class="header__language f-b-p3 d-f ai-c hover-green clickable"
          :href="$switchLocalePath(locale === 'uk' ? 'en' : 'uk')"
        >
          {{ locale === 'uk' ? 'UA' : 'EN' }}
        </a>

        <button class="header__btn f-b-p3 hover-green" @click="toggleMenu()">Меню</button>
      </div>
    </header>

    <div class="header__menu__wr" :class="{ 'active': isOpen }" @click.self="toggleMenu()">
      <div class="header__menu d-f fd-c">
        <IconX class="header__close" @click.self="toggleMenu()" />
        <div class="header__menu__list d-f fd-c">
          <div class="header__menu__item" v-for="(item, id) in data.links" :key="id">
            <a class="header__menu__item hover-green f-h2" :href="item.link?.reference?.value?.slug || item.link.url">{{
              item.link.label }}</a>
            <div class="header__submenu" v-if="item.subLinks.length">

              <div class="header__submenu__item" v-for="(sublink, id) in item.subLinks" :key="id">
                <a class="header__submenu__item hover-green f-sh2" :href="sublink.link?.reference?.value?.slug || sublink.link.url">{{ sublink.link.label }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="header__social d-f ai-c jc-sb">
          <div class="header__social__title f-sh2">
            {{ data.socialLabel }}
          </div>
          <div class="header__social__icons d-f">
            <a class="header__social__icons__item" v-for="(item, id) in data.social" :href="item.link.url">
              <img v-if="item.image?.url" :src="`${payloadUrl}${item.image.url}`" :alt="item.link.label" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.header {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 20px;
  background-color: $c-black;
  color: $c-white;
  width: 100%;
  z-index: 5;

  @include respond("tab") {
    padding-left: 15px;
  }

  &__wr {
    border-top: 2px solid $c-white;
    background-color: $c-black;
    position: fixed;
    top: calc(100vh - 62px);
    width: 100%;
    z-index: 3;

    @include respond("tab") {
      top: calc(100vh - 54px);
    }
  }

  &__inner {

    @include respond("tab") {
      min-height: 52px;
    }
  }

  &__logo {
    width: 110px;
    height: 40px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }

    @include respond("tab") {
      width: 77px;
      height: 28px;
    }
  }

  &__linebar {
    // position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: $c-white;
    z-index: 100;

    &-progress {
      height: 100%;
      width: 0;
      background-color: $c-green;
      transition: width 0.1s linear;
    }

    &__wr {
      width: 100%;
      padding: 20px;
    }
  }

  &__language,
  &__btn {
    padding: 20px;
    border-left: 1px solid $c-steel-grey;
    text-transform: uppercase;

    @include respond("tab") {
      padding: 16px;
      font-size: 16px;
    }
  }

  &__close {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 46px;
    right: 46px;
    color: $c-steel-grey;

    @include respond("mob") {
      width: 36px;
      height: 36px;
      top: 32px;
      right: 32px;
    }
  }

  &__menu {
    background-color: $c-black;
    color: $c-white;
    padding: 100px 56px 64px 56px;
    max-width: 736px;
    width: 100%;
    margin-left: auto;
    height: 100%;
    transition: 0.3s all ease-in-out;
    transform: translateX(100%);

    @include respond("tab") {
      max-width: 100%;
    }

    @include respond("mob") {
      padding: 108px 32px 40px 32px;
    }

    &__wr {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      // z-index: 3;
      background-color: rgba(#00000080, 0.5);
      opacity: 0;
      transition: 0.3s all ease-in-out;
      pointer-events: none;

      // background: transparent;
      content: '';
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      &.active {
        opacity: 1;
        z-index: 3;
        pointer-events: auto;

        .header__menu {
          transform: none;
        }
      }
    }

    &__list {
      gap: 56px;

      @include respond("mob") {
        gap: 32px;
      }
    }

    &__item {
      text-transform: uppercase;

      @include respond("tab") {
        a {
          font-size: 40px;

          @include respond("mob") {
            font-size: 32px;
          }
        }
      }
    }

  }

  &__submenu {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @include respond("tab") {
      & a {

        font-size: 24px;

        @include respond("mob") {
          font-size: 18px;
          letter-spacing: -0.05em;
        }
      }
    }
  }

  &__social {
    margin-top: auto;

    @include respond("mob") {
      flex-direction: column;
      align-items: start;
      gap: 20px;
    }

    &__title {
      text-transform: uppercase;
    }

    &__icons {
      gap: 20px;

      &__item {
        width: 36px;
        height: 36px;

        @include respond("mob") {
          width: 32px;
          height: 32px;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
<script setup>
const { data, pending, error } = await useFetch('/api/header')
const scrollProgress = ref(0)
const isActive = ref(false)
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL
import IconX from '~/assets/icons/x.svg'

const openMenu = () => {
  console.log('tresttt')
  isActive.value = !isActive.value
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
  <div class="header__wr">

    <header class="header">
      <!-- <pre>
      {{ data }}
    </pre> -->
      <div class="d-f ai-c">
        <div class="header__logo">

        </div>
        <div class="header__linebar__wr">

          <div class="header__linebar">
            <div class="header__linebar-progress" :style="{ width: scrollProgress + '%' }"></div>
          </div>
        </div>
        <div class="header__language f-b-p3 d-f ai-c ">
          UA
        </div>
        <button class="header__btn f-b-p3" @click="openMenu()">Меню</button>
      </div>
    </header>

    <div class="header__menu__wr" :class="{ 'active': isActive }" @click.self="openMenu()">
      <div class="header__menu d-f fd-c">
        <IconX class="header__close" @click.self="openMenu()" />
        <div class="header__menu__list d-f fd-c">
          <div class="header__menu__item" v-for="(item, id) in data.links" :key="id">
            <a class="header__menu__item f-h2" :href="item.link.url">{{
              item.link.label }}</a>
            <div class="header__submenu" v-if="item.subLinks.length">

              <div class="header__submenu__item" v-for="(sublink, id) in item.subLinks" :key="id">
                <a class="header__submenu__item f-sh2" :href="sublink.link.url">{{ sublink.link.label }}</a>
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
              <img :src="`${payloadUrl}${item.image.url}`" :alt="item.link.label" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 20px;
  background-color: $c-black;
  color: $c-white;
  // border-top: 2px solid $c-white;
  // position: fixed;
  width: 100%;
  // left: 0;
  // top: calc(100vh - 62px);
  z-index: 2;

  &__wr {

    border-top: 2px solid $c-white;
    position: fixed;
    top: calc(100vh - 62px);
    width: 100%;
    z-index: 2;
  }

  &__logo {
    width: 110px;
    height: 40px;
    background-color: $c-green;
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
  }

  &__close {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 46px;
    right: 46px;
    color: $c-steel-grey;
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
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);

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
    }

    &__item {
      text-transform: uppercase;
    }

  }

  &__submenu {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__social {
    margin-top: auto;
    &__title {
      text-transform: uppercase;
    }

    &__icons {
      gap: 20px;

      &__item {
        width: 36px;
        height: 36px;
      }
    }
  }
}
</style>
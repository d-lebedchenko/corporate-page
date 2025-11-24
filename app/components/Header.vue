<script setup>
import IconX from '~/assets/icons/x.svg'

const { data } = useFetch('/api/header')
const scrollProgress = ref(0)
const isOpen = ref(false)

const { locale } = useI18n();

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
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
        <NuxtLink :to="$localePath('/')" class="header__logo">
          <NuxtPicture
            v-if="data.logo?.url"
            :src="`/payload${data.logo.url}`"
            :alt="data.logo.alt || 'TENTENS Tech'"
            width="110"
            height="40"
            sizes="77px lg:110px"
            fit="inside"
          />
        </NuxtLink>
        <div class="header__linebar__wr">

          <div class="header__linebar">
            <div class="header__linebar-progress" :style="{ width: scrollProgress + '%' }"></div>
          </div>
        </div>
          
        <NuxtLink
          class="header__language f-b-p3 d-f ai-c hover-green clickable"
          :to="$switchLocalePath(locale === 'uk' ? 'en' : 'uk')"
        >
          {{ locale === 'uk' ? 'UA' : 'EN' }}
        </NuxtLink>

        <button class="header__btn f-b-p3 hover-green" @click="toggleMenu()">Меню</button>
      </div>
    </header>

    <Transition name="menu">
      <div v-if="isOpen" class="header__menu__wr" @click.self="closeMenu()">
        <div class="header__menu d-f fd-c">
          <button type="button" class="header__close" @click="closeMenu()" :aria-label="$t('general.close')">
            <IconX />
          </button>
          <div class="header__menu__list d-f fd-c">
            <div class="header__menu__item" v-for="item in data.links" :key="item.id">
              <CmsLink class="header__menu__item hover-green f-h2" :link="item.link" @click="closeMenu()">
                {{ item.link.label }}
              </CmsLink>
              <div class="header__submenu" v-if="item.subLinks.length">

                <div class="header__submenu__item" v-for="sublink in item.subLinks" :key="sublink.id">
                  <CmsLink class="header__submenu__item hover-green f-sh2" :link="sublink.link" @click="closeMenu()">
                    {{ sublink.link.label }}
                  </CmsLink>
                </div>
              </div>
            </div>
          </div>
          <div class="header__social d-f ai-c jc-sb">
            <div class="header__social__title f-sh2">
              {{ data.socialLabel }}
            </div>
            <div class="header__social__icons d-f">
              <CmsLink class="header__social__icons__item" v-for="item in data.social" :key="item.id" :link="item.link">
                <NuxtPicture
                  v-if="item.image?.url"
                  :src="`/payload${item.image.url}`"
                  :alt="item.link?.label || item.image.alt || 'Social link'"
                  width="36"
                  height="36"
                  sizes="32px md:36px"
                  fit="inside"
                  loading="lazy"
                />
              </CmsLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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
    border-bottom: 2px solid $c-white;
    background-color: $c-black;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 3;
  }

  &__inner {

    @include respond("tab") {
      min-height: 52px;
    }
  }

  &__logo {
    flex-shrink: 0;

    picture {
      display: block;
      &:deep(img) {
        display: block;
        width: 110px;
        height: 40px;
        object-fit: contain;
        @include respond("tab") {
          width: 77px;
          height: 28px;
        }
      }
    }

  }

  &__linebar {
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

    svg {
      width: 100%;
      height: 100%;
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
      background-color: rgba(#00000080, 0.5);

      content: '';
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 3;

      &.menu-enter-active,
      &.menu-leave-active {
        transition: opacity 0.3s ease-in-out;
        .header__menu {
          transition: transform 0.3s ease-in-out;
        }
      }
      &.menu-enter-from,
      &.menu-leave-to {
        opacity: 0;
        .header__menu {
          transform: translateX(100%);
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
        picture {
          display: block;
          &:deep(img) {
            display: block;
            width: 36px;
            height: 36px;
            object-fit: contain;
            @include respond("mob") {
              width: 32px;
              height: 32px;
            }
          }
        }
      }
    }
  }
}
</style>

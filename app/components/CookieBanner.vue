<script setup>
import { ref, onMounted } from 'vue';

const COOKIE_CONSENT_KEY = 'cookie_consent_given';
const showBanner = ref(false);

const acceptCookies = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
  showBanner.value = false;
  console.log('User accepted cookies. Analytics can be initialized now.');
};

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (consent !== 'true') {
    showBanner.value = true;
  }
});
</script>

<template>
  <div class="cookie-banner" v-if="showBanner">
    <div>
      <div class="cookie-banner__top">

        <h4 class="cookie-banner__title f-h4">{{ $t('cookie.title') }}</h4>
        <p class="cookie-banner__text f-p4">{{ $t('cookie.text') }}</p>
      </div>
      <div class="cookie-banner__btns">
        <button class="accept f-b-p3" @click="acceptCookies">
          {{ $t('cookie.accept') }}
        </button>
        <button class="decline f-b-p3">
          {{ $t('cookie.decline') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.cookie-banner {
  position: fixed;
  bottom: 20px;
  left: 20px;
  margin-right: 20px;
  max-width: 491px;
  width: 100%;
  color: white;
  z-index: 3;
  background-color: $c-black;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: $c-steel-grey;



  @include respond("mob-md") {
    width: calc(100% - 30px);
    margin: 0 15px;
    left: 0;
  }

  &__top {
    padding: 24px;
  }

  &__title {
    margin-bottom: 14px;
    color: $c-green;
    text-transform: uppercase;
  }

  &__btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .accept {
      border-width: 1px 0px 1px 1px;
      border-style: solid;
      border-color: $c-steel-grey;
      color: $c-green;
      text-transform: uppercase;
      min-height: 70px;

      @include respond("mob-md") {
        min-height: 56px;
      }
    }

    .decline {
      border: 1px solid $c-steel-grey;
      text-transform: uppercase;
    }
  }
}
</style>
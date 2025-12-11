<script setup>
import { ref, onMounted } from 'vue';

const COOKIE_CONSENT_KEY = 'cookie_consent_details';
const showBanner = ref(false);

const ACCEPT_ALL_CONSENT = {
  necessary: true,
  preferences: true,
  analytics: true,
  marketing: true
};

const DECLINE_CONSENT = {
  necessary: true,
  preferences: false,
  analytics: true,
  marketing: false
};

const acceptCookies = () => {
  setConsent(ACCEPT_ALL_CONSENT);
  console.log('User accepted ALL cookies. Full analytics initialized.');
};

const declineCookies = () => {
  setConsent(DECLINE_CONSENT);
  console.log('User declined optional cookies. Only necessary scripts running.');
};

const setConsent = (consentObject) => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentObject));
    showBanner.value = false;
  } catch (e) {
    console.error('Failed to save cookie consent to localStorage:', e);
  }
};

onMounted(() => {
  try {
    const consentDetails = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentDetails) {
      showBanner.value = true;
    } else {
      const parsedConsent = JSON.parse(consentDetails);
      console.log('Found existing consent:', parsedConsent);
    }
  } catch (e) {
    console.error('Error reading cookie consent from localStorage:', e);
    showBanner.value = true;
  }
});
</script>

<template>
  <div class="cookie-banner" v-if="showBanner">
    <div>
      <div class="cookie-banner__top">
        <h4 class="cookie-banner__title f-h4">{{ $t('cookie.title') }}</h4>
        <p class="cookie-banner__text f-p3">{{ $t('cookie.text_before') }}<a href="/privacy-policy" class="cookie-banner__link f-p3">{{ $t('cookie.text_link') }}</a>{{ $t('cookie.text_after') }}</p>
      </div>
      <div class="cookie-banner__btns">
        <button class="accept f-b-p3" @click="acceptCookies">
          {{ $t('cookie.accept') }}
        </button>
        <button class="decline f-b-p3" @click="declineCookies">
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
  max-width: 520px;
  width: 100%;
  color: white;
  z-index: 3;
  background-color: $c-black;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: $c-steel-grey;



  @include respond("mob") {
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

  &__text {
    color: $c-grey-2;
    a {
      color: $c-green;
    }
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

      @include respond("mob") {
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
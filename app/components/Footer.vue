<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'

const { data } = await useFetch('/api/footer')
</script>

<template>
  <footer class="footer" v-if="data && data?.navItems.length">
    <div class="container">
      <div class="footer__wr">

        <div class="footer__row d-f ai-c">
          <div class="footer__label f-sh2">{{ data.navLabel }}</div>
          <div class="footer__links d-f">
            <div v-for="link in data.navItems" :key="link.id" class="footer__link f-p3 hover-green">
              <CmsLink :link="link.link">{{ link.link.label }}</CmsLink>
            </div>
          </div>
        </div>
        <div class="footer__row d-f ai-c">
          <div class="footer__label f-sh2">{{ data.followLabel }}</div>
          <div class="footer__links d-f">
            <div v-for="link in data.followItems" :key="link.id" class="footer__link f-p3 hover-green">
              <CmsLink class="d-f ai-c" :link="link.link">{{ link.link.label }}
                <Arrow class="icon" />
              </CmsLink>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__info d-f ai-c">
        <div v-if="data.privacyLink">
          <CmsLink :link="data.privacyLink.link" class="f-p3 o-5">{{ data.privacyLink.link.label }}</CmsLink>
        </div>
        <div v-if="data.termsLink">
          <CmsLink :link="data.termsLink.link" class="f-p3 o-5">{{ data.termsLink.link.label }}</CmsLink>
        </div>
        <div class="f-p3 right o-5" v-if="data.rights">{{ data.rights }}</div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.footer {
  padding-top: 72px;
  padding-bottom: 120px;
  background-color: $c-black;
  color: $c-white;

  @include respond("tab") {
    padding-bottom: 75px;
    padding-top: 40px;
  }

  &__wr {
    @include respond("tab") {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
    }

    @include respond("mob") {
      grid-template-columns: 1fr;
    }
  }

  &__row {
    margin-bottom: 44px;

    @include respond("tab") {
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  &__label {
    width: 50%;
    flex-shrink: 0;

    @include respond("tab") {
      width: 100%;
    }
  }

  &__links {
    display: grid;
    grid-template-columns: minmax(0, 111px) minmax(0, 195px) minmax(0, 82px) minmax(0, 80px);
    gap: 76px;
    width: 100%;

    @include respond("tab") {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  &__link {
    display: flex;
    gap: 8px;
    align-items: center;

    &:nth-child(4) {
      text-align: right;

      @include respond("tab") {
        text-align: left;
      }
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-left: 8px;

      @include respond("tab") {
        width: 16px;
        height: 16px;
      }
    }
  }

  &__info {
    gap: 80px;
    padding-top: 28px;
    border-top: 1px solid $c-steel-grey;

    @include respond("tab") {
      margin-top: 32px;
      gap: 20px;
    }

    @include respond("mob") {
      margin-top: 20px;
      flex-direction: column;
      align-items: flex-start;
    }

    .right {
      margin-left: auto;

      @include respond("mob") {
        margin-left: 0;
        margin-top: 28px;
      }
    }
  }
}
</style>

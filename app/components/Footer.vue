<script setup>
const { data, pending, error } = await useFetch('/api/footer')
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__row d-f ai-c">
        <div class="footer__label f-sh2">{{ data.navLabel }}</div>
        <div class="footer__links d-f">
          <div v-for="(link, index) in data.navItems" :key="index" class="footer__link f-p3">
            <a :href="link.link.url">{{ link.link.label }}</a>
          </div>
        </div>
      </div>
      <div class="footer__row d-f ai-c">
        <div class="footer__label f-sh2">{{ data.followLabel }}</div>
        <div class="footer__links d-f">
          <div v-for="(link, index) in data.followItems" :key="index" class="footer__link f-p3">
            <a :href="link.link.url">{{ link.link.label }}</a>
          </div>
        </div>
      </div>
      <div class="footer__info d-f ai-c">
        <div v-if="data.privacyLink">
          <a :href="data.privacyLink.link.url" class="f-p3">{{ data.privacyLink.link.label }}</a>
        </div>
        <div v-if="data.termsLink">
          <a :href="data.termsLink.link.url" class="f-p3">{{ data.termsLink.link.label }}</a>
        </div>
        <div class="f-p3 right" v-if="data.rights">{{ data.rights }}</div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding-top: 72px;
  padding-bottom: 120px;
  background-color: $c-black;
  color: $c-white;
  &__row {
    margin-bottom: 44px;
  }
  &__label {
    width: 50%;
    flex-shrink: 0;
  }
  &__links {
    display: grid;
    grid-template-columns: minmax(0, 111px) minmax(0, 195px) minmax(0, 82px) minmax(0, 80px);
    gap: 76px;
    width: 100%;
  }
  &__link {
    &:nth-child(4) {
      text-align: right;
    }
  }
  &__info {
    gap:80px;
    padding-top: 28px;
    border-top: 1px solid $c-steel-grey;
    .right {
      margin-left: auto;
    }
  }
}
</style>
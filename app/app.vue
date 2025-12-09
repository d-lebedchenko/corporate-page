<script setup>
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])]
}))
</script>

<template>
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WT6WXQ9P" height="0" width="0"
      style="display:none;visibility:hidden"></iframe>
  </noscript>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CookieBanner />
</template>

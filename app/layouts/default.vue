<script setup>
const { locale } = useI18n();
const { data: headerData } = await useFetch(() => `/api/header?locale=${locale.value}`)
const { data: footerData } = await useFetch(() => `/api/footer?locale=${locale.value}`)
</script>

<template>
  <div>
    <Header :data="headerData" />
    <main>
      <NuxtPage />
    </main>
    <Footer :data="footerData" />

    <ClientOnly>
      <DynamicCursor />
    </ClientOnly>
  </div>
</template>

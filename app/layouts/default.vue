<script setup>
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'
import DynamicCursor from '~/components/DynamicCursor.vue' 
</script>

<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />

    <ClientOnly>
      <DynamicCursor />
    </ClientOnly>
  </div>
</template>

<style>
</style>

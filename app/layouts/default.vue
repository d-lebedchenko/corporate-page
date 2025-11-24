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

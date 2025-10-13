// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_PAYLOAD_URL: process.env.NUXT_PUBLIC_PAYLOAD_URL,
    },
  },

  css: ["~/assets/scss/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;',
        },
      },
    },
    plugins: [svgLoader()],
  },

  modules: ["nuxt-swiper", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "uk", iso: "uk-UA", name: "Українська" },
      { code: "en", iso: "en-US", name: "English" },
    ],

    defaultLocale: "uk",

    strategy: "prefix_except_default",

    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: "root", 
      fallbackLocale: "uk",
      alwaysRedirect: false,
    },
  },
});

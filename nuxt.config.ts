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
    plugins: [
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // viewBox is required to resize SVGs with CSS.
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
  },

  modules: ["nuxt-swiper", "@nuxtjs/i18n", "nuxt-marquee", "@morev/vue-transitions/nuxt"],
  i18n: {
    locales: [
      { code: "uk", iso: "uk-UA", name: "Українська", file: 'uk.json' },
      { code: "en", iso: "en-US", name: "English", file: 'en.json' },
    ],

    defaultLocale: "uk",

    strategy: "prefix_except_default",

    detectBrowserLanguage: false,
  },
});

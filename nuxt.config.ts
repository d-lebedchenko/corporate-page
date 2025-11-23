// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

const payloadUrl = process.env.NUXT_PUBLIC_PAYLOAD_URL!;
const payloadHostname = new URL(payloadUrl).hostname;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      payloadUrl,
    },
  },

  css: ["~/assets/scss/global.scss"],

  nitro: {
    routeRules: {
      '/payload/**': {
        proxy: `${payloadUrl}/**`,
      },
    },
  },

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

  modules: [
    "nuxt-swiper",
    "@nuxtjs/i18n",
    "nuxt-marquee",
    "@morev/vue-transitions/nuxt",
    "nuxt-lottie",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  i18n: {
    locales: [
      { code: "uk", iso: "uk-UA", name: "Українська", file: 'uk.json' },
      { code: "en", iso: "en-US", name: "English", file: 'en.json' },
    ],

    defaultLocale: "uk",

    strategy: "prefix_except_default",

    detectBrowserLanguage: false,
  },
  fonts: {
    families: [
      {
        name: 'Manrope',
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin', 'cyrillic-ext'],
        global: true,
      },
      {
        name: 'Oswald',
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin', 'cyrillic-ext'],
        global: true,
      },
    ],
  },
  lottie: {
    autoFolderCreation: false,
  },
  image: {
    domains: [payloadHostname],
    alias: {
      payload: payloadUrl,
    },
    screens: {
      'xs': 320,
      'sm': 350,
      '2sm': 430,
      'md': 600,
      'lg': 1024,
    },
  },
});

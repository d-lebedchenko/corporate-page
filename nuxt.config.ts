import svgLoader from "vite-svg-loader";

interface PageDoc {
  slug: string;
}

interface EmployerDoc {
  slug?: string;
  meta?: {
    slug?: string;
  };
}

const baseUrl = process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000";
const payloadUrl =
  process.env.NUXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001";
const payloadHostname = new URL(payloadUrl).hostname;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  features: {
    inlineStyles: false,
  },

  runtimeConfig: {
    public: {
      baseUrl,
      payloadUrl,
    },
  },

  site: {
    url: baseUrl,
  },

  css: ["~/assets/scss/global.scss"],

  nitro: {
    routeRules: {
      "/payload/**": {
        proxy: `${payloadUrl}/**`,
      },
    },
    minify: true,
    compressPublicAssets: {
      brotli: true,
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
              name: "preset-default",
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
    ssr: {
      noExternal: process.env.NODE_ENV === "production" ? true : undefined,
    },
    build: {
      cssMinify: "lightningcss",
      ssrManifest: true,
      minify: "terser",
    },
  },

  modules: [
    "nuxt-swiper",
    "@nuxtjs/i18n",
    "nuxt-marquee",
    "@morev/vue-transitions/nuxt",
    "nuxt-lottie",
    "@nuxt/fonts",
    "@nuxt/image",
    "nuxt-vitalizer",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots"
  ],

  sitemap: {
    urls: async () => {
      const payloadBase = `${payloadUrl}/api/`;

      try {
        // Fetch pages from Payload CMS
        const pagesEndpoint = `${payloadBase}pages?limit=1000&where[_status][equals]=published`;
        const pagesData = await fetch(pagesEndpoint).then((res) => res.json());

        const pageUrls = pagesData.docs.map((doc: PageDoc) => {
          if (doc.slug === "home") return "/";
          return `/${doc.slug}`;
        });

        // Fetch career pages from Payload CMS
        const careerPagesEndpoint = `${payloadBase}career-pages?limit=1000&where[_status][equals]=published`;
        const careerPagesData = await fetch(careerPagesEndpoint).then(res => res.json());

        const careerPageUrls = (careerPagesData?.docs || [])
          .filter((doc: PageDoc) => doc.slug) 
          .map((doc: PageDoc) => `/${doc.slug}`); 
          

        // Fetch main blog page from Payload CMS
        const blogMainPageEndpoint = `${payloadBase}globals/blog-main-page?limit=1`;
        const blogMainPageData = await fetch(blogMainPageEndpoint).then(res => res.json());
        
        if (blogMainPageData.title) {
          pageUrls.push(`/blog`);
        }

        // Fetch blog posts from Payload CMS
        const blogPagesEndpoint = `${payloadBase}blog-posts?limit=1000&where[_status][equals]=published`;
        const blogPagesData = await fetch(blogPagesEndpoint).then(res => res.json());
        
        const blogPageUrls = (blogPagesData?.docs || [])
          .filter((doc: PageDoc) => doc.slug) 
          .map((doc: PageDoc) => `/blog/${doc.slug}`); 

        return [...pageUrls, ...careerPageUrls, ...blogPageUrls];
      } catch (error) {
        console.error(
          "Помилка при отриманні динамічних маршрутів для sitemap:",
          error
        );
        return [];
      }
    },
  },

  i18n: {
    baseUrl,
    locales: [
      { code: "uk", language: "uk-UA", name: "Українська", file: "uk.json" },
      { code: "en", language: "en-US", name: "English", file: "en.json" },
    ],

    defaultLocale: "uk",

    strategy: "prefix_except_default",

    detectBrowserLanguage: false,
  },
  fonts: {
    families: [
      {
        name: "Manrope",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin", "cyrillic-ext"],
      },
      {
        name: "Oswald",
        provider: "google",
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin", "cyrillic-ext"],
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
      xs: 320,
      sm: 350,
      "2sm": 430,
      md: 600,
      lg: 1024,
    },
    quality: 80,
    ipx: {
      maxAge: 86400, // 24h
    },
  },
  vitalizer: {
    disablePrefetchLinks: "dynamicImports",
    disablePreloadLinks: true,
  },
});
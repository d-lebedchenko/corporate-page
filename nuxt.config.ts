import svgLoader from "vite-svg-loader";
import vsharp from "vite-plugin-vsharp";

interface PageDoc {
  slug: string;
}

const baseUrl = process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:3000";
const payloadUrl =
  process.env.NUXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001";
const payloadHostname = new URL(payloadUrl).hostname;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { 
          rel: 'preconnect', 
          href: 'https://www.googletagmanager.com', 
          crossorigin: 'anonymous' 
        }
      ],
      script: [
        {
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f) ;
            })(window,document,'script','dataLayer','GTM-WT6WXQ9P');
          `,
          tagPosition: 'head',
          type: 'text/javascript',
        },
      ]
    }
  },
  features: {
    inlineStyles: false,
  },
  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false,
      },
    },
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
      ...(process.env.IS_NUXT_MOCK !== 'true' && {
        "/payload/**": {
          proxy: `${payloadUrl}/**`,
        },
      }),
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
      vsharp(),
    ],
    ssr: {
      noExternal: process.env.NODE_ENV === "production" ? true : undefined,
    },
    build: {
      cssMinify: "lightningcss",
      ssrManifest: true,
      minify: "terser",
    },
    json: {
      stringify: true,
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
      if (process.env.IS_NUXT_MOCK === 'true') {
        const { readdirSync, existsSync } = await import('node:fs')
        const { resolve } = await import('node:path')
        const mocksDir = resolve(process.cwd(), 'mocks')

        const pageFiles = readdirSync(`${mocksDir}/pages`)
          .filter((f: string) => f.endsWith('-uk.json'))
        const pageUrls = pageFiles.map((f: string) => {
          const slug = f.replace('-uk.json', '')
          return slug === 'home' ? '/' : `/${slug}`
        })

        const careerFiles = readdirSync(`${mocksDir}/career-pages`)
          .filter((f: string) => f.endsWith('-uk.json'))
        const careerUrls = careerFiles.map((f: string) => `/${f.replace('-uk.json', '')}`)

        if (existsSync(`${mocksDir}/globals/blog-main-page-uk.json`)) {
          pageUrls.push('/blog')
        }

        const blogFiles = readdirSync(`${mocksDir}/blog-posts`)
          .filter((f: string) => f.endsWith('-uk.json') && !f.startsWith('list-'))
        const blogUrls = blogFiles.map((f: string) => `/blog/${f.replace('-uk.json', '')}`)

        return [...pageUrls, ...careerUrls, ...blogUrls]
      }

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
    domains: process.env.IS_NUXT_MOCK === 'true' ? [] : [payloadHostname],
    alias: process.env.IS_NUXT_MOCK === 'true' ? {} : {
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
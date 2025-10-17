// https://nuxt.com/docs/api/configuration/nuxt-config
import ssgRoutes from './modules/ssg-international-routes'

export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true
  },
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true
  },
  css: [
    '@/styles/globals.css'
  ],
  app: {
    head: {
      titleTemplate: '%s | ' + process.env.SITE_NAME,
      title: process.env.SITE_NAME
    }
  },
  devServer: {
    host: 'localhost',
    port: 3000
  },
  runtimeConfig: {
    public: {
      GRAPHQL_TOKEN: process.env.GRAPHQL_TOKEN,
      CRAFT_URL: process.env.CRAFT_URL,
      BASE_URL: process.env.BASE_URL,
      SITE_NAME: process.env.SITE_NAME
    }
  },
  css: [
    '@/styles/variables.css',
    '@/styles/utilities.css',
    '@/styles/globals.css'
  ],
  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'postcss-custom-properties': {
        preserve: false
      },
      'postcss-preset-env': {
        stage: 1,
        features: {
          'custom-properties': false,
          'nesting-rules': false
        }
      },
      autoprefixer: {}
    }
  },
  vite: {
    server: {
      hmr: {
        port: 3000
      }
    }
  },
  nitro: {
    devServer: {
      watch: ['./server']
    },
    prerender: {
      routes: ssgRoutes()
    }
  },
  experimental: {
    payloadExtraction: false
  }
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  // devServer: {
  //   port: 3000, // default: 3000
  //   host: '192.168.0.113' // default: localhost
  // },
  runtimeConfig: {
    apiSecret: '123',
    public: {
      appName: process.env?.APP_NAME,
      baseUrl: process.env?.API_BASE_URL,
      imageUrl: process.env?.API_IMAGE_URL,
    }
  },
  devtools: { enabled: false },
  modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: [
      './stores',
      'composables',
      'composables/**',
    ],
  },
  pinia: {
    storesDirs: [
      './stores/**', 
      './custom-folder/stores/**'
    ],
  },
  experimental: {
    defaults: {
      nuxtLink: {
        // default values
        componentName: 'UserSidebar',
        externalRelAttribute: '',
        activeClass: 'active',
        exactActiveClass: 'active',
        prefetchedClass: undefined, // can be any valid string class name
        trailingSlash: undefined // can be 'append' or 'remove'
      }
    }
  }
})

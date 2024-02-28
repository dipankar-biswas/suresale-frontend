// https://nuxt.com/docs/api/configuration/nuxt-config
import {resolve} from "path";
export default defineNuxtConfig({
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      appName: process.env.APP_NAME,
      baseUrl: process.env.API_BASE_URL,
      imageUrl: process.env.API_IMAGE_URL
    }
  },
  devtools: { enabled: false },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxt/image"
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
})
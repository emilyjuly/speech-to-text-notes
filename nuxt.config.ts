// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-primevue',
    '@pinia/nuxt',
  ],
  css: [
    'primeflex/primeflex.css'
  ],
})

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  nitro: {
    devProxy: {
      "/api": { target: "http://localhost:8080/api", changeOrigin: true },
    },
  },

  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
  ],
});
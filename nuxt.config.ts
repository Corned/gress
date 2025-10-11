export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],
});
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  //...
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      "Instrument Sans": true, // Enable Instrument Sans
    },
    display: "swap", // Optional: Improve performance by swapping the font
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});

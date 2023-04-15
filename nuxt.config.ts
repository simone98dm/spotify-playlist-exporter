export default defineNuxtConfig({
  ssr: false,
  modules: ["@pinia/nuxt"],
  css: ["~/assets/reset.scss", "~/assets/variables.scss", "~/assets/main.scss"],
  app: {
    head: {
      title: "Playlist Exporter",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: "Export your Spotify playlists to a TXT file",
        },
      ],
    },
  },
});

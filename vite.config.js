import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://10.14.52.233:8001",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});

// import { fileURLToPath, URL } from "node:url";

// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueDevTools from 'vite-plugin-vue-devtools';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueDevTools()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         // ✨ Ubah 'http' menjadi 'https' di target URL
//         target: "https://10.14.52.233:8001", // Mengarahkan ke backend HTTPS
//         changeOrigin: true,
//         secure: false, // Set ke false jika backend menggunakan sertifikat self-signed atau tidak valid
//       },
//     },
//   },
// });

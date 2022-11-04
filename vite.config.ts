import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import path from "path";

const assets = path.resolve(__dirname, "./src/assets");

export default defineConfig({
  base: 'https://cdn.jsdelivr.net/gh/silvandiepen/sil-react-app/dist/',
  plugins: [react(), cssInjectedByJsPlugin()],
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "${assets}/style/_global.scss";` },
    },
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        app: "./src/main.tsx",
      },
    },
  },
});

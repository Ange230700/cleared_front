// vite.config.ts

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  optimizeDeps: {
    include: ["vitest"],
  },
  // test: {
  //   globals: true,
  //   include: ["tests/**/*.test.ts"],
  //   reporters: ["verbose"],
  //   isolate: false,
  //   watch: false,
  //   environment: "jsdom",
  // },
  resolve: {
    alias: {
      // for "~" to point to project root
      "~": path.resolve(__dirname, ""),
    },
  },
});

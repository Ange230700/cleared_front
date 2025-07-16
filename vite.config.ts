// vite.config.ts

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  optimizeDeps: {
    include: ["vitest"],
  },
  test: {
    globals: true,
    include: ["tests/**/*.spec.ts"], // match your test files
    environment: "jsdom", // for DOM testing
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      // for "~" to point to project root
      "~": path.resolve(__dirname, ""),
    },
  },
});

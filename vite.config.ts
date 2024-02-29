/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      basename: process.env.GITHUB_PAGES ? "/to-ten-ten/" : "/",
    }),
    tsconfigPaths(),
  ],
  base: process.env.GITHUB_PAGES ? "/to-ten-ten/" : "/",
  test: {
    includeSource: ["app/**/*.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});

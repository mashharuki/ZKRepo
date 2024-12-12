import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
  plugins: [
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
    react(),
  ],
});

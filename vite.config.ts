import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";

// Note: jsxLocPlugin + vitePluginManusRuntime instrument JSX with `loc`
// metadata for the Manus IDE/runtime. They inject runtime code that crashes
// inside non-DOM React trees (notably R3F's <Canvas> children), with errors
// like "Cannot read properties of undefined (reading 'loc')". They have no
// purpose outside the Manus environment — disabled here.
const plugins = [react(), tailwindcss()];

export default defineConfig({
  plugins,
  // Custom cacheDir forces a fresh deps pre-bundle (new chunk hashes).
  // Browser cannot serve stale `chunk-XXX.js` because the URL changes.
  cacheDir: "node_modules/.vite-v2",
  optimizeDeps: {
    force: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [sveltekit(), nodePolyfills()]
  /* optimizeDeps: {
    include: ["@solana/web3.js", "buffer"],
    esbuildOptions: {
      target: "esnext",
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
    }
  },
  resolve: {
    alias: {
      $utils: path.resolve("src/utils/"),
      stream: "rollup-plugin-node-polyfills/polyfills/stream"
    }
  },
  define: {
    "process.env.BROWSER": true,
    "process.env.NODE_DEBUG": JSON.stringify("")
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })]
    } 
  } */
});

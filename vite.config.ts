import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          externalScript: [path.resolve(__dirname, 'public/ckeditor/build/ckeditor.js')], // Replace with your external script path
        },
      },
    },
  },
});

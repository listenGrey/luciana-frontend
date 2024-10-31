import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  //base: process.env.VITE_BASE_URL || '/',
  /*server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }*/
})

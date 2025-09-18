import { fileURLToPath, URL } from 'node:url'
import { viteMockServe } from 'vite-plugin-mock'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { mock } from 'node:test'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style/css/variables.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(), 
    vueJsx(), 
    vueDevTools(),
    viteMockServe({
      mockPath:'mock',
       enable: true,
       watchFiles: true  
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

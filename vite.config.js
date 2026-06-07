import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  // 關鍵：在這裡加上 base 設定，前後都要有斜線！
  // 例如你的 Repo 叫 my-vue-web，這裡就寫 '/my-vue-web/'
  base: '/vue-sfc-inflation/', 
  
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
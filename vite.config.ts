import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
/* 自动引入 vue  */
import AutoImport from 'unplugin-auto-import/vite'
// unocss
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({ /* options */ }),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-import.d.ts',
    }),
  ],
})

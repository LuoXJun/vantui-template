import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: 'src/types/auto-import.d.ts',
      imports: ['vue', 'vue-router']
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    // 导入时忽略的后缀名（默认值）
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/index.scss';`
      }
    }
  },
  server: {
    host: true,
    port: 3005, //启动端口
    hmr: true,
    proxy: {
      '^/dev': {
        target: 'http://139.9.30.21:7787',
        secure: false,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/dev/, '')
      }
    }
  }
})

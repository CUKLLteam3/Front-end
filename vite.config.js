import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/air-quality': {
        target: 'http://158.180.65.104',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      '/chat': {
        target: 'http://158.180.65.104',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  }
})
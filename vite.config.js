import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        swagger: './swagger.html',
        simple: './simple.html'
      }
    }
  },
  server: {
    middlewareMode: false
  }
})

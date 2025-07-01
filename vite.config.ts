import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
export const apiUrl = 'https://testlkamur.dvec.ru'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    basicSsl(), 
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export const apiUrl = 'https://testlkamur.dvec.ru'

// https://vite.dev/config/
export default defineConfig({
  base: `/iservtest/`,
  plugins: [
    react()
  ],
})
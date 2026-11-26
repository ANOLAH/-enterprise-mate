import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the same dist/ works at domain root
  // (public_html) or in a subdomain / subfolder without rebuilding.
  base: './',
  plugins: [react()],
})

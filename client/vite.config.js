import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Explicitly configure public directory to ensure _redirects is copied
  publicDir: 'public',
  build: {
    outDir: 'dist',
    // Ensure all assets from public are copied to dist
    copyPublicDir: true,
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  base: '/eft/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3456,
    open: true,
  },
})

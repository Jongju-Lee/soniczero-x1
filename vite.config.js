import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Enables relative paths for nested subdirectory deployment
  plugins: [react()],
})

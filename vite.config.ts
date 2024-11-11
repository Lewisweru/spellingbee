import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Keep excluding lucide-react if it's causing issues
    include: ['react-router-dom'], // Explicitly include react-router-dom for optimization
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'], // Make sure react-router-dom is treated as an external dependency
    },
  },
});

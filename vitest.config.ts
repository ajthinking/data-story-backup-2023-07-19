import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  
  test: {
    environment: 'jsdom',    
    globals: true,
    coverage: {
      all: true,
      exclude: [
        'build/**',
        '.next/**',
        '**/*.test.ts',
        'core/types/**',
        'core/support/computerTester/**'
      ]
    },
  },
})
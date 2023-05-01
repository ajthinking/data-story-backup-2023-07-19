import { defineConfig } from 'vitest/config'

export default defineConfig({ 
  test: {
    globals: true,
    coverage: {
      all: true,
      exclude: [
        'build/**',
        '.next/**',
        '**/*.test.ts',
        'core/support/computerTester/**'
      ]
    },
  },
})
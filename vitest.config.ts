import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      exclude: [
        '**/*.test.ts',
        'core/support/computerTester/**'
      ]
    }
  },
})
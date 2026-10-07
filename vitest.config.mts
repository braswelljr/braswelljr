import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    // Mirrors the `paths` in tsconfig.json.
    alias: [
      { find: /^@\//, replacement: `${root('./src')}/` },
      { find: /^lib\//, replacement: `${root('./lib')}/` },
      { find: /^types\//, replacement: `${root('./types')}/` }
    ]
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}', 'lib/**/*.test.{ts,tsx}']
  }
});

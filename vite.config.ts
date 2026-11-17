import { fileURLToPath } from 'node:url';

export default {
  build: {
    rollupOptions: {
      input: {
        inicio: fileURLToPath(new URL('./index.html', import.meta.url)),
        programa: fileURLToPath(new URL('./programa.html', import.meta.url)),
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
    clearMocks: true,
  },
};

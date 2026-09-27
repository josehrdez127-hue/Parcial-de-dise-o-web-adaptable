import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.restcountries.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/countries/v5'),
          headers: {
            Authorization: `Bearer ${env.REST_COUNTRIES_API_KEY || 'rc_live_demo'}`,
          },
        },
      },
    },
  }
})
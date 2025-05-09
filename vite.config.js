import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      // "/kibana"로 시작하는 요청을 Kibana로 프록시
      '/kibana': {
        target: 'http://localhost:5601', // Kibana 주소
        changeOrigin: true,
        rewrite: path => path.replace(/^\/kibana/, ''),
      },
    },
  },
})

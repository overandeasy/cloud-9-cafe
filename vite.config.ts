import { defineConfig } from 'vite'
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  // Manually adding the following server configuration. Otherwise, Vite tries to run the app on an ipv6 address that doesn't exist when runing "npm run dev".
  server: {
    host: '127.0.0.1', // or 'localhost'
    port: 5173
  },
  // shadcn: so the app can resolve paths without error
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

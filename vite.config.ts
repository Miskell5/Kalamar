/*
  La configuración de la herramienta de desarrollo (Vite).
  Aquí se conectan los plugins:
  - react: para que funcione React.
  - tailwindcss: para los estilos.
  - VitePWA: para que la app se pueda instalar en el iPhone como si fuera
    una app nativa (genera el manifest.json y el service worker).
  No toques esto a menos que sepas lo que haces o quieras cambiar
  algo muy específico de la compilación.
  Importancia: 🟡 Media (si la rompes, no compila).
*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Kalamar',
        short_name: 'Kalamar',
        description: 'Control de gastos personal con voz',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})

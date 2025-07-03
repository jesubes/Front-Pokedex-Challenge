import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // O 'classic' si usas la sintaxis antigua de React
      include: '**/*.{js,jsx,ts,tsx}', // Asegúrate de que .js esté incluido aquí
    }),
    tailwindcss()
  ],

  // Asegúrate de que Rollup también procese los archivos .js con JSX
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Esto es importante para que ESBuild (usado por Vite) sepa que .js puede contener JSX
    loader: 'jsx',
    include: /.\/src\/.*\.js$/, // Expresión regular para incluir solo archivos JS en src
    exclude: [],
  },
})

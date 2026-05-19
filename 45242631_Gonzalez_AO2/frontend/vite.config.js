import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'uuid': 'uuid/dist/esm-browser/index.js'
    }
  }
})

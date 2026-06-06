// client/vite.config.js

import { defineConfig } from "vite"
import react            from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    react({
      // this tells vite to allow context files
      // to export both components and hooks
      include: "**/*.{jsx,tsx}",
    }),
  ],
})
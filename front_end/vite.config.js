import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite"; // ✅ Ensure correct import

export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});

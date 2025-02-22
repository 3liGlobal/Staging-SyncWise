import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // or 'build', depending on your setup
  },
  base: "/", // Add this line to set the base path
});

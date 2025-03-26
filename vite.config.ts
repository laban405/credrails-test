import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: { "process.env": process.env },
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true, // Allows access from the network
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5173', // Proxy to itself
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
  
    },
    preview: {
      host: true, // Allows access from the network during preview
      port: 5173,
    },
  };
});

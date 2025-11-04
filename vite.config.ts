import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 5002, // Updated to match Nginx configuration
    host: '0.0.0.0', // Listen on all interfaces for both localhost and public IP access
    strictPort: true,
    allowedHosts: [
      'localhost',
      '3.111.22.56',
      'xrplfund.duckdns.org',
      '.duckdns.org' // Allow all DuckDNS subdomains
    ],
    hmr: {
      protocol: 'ws',
      host: 'localhost', // Changed from 0.0.0.0 to localhost for better client compatibility
      port: 5002, // Updated to match Nginx configuration
      clientPort: 5002 // Explicitly set client port to ensure proper connection
    },
    proxy: {
      // Proxy API requests to Convex HTTP actions endpoint
      '/api': {
        target: 'https://proper-gnu-831.convex.site', // Convex HTTP actions URL (not .convex.cloud)
        changeOrigin: true,
        secure: true
      },
      // Proxy all other requests to Convex HTTP actions endpoint
      '/funds': {
        target: 'https://proper-gnu-831.convex.site',
        changeOrigin: true,
        secure: true
      },
      '/xrpl': {
        target: 'https://proper-gnu-831.convex.site',
        changeOrigin: true,
        secure: true
      },
      '/xaman': {
        target: 'https://proper-gnu-831.convex.site',
        changeOrigin: true,
        secure: true
      },
      '/investors': {
        target: 'https://proper-gnu-831.convex.site',
        changeOrigin: true,
        secure: true
      },
      '/compliance': {
        target: 'https://proper-gnu-831.convex.site',
        changeOrigin: true,
        secure: true
      },
      '/portfolio': {
        target: 'https://proper-gnu-831.convex.site',
        changeOrigin: true,
        secure: true
      }
    }
  },
  plugins: [
    react(),
    // The code below enables dev tools like taking screenshots of your site
    // while it is being developed on chef.convex.dev.
    // Feel free to remove this code if you're no longer developing your app with Chef.
    mode === "development"
      ? {
          name: "inject-chef-dev",
          transform(code: string, id: string) {
            if (id.includes("main.tsx")) {
              return {
                code: `${code}

/* Added by Vite plugin inject-chef-dev */
window.addEventListener('message', async (message) => {
  if (message.source !== window.parent) return;
  if (message.data.type !== 'chefPreviewRequest') return;

  const worker = await import('https://chef.convex.dev/scripts/worker.bundled.mjs');
  await worker.respondToMessage(message);
});
            `,
                map: null,
              };
            }
            return null;
          },
        }
      : null,
    // End of code for taking screenshots on chef.convex.dev.
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Exclude Convex directory from processing to prevent backend compilation errors
  define: {
    global: "globalThis",
    // Add Buffer polyfill for browser
    "process.env": {},
  },
  optimizeDeps: {
    exclude: ["convex"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
    }
  },
}));
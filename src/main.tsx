import "./xumm-env-setup";
import { createRoot } from "react-dom/client";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import "./index.css";
import "./styles/ui-fixes.css";
import App from "./App";
import { Buffer } from 'buffer';

// Make Buffer available globally for browser environment
window.Buffer = Buffer;

// Fix for React error #130 - ensure proper error handling
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && event.error.message.includes('React error #130')) {
    console.error('React Component Error: Check for undefined components or improper imports');
  }
});

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <ConvexAuthProvider client={convex}>
    <App />
  </ConvexAuthProvider>,
);
// Test frontend environment variables
console.log("=== Frontend Environment Variables Test ===");

// Simulate browser environment
if (typeof global === 'undefined') {
  global = {};
}
global.window = global.window || {};
global.document = global.document || {};
global.navigator = global.navigator || { userAgent: 'browser' };
global.process = global.process || {};
global.process.browser = true;
global.location = global.location || {};
global.location.origin = 'http://localhost:5176';

global.localStorage = global.localStorage || {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

// Simulate import.meta.env
const importMetaEnv = {
  VITE_XUMM_API_KEY: "b53edeaf-0046-49a6-a100-4bb284be3682",
  VITE_PUBLIC_IP: "3.111.22.56",
  VITE_PUBLIC_PORT: "5002"
};

console.log("VITE_XUMM_API_KEY:", importMetaEnv.VITE_XUMM_API_KEY);
console.log("VITE_PUBLIC_IP:", importMetaEnv.VITE_PUBLIC_IP);
console.log("VITE_PUBLIC_PORT:", importMetaEnv.VITE_PUBLIC_PORT);

// Test backend URL construction
const backendUrl = `http://${importMetaEnv.VITE_PUBLIC_IP}:${importMetaEnv.VITE_PUBLIC_PORT || 3001}`;
console.log("Constructed backend URL:", backendUrl);

console.log("✅ Environment variables test completed!");
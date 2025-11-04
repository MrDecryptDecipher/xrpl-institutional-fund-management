// Xumm environment setup
// This file should be imported before any Xumm imports to ensure proper environment detection

// Force browser environment detection for Xumm SDK
if (typeof window === 'undefined') {
  // Node.js environment (SSR)
  // @ts-ignore
  global.window = global.window || {};
  // @ts-ignore
  global.process = global.process || {};
  // @ts-ignore
  global.process.browser = true;
  // @ts-ignore
  global.document = global.document || {};
  // @ts-ignore
  global.document.location = global.document.location || {};
  // @ts-ignore
  global.navigator = global.navigator || { userAgent: "browser" };
  
  // Mock localStorage for Node.js environment
  // @ts-ignore
  global.localStorage = global.localStorage || {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
  
  // Mock window.addEventListener for Node.js environment
  // @ts-ignore
  global.window.addEventListener = global.window.addEventListener || (() => {});
  
  // Preserve existing process.env but remove problematic keys
  if (global.process.env) {
    // Remove keys that would cause CLI detection
    delete global.process.env.NODE;
    delete global.process.env.SHELL;
    delete global.process.env.TERM;
    delete global.process.env.PATH;
  }
} else {
  // Browser environment
  // @ts-ignore
  window.process = window.process || {};
  // @ts-ignore
  window.process.browser = true;
}

export {};
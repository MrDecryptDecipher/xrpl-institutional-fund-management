// Test script to verify Xaman SDK initialization
console.log("Testing Xaman SDK initialization...");

// Simulate browser environment
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.process = window.process || {};
  // @ts-ignore
  window.process.browser = true;
}

// Test importing the Xumm module
import("xumm")
  .then((xummModule) => {
    console.log("Xumm module imported successfully");
    console.log("Available exports:", Object.keys(xummModule));
    
    const XummClass = xummModule.Xumm || xummModule.default;
    if (XummClass) {
      console.log("Xumm class found:", typeof XummClass);
      
      // Try to initialize with a test API key (this will fail but we can see if the initialization works)
      try {
        const xumm = new XummClass("test-api-key");
        console.log("Xumm instance created successfully");
        console.log("Xumm instance keys:", Object.keys(xumm));
      } catch (error) {
        console.log("Error creating Xumm instance:", error);
      }
    } else {
      console.log("Xumm class not found in module");
    }
  })
  .catch((error) => {
    console.error("Failed to import Xumm SDK:", error);
  });
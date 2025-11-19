// Debug script to test Xaman SDK initialization and connection
console.log("=== Xaman SDK Debug Script ===");

// Check if we're in a browser environment
console.log("Environment check:");
console.log("- window:", typeof window !== 'undefined' ? 'available' : 'not available');
console.log("- process:", typeof process !== 'undefined' ? 'available' : 'not available');

// Check environment variables
console.log("\nEnvironment variables:");
console.log("- VITE_XUMM_API_KEY:", import.meta.env.VITE_XUMM_API_KEY ? `${import.meta.env.VITE_XUMM_API_KEY.substring(0, 8)}...` : 'NOT FOUND');

// Test Xumm SDK import and initialization
console.log("\nTesting Xumm SDK import and initialization:");

import("xumm")
  .then(async (xummModule) => {
    console.log("✓ Xumm module imported successfully");
    console.log("Module keys:", Object.keys(xummModule));
    
    const XummClass = xummModule.Xumm || xummModule.default;
    console.log("XummClass:", typeof XummClass);
    
    if (XummClass) {
      try {
        const apiKey = import.meta.env.VITE_XUMM_API_KEY;
        if (!apiKey) {
          throw new Error("API key not found");
        }
        
        console.log("Creating Xumm instance with API key...");
        const xumm = new XummClass(apiKey);
        console.log("✓ Xumm instance created successfully");
        console.log("Xumm instance:", xumm);
        
        // Test event listeners
        xumm.on("ready", () => {
          console.log("✓ Xumm SDK is ready");
        });
        
        xumm.on("error", (error) => {
          console.error("✗ Xumm SDK error:", error);
        });
        
        xumm.on("success", () => {
          console.log("✓ Xumm authorization successful");
        });
        
        // Test user account access
        console.log("Testing user account access...");
        xumm.user.account.then(account => {
          console.log("User account:", account || "Not connected");
        }).catch(error => {
          console.error("Error getting user account:", error);
        });
        
      } catch (error) {
        console.error("✗ Error creating Xumm instance:", error);
      }
    } else {
      console.error("✗ Xumm class not found in module");
    }
  })
  .catch((error) => {
    console.error("✗ Failed to import Xumm module:", error);
  });
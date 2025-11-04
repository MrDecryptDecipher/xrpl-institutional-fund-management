// Test script to debug Xaman payload creation
console.log("=== Xaman Payload Creation Test ===");

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
        
        // Wait a bit for SDK to be ready
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test payload creation
        console.log("Testing payload creation...");
        try {
          const payload = await xumm.payload.create({
            TransactionType: 'SignIn',
          });
          console.log("✓ Payload created successfully");
          console.log("Payload:", payload);
          
          // Check if payload has the expected properties
          if (payload && payload.uuid && payload.refs && payload.refs.qr_png) {
            console.log("✓ Payload has expected properties");
            console.log("- UUID:", payload.uuid);
            console.log("- QR PNG URL:", payload.refs.qr_png);
          } else {
            console.error("✗ Payload missing expected properties");
            console.error("Payload structure:", JSON.stringify(payload, null, 2));
          }
        } catch (error) {
          console.error("✗ Error creating payload:", error);
        }
        
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